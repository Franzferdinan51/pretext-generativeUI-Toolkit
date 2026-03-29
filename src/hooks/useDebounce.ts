/**
 * useDebounce - Hook for debounced values
 */

import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Debounce a value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
  
  return debouncedValue
}

/**
 * Debounce a callback function
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const callbackRef = useRef(callback)
  
  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])
  
  // Create debounced function
  const debouncedCallback = useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args)
    }, delay)
  }, [delay]) as T
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])
  
  return debouncedCallback
}

/**
 * Debounce multiple values with individual delays
 */
export function useDebouncedValues<T extends Record<string, any>>(
  values: T,
  delays: Partial<Record<keyof T, number>>
): T {
  const [debouncedValues, setDebouncedValues] = useState(values)
  const timeoutsRef = useRef<Partial<Record<keyof T, NodeJS.Timeout>>>({})
  
  useEffect(() => {
    const newDebouncedValues = { ...debouncedValues }
    let hasChanges = false
    
    Object.keys(values).forEach(key => {
      const delay = delays[key] ?? 0
      const value = values[key]
      const debouncedValue = debouncedValues[key]
      
      if (delay === 0) {
        newDebouncedValues[key] = value
        hasChanges = true
      } else if (value !== debouncedValue) {
        if (timeoutsRef.current[key]) {
          clearTimeout(timeoutsRef.current[key]!)
        }
        
        timeoutsRef.current[key] = setTimeout(() => {
          setDebouncedValues(prev => ({ ...prev, [key]: value }))
        }, delay)
      }
    })
    
    if (hasChanges) {
      setDebouncedValues(newDebouncedValues)
    }
    
    return () => {
      Object.values(timeoutsRef.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout)
      })
    }
  }, [values, delays, debouncedValues])
  
  return debouncedValues
}

export default useDebounce
