# Voice Agent MCP Server

A Model Context Protocol (MCP) server for managing enterprise voice agent configurations with support for both OpenAI and VAPI voice providers.

## Features

- 🏢 **Enterprise Configuration Management**: Load, create, and manage enterprise voice agent configurations
- 🎤 **Dual Voice Provider Support**: Switch between OpenAI Realtime API and VAPI (defaults to VAPI)
- 🏭 **Industry Templates**: Pre-built templates for airline, hotel, banking, and retail industries
- 📚 **Knowledge Base Management**: Add and manage knowledge base documents
- 🔌 **API Integration**: Configure and manage API endpoints for voice agents
- 📊 **Configuration Export/Import**: Export configurations to JSON or load from files

## Installation

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Set up environment variables (copy from `env.example`):
```bash
cp env.example .env
# Edit .env with your configuration
```

## Usage

### Running the MCP Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Available Tools

The MCP server provides the following tools:

#### Configuration Management
- `load_enterprise_config`: Load configuration from a JSON file
- `load_config_from_string`: Load configuration from JSON string
- `export_config`: Export current configuration to JSON
- `get_config_summary`: Get configuration summary

#### Voice Provider Management
- `set_voice_provider`: Set voice provider (OpenAI or VAPI) with configuration

#### Enterprise Information
- `get_enterprise_info`: Get detailed enterprise information
- `get_voice_agent_config`: Get voice agent configuration
- `get_apis_config`: Get all configured APIs
- `get_knowledge_base`: Get knowledge base configuration

#### Content Management
- `add_api_endpoint`: Add new API endpoint to configuration
- `add_knowledge_document`: Add document to knowledge base

#### Templates
- `get_industry_templates`: Get available industry templates
- `create_config_from_template`: Create configuration from industry template

### Available Resources

- `config://enterprise`: Current enterprise configuration
- `config://voice-provider`: Current voice provider configuration
- `config://summary`: Configuration summary

## Configuration

### Environment Variables

- `DEFAULT_VOICE_PROVIDER`: Default voice provider (vapi or openai)
- `OPENAI_API_KEY`: OpenAI API key (if using OpenAI)
- `VAPI_PUBLIC_KEY`: VAPI public key (if using VAPI)
- `VAPI_ASSISTANT_ID`: VAPI assistant ID (if using VAPI)

### Enterprise Configuration Structure

The enterprise configuration follows this structure:

```json
{
  "enterprise": {
    "name": "Company Name",
    "industry": "hotel",
    "description": "Company description",
    "headquarters": "Location",
    "website": "https://company.com",
    "supportHours": "24/7",
    "languages": ["English"],
    "contactInfo": {
      "phone": "+1-800-COMPANY",
      "email": "support@company.com"
    }
  },
  "apis": [
    {
      "name": "API Name",
      "description": "API description",
      "endpoints": [...]
    }
  ],
  "knowledgeBase": {
    "name": "Knowledge Base Name",
    "documents": [...],
    "categories": [...]
  },
  "voiceAgent": {
    "name": "Voice Assistant Name",
    "instructions": "Assistant instructions",
    "personality": {...},
    "capabilities": [...]
  }
}
```

## Industry Templates

The server includes pre-built templates for:

- **Airline**: Flight booking, baggage policies, check-in procedures
- **Hotel**: Room reservations, amenities, check-in/out procedures
- **Banking**: Account inquiries, transactions, loan information
- **Retail**: Product information, orders, returns, loyalty programs

## Voice Provider Configuration

### VAPI Configuration (Default)
```json
{
  "provider": "vapi",
  "vapi": {
    "publicKey": "your_vapi_public_key",
    "assistantId": "your_assistant_id",
    "baseUrl": "https://api.vapi.ai"
  }
}
```

### OpenAI Configuration
```json
{
  "provider": "openai",
  "openai": {
    "apiKey": "sk-your_openai_api_key",
    "model": "gpt-4o",
    "voice": "alloy"
  }
}
```

## Integration with Voice Agent

This MCP server is designed to work with the Voice Agent application. It provides:

1. **Configuration Loading**: Load enterprise configurations from files or strings
2. **Provider Selection**: Choose between OpenAI and VAPI voice providers
3. **Dynamic Configuration**: Modify configurations at runtime
4. **Template Support**: Create configurations from industry templates

## Development

### Project Structure

```
src/
├── index.ts           # Main MCP server implementation
├── config-manager.ts  # Enterprise configuration management
└── types.ts          # TypeScript type definitions
```

### Building

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

## License

MIT
