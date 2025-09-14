import { z } from 'zod';
// Enterprise Configuration Schema
export const EnterpriseInfoSchema = z.object({
    name: z.string(),
    industry: z.string(),
    description: z.string(),
    headquarters: z.string(),
    website: z.string(),
    supportHours: z.string(),
    languages: z.array(z.string()),
    contactInfo: z.object({
        phone: z.string(),
        email: z.string(),
        whatsapp: z.string().optional(),
        chat: z.string().optional(),
    }),
    sipConfig: z.object({
        enabled: z.boolean(),
        phoneNumber: z.string(),
        sipProvider: z.enum(['twilio', 'vonage', 'custom']),
        sipUri: z.string(),
        webhookUrl: z.string(),
        projectId: z.string(),
        instructions: z.string(),
        voice: z.enum(['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer']),
    }).optional(),
});
export const APIParameterSchema = z.object({
    name: z.string(),
    type: z.enum(['string', 'number', 'boolean', 'date', 'array']),
    required: z.boolean(),
    description: z.string(),
    example: z.string().optional(),
});
export const APIEndpointSchema = z.object({
    name: z.string(),
    path: z.string(),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE']),
    description: z.string(),
    parameters: z.array(APIParameterSchema),
    responseFormat: z.string(),
    voiceResponseTemplate: z.string().optional(),
});
export const APIConfigSchema = z.object({
    name: z.string(),
    description: z.string(),
    baseUrl: z.string().optional(),
    endpoints: z.array(APIEndpointSchema),
    authentication: z.object({
        type: z.enum(['api_key', 'oauth', 'basic', 'bearer']),
        header: z.string().optional(),
        parameter: z.string().optional(),
    }).optional(),
});
export const DocumentChunkSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
});
export const KnowledgeBaseConfigSchema = z.object({
    name: z.string(),
    description: z.string(),
    documents: z.array(DocumentChunkSchema),
    categories: z.array(z.string()),
    searchConfig: z.object({
        maxResults: z.number(),
        similarityThreshold: z.number(),
    }),
});
export const VoiceAgentConfigSchema = z.object({
    name: z.string(),
    instructions: z.string(),
    personality: z.object({
        tone: z.enum(['professional', 'friendly', 'casual', 'formal']),
        language: z.string(),
        responseStyle: z.enum(['concise', 'detailed', 'conversational']),
    }),
    capabilities: z.array(z.string()),
    fallbackMessage: z.string(),
});
export const ToolConfigSchema = z.object({
    name: z.string(),
    description: z.string(),
    type: z.enum(['api', 'knowledge_base', 'custom']),
    config: z.any(),
    enabled: z.boolean(),
});
export const EnterpriseVoiceAgentConfigSchema = z.object({
    enterprise: EnterpriseInfoSchema,
    apis: z.array(APIConfigSchema),
    knowledgeBase: KnowledgeBaseConfigSchema,
    voiceAgent: VoiceAgentConfigSchema,
    tools: z.array(ToolConfigSchema),
});
// Voice Provider Configuration
export const VoiceProviderSchema = z.enum(['openai', 'vapi']);
export const VoiceProviderConfigSchema = z.object({
    provider: VoiceProviderSchema,
    openai: z.object({
        apiKey: z.string(),
        model: z.string().default('gpt-4o'),
        voice: z.string().default('alloy'),
    }).optional(),
    vapi: z.object({
        publicKey: z.string(),
        assistantId: z.string(),
        baseUrl: z.string().optional(),
    }).optional(),
});
// MCP Server Configuration
export const MCPServerConfigSchema = z.object({
    enterpriseConfig: EnterpriseVoiceAgentConfigSchema,
    voiceProvider: VoiceProviderConfigSchema,
    defaultProvider: VoiceProviderSchema.default('vapi'),
});
// Industry templates
export const INDUSTRY_TEMPLATES = {
    airline: {
        industry: 'Airline',
        capabilities: [
            'Flight booking and reservations',
            'Baggage policies and allowances',
            'Check-in and boarding procedures',
            'Ticket changes and cancellations',
            'Loyalty program information',
            'Special assistance services',
            'Flight status and delays',
            'Refunds and compensation'
        ],
    },
    hotel: {
        industry: 'Hotel',
        capabilities: [
            'Room booking and reservations',
            'Room availability and pricing',
            'Check-in and check-out procedures',
            'Cancellation policies',
            'Loyalty program information',
            'Special requests and amenities',
            'Room service and facilities',
            'Billing and payment information'
        ],
    },
    bank: {
        industry: 'Banking',
        capabilities: [
            'Account balance inquiries',
            'Transaction history',
            'Transfer and payment services',
            'Loan and credit information',
            'Investment services',
            'Card management',
            'Fraud protection',
            'Branch and ATM locations'
        ],
    },
    retail: {
        industry: 'Retail',
        capabilities: [
            'Product information and availability',
            'Order status and tracking',
            'Returns and exchanges',
            'Loyalty program benefits',
            'Shipping and delivery',
            'Payment and billing',
            'Customer support',
            'Store locations and hours'
        ],
    },
};
//# sourceMappingURL=types.js.map