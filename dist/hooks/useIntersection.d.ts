/**
 * useIntersection - Hook for intersection observer
 */
export interface IntersectionOptions {
    threshold?: number | number[];
    root?: Element | null;
    rootMargin?: string;
    freezeOnceVisible?: boolean;
}
export interface IntersectionResult {
    ref: React.RefObject<Element>;
    isIntersecting: boolean;
    entry: IntersectionObserverEntry | null;
}
/**
 * Hook for observing element intersection
 */
export declare function useIntersection(options?: IntersectionOptions): IntersectionResult & {
    observe: () => void;
    unobserve: () => void;
};
/**
 * Hook for lazy loading with intersection
 */
export declare function useLazyLoad(options?: IntersectionOptions & {
    fallbackSrc?: string;
}): {
    ref: import('react').RefObject<Element>;
    isInView: boolean;
    isLoaded: boolean;
    handleLoad: () => void;
    shouldLoad: boolean;
};
/**
 * Hook for infinite scroll
 */
export declare function useInfiniteScroll(onLoadMore: () => void, options?: IntersectionOptions & {
    enabled?: boolean;
    distance?: number;
}): {
    triggerRef: import('react').RefObject<Element>;
};
export default useIntersection;
