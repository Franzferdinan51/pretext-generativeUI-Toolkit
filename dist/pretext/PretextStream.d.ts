import { default as React } from 'react';

export interface StreamConfig {
    speed?: number;
    startDelay?: number;
    chunkSize?: number;
    chunkDelay?: number;
    enableCursor?: boolean;
    cursorChar?: string;
    cursorBlinkSpeed?: number;
}
export interface PretextStreamProps {
    text: string;
    font?: string;
    maxWidth?: number;
    lineHeight?: number;
    color?: string;
    config?: StreamConfig;
    onComplete?: () => void;
    onProgress?: (progress: number) => void;
    className?: string;
    style?: React.CSSProperties;
}
export interface StreamingCursorProps {
    char?: string;
    blinkSpeed?: number;
    color?: string;
    className?: string;
}
/**
 * StreamingCursor - Blinking cursor component
 */
export declare const StreamingCursor: React.FC<StreamingCursorProps>;
/**
 * PretextStream - Main streaming text component
 */
export declare const PretextStream: React.FC<PretextStreamProps>;
/**
 * useStreamingText - Hook for streaming text logic
 */
export declare function useStreamingText(text: string, config?: StreamConfig): {
    displayedText: string;
    isStreaming: boolean;
    isComplete: boolean;
    progress: number;
    start: () => void;
    pause: () => void;
    reset: () => void;
};
/**
 * ChunkStream - Stream text in configurable chunks
 */
export interface ChunkStreamProps {
    chunks: string[];
    font?: string;
    maxWidth?: number;
    lineHeight?: number;
    color?: string;
    chunkDelay?: number;
    onChunkComplete?: (index: number) => void;
    onComplete?: () => void;
    className?: string;
    style?: React.CSSProperties;
}
export declare const ChunkStream: React.FC<ChunkStreamProps>;
export default PretextStream;
