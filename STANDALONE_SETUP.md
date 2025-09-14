# Standalone MCP Server Setup Guide

This guide shows you how to run the MCP server independently from your main voice agent application.

## 🎯 **Overview**

The standalone MCP server allows you to:
- Run your main voice agent app normally
- Start/stop the MCP server independently
- Connect to the MCP server when needed
- Manage enterprise configurations separately

## 🚀 **Quick Start**

### **Step 1: Install Dependencies**
```bash
cd mcp-server
npm install
```

### **Step 2: Configure Environment**
```bash
# Copy the environment template
cp mcp-server.env .env

# Edit with your actual values
nano .env
```

### **Step 3: Run Standalone MCP Server**
```bash
# Development mode (with auto-reload)
npm run standalone:dev

# Production mode
npm run standalone:build
npm run standalone
```

## ⚙️ **Configuration**

### **Environment Variables**

Edit `mcp-server.env` with your actual values:

```bash
# Default Voice Provider (vapi or openai)
DEFAULT_VOICE_PROVIDER=vapi

# OpenAI Configuration (if using OpenAI)
OPENAI_API_KEY=sk-your_actual_openai_api_key_here
OPENAI_MODEL=gpt-4o
OPENAI_VOICE=alloy

# VAPI Configuration (if using VAPI)
VAPI_PUBLIC_KEY=your_actual_vapi_public_key_here
VAPI_ASSISTANT_ID=your_actual_vapi_assistant_id_here
VAPI_BASE_URL=https://api.vapi.ai

# Server Configuration
SERVER_PORT=3002
SERVER_URL=http://localhost:3002

# MCP Server Configuration
MCP_SERVER_PORT=3003
MCP_SERVER_HOST=localhost
```

## 🎮 **Usage Scenarios**

### **Scenario 1: Run Main App Only**
```bash
# Terminal 1: Run your main voice agent app
cd /path/to/voice_agent
npm run dev:full
```

### **Scenario 2: Run MCP Server Separately**
```bash
# Terminal 2: Run MCP server independently
cd /path/to/voice_agent/mcp-server
npm run standalone:dev
```

### **Scenario 3: Connect MCP Server Later**
```bash
# Your main app is already running
# Start MCP server when needed
cd mcp-server
npm run standalone

# MCP server will be available for connections
```

## 🔧 **Available Commands**

### **MCP Server Commands**
```bash
# Development mode (with auto-reload)
npm run standalone:dev

# Production mode
npm run standalone:build
npm run standalone

# Regular MCP server (integrated)
npm run dev
npm run build
npm start
```

### **Testing Commands**
```bash
# Test the standalone MCP server
node test-client.js

# Test with sample configuration
npm run standalone
# Then in another terminal:
node test-client.js
```

## 📋 **MCP Tools Available**

The standalone MCP server provides these tools:

### **Configuration Management**
- `load_enterprise_config` - Load from JSON file
- `load_config_from_string` - Load from JSON string
- `export_config` - Export current configuration
- `get_config_summary` - Get configuration overview

### **Voice Provider Management**
- `set_voice_provider` - Set OpenAI or VAPI provider
- `get_server_status` - Get MCP server status

### **Enterprise Information**
- `get_enterprise_info` - Get enterprise details
- `get_voice_agent_config` - Get voice agent settings
- `get_apis_config` - Get API configurations
- `get_knowledge_base` - Get knowledge base

### **Content Management**
- `add_api_endpoint` - Add new API endpoint
- `add_knowledge_document` - Add knowledge document

### **Templates**
- `get_industry_templates` - Get available templates
- `create_config_from_template` - Create from template

## 🧪 **Testing the MCP Server**

### **Test 1: Basic Connection**
```bash
# Start MCP server
npm run standalone:dev

# In another terminal, test connection
node test-client.js
```

### **Test 2: Load Configuration**
```bash
# Use the sample configuration
# The test client will automatically load sample-config.json
```

### **Test 3: Set Voice Provider**
```bash
# The test client will set VAPI as the voice provider
# You can modify test-client.js to test different providers
```

## 🔌 **Integration with Main App**

### **Option 1: Use MCP Integration Component**
Your main app already has the `MCPIntegration` component that can connect to the standalone MCP server.

### **Option 2: Direct MCP Client**
```typescript
import { VoiceAgentMCPClient } from './mcp-server/src/client-example';

const client = new VoiceAgentMCPClient();
await client.connect();

// Load enterprise configuration
await client.loadEnterpriseConfig('./mcp-server/sample-config.json');

// Set voice provider
await client.setVoiceProvider('vapi', {
  vapi: {
    publicKey: 'your_vapi_public_key',
    assistantId: 'your_assistant_id',
    baseUrl: 'https://api.vapi.ai'
  }
});
```

## 📊 **Monitoring and Status**

### **Check Server Status**
```bash
# The MCP server provides a get_server_status tool
# This shows:
# - Server name and version
# - Default voice provider
# - Configuration status
# - Environment variables status
# - Timestamp
```

### **Logs**
The standalone MCP server logs to stderr, so you can see:
- Startup information
- Configuration status
- Error messages
- Connection status

## 🚨 **Troubleshooting**

### **Issue 1: MCP Server Won't Start**
```bash
# Check dependencies
npm install

# Check environment variables
cat mcp-server.env

# Check TypeScript compilation
npm run build
```

### **Issue 2: Configuration Not Loading**
```bash
# Check file paths are correct
# Use absolute paths if needed
# Example: /full/path/to/sample-config.json
```

### **Issue 3: Voice Provider Issues**
```bash
# Check environment variables are set
# Verify API keys are valid
# Check provider-specific configuration
```

## 🔄 **Workflow Examples**

### **Daily Development Workflow**
```bash
# 1. Start main app
npm run dev:full

# 2. When you need MCP server, start it separately
cd mcp-server
npm run standalone:dev

# 3. Use MCP Integration component in your app
# 4. Stop MCP server when done
# Ctrl+C to stop
```

### **Production Deployment**
```bash
# 1. Build MCP server
cd mcp-server
npm run standalone:build

# 2. Run in production
npm run standalone

# 3. Your main app runs separately
# 4. MCP server is available for connections
```

## 📁 **File Structure**

```
mcp-server/
├── src/
│   ├── standalone-server.ts    # Standalone MCP server
│   ├── index.ts               # Integrated MCP server
│   ├── config-manager.ts      # Configuration management
│   └── types.ts              # Type definitions
├── mcp-server.env            # Environment configuration
├── sample-config.json        # Sample enterprise config
├── test-client.js           # Test client
├── package.json             # Dependencies and scripts
└── STANDALONE_SETUP.md     # This guide
```

## 🎯 **Benefits of Standalone MCP Server**

1. **🔄 Independent Operation**: Run MCP server separately from main app
2. **⚡ On-Demand**: Start/stop MCP server when needed
3. **🔧 Easy Configuration**: Separate environment configuration
4. **🧪 Testing**: Easy to test MCP functionality independently
5. **📊 Monitoring**: Clear status and logging
6. **🚀 Scalability**: Can run multiple MCP servers if needed

## 📞 **Support**

If you encounter issues:
1. Check the troubleshooting section
2. Verify environment variables
3. Test with the provided test client
4. Check MCP server logs
5. Ensure all dependencies are installed

The standalone MCP server gives you full control over when and how you use MCP functionality with your voice agent application!
