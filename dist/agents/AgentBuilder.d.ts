import { Message } from './LMStudioAgent';

interface AgentBuilderProps {
    baseUrl?: string;
    onAgentStart?: (config: AgentConfig) => void;
    className?: string;
}
export interface AgentConfig {
    name: string;
    description: string;
    systemPrompt: string;
    model: string;
    tools: string[];
    temperature: number;
    maxTokens: number;
}
export declare function AgentBuilder({ baseUrl, onAgentStart, className }: AgentBuilderProps): import("react/jsx-runtime").JSX.Element;
export declare function AgentBuilderChat({ messages, isLoading, onSend, onClear }: {
    messages: Message[];
    isLoading: boolean;
    onSend: (msg: string) => void;
    onClear: () => void;
}): import("react/jsx-runtime").JSX.Element;
export {};
