/**
 * StreamingCard - Streaming data card component
 */

import React, { useState, useEffect, useRef } from 'react'

export interface StreamingCardProps {
  content: string
  font?: string
  maxWidth?: number
  lineHeight?: number
  speed?: number
  showCursor?: boolean
  onComplete?: () => void
  onProgress?: (progress: number) => void
  councilor?: {
    name: string
    color: string
    avatar?: string
  }
  className?: string
  style?: React.CSSProperties
}

/**
 * StreamingCard component
 */
export const StreamingCard: React.FC<StreamingCardProps> = ({
  content,
  font = '16px Inter, system-ui, sans-serif',
  maxWidth = 500,
  lineHeight = 22,
  speed = 20,
  showCursor = true,
  onComplete,
  onProgress,
  councilor,
  className,
  style
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isStreaming, setIsStreaming] = useState(true)
  const [progress, setProgress] = useState(0)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Streaming effect
  useEffect(() => {
    if (!content) {
      setDisplayedText('')
      return
    }
    
    setDisplayedText('')
    setIsStreaming(true)
    setProgress(0)
    
    let index = 0
    
    const interval = setInterval(() => {
      if (index < content.length) {
        index++
        setDisplayedText(content.slice(0, index))
        setProgress(index / content.length)
        
        if (onProgress) {
          onProgress(index / content.length)
        }
      } else {
        setIsStreaming(false)
        clearInterval(interval)
        
        if (onComplete) {
          onComplete()
        }
      }
    }, speed)
    
    return () => clearInterval(interval)
  }, [content, speed, onComplete, onProgress])
  
  // Render on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !displayedText) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.font = font
    const metrics = ctx.measureText(displayedText)
    
    // Set canvas size
    canvas.width = Math.min(maxWidth, metrics.width + 40)
    canvas.height = lineHeight * 3
    
    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw text with word wrap
    const words = displayedText.split(' ')
    let line = ''
    let y = lineHeight
    const x = 20
    
    for (const word of words) {
      const testLine = line + word + ' '
      const testWidth = ctx.measureText(testLine).width
      
      if (testWidth > maxWidth - 40 && line) {
        ctx.fillText(line, x, y)
        line = word + ' '
        y += lineHeight
        
        if (y > canvas.height) break
      } else {
        line = testLine
      }
    }
    
    if (y <= canvas.height) {
      ctx.fillText(line, x, y)
    }
  }, [displayedText, font, maxWidth, lineHeight])
  
  return (
    <div
      className={className}
      style={{
        padding: '16px',
        borderRadius: '12px',
        background: councilor
          ? `linear-gradient(135deg, ${councilor.color}10 0%, rgba(255,255,255,0.05) 100%)`
          : 'rgba(255, 255, 255, 0.05)',
        border: councilor
          ? `1px solid ${councilor.color}30`
          : '1px solid rgba(255, 255, 255, 0.1)',
        ...style
      }}
    >
      {/* Header */}
      {councilor && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px'
        }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: councilor.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 600,
            color: '#fff'
          }}>
            {councilor.avatar || councilor.name.charAt(0)}
          </div>
          <span style={{
            fontWeight: 600,
            color: councilor.color,
            fontSize: '14px'
          }}>
            {councilor.name}
          </span>
          
          {isStreaming && (
            <span style={{
              marginLeft: 'auto',
              fontSize: '11px',
              color: '#6b7280',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#10b981',
                animation: 'pulse 1s infinite'
              }} />
              Streaming
            </span>
          )}
        </div>
      )}
      
      {/* Progress bar */}
      {isStreaming && (
        <div style={{
          height: '2px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '1px',
          marginBottom: '12px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: councilor?.color || '#8b5cf6',
            transition: 'width 0.1s linear'
          }} />
        </div>
      )}
      
      {/* Content */}
      <div style={{
        font,
        color: '#e5e7eb',
        lineHeight: `${lineHeight}px`,
        maxWidth: `${maxWidth}px`,
        minHeight: `${lineHeight * 2}px`
      }}>
        {displayedText}
        
        {isStreaming && showCursor && (
          <span style={{
            color: councilor?.color || '#8b5cf6',
            animation: 'blink 1s infinite'
          }}>
            ▋
          </span>
        )}
      </div>
      
      {/* Hidden canvas for measurement */}
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />
      
      {/* CSS for animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default StreamingCard
