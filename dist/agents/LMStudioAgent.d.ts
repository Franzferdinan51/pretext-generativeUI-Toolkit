/**
 * LM Studio Agent Controller
 * Control LM Studio directly from React
 */
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
    sendMessage: (content: string) => Promise<string>;
    listModels: () => Promise<string[]>;
    healthCheck: () => Promise<boolean>;
    clear: () => void;
    setModel: (model: string) => void;
    currentModel: string;
}
export declare function useLMStudioAgent(config: LMStudioConfig): UseLMStudioAgentReturn;
export declare function useLMStudioAgentDefault(): UseLMStudioAgentReturn;
