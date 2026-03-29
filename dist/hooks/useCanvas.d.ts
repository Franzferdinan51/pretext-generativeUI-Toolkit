/**
 * useCanvas - Hook for canvas rendering
 */
export interface CanvasState {
    width: number;
    height: number;
    context: CanvasRenderingContext2D | null;
}
export interface UseCanvasOptions {
    width?: number;
    height?: number;
    devicePixelRatio?: number;
    willReadFrequently?: boolean;
}
/**
 * Hook for canvas 2D context management
 */
export declare function useCanvas(options?: UseCanvasOptions): {
    width: number;
    height: number;
    context: CanvasRenderingContext2D | null;
    canvasRef: import('react').RefObject<HTMLCanvasElement>;
};
/**
 * Hook for particle animation on canvas
 */
export interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    color: string;
    decay?: number;
    gravity?: number;
    friction?: number;
}
export interface UseParticleOptions {
    count?: number;
    colors?: string[];
    minSize?: number;
    maxSize?: number;
    minLife?: number;
    maxLife?: number;
    minSpeed?: number;
    maxSpeed?: number;
    gravity?: number;
    friction?: number;
    decay?: number;
}
export declare function useParticleEmitter(canvasRef: React.RefObject<HTMLCanvasElement>, options?: UseParticleOptions): import('react').MutableRefObject<Particle[]>;
/**
 * Hook for canvas text rendering
 */
export declare function useCanvasText(): {
    drawText: (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, options?: {
        font?: string;
        color?: string;
        align?: CanvasTextAlign;
        baseline?: CanvasTextBaseline;
        maxWidth?: number;
    }) => void;
    measureText: (ctx: CanvasRenderingContext2D, text: string, font?: string) => TextMetrics;
    drawWrappedText: (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number, options?: {
        font?: string;
        color?: string;
        align?: CanvasTextAlign;
    }) => void;
};
export default useCanvas;
