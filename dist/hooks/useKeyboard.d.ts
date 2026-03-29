/**
 * useKeyboard - Hook for keyboard shortcuts
 */
export interface KeyboardShortcut {
    key: string;
    ctrl?: boolean;
    alt?: boolean;
    shift?: boolean;
    meta?: boolean;
    handler: (event: KeyboardEvent) => void;
    description?: string;
}
export interface UseKeyboardOptions {
    enableOnInput?: boolean;
    preventDefault?: boolean;
}
/**
 * Hook for handling keyboard shortcuts
 */
export declare function useKeyboard(shortcuts: Array<string | KeyboardShortcut>, options?: UseKeyboardOptions): void;
/**
 * Hook for single key press detection
 */
export declare function useKeyPress(key: string, options?: UseKeyboardOptions): boolean;
/**
 * Hook for combination key press detection
 */
export declare function useKeysPressed(): Record<string, boolean>;
export default useKeyboard;
