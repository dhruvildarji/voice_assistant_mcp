#!/usr/bin/env node
/**
 * Example client for interacting with the Voice Agent MCP Server
 * This demonstrates how to use the MCP server from a client application
 */
declare class VoiceAgentMCPClient {
    private client;
    private transport;
    constructor();
    connect(): Promise<void>;
    loadEnterpriseConfig(filePath: string): Promise<object>;
    setVoiceProvider(provider: 'openai' | 'vapi', config: any): Promise<object>;
    getConfigSummary(): Promise<object>;
    getEnterpriseInfo(): Promise<object>;
    addKnowledgeDocument(document: any): Promise<object>;
    createConfigFromTemplate(industry: string, enterpriseInfo: any): Promise<object>;
    disconnect(): Promise<void>;
}
export { VoiceAgentMCPClient };
//# sourceMappingURL=client-example.d.ts.map