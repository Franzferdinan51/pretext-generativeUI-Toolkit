import { default as React } from 'react';

export interface UIComponent {
    id: string;
    type: 'text' | 'button' | 'card' | 'input' | 'header' | 'container' | 'image';
    content: string;
    x: number;
    y: number;
    width: number;
    height: number;
    style: Record<string, string>;
    onClick?: string;
    visible: boolean;
    error?: string;
}
export interface ErrorReport {
    type: 'react' | 'canvas' | 'network' | 'parse';
    message: string;
    stack?: string;
    componentId?: string;
    timestamp: number;
}
export interface AutoHealingConfig {
    lmStudioUrl: string;
    lmStudioKey: string;
    model: string;
    autoHeal: boolean;
    maxRetries: number;
    onError?: (error: ErrorReport) => void;
    onHeal?: (fix: string) => void;
    onThinking?: (thinking: string) => void;
    onComponentUpdate?: (components: UIComponent[]) => void;
}
export declare function useAutoHealingUI(config: AutoHealingConfig): {
    components: UIComponent[];
    setComponents: React.Dispatch<React.SetStateAction<UIComponent[]>>;
    errors: ErrorReport[];
    aiThinking: string;
    isHealing: boolean;
    isGenerating: boolean;
    generateUI: (prompt: string) => Promise<void>;
    reportError: (error: ErrorReport) => void;
    healError: (error: ErrorReport) => Promise<void>;
    clearComponents: () => void;
    removeComponent: (id: string) => void;
    updateComponent: (id: string, changes: Partial<UIComponent>) => void;
    forceHeal: () => void;
};
interface ErrorBoundaryProps {
    children: React.ReactNode;
    onError: (error: ErrorReport) => void;
    fallback?: React.ReactNode;
}
interface ErrorBoundaryState {
    hasError: boolean;
    error: string | null;
    errorInfo?: string;
}
export declare class UIErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): ErrorBoundaryState;
    componentDidCatch(error: Error, info: React.ErrorInfo): void;
    render(): string | number | boolean | import("react/jsx-runtime").JSX.Element | Iterable<React.ReactNode> | null | undefined;
}
export interface CanvasRendererProps {
    components: UIComponent[];
    width?: number;
    height?: number;
    className?: string;
    onClick?: (component: UIComponent, x: number, y: number) => void;
}
export declare const CanvasRenderer: React.FC<CanvasRendererProps>;
export declare const defaultConfig: AutoHealingConfig;
export declare function useAutoHealingUIDefault(): {
    components: UIComponent[];
    setComponents: React.Dispatch<React.SetStateAction<UIComponent[]>>;
    errors: ErrorReport[];
    aiThinking: string;
    isHealing: boolean;
    isGenerating: boolean;
    generateUI: (prompt: string) => Promise<void>;
    reportError: (error: ErrorReport) => void;
    healError: (error: ErrorReport) => Promise<void>;
    clearComponents: () => void;
    removeComponent: (id: string) => void;
    updateComponent: (id: string, changes: Partial<UIComponent>) => void;
    forceHeal: () => void;
};
export declare function componentsToHTML(components: UIComponent[]): string;
export declare function downloadAsHTML(components: UIComponent[], filename?: string): void;
export {};
