# Remote Deployment Guide

This guide explains how to deploy the Voice Agent MCP Server for remote execution instead of stdio-based local execution.

## Overview

The MCP server has been converted from stdio transport to HTTP transport with Server-Sent Events (SSE) support, enabling remote deployment and access.

## Architecture Changes

### Before (stdio)
- Direct process communication via stdin/stdout
- Local execution only
- Process-based lifecycle management

### After (remote exec)
- HTTP-based communication with SSE transport
- Remote server deployment
- RESTful API endpoints for direct access
- Health monitoring and status endpoints

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the example environment file and configure your settings:

```bash
cp env.example .env
```

Edit `.env` with your actual configuration:

```bash
# Server Configuration
NODE_ENV=production
PORT=3005

# Default Voice Provider (vapi or openai)
DEFAULT_VOICE_PROVIDER=vapi

# VAPI Configuration
VAPI_PUBLIC_KEY=your_vapi_public_key_here
VAPI_ASSISTANT_ID=your_vapi_assistant_id_here
VAPI_BASE_URL=https://api.vapi.ai

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o
OPENAI_VOICE=alloy
```

### 3. Start the Server

#### Development Mode
```bash
npm run http:dev
```

#### Production Mode
```bash
npm run build
npm run http
```

### 4. Verify Deployment

Check the health endpoint:
```bash
curl http://localhost:3005/health
```

## Docker Deployment

### Using Docker Compose (Recommended)

1. **Deploy with Docker Compose:**
   ```bash
   ./deploy.sh
   ```

2. **Manual Docker Compose:**
   ```bash
   docker-compose up -d --build
   ```

3. **Check Status:**
   ```bash
   docker-compose ps
   docker-compose logs -f
   ```

### Using Docker Directly

1. **Build the Image:**
   ```bash
   docker build -t voice-agent-mcp-server .
   ```

2. **Run the Container:**
   ```bash
   docker run -d \
     --name mcp-server \
     -p 3005:3005 \
     -e DEFAULT_VOICE_PROVIDER=vapi \
     -e VAPI_PUBLIC_KEY=your_key \
     -e VAPI_ASSISTANT_ID=your_id \
     voice-agent-mcp-server
   ```

## API Endpoints

### Health Check
- **GET** `/health` - Server health status

### MCP Protocol
- **GET** `/mcp` - MCP protocol endpoint (SSE transport)

### Direct API Access
- **POST** `/api/tools/list` - List available tools
- **POST** `/api/tools/call` - Call a tool
- **GET** `/api/resources/list` - List available resources
- **POST** `/api/resources/read` - Read a resource

### Example API Usage

```bash
# List tools
curl -X POST http://localhost:3005/api/tools/list

# Call a tool
curl -X POST http://localhost:3005/api/tools/call \
  -H "Content-Type: application/json" \
  -d '{"name": "get_server_status", "arguments": {}}'

# Read a resource
curl -X POST http://localhost:3005/api/resources/read \
  -H "Content-Type: application/json" \
  -d '{"uri": "config://server-status"}'
```

## Smithery Configuration

The `smithery.yaml` has been updated to support remote execution:

```yaml
startCommand:
  type: remote_exec
  configSchema:
    # ... configuration schema
  commandFunction: |
    (config) => {
      return {
        "command": "echo",
        "args": ["Connecting to remote MCP server at " + config.serverUrl],
        "env": {
          "MCP_SERVER_URL": config.serverUrl,
          # ... other environment variables
        }
      };
    }
```

## Production Deployment

### Environment Variables

Set these environment variables in your production environment:

```bash
NODE_ENV=production
PORT=3005
DEFAULT_VOICE_PROVIDER=vapi
VAPI_PUBLIC_KEY=your_production_vapi_key
VAPI_ASSISTANT_ID=your_production_assistant_id
VAPI_BASE_URL=https://api.vapi.ai
OPENAI_API_KEY=your_production_openai_key
OPENAI_MODEL=gpt-4o
OPENAI_VOICE=alloy
```

### Reverse Proxy (Nginx)

The included `nginx.conf` provides:
- Rate limiting
- CORS support
- SSL termination (when configured)
- Health check routing
- SSE support for MCP protocol

### SSL Configuration

1. **Obtain SSL certificates** and place them in the `ssl/` directory:
   ```
   ssl/
   ├── cert.pem
   └── key.pem
   ```

2. **Update nginx.conf** to enable HTTPS:
   ```nginx
   # Uncomment the HTTPS server block
   server {
       listen 443 ssl http2;
       # ... HTTPS configuration
   }
   ```

3. **Update environment variables:**
   ```bash
   SERVER_URL=https://your-domain.com
   ```

## Monitoring and Logs

### Health Monitoring

The server provides comprehensive health information:

```json
{
  "status": "healthy",
  "server": "http-voice-agent-mcp-server",
  "version": "1.0.0",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "configLoaded": true,
  "voiceProviderSet": true,
  "environment": {
    "vapiConfigured": true,
    "openaiConfigured": false,
    "defaultProvider": "vapi"
  }
}
```

### Logging

- **Development:** Console logs with timestamps
- **Production:** Structured JSON logs
- **Docker:** Logs available via `docker-compose logs`

### Metrics

Monitor these key metrics:
- Response times for API endpoints
- MCP connection count
- Tool execution success rate
- Resource access patterns

## Troubleshooting

### Common Issues

1. **Server won't start:**
   ```bash
   # Check port availability
   netstat -tulpn | grep 3005
   
   # Check environment variables
   env | grep -E "(VAPI|OPENAI|DEFAULT)"
   ```

2. **MCP connection fails:**
   ```bash
   # Test MCP endpoint
   curl -v http://localhost:3005/mcp
   
   # Check CORS configuration
   curl -H "Origin: http://localhost:3000" http://localhost:3005/health
   ```

3. **Docker issues:**
   ```bash
   # Check container logs
   docker-compose logs mcp-server
   
   # Restart services
   docker-compose restart
   
   # Rebuild and restart
   docker-compose up -d --build --force-recreate
   ```

### Performance Optimization

1. **Enable HTTP/2** in nginx configuration
2. **Configure connection pooling** for database connections
3. **Implement caching** for frequently accessed resources
4. **Monitor memory usage** and adjust Node.js heap size if needed

## Security Considerations

1. **API Keys:** Store securely, never commit to version control
2. **Rate Limiting:** Configure appropriate limits in nginx
3. **CORS:** Restrict origins in production
4. **SSL/TLS:** Always use HTTPS in production
5. **Firewall:** Restrict access to necessary ports only

## Migration from stdio

If you're migrating from the stdio version:

1. **Update client configuration** to use HTTP transport
2. **Change connection URL** from local process to HTTP endpoint
3. **Update environment variables** for remote access
4. **Test all functionality** with the new transport

## Support

For issues or questions:
1. Check the health endpoint: `/health`
2. Review server logs
3. Test individual API endpoints
4. Verify environment configuration
