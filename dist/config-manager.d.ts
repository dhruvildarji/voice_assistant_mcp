import { EnterpriseVoiceAgentConfig, MCPServerConfig, VoiceProviderConfig, VoiceProvider } from './types.js';
export declare class EnterpriseConfigManager {
    private config;
    private voiceProviderConfig;
    private defaultProvider;
    /**
     * Load enterprise configuration from a file
     */
    loadConfigFromFile(filePath: string): EnterpriseVoiceAgentConfig;
    /**
     * Load enterprise configuration from JSON string
     */
    loadConfigFromString(jsonConfig: string): EnterpriseVoiceAgentConfig;
    /**
     * Create a new enterprise configuration from scratch
     */
    createConfig(enterpriseInfo: any): EnterpriseVoiceAgentConfig;
    /**
     * Set voice provider configuration
     */
    setVoiceProviderConfig(provider: VoiceProvider, config: any): void;
    /**
     * Set default voice provider
     */
    setDefaultProvider(provider: VoiceProvider): void;
    /**
     * Get the current enterprise configuration
     */
    getConfig(): EnterpriseVoiceAgentConfig | null;
    /**
     * Get voice provider configuration
     */
    getVoiceProviderConfig(): VoiceProviderConfig | null;
    /**
     * Get default provider
     */
    getDefaultProvider(): VoiceProvider;
    /**
     * Update enterprise information
     */
    updateEnterpriseInfo(info: Partial<any>): void;
    /**
     * Add an API configuration
     */
    addAPI(apiConfig: any): void;
    /**
     * Add a knowledge base document
     */
    addDocument(document: any): void;
    /**
     * Generate voice agent instructions based on enterprise info
     */
    private generateInstructions;
    /**
     * Validate the configuration
     */
    private validateConfig;
    /**
     * Export configuration to JSON
     */
    exportConfig(): string;
    /**
     * Export configuration to file
     */
    exportConfigToFile(filePath: string): void;
    /**
     * Get configuration summary
     */
    getConfigSummary(): any;
    /**
     * Get available industry templates
     */
    getIndustryTemplates(): any;
    /**
     * Create MCP server configuration
     */
    createMCPServerConfig(): MCPServerConfig;
}
//# sourceMappingURL=config-manager.d.ts.map