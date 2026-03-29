/**
 * useGestures - Hook for touch and gesture handling
 */
export interface Point {
    x: number;
    y: number;
}
export interface GestureState {
    isActive: boolean;
    startPoint: Point | null;
    currentPoint: Point | null;
    delta: Point | null;
    distance: number;
    angle: number;
    scale: number;
    rotation: number;
}
export interface UseGesturesOptions {
    onTap?: (point: Point) => void;
    onDoubleTap?: (point: Point) => void;
    onPan?: (state: GestureState) => void;
    onPanStart?: (point: Point) => void;
    onPanEnd?: (state: GestureState) => void;
    onPinch?: (state: GestureState) => void;
    onRotate?: (state: GestureState) => void;
    onSwipe?: (direction: 'up' | 'down' | 'left' | 'right', velocity: Point) => void;
    threshold?: {
        tap?: number;
        pan?: number;
        swipe?: number;
    };
}
/**
 * Hook for handling touch gestures
 */
export declare function useGestures(targetRef: React.RefObject<HTMLElement>, options?: UseGesturesOptions): {
    gestureState: GestureState;
    isActive: boolean;
};
export default useGestures;
