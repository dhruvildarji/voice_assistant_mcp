#!/usr/bin/env node

/**
 * Test client for HTTP-based MCP Server
 * This script tests the HTTP endpoints to verify the server is working correctly
 */

const http = require('http');

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3002';

async function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, SERVER_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(body);
          resolve({ status: res.statusCode, data: jsonBody });
        } catch (error) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function testHealthCheck() {
  console.log('🔍 Testing health check...');
  try {
    const response = await makeRequest('/health');
    if (response.status === 200) {
      console.log('✅ Health check passed');
      console.log('📊 Server status:', JSON.stringify(response.data, null, 2));
      return true;
    } else {
      console.log('❌ Health check failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Health check error:', error.message);
    return false;
  }
}

async function testToolsList() {
  console.log('🔍 Testing tools list...');
  try {
    const response = await makeRequest('/api/tools/list', 'POST');
    if (response.status === 200 && response.data.tools) {
      console.log('✅ Tools list retrieved');
      console.log(`📋 Found ${response.data.tools.length} tools:`);
      response.data.tools.forEach(tool => {
        console.log(`  - ${tool.name}: ${tool.description}`);
      });
      return true;
    } else {
      console.log('❌ Tools list failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Tools list error:', error.message);
    return false;
  }
}

async function testServerStatus() {
  console.log('🔍 Testing server status tool...');
  try {
    const response = await makeRequest('/api/tools/call', 'POST', {
      name: 'get_server_status',
      arguments: {}
    });
    if (response.status === 200 && response.data.content) {
      console.log('✅ Server status tool executed');
      console.log('📊 Server status:', response.data.content[0].text);
      return true;
    } else {
      console.log('❌ Server status tool failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Server status tool error:', error.message);
    return false;
  }
}

async function testResourcesList() {
  console.log('🔍 Testing resources list...');
  try {
    const response = await makeRequest('/api/resources/list', 'GET');
    if (response.status === 200 && response.data.resources) {
      console.log('✅ Resources list retrieved');
      console.log(`📋 Found ${response.data.resources.length} resources:`);
      response.data.resources.forEach(resource => {
        console.log(`  - ${resource.uri}: ${resource.name}`);
      });
      return true;
    } else {
      console.log('❌ Resources list failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Resources list error:', error.message);
    return false;
  }
}

async function testMCPEndpoint() {
  console.log('🔍 Testing MCP endpoint...');
  try {
    const response = await makeRequest('/mcp');
    if (response.status === 200) {
      console.log('✅ MCP endpoint accessible');
      return true;
    } else {
      console.log('❌ MCP endpoint failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ MCP endpoint error:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting HTTP MCP Server Tests');
  console.log(`🌐 Testing server at: ${SERVER_URL}`);
  console.log('');

  const tests = [
    { name: 'Health Check', fn: testHealthCheck },
    { name: 'Tools List', fn: testToolsList },
    { name: 'Server Status Tool', fn: testServerStatus },
    { name: 'Resources List', fn: testResourcesList },
    { name: 'MCP Endpoint', fn: testMCPEndpoint },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const result = await test.fn();
      if (result) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${test.name} failed with error:`, error.message);
      failed++;
    }
    console.log('');
  }

  console.log('📊 Test Results:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);

  if (failed === 0) {
    console.log('🎉 All tests passed! HTTP MCP Server is working correctly.');
    process.exit(0);
  } else {
    console.log('⚠️  Some tests failed. Please check the server configuration.');
    process.exit(1);
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  makeRequest,
  testHealthCheck,
  testToolsList,
  testServerStatus,
  testResourcesList,
  testMCPEndpoint,
  runTests
};
