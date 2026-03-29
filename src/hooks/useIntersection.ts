/**
 * useIntersection - Hook for intersection observer
 */

import { useState, useEffect, useRef, useCallback } from 'react'

export interface IntersectionOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export interface IntersectionResult {
  ref: React.RefObject<Element>
  isIntersecting: boolean
  entry: IntersectionObserverEntry | null
}

/**
 * Hook for observing element intersection
 */
export function useIntersection(
  options: IntersectionOptions = {}
): IntersectionResult & {
  observe: () => void
  unobserve: () => void
} {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false
  } = options
  
  const ref = useRef<Element>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const frozenRef = useRef(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  
  // Update frozen state
  useEffect(() => {
    if (freezeOnceVisible && isIntersecting) {
      frozenRef.current = true
    }
  }, [freezeOnceVisible, isIntersecting])
  
  // Create observer
  useEffect(() => {
    const element = ref.current
    if (!element || frozenRef.current) return
    
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry)
        setIsIntersecting(entry.isIntersecting)
        
        if (freezeOnceVisible && entry.isIntersecting) {
          frozenRef.current = true
          if (observerRef.current) {
            observerRef.current.disconnect()
          }
        }
      },
      { threshold, root, rootMargin }
    )
    
    observerRef.current.observe(element)
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [threshold, root, rootMargin, freezeOnceVisible])
  
  const observe = useCallback(() => {
    if (ref.current && observerRef.current) {
      observerRef.current.observe(ref.current)
    }
  }, [])
  
  const unobserve = useCallback(() => {
    if (ref.current && observerRef.current) {
      observerRef.current.unobserve(ref.current)
    }
  }, [])
  
  return {
    ref,
    isIntersecting,
    entry,
    observe,
    unobserve
  }
}

/**
 * Hook for lazy loading with intersection
 */
export function useLazyLoad(
  options: IntersectionOptions & {
    fallbackSrc?: string
  } = {}
) {
  const { fallbackSrc, ...intersectionOptions } = options
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  
  const { ref, isIntersecting } = useIntersection({
    threshold: 0.1,
    freezeOnceVisible: true,
    ...intersectionOptions
  })
  
  useEffect(() => {
    setIsInView(isIntersecting)
  }, [isIntersecting])
  
  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])
  
  return {
    ref,
    isInView,
    isLoaded,
    handleLoad,
    shouldLoad: isIntersecting || !fallbackSrc
  }
}

/**
 * Hook for infinite scroll
 */
export function useInfiniteScroll(
  onLoadMore: () => void,
  options: IntersectionOptions & {
    enabled?: boolean
    distance?: number
  } = {}
) {
  const { enabled = true, distance = 100, ...intersectionOptions } = options
  const loadingRef = useRef(false)
  
  const { ref, isIntersecting } = useIntersection({
    rootMargin: `${distance}px`,
    threshold: 0,
    ...intersectionOptions
  })
  
  useEffect(() => {
    if (isIntersecting && enabled && !loadingRef.current) {
      loadingRef.current = true
      onLoadMore()
      
      // Reset loading flag after a delay
      setTimeout(() => {
        loadingRef.current = false
      }, 1000)
    }
  }, [isIntersecting, enabled, distance, onLoadMore])
  
  return { triggerRef: ref }
}

export default useIntersection
