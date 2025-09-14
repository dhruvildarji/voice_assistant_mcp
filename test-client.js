#!/usr/bin/env node

/**
 * Simple test client for the standalone MCP server
 * This demonstrates how to connect to and use the MCP server
 */

import { spawn } from 'child_process';
import { join } from 'path';

class MCPTestClient {
  constructor() {
    this.serverProcess = null;
  }

  async startServer() {
    console.log('🚀 Starting standalone MCP server...');
    
    // Start the standalone MCP server
    this.serverProcess = spawn('npm', ['run', 'standalone'], {
      cwd: join(process.cwd()),
      stdio: ['pipe', 'pipe', 'inherit'],
      shell: true
    });

    // Wait a moment for server to start
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('✅ MCP server started');
    return this.serverProcess;
  }

  async testMCPConnection() {
    if (!this.serverProcess) {
      throw new Error('Server not started');
    }

    console.log('🧪 Testing MCP connection...');

    // Test 1: List tools
    const listToolsRequest = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list',
      params: {}
    };

    console.log('📋 Requesting tools list...');
    this.serverProcess.stdin.write(JSON.stringify(listToolsRequest) + '\n');

    // Test 2: Get server status
    const statusRequest = {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: {
        name: 'get_server_status',
        arguments: {}
      }
    };

    setTimeout(() => {
      console.log('📊 Requesting server status...');
      this.serverProcess.stdin.write(JSON.stringify(statusRequest) + '\n');
    }, 1000);

    // Test 3: Load sample configuration
    const loadConfigRequest = {
      jsonrpc: '2.0',
      id: 3,
      method: 'tools/call',
      params: {
        name: 'load_enterprise_config',
        arguments: {
          filePath: './sample-config.json'
        }
      }
    };

    setTimeout(() => {
      console.log('📁 Loading sample configuration...');
      this.serverProcess.stdin.write(JSON.stringify(loadConfigRequest) + '\n');
    }, 2000);

    // Test 4: Set voice provider
    const setProviderRequest = {
      jsonrpc: '2.0',
      id: 4,
      method: 'tools/call',
      params: {
        name: 'set_voice_provider',
        arguments: {
          provider: 'vapi',
          config: {
            vapi: {
              publicKey: 'test_public_key',
              assistantId: 'test_assistant_id',
              baseUrl: 'https://api.vapi.ai'
            }
          }
        }
      }
    };

    setTimeout(() => {
      console.log('🎤 Setting voice provider to VAPI...');
      this.serverProcess.stdin.write(JSON.stringify(setProviderRequest) + '\n');
    }, 3000);

    // Listen for responses
    this.serverProcess.stdout.on('data', (data) => {
      const lines = data.toString().split('\n').filter(line => line.trim());
      lines.forEach(line => {
        try {
          const response = JSON.parse(line);
          console.log('📨 Response:', JSON.stringify(response, null, 2));
        } catch (e) {
          console.log('📨 Raw response:', line);
        }
      });
    });

    // Clean up after tests
    setTimeout(() => {
      console.log('🏁 Tests completed, stopping server...');
      this.stopServer();
    }, 5000);
  }

  stopServer() {
    if (this.serverProcess) {
      this.serverProcess.kill();
      console.log('🛑 MCP server stopped');
    }
  }
}

// Run the test
async function main() {
  const client = new MCPTestClient();
  
  try {
    await client.startServer();
    await client.testMCPConnection();
  } catch (error) {
    console.error('❌ Test failed:', error);
    client.stopServer();
  }
}

main().catch(console.error);
