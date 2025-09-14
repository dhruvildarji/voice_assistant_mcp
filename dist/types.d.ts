import { z } from 'zod';
export declare const EnterpriseInfoSchema: z.ZodObject<{
    name: z.ZodString;
    industry: z.ZodString;
    description: z.ZodString;
    headquarters: z.ZodString;
    website: z.ZodString;
    supportHours: z.ZodString;
    languages: z.ZodArray<z.ZodString, "many">;
    contactInfo: z.ZodObject<{
        phone: z.ZodString;
        email: z.ZodString;
        whatsapp: z.ZodOptional<z.ZodString>;
        chat: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        phone: string;
        email: string;
        whatsapp?: string | undefined;
        chat?: string | undefined;
    }, {
        phone: string;
        email: string;
        whatsapp?: string | undefined;
        chat?: string | undefined;
    }>;
    sipConfig: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodBoolean;
        phoneNumber: z.ZodString;
        sipProvider: z.ZodEnum<["twilio", "vonage", "custom"]>;
        sipUri: z.ZodString;
        webhookUrl: z.ZodString;
        projectId: z.ZodString;
        instructions: z.ZodString;
        voice: z.ZodEnum<["alloy", "echo", "fable", "onyx", "nova", "shimmer"]>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        phoneNumber: string;
        sipProvider: "custom" | "twilio" | "vonage";
        sipUri: string;
        webhookUrl: string;
        projectId: string;
        instructions: string;
        voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
    }, {
        enabled: boolean;
        phoneNumber: string;
        sipProvider: "custom" | "twilio" | "vonage";
        sipUri: string;
        webhookUrl: string;
        projectId: string;
        instructions: string;
        voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    industry: string;
    description: string;
    headquarters: string;
    website: string;
    supportHours: string;
    languages: string[];
    contactInfo: {
        phone: string;
        email: string;
        whatsapp?: string | undefined;
        chat?: string | undefined;
    };
    sipConfig?: {
        enabled: boolean;
        phoneNumber: string;
        sipProvider: "custom" | "twilio" | "vonage";
        sipUri: string;
        webhookUrl: string;
        projectId: string;
        instructions: string;
        voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
    } | undefined;
}, {
    name: string;
    industry: string;
    description: string;
    headquarters: string;
    website: string;
    supportHours: string;
    languages: string[];
    contactInfo: {
        phone: string;
        email: string;
        whatsapp?: string | undefined;
        chat?: string | undefined;
    };
    sipConfig?: {
        enabled: boolean;
        phoneNumber: string;
        sipProvider: "custom" | "twilio" | "vonage";
        sipUri: string;
        webhookUrl: string;
        projectId: string;
        instructions: string;
        voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
    } | undefined;
}>;
export declare const APIParameterSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodEnum<["string", "number", "boolean", "date", "array"]>;
    required: z.ZodBoolean;
    description: z.ZodString;
    example: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    type: "string" | "number" | "boolean" | "date" | "array";
    required: boolean;
    example?: string | undefined;
}, {
    name: string;
    description: string;
    type: "string" | "number" | "boolean" | "date" | "array";
    required: boolean;
    example?: string | undefined;
}>;
export declare const APIEndpointSchema: z.ZodObject<{
    name: z.ZodString;
    path: z.ZodString;
    method: z.ZodEnum<["GET", "POST", "PUT", "DELETE"]>;
    description: z.ZodString;
    parameters: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodEnum<["string", "number", "boolean", "date", "array"]>;
        required: z.ZodBoolean;
        description: z.ZodString;
        example: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        description: string;
        type: "string" | "number" | "boolean" | "date" | "array";
        required: boolean;
        example?: string | undefined;
    }, {
        name: string;
        description: string;
        type: "string" | "number" | "boolean" | "date" | "array";
        required: boolean;
        example?: string | undefined;
    }>, "many">;
    responseFormat: z.ZodString;
    voiceResponseTemplate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    path: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    parameters: {
        name: string;
        description: string;
        type: "string" | "number" | "boolean" | "date" | "array";
        required: boolean;
        example?: string | undefined;
    }[];
    responseFormat: string;
    voiceResponseTemplate?: string | undefined;
}, {
    name: string;
    description: string;
    path: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    parameters: {
        name: string;
        description: string;
        type: "string" | "number" | "boolean" | "date" | "array";
        required: boolean;
        example?: string | undefined;
    }[];
    responseFormat: string;
    voiceResponseTemplate?: string | undefined;
}>;
export declare const APIConfigSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    baseUrl: z.ZodOptional<z.ZodString>;
    endpoints: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        path: z.ZodString;
        method: z.ZodEnum<["GET", "POST", "PUT", "DELETE"]>;
        description: z.ZodString;
        parameters: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodEnum<["string", "number", "boolean", "date", "array"]>;
            required: z.ZodBoolean;
            description: z.ZodString;
            example: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            description: string;
            type: "string" | "number" | "boolean" | "date" | "array";
            required: boolean;
            example?: string | undefined;
        }, {
            name: string;
            description: string;
            type: "string" | "number" | "boolean" | "date" | "array";
            required: boolean;
            example?: string | undefined;
        }>, "many">;
        responseFormat: z.ZodString;
        voiceResponseTemplate: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        description: string;
        path: string;
        method: "GET" | "POST" | "PUT" | "DELETE";
        parameters: {
            name: string;
            description: string;
            type: "string" | "number" | "boolean" | "date" | "array";
            required: boolean;
            example?: string | undefined;
        }[];
        responseFormat: string;
        voiceResponseTemplate?: string | undefined;
    }, {
        name: string;
        description: string;
        path: string;
        method: "GET" | "POST" | "PUT" | "DELETE";
        parameters: {
            name: string;
            description: string;
            type: "string" | "number" | "boolean" | "date" | "array";
            required: boolean;
            example?: string | undefined;
        }[];
        responseFormat: string;
        voiceResponseTemplate?: string | undefined;
    }>, "many">;
    authentication: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<["api_key", "oauth", "basic", "bearer"]>;
        header: z.ZodOptional<z.ZodString>;
        parameter: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "api_key" | "oauth" | "basic" | "bearer";
        header?: string | undefined;
        parameter?: string | undefined;
    }, {
        type: "api_key" | "oauth" | "basic" | "bearer";
        header?: string | undefined;
        parameter?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    endpoints: {
        name: string;
        description: string;
        path: string;
        method: "GET" | "POST" | "PUT" | "DELETE";
        parameters: {
            name: string;
            description: string;
            type: "string" | "number" | "boolean" | "date" | "array";
            required: boolean;
            example?: string | undefined;
        }[];
        responseFormat: string;
        voiceResponseTemplate?: string | undefined;
    }[];
    baseUrl?: string | undefined;
    authentication?: {
        type: "api_key" | "oauth" | "basic" | "bearer";
        header?: string | undefined;
        parameter?: string | undefined;
    } | undefined;
}, {
    name: string;
    description: string;
    endpoints: {
        name: string;
        description: string;
        path: string;
        method: "GET" | "POST" | "PUT" | "DELETE";
        parameters: {
            name: string;
            description: string;
            type: "string" | "number" | "boolean" | "date" | "array";
            required: boolean;
            example?: string | undefined;
        }[];
        responseFormat: string;
        voiceResponseTemplate?: string | undefined;
    }[];
    baseUrl?: string | undefined;
    authentication?: {
        type: "api_key" | "oauth" | "basic" | "bearer";
        header?: string | undefined;
        parameter?: string | undefined;
    } | undefined;
}>;
export declare const DocumentChunkSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    content: z.ZodString;
    category: z.ZodString;
    tags: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
}, {
    id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
}>;
export declare const KnowledgeBaseConfigSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    documents: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        content: z.ZodString;
        category: z.ZodString;
        tags: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        title: string;
        content: string;
        category: string;
        tags: string[];
    }, {
        id: string;
        title: string;
        content: string;
        category: string;
        tags: string[];
    }>, "many">;
    categories: z.ZodArray<z.ZodString, "many">;
    searchConfig: z.ZodObject<{
        maxResults: z.ZodNumber;
        similarityThreshold: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        maxResults: number;
        similarityThreshold: number;
    }, {
        maxResults: number;
        similarityThreshold: number;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    documents: {
        id: string;
        title: string;
        content: string;
        category: string;
        tags: string[];
    }[];
    categories: string[];
    searchConfig: {
        maxResults: number;
        similarityThreshold: number;
    };
}, {
    name: string;
    description: string;
    documents: {
        id: string;
        title: string;
        content: string;
        category: string;
        tags: string[];
    }[];
    categories: string[];
    searchConfig: {
        maxResults: number;
        similarityThreshold: number;
    };
}>;
export declare const VoiceAgentConfigSchema: z.ZodObject<{
    name: z.ZodString;
    instructions: z.ZodString;
    personality: z.ZodObject<{
        tone: z.ZodEnum<["professional", "friendly", "casual", "formal"]>;
        language: z.ZodString;
        responseStyle: z.ZodEnum<["concise", "detailed", "conversational"]>;
    }, "strip", z.ZodTypeAny, {
        tone: "professional" | "friendly" | "casual" | "formal";
        language: string;
        responseStyle: "concise" | "detailed" | "conversational";
    }, {
        tone: "professional" | "friendly" | "casual" | "formal";
        language: string;
        responseStyle: "concise" | "detailed" | "conversational";
    }>;
    capabilities: z.ZodArray<z.ZodString, "many">;
    fallbackMessage: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    instructions: string;
    personality: {
        tone: "professional" | "friendly" | "casual" | "formal";
        language: string;
        responseStyle: "concise" | "detailed" | "conversational";
    };
    capabilities: string[];
    fallbackMessage: string;
}, {
    name: string;
    instructions: string;
    personality: {
        tone: "professional" | "friendly" | "casual" | "formal";
        language: string;
        responseStyle: "concise" | "detailed" | "conversational";
    };
    capabilities: string[];
    fallbackMessage: string;
}>;
export declare const ToolConfigSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    type: z.ZodEnum<["api", "knowledge_base", "custom"]>;
    config: z.ZodAny;
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    type: "custom" | "api" | "knowledge_base";
    enabled: boolean;
    config?: any;
}, {
    name: string;
    description: string;
    type: "custom" | "api" | "knowledge_base";
    enabled: boolean;
    config?: any;
}>;
export declare const EnterpriseVoiceAgentConfigSchema: z.ZodObject<{
    enterprise: z.ZodObject<{
        name: z.ZodString;
        industry: z.ZodString;
        description: z.ZodString;
        headquarters: z.ZodString;
        website: z.ZodString;
        supportHours: z.ZodString;
        languages: z.ZodArray<z.ZodString, "many">;
        contactInfo: z.ZodObject<{
            phone: z.ZodString;
            email: z.ZodString;
            whatsapp: z.ZodOptional<z.ZodString>;
            chat: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            phone: string;
            email: string;
            whatsapp?: string | undefined;
            chat?: string | undefined;
        }, {
            phone: string;
            email: string;
            whatsapp?: string | undefined;
            chat?: string | undefined;
        }>;
        sipConfig: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodBoolean;
            phoneNumber: z.ZodString;
            sipProvider: z.ZodEnum<["twilio", "vonage", "custom"]>;
            sipUri: z.ZodString;
            webhookUrl: z.ZodString;
            projectId: z.ZodString;
            instructions: z.ZodString;
            voice: z.ZodEnum<["alloy", "echo", "fable", "onyx", "nova", "shimmer"]>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            phoneNumber: string;
            sipProvider: "custom" | "twilio" | "vonage";
            sipUri: string;
            webhookUrl: string;
            projectId: string;
            instructions: string;
            voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
        }, {
            enabled: boolean;
            phoneNumber: string;
            sipProvider: "custom" | "twilio" | "vonage";
            sipUri: string;
            webhookUrl: string;
            projectId: string;
            instructions: string;
            voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        industry: string;
        description: string;
        headquarters: string;
        website: string;
        supportHours: string;
        languages: string[];
        contactInfo: {
            phone: string;
            email: string;
            whatsapp?: string | undefined;
            chat?: string | undefined;
        };
        sipConfig?: {
            enabled: boolean;
            phoneNumber: string;
            sipProvider: "custom" | "twilio" | "vonage";
            sipUri: string;
            webhookUrl: string;
            projectId: string;
            instructions: string;
            voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
        } | undefined;
    }, {
        name: string;
        industry: string;
        description: string;
        headquarters: string;
        website: string;
        supportHours: string;
        languages: string[];
        contactInfo: {
            phone: string;
            email: string;
            whatsapp?: string | undefined;
            chat?: string | undefined;
        };
        sipConfig?: {
            enabled: boolean;
            phoneNumber: string;
            sipProvider: "custom" | "twilio" | "vonage";
            sipUri: string;
            webhookUrl: string;
            projectId: string;
            instructions: string;
            voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
        } | undefined;
    }>;
    apis: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        baseUrl: z.ZodOptional<z.ZodString>;
        endpoints: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            path: z.ZodString;
            method: z.ZodEnum<["GET", "POST", "PUT", "DELETE"]>;
            description: z.ZodString;
            parameters: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                type: z.ZodEnum<["string", "number", "boolean", "date", "array"]>;
                required: z.ZodBoolean;
                description: z.ZodString;
                example: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                description: string;
                type: "string" | "number" | "boolean" | "date" | "array";
                required: boolean;
                example?: string | undefined;
            }, {
                name: string;
                description: string;
                type: "string" | "number" | "boolean" | "date" | "array";
                required: boolean;
                example?: string | undefined;
            }>, "many">;
            responseFormat: z.ZodString;
            voiceResponseTemplate: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            description: string;
            path: string;
            method: "GET" | "POST" | "PUT" | "DELETE";
            parameters: {
                name: string;
                description: string;
                type: "string" | "number" | "boolean" | "date" | "array";
                required: boolean;
                example?: string | undefined;
            }[];
            responseFormat: string;
            voiceResponseTemplate?: string | undefined;
        }, {
            name: string;
            description: string;
            path: string;
            method: "GET" | "POST" | "PUT" | "DELETE";
            parameters: {
                name: string;
                description: string;
                type: "string" | "number" | "boolean" | "date" | "array";
                required: boolean;
                example?: string | undefined;
            }[];
            responseFormat: string;
            voiceResponseTemplate?: string | undefined;
        }>, "many">;
        authentication: z.ZodOptional<z.ZodObject<{
            type: z.ZodEnum<["api_key", "oauth", "basic", "bearer"]>;
            header: z.ZodOptional<z.ZodString>;
            parameter: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "api_key" | "oauth" | "basic" | "bearer";
            header?: string | undefined;
            parameter?: string | undefined;
        }, {
            type: "api_key" | "oauth" | "basic" | "bearer";
            header?: string | undefined;
            parameter?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        description: string;
        endpoints: {
            name: string;
            description: string;
            path: string;
            method: "GET" | "POST" | "PUT" | "DELETE";
            parameters: {
                name: string;
                description: string;
                type: "string" | "number" | "boolean" | "date" | "array";
                required: boolean;
                example?: string | undefined;
            }[];
            responseFormat: string;
            voiceResponseTemplate?: string | undefined;
        }[];
        baseUrl?: string | undefined;
        authentication?: {
            type: "api_key" | "oauth" | "basic" | "bearer";
            header?: string | undefined;
            parameter?: string | undefined;
        } | undefined;
    }, {
        name: string;
        description: string;
        endpoints: {
            name: string;
            description: string;
            path: string;
            method: "GET" | "POST" | "PUT" | "DELETE";
            parameters: {
                name: string;
                description: string;
                type: "string" | "number" | "boolean" | "date" | "array";
                required: boolean;
                example?: string | undefined;
            }[];
            responseFormat: string;
            voiceResponseTemplate?: string | undefined;
        }[];
        baseUrl?: string | undefined;
        authentication?: {
            type: "api_key" | "oauth" | "basic" | "bearer";
            header?: string | undefined;
            parameter?: string | undefined;
        } | undefined;
    }>, "many">;
    knowledgeBase: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        documents: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            content: z.ZodString;
            category: z.ZodString;
            tags: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            title: string;
            content: string;
            category: string;
            tags: string[];
        }, {
            id: string;
            title: string;
            content: string;
            category: string;
            tags: string[];
        }>, "many">;
        categories: z.ZodArray<z.ZodString, "many">;
        searchConfig: z.ZodObject<{
            maxResults: z.ZodNumber;
            similarityThreshold: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            maxResults: number;
            similarityThreshold: number;
        }, {
            maxResults: number;
            similarityThreshold: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        description: string;
        documents: {
            id: string;
            title: string;
            content: string;
            category: string;
            tags: string[];
        }[];
        categories: string[];
        searchConfig: {
            maxResults: number;
            similarityThreshold: number;
        };
    }, {
        name: string;
        description: string;
        documents: {
            id: string;
            title: string;
            content: string;
            category: string;
            tags: string[];
        }[];
        categories: string[];
        searchConfig: {
            maxResults: number;
            similarityThreshold: number;
        };
    }>;
    voiceAgent: z.ZodObject<{
        name: z.ZodString;
        instructions: z.ZodString;
        personality: z.ZodObject<{
            tone: z.ZodEnum<["professional", "friendly", "casual", "formal"]>;
            language: z.ZodString;
            responseStyle: z.ZodEnum<["concise", "detailed", "conversational"]>;
        }, "strip", z.ZodTypeAny, {
            tone: "professional" | "friendly" | "casual" | "formal";
            language: string;
            responseStyle: "concise" | "detailed" | "conversational";
        }, {
            tone: "professional" | "friendly" | "casual" | "formal";
            language: string;
            responseStyle: "concise" | "detailed" | "conversational";
        }>;
        capabilities: z.ZodArray<z.ZodString, "many">;
        fallbackMessage: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        instructions: string;
        personality: {
            tone: "professional" | "friendly" | "casual" | "formal";
            language: string;
            responseStyle: "concise" | "detailed" | "conversational";
        };
        capabilities: string[];
        fallbackMessage: string;
    }, {
        name: string;
        instructions: string;
        personality: {
            tone: "professional" | "friendly" | "casual" | "formal";
            language: string;
            responseStyle: "concise" | "detailed" | "conversational";
        };
        capabilities: string[];
        fallbackMessage: string;
    }>;
    tools: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        type: z.ZodEnum<["api", "knowledge_base", "custom"]>;
        config: z.ZodAny;
        enabled: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        name: string;
        description: string;
        type: "custom" | "api" | "knowledge_base";
        enabled: boolean;
        config?: any;
    }, {
        name: string;
        description: string;
        type: "custom" | "api" | "knowledge_base";
        enabled: boolean;
        config?: any;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    enterprise: {
        name: string;
        industry: string;
        description: string;
        headquarters: string;
        website: string;
        supportHours: string;
        languages: string[];
        contactInfo: {
            phone: string;
            email: string;
            whatsapp?: string | undefined;
            chat?: string | undefined;
        };
        sipConfig?: {
            enabled: boolean;
            phoneNumber: string;
            sipProvider: "custom" | "twilio" | "vonage";
            sipUri: string;
            webhookUrl: string;
            projectId: string;
            instructions: string;
            voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
        } | undefined;
    };
    apis: {
        name: string;
        description: string;
        endpoints: {
            name: string;
            description: string;
            path: string;
            method: "GET" | "POST" | "PUT" | "DELETE";
            parameters: {
                name: string;
                description: string;
                type: "string" | "number" | "boolean" | "date" | "array";
                required: boolean;
                example?: string | undefined;
            }[];
            responseFormat: string;
            voiceResponseTemplate?: string | undefined;
        }[];
        baseUrl?: string | undefined;
        authentication?: {
            type: "api_key" | "oauth" | "basic" | "bearer";
            header?: string | undefined;
            parameter?: string | undefined;
        } | undefined;
    }[];
    knowledgeBase: {
        name: string;
        description: string;
        documents: {
            id: string;
            title: string;
            content: string;
            category: string;
            tags: string[];
        }[];
        categories: string[];
        searchConfig: {
            maxResults: number;
            similarityThreshold: number;
        };
    };
    voiceAgent: {
        name: string;
        instructions: string;
        personality: {
            tone: "professional" | "friendly" | "casual" | "formal";
            language: string;
            responseStyle: "concise" | "detailed" | "conversational";
        };
        capabilities: string[];
        fallbackMessage: string;
    };
    tools: {
        name: string;
        description: string;
        type: "custom" | "api" | "knowledge_base";
        enabled: boolean;
        config?: any;
    }[];
}, {
    enterprise: {
        name: string;
        industry: string;
        description: string;
        headquarters: string;
        website: string;
        supportHours: string;
        languages: string[];
        contactInfo: {
            phone: string;
            email: string;
            whatsapp?: string | undefined;
            chat?: string | undefined;
        };
        sipConfig?: {
            enabled: boolean;
            phoneNumber: string;
            sipProvider: "custom" | "twilio" | "vonage";
            sipUri: string;
            webhookUrl: string;
            projectId: string;
            instructions: string;
            voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
        } | undefined;
    };
    apis: {
        name: string;
        description: string;
        endpoints: {
            name: string;
            description: string;
            path: string;
            method: "GET" | "POST" | "PUT" | "DELETE";
            parameters: {
                name: string;
                description: string;
                type: "string" | "number" | "boolean" | "date" | "array";
                required: boolean;
                example?: string | undefined;
            }[];
            responseFormat: string;
            voiceResponseTemplate?: string | undefined;
        }[];
        baseUrl?: string | undefined;
        authentication?: {
            type: "api_key" | "oauth" | "basic" | "bearer";
            header?: string | undefined;
            parameter?: string | undefined;
        } | undefined;
    }[];
    knowledgeBase: {
        name: string;
        description: string;
        documents: {
            id: string;
            title: string;
            content: string;
            category: string;
            tags: string[];
        }[];
        categories: string[];
        searchConfig: {
            maxResults: number;
            similarityThreshold: number;
        };
    };
    voiceAgent: {
        name: string;
        instructions: string;
        personality: {
            tone: "professional" | "friendly" | "casual" | "formal";
            language: string;
            responseStyle: "concise" | "detailed" | "conversational";
        };
        capabilities: string[];
        fallbackMessage: string;
    };
    tools: {
        name: string;
        description: string;
        type: "custom" | "api" | "knowledge_base";
        enabled: boolean;
        config?: any;
    }[];
}>;
export declare const VoiceProviderSchema: z.ZodEnum<["openai", "vapi"]>;
export declare const VoiceProviderConfigSchema: z.ZodObject<{
    provider: z.ZodEnum<["openai", "vapi"]>;
    openai: z.ZodOptional<z.ZodObject<{
        apiKey: z.ZodString;
        model: z.ZodDefault<z.ZodString>;
        voice: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        voice: string;
        apiKey: string;
        model: string;
    }, {
        apiKey: string;
        voice?: string | undefined;
        model?: string | undefined;
    }>>;
    vapi: z.ZodOptional<z.ZodObject<{
        publicKey: z.ZodString;
        assistantId: z.ZodString;
        baseUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        publicKey: string;
        assistantId: string;
        baseUrl?: string | undefined;
    }, {
        publicKey: string;
        assistantId: string;
        baseUrl?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    provider: "openai" | "vapi";
    openai?: {
        voice: string;
        apiKey: string;
        model: string;
    } | undefined;
    vapi?: {
        publicKey: string;
        assistantId: string;
        baseUrl?: string | undefined;
    } | undefined;
}, {
    provider: "openai" | "vapi";
    openai?: {
        apiKey: string;
        voice?: string | undefined;
        model?: string | undefined;
    } | undefined;
    vapi?: {
        publicKey: string;
        assistantId: string;
        baseUrl?: string | undefined;
    } | undefined;
}>;
export declare const MCPServerConfigSchema: z.ZodObject<{
    enterpriseConfig: z.ZodObject<{
        enterprise: z.ZodObject<{
            name: z.ZodString;
            industry: z.ZodString;
            description: z.ZodString;
            headquarters: z.ZodString;
            website: z.ZodString;
            supportHours: z.ZodString;
            languages: z.ZodArray<z.ZodString, "many">;
            contactInfo: z.ZodObject<{
                phone: z.ZodString;
                email: z.ZodString;
                whatsapp: z.ZodOptional<z.ZodString>;
                chat: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                phone: string;
                email: string;
                whatsapp?: string | undefined;
                chat?: string | undefined;
            }, {
                phone: string;
                email: string;
                whatsapp?: string | undefined;
                chat?: string | undefined;
            }>;
            sipConfig: z.ZodOptional<z.ZodObject<{
                enabled: z.ZodBoolean;
                phoneNumber: z.ZodString;
                sipProvider: z.ZodEnum<["twilio", "vonage", "custom"]>;
                sipUri: z.ZodString;
                webhookUrl: z.ZodString;
                projectId: z.ZodString;
                instructions: z.ZodString;
                voice: z.ZodEnum<["alloy", "echo", "fable", "onyx", "nova", "shimmer"]>;
            }, "strip", z.ZodTypeAny, {
                enabled: boolean;
                phoneNumber: string;
                sipProvider: "custom" | "twilio" | "vonage";
                sipUri: string;
                webhookUrl: string;
                projectId: string;
                instructions: string;
                voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
            }, {
                enabled: boolean;
                phoneNumber: string;
                sipProvider: "custom" | "twilio" | "vonage";
                sipUri: string;
                webhookUrl: string;
                projectId: string;
                instructions: string;
                voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
            }>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            industry: string;
            description: string;
            headquarters: string;
            website: string;
            supportHours: string;
            languages: string[];
            contactInfo: {
                phone: string;
                email: string;
                whatsapp?: string | undefined;
                chat?: string | undefined;
            };
            sipConfig?: {
                enabled: boolean;
                phoneNumber: string;
                sipProvider: "custom" | "twilio" | "vonage";
                sipUri: string;
                webhookUrl: string;
                projectId: string;
                instructions: string;
                voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
            } | undefined;
        }, {
            name: string;
            industry: string;
            description: string;
            headquarters: string;
            website: string;
            supportHours: string;
            languages: string[];
            contactInfo: {
                phone: string;
                email: string;
                whatsapp?: string | undefined;
                chat?: string | undefined;
            };
            sipConfig?: {
                enabled: boolean;
                phoneNumber: string;
                sipProvider: "custom" | "twilio" | "vonage";
                sipUri: string;
                webhookUrl: string;
                projectId: string;
                instructions: string;
                voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
            } | undefined;
        }>;
        apis: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            description: z.ZodString;
            baseUrl: z.ZodOptional<z.ZodString>;
            endpoints: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                path: z.ZodString;
                method: z.ZodEnum<["GET", "POST", "PUT", "DELETE"]>;
                description: z.ZodString;
                parameters: z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    type: z.ZodEnum<["string", "number", "boolean", "date", "array"]>;
                    required: z.ZodBoolean;
                    description: z.ZodString;
                    example: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    description: string;
                    type: "string" | "number" | "boolean" | "date" | "array";
                    required: boolean;
                    example?: string | undefined;
                }, {
                    name: string;
                    description: string;
                    type: "string" | "number" | "boolean" | "date" | "array";
                    required: boolean;
                    example?: string | undefined;
                }>, "many">;
                responseFormat: z.ZodString;
                voiceResponseTemplate: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                description: string;
                path: string;
                method: "GET" | "POST" | "PUT" | "DELETE";
                parameters: {
                    name: string;
                    description: string;
                    type: "string" | "number" | "boolean" | "date" | "array";
                    required: boolean;
                    example?: string | undefined;
                }[];
                responseFormat: string;
                voiceResponseTemplate?: string | undefined;
            }, {
                name: string;
                description: string;
                path: string;
                method: "GET" | "POST" | "PUT" | "DELETE";
                parameters: {
                    name: string;
                    description: string;
                    type: "string" | "number" | "boolean" | "date" | "array";
                    required: boolean;
                    example?: string | undefined;
                }[];
                responseFormat: string;
                voiceResponseTemplate?: string | undefined;
            }>, "many">;
            authentication: z.ZodOptional<z.ZodObject<{
                type: z.ZodEnum<["api_key", "oauth", "basic", "bearer"]>;
                header: z.ZodOptional<z.ZodString>;
                parameter: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                type: "api_key" | "oauth" | "basic" | "bearer";
                header?: string | undefined;
                parameter?: string | undefined;
            }, {
                type: "api_key" | "oauth" | "basic" | "bearer";
                header?: string | undefined;
                parameter?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            description: string;
            endpoints: {
                name: string;
                description: string;
                path: string;
                method: "GET" | "POST" | "PUT" | "DELETE";
                parameters: {
                    name: string;
                    description: string;
                    type: "string" | "number" | "boolean" | "date" | "array";
                    required: boolean;
                    example?: string | undefined;
                }[];
                responseFormat: string;
                voiceResponseTemplate?: string | undefined;
            }[];
            baseUrl?: string | undefined;
            authentication?: {
                type: "api_key" | "oauth" | "basic" | "bearer";
                header?: string | undefined;
                parameter?: string | undefined;
            } | undefined;
        }, {
            name: string;
            description: string;
            endpoints: {
                name: string;
                description: string;
                path: string;
                method: "GET" | "POST" | "PUT" | "DELETE";
                parameters: {
                    name: string;
                    description: string;
                    type: "string" | "number" | "boolean" | "date" | "array";
                    required: boolean;
                    example?: string | undefined;
                }[];
                responseFormat: string;
                voiceResponseTemplate?: string | undefined;
            }[];
            baseUrl?: string | undefined;
            authentication?: {
                type: "api_key" | "oauth" | "basic" | "bearer";
                header?: string | undefined;
                parameter?: string | undefined;
            } | undefined;
        }>, "many">;
        knowledgeBase: z.ZodObject<{
            name: z.ZodString;
            description: z.ZodString;
            documents: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                title: z.ZodString;
                content: z.ZodString;
                category: z.ZodString;
                tags: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                title: string;
                content: string;
                category: string;
                tags: string[];
            }, {
                id: string;
                title: string;
                content: string;
                category: string;
                tags: string[];
            }>, "many">;
            categories: z.ZodArray<z.ZodString, "many">;
            searchConfig: z.ZodObject<{
                maxResults: z.ZodNumber;
                similarityThreshold: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                maxResults: number;
                similarityThreshold: number;
            }, {
                maxResults: number;
                similarityThreshold: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            description: string;
            documents: {
                id: string;
                title: string;
                content: string;
                category: string;
                tags: string[];
            }[];
            categories: string[];
            searchConfig: {
                maxResults: number;
                similarityThreshold: number;
            };
        }, {
            name: string;
            description: string;
            documents: {
                id: string;
                title: string;
                content: string;
                category: string;
                tags: string[];
            }[];
            categories: string[];
            searchConfig: {
                maxResults: number;
                similarityThreshold: number;
            };
        }>;
        voiceAgent: z.ZodObject<{
            name: z.ZodString;
            instructions: z.ZodString;
            personality: z.ZodObject<{
                tone: z.ZodEnum<["professional", "friendly", "casual", "formal"]>;
                language: z.ZodString;
                responseStyle: z.ZodEnum<["concise", "detailed", "conversational"]>;
            }, "strip", z.ZodTypeAny, {
                tone: "professional" | "friendly" | "casual" | "formal";
                language: string;
                responseStyle: "concise" | "detailed" | "conversational";
            }, {
                tone: "professional" | "friendly" | "casual" | "formal";
                language: string;
                responseStyle: "concise" | "detailed" | "conversational";
            }>;
            capabilities: z.ZodArray<z.ZodString, "many">;
            fallbackMessage: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            instructions: string;
            personality: {
                tone: "professional" | "friendly" | "casual" | "formal";
                language: string;
                responseStyle: "concise" | "detailed" | "conversational";
            };
            capabilities: string[];
            fallbackMessage: string;
        }, {
            name: string;
            instructions: string;
            personality: {
                tone: "professional" | "friendly" | "casual" | "formal";
                language: string;
                responseStyle: "concise" | "detailed" | "conversational";
            };
            capabilities: string[];
            fallbackMessage: string;
        }>;
        tools: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            description: z.ZodString;
            type: z.ZodEnum<["api", "knowledge_base", "custom"]>;
            config: z.ZodAny;
            enabled: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            name: string;
            description: string;
            type: "custom" | "api" | "knowledge_base";
            enabled: boolean;
            config?: any;
        }, {
            name: string;
            description: string;
            type: "custom" | "api" | "knowledge_base";
            enabled: boolean;
            config?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        enterprise: {
            name: string;
            industry: string;
            description: string;
            headquarters: string;
            website: string;
            supportHours: string;
            languages: string[];
            contactInfo: {
                phone: string;
                email: string;
                whatsapp?: string | undefined;
                chat?: string | undefined;
            };
            sipConfig?: {
                enabled: boolean;
                phoneNumber: string;
                sipProvider: "custom" | "twilio" | "vonage";
                sipUri: string;
                webhookUrl: string;
                projectId: string;
                instructions: string;
                voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
            } | undefined;
        };
        apis: {
            name: string;
            description: string;
            endpoints: {
                name: string;
                description: string;
                path: string;
                method: "GET" | "POST" | "PUT" | "DELETE";
                parameters: {
                    name: string;
                    description: string;
                    type: "string" | "number" | "boolean" | "date" | "array";
                    required: boolean;
                    example?: string | undefined;
                }[];
                responseFormat: string;
                voiceResponseTemplate?: string | undefined;
            }[];
            baseUrl?: string | undefined;
            authentication?: {
                type: "api_key" | "oauth" | "basic" | "bearer";
                header?: string | undefined;
                parameter?: string | undefined;
            } | undefined;
        }[];
        knowledgeBase: {
            name: string;
            description: string;
            documents: {
                id: string;
                title: string;
                content: string;
                category: string;
                tags: string[];
            }[];
            categories: string[];
            searchConfig: {
                maxResults: number;
                similarityThreshold: number;
            };
        };
        voiceAgent: {
            name: string;
            instructions: string;
            personality: {
                tone: "professional" | "friendly" | "casual" | "formal";
                language: string;
                responseStyle: "concise" | "detailed" | "conversational";
            };
            capabilities: string[];
            fallbackMessage: string;
        };
        tools: {
            name: string;
            description: string;
            type: "custom" | "api" | "knowledge_base";
            enabled: boolean;
            config?: any;
        }[];
    }, {
        enterprise: {
            name: string;
            industry: string;
            description: string;
            headquarters: string;
            website: string;
            supportHours: string;
            languages: string[];
            contactInfo: {
                phone: string;
                email: string;
                whatsapp?: string | undefined;
                chat?: string | undefined;
            };
            sipConfig?: {
                enabled: boolean;
                phoneNumber: string;
                sipProvider: "custom" | "twilio" | "vonage";
                sipUri: string;
                webhookUrl: string;
                projectId: string;
                instructions: string;
                voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
            } | undefined;
        };
        apis: {
            name: string;
            description: string;
            endpoints: {
                name: string;
                description: string;
                path: string;
                method: "GET" | "POST" | "PUT" | "DELETE";
                parameters: {
                    name: string;
                    description: string;
                    type: "string" | "number" | "boolean" | "date" | "array";
                    required: boolean;
                    example?: string | undefined;
                }[];
                responseFormat: string;
                voiceResponseTemplate?: string | undefined;
            }[];
            baseUrl?: string | undefined;
            authentication?: {
                type: "api_key" | "oauth" | "basic" | "bearer";
                header?: string | undefined;
                parameter?: string | undefined;
            } | undefined;
        }[];
        knowledgeBase: {
            name: string;
            description: string;
            documents: {
                id: string;
                title: string;
                content: string;
                category: string;
                tags: string[];
            }[];
            categories: string[];
            searchConfig: {
                maxResults: number;
                similarityThreshold: number;
            };
        };
        voiceAgent: {
            name: string;
            instructions: string;
            personality: {
                tone: "professional" | "friendly" | "casual" | "formal";
                language: string;
                responseStyle: "concise" | "detailed" | "conversational";
            };
            capabilities: string[];
            fallbackMessage: string;
        };
        tools: {
            name: string;
            description: string;
            type: "custom" | "api" | "knowledge_base";
            enabled: boolean;
            config?: any;
        }[];
    }>;
    voiceProvider: z.ZodObject<{
        provider: z.ZodEnum<["openai", "vapi"]>;
        openai: z.ZodOptional<z.ZodObject<{
            apiKey: z.ZodString;
            model: z.ZodDefault<z.ZodString>;
            voice: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            voice: string;
            apiKey: string;
            model: string;
        }, {
            apiKey: string;
            voice?: string | undefined;
            model?: string | undefined;
        }>>;
        vapi: z.ZodOptional<z.ZodObject<{
            publicKey: z.ZodString;
            assistantId: z.ZodString;
            baseUrl: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            publicKey: string;
            assistantId: string;
            baseUrl?: string | undefined;
        }, {
            publicKey: string;
            assistantId: string;
            baseUrl?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        provider: "openai" | "vapi";
        openai?: {
            voice: string;
            apiKey: string;
            model: string;
        } | undefined;
        vapi?: {
            publicKey: string;
            assistantId: string;
            baseUrl?: string | undefined;
        } | undefined;
    }, {
        provider: "openai" | "vapi";
        openai?: {
            apiKey: string;
            voice?: string | undefined;
            model?: string | undefined;
        } | undefined;
        vapi?: {
            publicKey: string;
            assistantId: string;
            baseUrl?: string | undefined;
        } | undefined;
    }>;
    defaultProvider: z.ZodDefault<z.ZodEnum<["openai", "vapi"]>>;
}, "strip", z.ZodTypeAny, {
    enterpriseConfig: {
        enterprise: {
            name: string;
            industry: string;
            description: string;
            headquarters: string;
            website: string;
            supportHours: string;
            languages: string[];
            contactInfo: {
                phone: string;
                email: string;
                whatsapp?: string | undefined;
                chat?: string | undefined;
            };
            sipConfig?: {
                enabled: boolean;
                phoneNumber: string;
                sipProvider: "custom" | "twilio" | "vonage";
                sipUri: string;
                webhookUrl: string;
                projectId: string;
                instructions: string;
                voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
            } | undefined;
        };
        apis: {
            name: string;
            description: string;
            endpoints: {
                name: string;
                description: string;
                path: string;
                method: "GET" | "POST" | "PUT" | "DELETE";
                parameters: {
                    name: string;
                    description: string;
                    type: "string" | "number" | "boolean" | "date" | "array";
                    required: boolean;
                    example?: string | undefined;
                }[];
                responseFormat: string;
                voiceResponseTemplate?: string | undefined;
            }[];
            baseUrl?: string | undefined;
            authentication?: {
                type: "api_key" | "oauth" | "basic" | "bearer";
                header?: string | undefined;
                parameter?: string | undefined;
            } | undefined;
        }[];
        knowledgeBase: {
            name: string;
            description: string;
            documents: {
                id: string;
                title: string;
                content: string;
                category: string;
                tags: string[];
            }[];
            categories: string[];
            searchConfig: {
                maxResults: number;
                similarityThreshold: number;
            };
        };
        voiceAgent: {
            name: string;
            instructions: string;
            personality: {
                tone: "professional" | "friendly" | "casual" | "formal";
                language: string;
                responseStyle: "concise" | "detailed" | "conversational";
            };
            capabilities: string[];
            fallbackMessage: string;
        };
        tools: {
            name: string;
            description: string;
            type: "custom" | "api" | "knowledge_base";
            enabled: boolean;
            config?: any;
        }[];
    };
    voiceProvider: {
        provider: "openai" | "vapi";
        openai?: {
            voice: string;
            apiKey: string;
            model: string;
        } | undefined;
        vapi?: {
            publicKey: string;
            assistantId: string;
            baseUrl?: string | undefined;
        } | undefined;
    };
    defaultProvider: "openai" | "vapi";
}, {
    enterpriseConfig: {
        enterprise: {
            name: string;
            industry: string;
            description: string;
            headquarters: string;
            website: string;
            supportHours: string;
            languages: string[];
            contactInfo: {
                phone: string;
                email: string;
                whatsapp?: string | undefined;
                chat?: string | undefined;
            };
            sipConfig?: {
                enabled: boolean;
                phoneNumber: string;
                sipProvider: "custom" | "twilio" | "vonage";
                sipUri: string;
                webhookUrl: string;
                projectId: string;
                instructions: string;
                voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
            } | undefined;
        };
        apis: {
            name: string;
            description: string;
            endpoints: {
                name: string;
                description: string;
                path: string;
                method: "GET" | "POST" | "PUT" | "DELETE";
                parameters: {
                    name: string;
                    description: string;
                    type: "string" | "number" | "boolean" | "date" | "array";
                    required: boolean;
                    example?: string | undefined;
                }[];
                responseFormat: string;
                voiceResponseTemplate?: string | undefined;
            }[];
            baseUrl?: string | undefined;
            authentication?: {
                type: "api_key" | "oauth" | "basic" | "bearer";
                header?: string | undefined;
                parameter?: string | undefined;
            } | undefined;
        }[];
        knowledgeBase: {
            name: string;
            description: string;
            documents: {
                id: string;
                title: string;
                content: string;
                category: string;
                tags: string[];
            }[];
            categories: string[];
            searchConfig: {
                maxResults: number;
                similarityThreshold: number;
            };
        };
        voiceAgent: {
            name: string;
            instructions: string;
            personality: {
                tone: "professional" | "friendly" | "casual" | "formal";
                language: string;
                responseStyle: "concise" | "detailed" | "conversational";
            };
            capabilities: string[];
            fallbackMessage: string;
        };
        tools: {
            name: string;
            description: string;
            type: "custom" | "api" | "knowledge_base";
            enabled: boolean;
            config?: any;
        }[];
    };
    voiceProvider: {
        provider: "openai" | "vapi";
        openai?: {
            apiKey: string;
            voice?: string | undefined;
            model?: string | undefined;
        } | undefined;
        vapi?: {
            publicKey: string;
            assistantId: string;
            baseUrl?: string | undefined;
        } | undefined;
    };
    defaultProvider?: "openai" | "vapi" | undefined;
}>;
export type EnterpriseInfo = z.infer<typeof EnterpriseInfoSchema>;
export type APIParameter = z.infer<typeof APIParameterSchema>;
export type APIEndpoint = z.infer<typeof APIEndpointSchema>;
export type APIConfig = z.infer<typeof APIConfigSchema>;
export type DocumentChunk = z.infer<typeof DocumentChunkSchema>;
export type KnowledgeBaseConfig = z.infer<typeof KnowledgeBaseConfigSchema>;
export type VoiceAgentConfig = z.infer<typeof VoiceAgentConfigSchema>;
export type ToolConfig = z.infer<typeof ToolConfigSchema>;
export type EnterpriseVoiceAgentConfig = z.infer<typeof EnterpriseVoiceAgentConfigSchema>;
export type VoiceProvider = z.infer<typeof VoiceProviderSchema>;
export type VoiceProviderConfig = z.infer<typeof VoiceProviderConfigSchema>;
export type MCPServerConfig = z.infer<typeof MCPServerConfigSchema>;
export declare const INDUSTRY_TEMPLATES: {
    readonly airline: {
        readonly industry: "Airline";
        readonly capabilities: readonly ["Flight booking and reservations", "Baggage policies and allowances", "Check-in and boarding procedures", "Ticket changes and cancellations", "Loyalty program information", "Special assistance services", "Flight status and delays", "Refunds and compensation"];
    };
    readonly hotel: {
        readonly industry: "Hotel";
        readonly capabilities: readonly ["Room booking and reservations", "Room availability and pricing", "Check-in and check-out procedures", "Cancellation policies", "Loyalty program information", "Special requests and amenities", "Room service and facilities", "Billing and payment information"];
    };
    readonly bank: {
        readonly industry: "Banking";
        readonly capabilities: readonly ["Account balance inquiries", "Transaction history", "Transfer and payment services", "Loan and credit information", "Investment services", "Card management", "Fraud protection", "Branch and ATM locations"];
    };
    readonly retail: {
        readonly industry: "Retail";
        readonly capabilities: readonly ["Product information and availability", "Order status and tracking", "Returns and exchanges", "Loyalty program benefits", "Shipping and delivery", "Payment and billing", "Customer support", "Store locations and hours"];
    };
};
//# sourceMappingURL=types.d.ts.map