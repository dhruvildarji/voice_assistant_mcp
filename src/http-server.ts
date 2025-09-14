#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { EnterpriseConfigManager } from './config-manager.js';
import { 
  EnterpriseVoiceAgentConfig, 
  VoiceProvider, 
  VoiceProviderConfig,
  MCPServerConfig 
} from './types.js';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { createServer as createHttpServer } from 'http';

// Load environment variables from mcp-server.env
const envPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'mcp-server.env');
if (existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.log('⚠️  mcp-server.env not found, using default environment variables');
}

class HTTPVoiceAgentMCPServer {
  private server: Server;
  private configManager: EnterpriseConfigManager;
  private currentConfig: EnterpriseVoiceAgentConfig | null = null;
  private voiceProviderConfig: VoiceProviderConfig | null = null;
  private defaultProvider: VoiceProvider = 'vapi';
  private app: express.Application;
  private httpServer: any;
  private port: number;

  constructor(port: number = 3005) {
    this.port = port;
    this.app = express();
    
    this.server = new Server(
      {
        name: 'http-voice-agent-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    this.configManager = new EnterpriseConfigManager();
    
    // Set default provider from environment
    const envProvider = process.env.DEFAULT_VOICE_PROVIDER as VoiceProvider;
    if (envProvider && ['openai', 'vapi'].includes(envProvider)) {
      this.defaultProvider = envProvider;
    }
    
    this.setupExpress();
    this.setupHandlers();
    this.logStartupInfo();
  }

  private setupExpress() {
    // Enable CORS for all routes
    this.app.use(cors({
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    }));

    // Parse JSON bodies
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Health check endpoint
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'healthy',
        server: 'http-voice-agent-mcp-server',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        configLoaded: !!this.currentConfig,
        voiceProviderSet: !!this.voiceProviderConfig,
        environment: {
          vapiConfigured: !!process.env.VAPI_PUBLIC_KEY,
          openaiConfigured: !!process.env.OPENAI_API_KEY,
          defaultProvider: this.defaultProvider,
        }
      });
    });

    // MCP endpoint for SSE transport
    this.app.get('/mcp', async (req, res) => {
      try {
        const transport = new SSEServerTransport('/mcp', res);
        await this.server.connect(transport);
        console.error('✅ MCP client connected via SSE');
      } catch (error) {
        console.error('❌ Error connecting MCP client:', error);
        res.status(500).json({ error: 'Failed to connect MCP client' });
      }
    });

    // API endpoints for direct tool access
    this.app.post('/api/tools/list', async (req, res) => {
      try {
        const result = await this.server.request(
          { method: 'tools/list' },
          ListToolsRequestSchema
        );
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
      }
    });

    this.app.post('/api/tools/call', async (req, res) => {
      try {
        const { name, arguments: args } = req.body;
        const result = await this.server.request(
          { method: 'tools/call', params: { name, arguments: args } },
          CallToolRequestSchema
        );
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
      }
    });

    this.app.get('/api/resources/list', async (req, res) => {
      try {
        const result = await this.server.request(
          { method: 'resources/list' },
          ListResourcesRequestSchema
        );
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
      }
    });

    this.app.post('/api/resources/read', async (req, res) => {
      try {
        const { uri } = req.body;
        const result = await this.server.request(
          { method: 'resources/read', params: { uri } },
          ReadResourceRequestSchema
        );
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
      }
    });

    // Error handling middleware
    this.app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error('Express error:', error);
      res.status(500).json({ error: 'Internal server error' });
    });

    // 404 handler
    this.app.use((req, res) => {
      res.status(404).json({ error: 'Not found' });
    });
  }

  private logStartupInfo() {
    console.error('🚀 HTTP Voice Agent MCP Server Starting...');
    console.error(`📊 Default Voice Provider: ${this.defaultProvider}`);
    console.error(`🔑 VAPI Public Key: ${process.env.VAPI_PUBLIC_KEY ? 'Set' : 'Not Set'}`);
    console.error(`🔑 OpenAI API Key: ${process.env.OPENAI_API_KEY ? 'Set' : 'Not Set'}`);
    console.error(`🌐 Server URL: http://localhost:${this.port}`);
    console.error(`🔗 MCP Endpoint: http://localhost:${this.port}/mcp`);
    console.error(`📋 Health Check: http://localhost:${this.port}/health`);
    console.error('✅ Ready to accept HTTP connections');
  }

  private setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'load_enterprise_config',
            description: 'Load enterprise configuration from a JSON file',
            inputSchema: {
              type: 'object',
              properties: {
                filePath: {
                  type: 'string',
                  description: 'Path to the enterprise configuration JSON file',
                },
              },
              required: ['filePath'],
            },
          },
          {
            name: 'load_config_from_string',
            description: 'Load enterprise configuration from a JSON string',
            inputSchema: {
              type: 'object',
              properties: {
                jsonConfig: {
                  type: 'string',
                  description: 'Enterprise configuration as JSON string',
                },
              },
              required: ['jsonConfig'],
            },
          },
          {
            name: 'set_voice_provider',
            description: 'Set the voice provider configuration (OpenAI or VAPI)',
            inputSchema: {
              type: 'object',
              properties: {
                provider: {
                  type: 'string',
                  enum: ['openai', 'vapi'],
                  description: 'Voice provider to use',
                },
                config: {
                  type: 'object',
                  description: 'Provider-specific configuration',
                  properties: {
                    openai: {
                      type: 'object',
                      properties: {
                        apiKey: { type: 'string' },
                        model: { type: 'string', default: 'gpt-4o' },
                        voice: { type: 'string', default: 'alloy' },
                      },
                    },
                    vapi: {
                      type: 'object',
                      properties: {
                        publicKey: { type: 'string' },
                        assistantId: { type: 'string' },
                        baseUrl: { type: 'string' },
                      },
                    },
                  },
                },
              },
              required: ['provider', 'config'],
            },
          },
          {
            name: 'get_config_summary',
            description: 'Get a summary of the current enterprise configuration',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_enterprise_info',
            description: 'Get detailed enterprise information',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_voice_agent_config',
            description: 'Get voice agent configuration details',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_apis_config',
            description: 'Get all configured APIs',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_knowledge_base',
            description: 'Get knowledge base configuration and documents',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'add_api_endpoint',
            description: 'Add a new API endpoint to the configuration',
            inputSchema: {
              type: 'object',
              properties: {
                apiName: {
                  type: 'string',
                  description: 'Name of the API to add endpoint to',
                },
                endpoint: {
                  type: 'object',
                  description: 'API endpoint configuration',
                  properties: {
                    name: { type: 'string' },
                    path: { type: 'string' },
                    method: { type: 'string', enum: ['GET', 'POST', 'PUT', 'DELETE'] },
                    description: { type: 'string' },
                    parameters: { type: 'array' },
                    responseFormat: { type: 'string' },
                    voiceResponseTemplate: { type: 'string' },
                  },
                  required: ['name', 'path', 'method', 'description', 'parameters', 'responseFormat'],
                },
              },
              required: ['apiName', 'endpoint'],
            },
          },
          {
            name: 'add_knowledge_document',
            description: 'Add a new document to the knowledge base',
            inputSchema: {
              type: 'object',
              properties: {
                document: {
                  type: 'object',
                  description: 'Document to add',
                  properties: {
                    id: { type: 'string' },
                    title: { type: 'string' },
                    content: { type: 'string' },
                    category: { type: 'string' },
                    tags: { type: 'array', items: { type: 'string' } },
                  },
                  required: ['id', 'title', 'content', 'category', 'tags'],
                },
              },
              required: ['document'],
            },
          },
          {
            name: 'export_config',
            description: 'Export current configuration to JSON',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_industry_templates',
            description: 'Get available industry templates',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'create_config_from_template',
            description: 'Create a new enterprise configuration from an industry template',
            inputSchema: {
              type: 'object',
              properties: {
                industry: {
                  type: 'string',
                  enum: ['airline', 'hotel', 'bank', 'retail'],
                  description: 'Industry template to use',
                },
                enterpriseInfo: {
                  type: 'object',
                  description: 'Enterprise information',
                  properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    headquarters: { type: 'string' },
                    website: { type: 'string' },
                    phone: { type: 'string' },
                    email: { type: 'string' },
                    supportHours: { type: 'string' },
                    languages: { type: 'array', items: { type: 'string' } },
                    tone: { type: 'string', enum: ['professional', 'friendly', 'casual', 'formal'] },
                    language: { type: 'string' },
                    responseStyle: { type: 'string', enum: ['concise', 'detailed', 'conversational'] },
                  },
                  required: ['name', 'description', 'headquarters', 'website', 'phone', 'email'],
                },
              },
              required: ['industry', 'enterpriseInfo'],
            },
          },
          {
            name: 'get_server_status',
            description: 'Get the current status of the MCP server',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
        ],
      };
    });

    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: [
          {
            uri: 'config://enterprise',
            name: 'Enterprise Configuration',
            description: 'Current enterprise configuration',
            mimeType: 'application/json',
          },
          {
            uri: 'config://voice-provider',
            name: 'Voice Provider Configuration',
            description: 'Current voice provider configuration',
            mimeType: 'application/json',
          },
          {
            uri: 'config://summary',
            name: 'Configuration Summary',
            description: 'Summary of current configuration',
            mimeType: 'application/json',
          },
          {
            uri: 'config://server-status',
            name: 'Server Status',
            description: 'Current MCP server status',
            mimeType: 'application/json',
          },
        ],
      };
    });

    // Read resources
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;

      switch (uri) {
        case 'config://enterprise':
          if (!this.currentConfig) {
            throw new Error('No enterprise configuration loaded');
          }
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(this.currentConfig, null, 2),
              },
            ],
          };

        case 'config://voice-provider':
          if (!this.voiceProviderConfig) {
            throw new Error('No voice provider configuration set');
          }
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(this.voiceProviderConfig, null, 2),
              },
            ],
          };

        case 'config://summary':
          const summary = this.configManager.getConfigSummary();
          if (!summary) {
            throw new Error('No configuration loaded');
          }
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(summary, null, 2),
              },
            ],
          };

        case 'config://server-status':
          const status = {
            serverName: 'http-voice-agent-mcp-server',
            version: '1.0.0',
            defaultProvider: this.defaultProvider,
            configLoaded: !!this.currentConfig,
            voiceProviderSet: !!this.voiceProviderConfig,
            environment: {
              vapiConfigured: !!process.env.VAPI_PUBLIC_KEY,
              openaiConfigured: !!process.env.OPENAI_API_KEY,
              serverUrl: `http://localhost:${this.port}`,
            },
            timestamp: new Date().toISOString(),
          };
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(status, null, 2),
              },
            ],
          };

        default:
          throw new Error(`Unknown resource: ${uri}`);
      }
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        if (!args) {
          throw new Error('No arguments provided');
        }

        switch (name) {
          case 'load_enterprise_config':
            return await this.handleLoadEnterpriseConfig(args.filePath as string);

          case 'load_config_from_string':
            return await this.handleLoadConfigFromString(args.jsonConfig as string);

          case 'set_voice_provider':
            return await this.handleSetVoiceProvider(args.provider as VoiceProvider, args.config);

          case 'get_config_summary':
            return await this.handleGetConfigSummary();

          case 'get_enterprise_info':
            return await this.handleGetEnterpriseInfo();

          case 'get_voice_agent_config':
            return await this.handleGetVoiceAgentConfig();

          case 'get_apis_config':
            return await this.handleGetAPIsConfig();

          case 'get_knowledge_base':
            return await this.handleGetKnowledgeBase();

          case 'add_api_endpoint':
            return await this.handleAddAPIEndpoint(args.apiName as string, args.endpoint);

          case 'add_knowledge_document':
            return await this.handleAddKnowledgeDocument(args.document);

          case 'export_config':
            return await this.handleExportConfig();

          case 'get_industry_templates':
            return await this.handleGetIndustryTemplates();

          case 'create_config_from_template':
            return await this.handleCreateConfigFromTemplate(args.industry as string, args.enterpriseInfo);

          case 'get_server_status':
            return await this.handleGetServerStatus();

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    });
  }

  private async handleLoadEnterpriseConfig(filePath: string) {
    try {
      this.currentConfig = this.configManager.loadConfigFromFile(filePath);
      return {
        content: [
          {
            type: 'text',
            text: `✅ Successfully loaded enterprise configuration from ${filePath}\n\nEnterprise: ${this.currentConfig.enterprise.name}\nIndustry: ${this.currentConfig.enterprise.industry}\nAPIs: ${this.currentConfig.apis.length}\nKnowledge Base Documents: ${this.currentConfig.knowledgeBase.documents.length}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to load configuration: ${error}`);
    }
  }

  private async handleLoadConfigFromString(jsonConfig: string) {
    try {
      this.currentConfig = this.configManager.loadConfigFromString(jsonConfig);
      return {
        content: [
          {
            type: 'text',
            text: `✅ Successfully loaded enterprise configuration from JSON string\n\nEnterprise: ${this.currentConfig.enterprise.name}\nIndustry: ${this.currentConfig.enterprise.industry}\nAPIs: ${this.currentConfig.apis.length}\nKnowledge Base Documents: ${this.currentConfig.knowledgeBase.documents.length}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to load configuration: ${error}`);
    }
  }

  private async handleSetVoiceProvider(provider: VoiceProvider, config: any) {
    this.configManager.setVoiceProviderConfig(provider, config);
    this.voiceProviderConfig = this.configManager.getVoiceProviderConfig();
    
    return {
      content: [
        {
          type: 'text',
          text: `✅ Voice provider set to ${provider}\n\nConfiguration:\n${JSON.stringify(config, null, 2)}`,
        },
      ],
    };
  }

  private async handleGetConfigSummary() {
    const summary = this.configManager.getConfigSummary();
    if (!summary) {
      throw new Error('No configuration loaded');
    }

    return {
      content: [
        {
          type: 'text',
          text: `📊 Configuration Summary:\n\n${JSON.stringify(summary, null, 2)}`,
        },
      ],
    };
  }

  private async handleGetEnterpriseInfo() {
    if (!this.currentConfig) {
      throw new Error('No enterprise configuration loaded');
    }

    return {
      content: [
        {
          type: 'text',
          text: `🏢 Enterprise Information:\n\n${JSON.stringify(this.currentConfig.enterprise, null, 2)}`,
        },
      ],
    };
  }

  private async handleGetVoiceAgentConfig() {
    if (!this.currentConfig) {
      throw new Error('No enterprise configuration loaded');
    }

    return {
      content: [
        {
          type: 'text',
          text: `🤖 Voice Agent Configuration:\n\n${JSON.stringify(this.currentConfig.voiceAgent, null, 2)}`,
        },
      ],
    };
  }

  private async handleGetAPIsConfig() {
    if (!this.currentConfig) {
      throw new Error('No enterprise configuration loaded');
    }

    return {
      content: [
        {
          type: 'text',
          text: `🔌 APIs Configuration:\n\n${JSON.stringify(this.currentConfig.apis, null, 2)}`,
        },
      ],
    };
  }

  private async handleGetKnowledgeBase() {
    if (!this.currentConfig) {
      throw new Error('No enterprise configuration loaded');
    }

    return {
      content: [
        {
          type: 'text',
          text: `📚 Knowledge Base:\n\n${JSON.stringify(this.currentConfig.knowledgeBase, null, 2)}`,
        },
      ],
    };
  }

  private async handleAddAPIEndpoint(apiName: string, endpoint: any) {
    if (!this.currentConfig) {
      throw new Error('No enterprise configuration loaded');
    }

    const api = this.currentConfig.apis.find(a => a.name === apiName);
    if (!api) {
      throw new Error(`API '${apiName}' not found`);
    }

    api.endpoints.push(endpoint);
    this.configManager.addAPI(api);

    return {
      content: [
        {
          type: 'text',
          text: `✅ Added endpoint '${endpoint.name}' to API '${apiName}'`,
        },
      ],
    };
  }

  private async handleAddKnowledgeDocument(document: any) {
    if (!this.currentConfig) {
      throw new Error('No enterprise configuration loaded');
    }

    this.configManager.addDocument(document);

    return {
      content: [
        {
          type: 'text',
          text: `✅ Added document '${document.title}' to knowledge base`,
        },
      ],
    };
  }

  private async handleExportConfig() {
    if (!this.currentConfig) {
      throw new Error('No enterprise configuration loaded');
    }

    const exportedConfig = this.configManager.exportConfig();
    return {
      content: [
        {
          type: 'text',
          text: `📄 Exported Configuration:\n\n${exportedConfig}`,
        },
      ],
    };
  }

  private async handleGetIndustryTemplates() {
    const templates = this.configManager.getIndustryTemplates();
    return {
      content: [
        {
          type: 'text',
          text: `🏭 Available Industry Templates:\n\n${JSON.stringify(templates, null, 2)}`,
        },
      ],
    };
  }

  private async handleCreateConfigFromTemplate(industry: string, enterpriseInfo: any) {
    const config = this.configManager.createConfig({
      ...enterpriseInfo,
      industry
    });
    this.currentConfig = config;

    return {
      content: [
        {
          type: 'text',
          text: `✅ Created enterprise configuration for ${enterpriseInfo.name} using ${industry} template\n\nEnterprise: ${config.enterprise.name}\nIndustry: ${config.enterprise.industry}\nCapabilities: ${config.voiceAgent.capabilities.length}`,
        },
      ],
    };
  }

  private async handleGetServerStatus() {
    const status = {
      serverName: 'http-voice-agent-mcp-server',
      version: '1.0.0',
      defaultProvider: this.defaultProvider,
      configLoaded: !!this.currentConfig,
      voiceProviderSet: !!this.voiceProviderConfig,
      environment: {
        vapiConfigured: !!process.env.VAPI_PUBLIC_KEY,
        openaiConfigured: !!process.env.OPENAI_API_KEY,
        serverUrl: `http://localhost:${this.port}`,
      },
      timestamp: new Date().toISOString(),
    };

    return {
      content: [
        {
          type: 'text',
          text: `🖥️ Server Status:\n\n${JSON.stringify(status, null, 2)}`,
        },
      ],
    };
  }

  async start() {
    return new Promise<void>((resolve, reject) => {
      this.httpServer = createHttpServer(this.app);
      
      this.httpServer.listen(this.port, (error?: Error) => {
        if (error) {
          console.error('❌ Failed to start HTTP server:', error);
          reject(error);
        } else {
          console.error(`✅ HTTP Voice Agent MCP Server running on port ${this.port}`);
          console.error(`🌐 Server URL: http://localhost:${this.port}`);
          console.error(`🔗 MCP Endpoint: http://localhost:${this.port}/mcp`);
          console.error(`📋 Health Check: http://localhost:${this.port}/health`);
          resolve();
        }
      });
    });
  }

  async stop() {
    return new Promise<void>((resolve) => {
      if (this.httpServer) {
        this.httpServer.close(() => {
          console.error('✅ HTTP server stopped');
          resolve();
        });
      } else {
        resolve();
      }
    });
  }
}

// Export the createServer function for Smithery
export function createServer() {
  const port = parseInt(process.env.PORT || '3005', 10);
  const server = new HTTPVoiceAgentMCPServer(port);
  return server;
}

// If running directly (not imported), start the server
if (import.meta.url === `file://${process.argv[1]}`) {
  const port = parseInt(process.argv[2] || process.env.PORT || '3005', 10);
  const server = new HTTPVoiceAgentMCPServer(port);
  
  server.start().catch(console.error);
  
  // Graceful shutdown
  process.on('SIGINT', async () => {
    console.error('\n🛑 Shutting down HTTP server...');
    await server.stop();
    process.exit(0);
  });
  
  process.on('SIGTERM', async () => {
    console.error('\n🛑 Shutting down HTTP server...');
    await server.stop();
    process.exit(0);
  });
}
