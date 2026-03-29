/**
 * useStreaming - Hook for streaming text
 */

import { useState, useEffect, useCallback, useRef } from 'react'

export interface StreamingState {
  displayedText: string
  isStreaming: boolean
  isComplete: boolean
  progress: number
}

export interface UseStreamingOptions {
  speed?: number
  startDelay?: number
  autoStart?: boolean
  onComplete?: () => void
  onProgress?: (progress: number) => void
}

/**
 * Hook for character-by-character text streaming
 */
export function useStreaming(
  text: string,
  options: UseStreamingOptions = {}
): StreamingState & {
  start: () => void
  pause: () => void
  reset: () => void
  restart: () => void
} {
  const {
    speed = 20,
    startDelay = 0,
    autoStart = true,
    onComplete,
    onProgress
  } = options
  
  const [displayedText, setDisplayedText] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  
  const textRef = useRef(text)
  const indexRef = useRef(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Update text when it changes
  useEffect(() => {
    textRef.current = text
    indexRef.current = 0
    setDisplayedText('')
    setProgress(0)
    setIsComplete(false)
  }, [text])
  
  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (startTimeoutRef.current) {
      clearTimeout(startTimeoutRef.current)
      startTimeoutRef.current = null
    }
  }, [])
  
  const stream = useCallback(() => {
    clearTimers()
    
    if (!textRef.current) {
      setIsStreaming(false)
      return
    }
    
    setIsStreaming(true)
    
    startTimeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (indexRef.current < textRef.current.length) {
          indexRef.current++
          setDisplayedText(textRef.current.slice(0, indexRef.current))
          const newProgress = indexRef.current / textRef.current.length
          setProgress(newProgress)
          
          if (onProgress) {
            onProgress(newProgress)
          }
        } else {
          clearTimers()
          setIsStreaming(false)
          setIsComplete(true)
          
          if (onComplete) {
            onComplete()
          }
        }
      }, speed)
    }, startDelay)
  }, [speed, startDelay, clearTimers, onComplete, onProgress])
  
  const start = useCallback(() => {
    if (isComplete) {
      reset()
    }
    stream()
  }, [isComplete, stream])
  
  const pause = useCallback(() => {
    clearTimers()
    setIsStreaming(false)
  }, [clearTimers])
  
  const reset = useCallback(() => {
    clearTimers()
    indexRef.current = 0
    setDisplayedText('')
    setProgress(0)
    setIsStreaming(false)
    setIsComplete(false)
  }, [clearTimers])
  
  const restart = useCallback(() => {
    reset()
    setTimeout(() => stream(), 100)
  }, [reset, stream])
  
  // Auto-start
  useEffect(() => {
    if (autoStart && text && !isStreaming && !isComplete) {
      stream()
    }
    
    return clearTimers
  }, [text, autoStart, isStreaming, isComplete, stream, clearTimers])
  
  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimers()
  }, [clearTimers])
  
  return {
    displayedText,
    isStreaming,
    isComplete,
    progress,
    start,
    pause,
    reset,
    restart
  }
}

/**
 * Hook for chunk-based streaming
 */
export function useStreamingChunks(
  chunks: string[],
  options: UseStreamingOptions & {
    chunkDelay?: number
  } = {}
) {
  const { speed = 20, chunkDelay = 500, autoStart = true, onComplete, onProgress } = options
  
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [overallProgress, setOverallProgress] = useState(0)
  
  const currentChunk = chunks[currentChunkIndex] || ''
  const totalChars = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
  
  const {
    displayedText: chunkText,
    isStreaming: chunkStreaming,
    isComplete: chunkComplete,
    progress: chunkProgress,
    start: startChunk,
    pause: pauseChunk,
    reset: resetChunk
  } = useStreaming(currentChunk, { speed, autoStart: false })
  
  // Update displayed text
  useEffect(() => {
    setDisplayedText(chunkText)
    
    // Calculate overall progress
    let completedChars = 0
    for (let i = 0; i < currentChunkIndex; i++) {
      completedChars += chunks[i].length
    }
    completedChars += Math.floor(chunkText.length * chunkProgress)
    
    const overall = totalChars > 0 ? completedChars / totalChars : 0
    setOverallProgress(overall)
    
    if (onProgress) {
      onProgress(overall)
    }
  }, [chunkText, chunkProgress, currentChunkIndex, chunks, totalChars, onProgress])
  
  // Handle chunk completion
  useEffect(() => {
    if (chunkComplete && currentChunkIndex < chunks.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentChunkIndex(i => i + 1)
      }, chunkDelay)
      
      return () => clearTimeout(timeout)
    } else if (chunkComplete && currentChunkIndex === chunks.length - 1) {
      setIsComplete(true)
      setIsStreaming(false)
      
      if (onComplete) {
        onComplete()
      }
    }
  }, [chunkComplete, currentChunkIndex, chunks.length, chunkDelay, onComplete])
  
  // Start streaming
  useEffect(() => {
    if (autoStart && chunks.length > 0 && !isStreaming && !isComplete) {
      setIsStreaming(true)
      startChunk()
    }
  }, [chunks, autoStart, isStreaming, isComplete, startChunk])
  
  const start = useCallback(() => {
    if (isComplete) {
      reset()
      setTimeout(() => {
        setIsStreaming(true)
        startChunk()
      }, 100)
    } else {
      setIsStreaming(true)
      startChunk()
    }
  }, [isComplete, reset, startChunk])
  
  const pause = useCallback(() => {
    setIsStreaming(false)
    pauseChunk()
  }, [pauseChunk])
  
  const reset = useCallback(() => {
    setCurrentChunkIndex(0)
    setDisplayedText('')
    setIsComplete(false)
    setIsStreaming(false)
    setOverallProgress(0)
    resetChunk()
  }, [resetChunk])
  
  return {
    displayedText,
    currentChunkIndex,
    isStreaming,
    isComplete,
    overallProgress,
    chunkProgress,
    start,
    pause,
    reset
  }
}

export default useStreaming
