/**
 * useStreaming - Hook for streaming text
 */
export interface StreamingState {
    displayedText: string;
    isStreaming: boolean;
    isComplete: boolean;
    progress: number;
}
export interface UseStreamingOptions {
    speed?: number;
    startDelay?: number;
    autoStart?: boolean;
    onComplete?: () => void;
    onProgress?: (progress: number) => void;
}
/**
 * Hook for character-by-character text streaming
 */
export declare function useStreaming(text: string, options?: UseStreamingOptions): StreamingState & {
    start: () => void;
    pause: () => void;
    reset: () => void;
    restart: () => void;
};
/**
 * Hook for chunk-based streaming
 */
export declare function useStreamingChunks(chunks: string[], options?: UseStreamingOptions & {
    chunkDelay?: number;
}): {
    displayedText: string;
    currentChunkIndex: number;
    isStreaming: boolean;
    isComplete: boolean;
    overallProgress: number;
    chunkProgress: number;
    start: () => void;
    pause: () => void;
    reset: () => void;
};
export default useStreaming;
