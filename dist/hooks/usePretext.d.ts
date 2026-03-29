/**
 * usePretext - Hook for pretext text measurement
 */
export interface TextMeasurement {
    height: number;
    lines: Array<{
        text: string;
        x: number;
        y: number;
        width: number;
        baseline: number;
    }>;
    totalWidth: number;
}
export interface UsePretextOptions {
    font?: string;
    maxWidth?: number;
    lineHeight?: number;
}
/**
 * Hook for measuring text without DOM reflow
 */
export declare function usePretext(text: string, options?: UsePretextOptions): TextMeasurement | null;
/**
 * Hook for streaming text with pretext measurement
 */
export declare function usePretextStream(text: string, options?: UsePretextOptions & {
    speed?: number;
    autoStart?: boolean;
}): {
    displayedText: string;
    isStreaming: boolean;
    progress: number;
    start: () => void;
    pause: () => void;
    reset: () => void;
    measurement: TextMeasurement | null;
    finalMeasurement: TextMeasurement | null;
    height: number;
};
export default usePretext;
