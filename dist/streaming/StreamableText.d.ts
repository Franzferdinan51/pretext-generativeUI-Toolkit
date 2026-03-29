import { default as React } from 'react';

export interface StreamableTextProps {
    content: string;
    font?: string;
    maxWidth?: number;
    lineHeight?: number;
    speed?: number;
    autoStart?: boolean;
    showCursor?: boolean;
    cursorChar?: string;
    cursorBlinkSpeed?: number;
    onComplete?: () => void;
    onProgress?: (progress: number) => void;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * StreamableText component
 */
export declare const StreamableText: React.FC<StreamableTextProps>;
export interface StreamingCursorProps {
    char?: string;
    blinkSpeed?: number;
    color?: string;
}
export declare const StreamingCursor: React.FC<StreamingCursorProps>;
export declare function useStreamingText(text: string, options?: {
    speed?: number;
    autoStart?: boolean;
    onComplete?: () => void;
    onProgress?: (progress: number) => void;
}): {
    displayedText: string;
    isStreaming: boolean;
    progress: number;
    start: () => void;
    pause: () => void;
    reset: () => void;
};
export default StreamableText;
