/**
 * useDebounce - Hook for debounced values
 */
/**
 * Debounce a value
 */
export declare function useDebounce<T>(value: T, delay: number): T;
/**
 * Debounce a callback function
 */
export declare function useDebouncedCallback<T extends (...args: any[]) => any>(callback: T, delay: number): T;
/**
 * Debounce multiple values with individual delays
 */
export declare function useDebouncedValues<T extends Record<string, any>>(values: T, delays: Partial<Record<keyof T, number>>): T;
export default useDebounce;
