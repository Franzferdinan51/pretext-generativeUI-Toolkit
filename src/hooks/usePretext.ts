/**
 * usePretext - Hook for pretext text measurement
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'

export interface TextMeasurement {
  height: number
  lines: Array<{
    text: string
    x: number
    y: number
    width: number
    baseline: number
  }>
  totalWidth: number
}

export interface UsePretextOptions {
  font?: string
  maxWidth?: number
  lineHeight?: number
}

/**
 * Hook for measuring text without DOM reflow
 */
export function usePretext(
  text: string,
  options: UsePretextOptions = {}
): TextMeasurement | null {
  const { font = '16px Inter, system-ui, sans-serif', maxWidth = 500, lineHeight = 22 } = options
  
  const [measurement, setMeasurement] = useState<TextMeasurement | null>(null)
  
  useEffect(() => {
    if (!text) {
      setMeasurement(null)
      return
    }
    
    // Create offscreen canvas for measurement
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.font = font
    
    const lines: TextMeasurement['lines'] = []
    const paragraphs = text.split('\n')
    let y = lineHeight
    let maxTotalWidth = 0
    
    for (const paragraph of paragraphs) {
      if (paragraph.trim() === '') {
        y += lineHeight * 0.5
        continue
      }
      
      const words = paragraph.split(' ')
      let currentLine = ''
      let currentWidth = 0
      
      for (const word of words) {
        const wordWidth = ctx.measureText(word).width
        const testLine = currentLine ? `${currentLine} ${word}` : word
        const testWidth = ctx.measureText(testLine).width
        
        if (testWidth > maxWidth && currentLine) {
          lines.push({
            text: currentLine,
            x: 0,
            y,
            width: currentWidth,
            baseline: lineHeight * 0.85
          })
          maxTotalWidth = Math.max(maxTotalWidth, currentWidth)
          y += lineHeight
          currentLine = word
          currentWidth = wordWidth
        } else {
          currentLine = testLine
          currentWidth = testWidth
        }
      }
      
      if (currentLine) {
        lines.push({
          text: currentLine,
          x: 0,
          y,
          width: currentWidth,
          baseline: lineHeight * 0.85
        })
        maxTotalWidth = Math.max(maxTotalWidth, currentWidth)
        y += lineHeight
      }
    }
    
    setMeasurement({
      height: y,
      lines,
      totalWidth: maxTotalWidth
    })
  }, [text, font, maxWidth, lineHeight])
  
  return measurement
}

/**
 * Hook for streaming text with pretext measurement
 */
export function usePretextStream(
  text: string,
  options: UsePretextOptions & {
    speed?: number
    autoStart?: boolean
  } = {}
) {
  const { font = '16px Inter', maxWidth = 500, lineHeight = 22, speed = 20, autoStart = true } = options
  
  const [displayedText, setDisplayedText] = useState('')
  const [isStreaming, setIsStreaming] = useState(autoStart)
  const [progress, setProgress] = useState(0)
  
  const textRef = useRef(text)
  const indexRef = useRef(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // Update text when it changes
  useEffect(() => {
    textRef.current = text
    indexRef.current = 0
    setDisplayedText('')
    setProgress(0)
  }, [text])
  
  // Pre-measure final text
  const finalMeasurement = usePretext(text, { font, maxWidth, lineHeight })
  
  // Current measurement
  const currentMeasurement = usePretext(displayedText, { font, maxWidth, lineHeight })
  
  // Streaming logic
  useEffect(() => {
    if (!isStreaming || !textRef.current) return
    
    intervalRef.current = setInterval(() => {
      if (indexRef.current < textRef.current.length) {
        indexRef.current++
        setDisplayedText(textRef.current.slice(0, indexRef.current))
        setProgress(indexRef.current / textRef.current.length)
      } else {
        setIsStreaming(false)
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }, speed)
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isStreaming, speed])
  
  const start = useCallback(() => setIsStreaming(true), [])
  const pause = useCallback(() => setIsStreaming(false), [])
  const reset = useCallback(() => {
    setIsStreaming(false)
    indexRef.current = 0
    setDisplayedText('')
    setProgress(0)
  }, [])
  
  return {
    displayedText,
    isStreaming,
    progress,
    start,
    pause,
    reset,
    measurement: currentMeasurement,
    finalMeasurement,
    height: finalMeasurement?.height ?? 0
  }
}

export default usePretext
