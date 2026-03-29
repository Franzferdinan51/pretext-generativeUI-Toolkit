import { Message } from './LMStudioAgent';

interface AgentChatProps {
    baseUrl?: string;
    defaultModel?: string;
    className?: string;
    onMessage?: (message: Message) => void;
}
export declare function AgentChat({ baseUrl, defaultModel, className, onMessage }: AgentChatProps): import("react/jsx-runtime").JSX.Element;
export declare function AgentChatCompact({ baseUrl, defaultModel }: {
    baseUrl?: string;
    defaultModel?: string;
}): import("react/jsx-runtime").JSX.Element;
export {};
