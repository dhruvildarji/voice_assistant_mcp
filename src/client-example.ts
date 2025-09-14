#!/usr/bin/env node

/**
 * Example client for interacting with the Voice Agent MCP Server
 * This demonstrates how to use the MCP server from a client application
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { spawn } from 'child_process';
import { join } from 'path';

class VoiceAgentMCPClient {
  private client: Client;
  private transport: StdioClientTransport;

  constructor() {
    this.client = new Client(
      {
        name: 'voice-agent-client',
        version: '1.0.0',
      },
      {
        capabilities: {},
      }
    );

    // Spawn the MCP server process
    const serverProcess = spawn('node', [join(process.cwd(), 'dist/index.js')], {
      stdio: ['pipe', 'pipe', 'inherit'],
    });

    this.transport = new StdioClientTransport({
      reader: serverProcess.stdout!,
      writer: serverProcess.stdin!,
    });
  }

  async connect() {
    await this.client.connect(this.transport);
    console.log('✅ Connected to Voice Agent MCP Server');
  }

  async loadEnterpriseConfig(filePath: string) {
    const result = await this.client.request(
      {
        method: 'tools/call',
        params: {
          name: 'load_enterprise_config',
          arguments: { filePath },
        },
      },
      { method: 'tools/call' }
    );

    return result;
  }

  async setVoiceProvider(provider: 'openai' | 'vapi', config: any) {
    const result = await this.client.request(
      {
        method: 'tools/call',
        params: {
          name: 'set_voice_provider',
          arguments: { provider, config },
        },
      },
      { method: 'tools/call' }
    );

    return result;
  }

  async getConfigSummary() {
    const result = await this.client.request(
      {
        method: 'tools/call',
        params: {
          name: 'get_config_summary',
          arguments: {},
        },
      },
      { method: 'tools/call' }
    );

    return result;
  }

  async getEnterpriseInfo() {
    const result = await this.client.request(
      {
        method: 'tools/call',
        params: {
          name: 'get_enterprise_info',
          arguments: {},
        },
      },
      { method: 'tools/call' }
    );

    return result;
  }

  async addKnowledgeDocument(document: any) {
    const result = await this.client.request(
      {
        method: 'tools/call',
        params: {
          name: 'add_knowledge_document',
          arguments: { document },
        },
      },
      { method: 'tools/call' }
    );

    return result;
  }

  async createConfigFromTemplate(industry: string, enterpriseInfo: any) {
    const result = await this.client.request(
      {
        method: 'tools/call',
        params: {
          name: 'create_config_from_template',
          arguments: { industry, enterpriseInfo },
        },
      },
      { method: 'tools/call' }
    );

    return result;
  }

  async disconnect() {
    await this.client.close();
    console.log('✅ Disconnected from Voice Agent MCP Server');
  }
}

// Example usage
async function main() {
  const client = new VoiceAgentMCPClient();

  try {
    await client.connect();

    // Example 1: Load enterprise configuration
    console.log('\n📁 Loading enterprise configuration...');
    const loadResult = await client.loadEnterpriseConfig('./sample-config.json');
    console.log('Load result:', loadResult.content[0].text);

    // Example 2: Set voice provider to VAPI (default)
    console.log('\n🎤 Setting voice provider to VAPI...');
    const vapiConfig = {
      vapi: {
        publicKey: process.env.VAPI_PUBLIC_KEY || 'your_vapi_public_key',
        assistantId: process.env.VAPI_ASSISTANT_ID || 'your_assistant_id',
        baseUrl: 'https://api.vapi.ai'
      }
    };
    const providerResult = await client.setVoiceProvider('vapi', vapiConfig);
    console.log('Provider result:', providerResult.content[0].text);

    // Example 3: Get configuration summary
    console.log('\n📊 Getting configuration summary...');
    const summaryResult = await client.getConfigSummary();
    console.log('Summary:', summaryResult.content[0].text);

    // Example 4: Get enterprise information
    console.log('\n🏢 Getting enterprise information...');
    const enterpriseResult = await client.getEnterpriseInfo();
    console.log('Enterprise info:', enterpriseResult.content[0].text);

    // Example 5: Add a knowledge document
    console.log('\n📚 Adding knowledge document...');
    const newDocument = {
      id: 'warranty_info',
      title: 'Warranty Information',
      content: 'All products come with a 1-year manufacturer warranty. Extended warranties are available for purchase.',
      category: 'Warranty',
      tags: ['warranty', 'guarantee', 'coverage']
    };
    const docResult = await client.addKnowledgeDocument(newDocument);
    console.log('Document result:', docResult.content[0].text);

    // Example 6: Create configuration from template
    console.log('\n🏭 Creating configuration from template...');
    const enterpriseInfo = {
      name: 'QuickStart Corp',
      description: 'A quick start company for testing',
      headquarters: 'Test City, TC',
      website: 'https://quickstart.com',
      phone: '+1-800-QUICKSTART',
      email: 'support@quickstart.com',
      supportHours: '9 AM - 5 PM EST',
      languages: ['English'],
      tone: 'friendly',
      language: 'English',
      responseStyle: 'conversational'
    };
    const templateResult = await client.createConfigFromTemplate('retail', enterpriseInfo);
    console.log('Template result:', templateResult.content[0].text);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.disconnect();
  }
}

// Run the example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { VoiceAgentMCPClient };
