/**
 * MCP Tool Executor
 * Execute MCP tools from LM Studio
 */
export interface MCPTool {
    name: string;
    description: string;
    inputSchema: {
        type: 'object';
        properties: Record<string, ToolParam>;
        required?: string[];
    };
}
export interface ToolParam {
    type: string;
    description: string;
    default?: any;
}
export interface ToolResult {
    tool: string;
    result: any;
    timestamp: number;
    error?: string;
}
export declare const BUILT_IN_TOOLS: MCPTool[];
export declare function useMCPTools(): {
    tools: MCPTool[];
    results: Map<string, ToolResult>;
    loading: Set<string>;
    executeTool: (toolName: string, args: Record<string, any>) => Promise<any>;
    clearResults: () => void;
};
export declare function executeMCPTool(toolName: string, args: Record<string, any>): Promise<any>;
export declare function getToolByName(name: string): MCPTool | undefined;
