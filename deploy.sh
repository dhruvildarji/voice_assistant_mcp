#!/bin/bash

# Voice Agent MCP Server Deployment Script

set -e

echo "🚀 Deploying Voice Agent MCP Server..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p config logs ssl

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📋 Creating .env file from example..."
    cp env.example .env
    echo "⚠️  Please edit .env file with your actual configuration values"
fi

# Build and start services
echo "🔨 Building and starting services..."
docker-compose up -d --build

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are running
echo "🔍 Checking service status..."
if curl -f http://localhost/health > /dev/null 2>&1; then
    echo "✅ MCP Server is running and healthy!"
    echo "🌐 Server URL: http://localhost"
    echo "🔗 MCP Endpoint: http://localhost/mcp"
    echo "📋 Health Check: http://localhost/health"
else
    echo "❌ MCP Server is not responding. Check logs with: docker-compose logs"
    exit 1
fi

echo "🎉 Deployment completed successfully!"
echo ""
echo "📖 Next steps:"
echo "1. Edit .env file with your actual API keys"
echo "2. Restart services: docker-compose restart"
echo "3. Check logs: docker-compose logs -f"
echo "4. Stop services: docker-compose down"
