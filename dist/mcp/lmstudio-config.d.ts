/**
 * LM Studio MCP Configuration
 * Configuration for LM Studio MCP server connection
 */
export interface LMStudioMCPConfig {
    local: {
        url: string;
        type: 'openai-compatible';
        apiKey?: string;
    };
    mcpTools: MCPToolDefinition[];
    availableModels: ModelDefinition[];
}
export interface MCPToolDefinition {
    name: string;
    description: string;
    params: Record<string, ParamDefinition>;
}
export interface ParamDefinition {
    type: string;
    description: string;
    required?: boolean;
    default?: any;
}
export interface ModelDefinition {
    id: string;
    name: string;
    type: 'text' | 'vision' | 'embedding';
    contextLength?: number;
}
export declare const LM_STUDIO_MCP_CONFIG: LMStudioMCPConfig;
export declare function checkLMStudioConnection(url?: string): Promise<boolean>;
export declare function fetchAvailableModels(url?: string): Promise<string[]>;
