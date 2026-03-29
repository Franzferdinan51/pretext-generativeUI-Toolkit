import { ToolResult } from './ToolExecutor';

interface ToolResultsPanelProps {
    results: Map<string, ToolResult>;
    loading: Set<string>;
    onToolClick?: (toolName: string) => void;
    className?: string;
}
export declare function ToolResultsPanel({ results, loading, onToolClick, className }: ToolResultsPanelProps): import("react/jsx-runtime").JSX.Element;
export declare function ToolButtonGrid({ onToolSelect, loading }: {
    onToolSelect: (toolName: string) => void;
    loading: Set<string>;
}): import("react/jsx-runtime").JSX.Element;
export declare function ToolInvokeForm({ toolName, onInvoke, loading }: {
    toolName: string;
    onInvoke: (args: Record<string, any>) => void;
    loading: boolean;
}): import("react/jsx-runtime").JSX.Element | null;
export {};
