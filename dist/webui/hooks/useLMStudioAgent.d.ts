export interface LMStudioConfig {
    baseUrl: string;
    model?: string;
    apiKey?: string;
}
export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}
export interface UseLMStudioAgentReturn {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
    streamingContent: string;
    sendMessage: (content: string) => Promise<string>;
    sendStreamingMessage: (content: string, onChunk: (chunk: string) => void) => Promise<string>;
    listModels: () => Promise<string[]>;
    healthCheck: () => Promise<boolean>;
    clear: () => void;
    setModel: (model: string) => void;
    currentModel: string;
}
export declare function useLMStudioAgent(config: LMStudioConfig): UseLMStudioAgentReturn;
export declare function setGlobalLMStudioConfig(config: Partial<LMStudioConfig>): void;
export declare function getGlobalLMStudioConfig(): {
    baseUrl: string;
    model?: string;
    apiKey?: string;
};
interface LMStudioContextType extends UseLMStudioAgentReturn {
    config: LMStudioConfig;
    setConfig: (config: Partial<LMStudioConfig>) => void;
}
export declare function LMStudioProvider({ children, config }: {
    children: React.ReactNode;
    config?: Partial<LMStudioConfig>;
}): import("react/jsx-runtime").JSX.Element;
export declare function useLMStudio(): LMStudioContextType;
export {};
