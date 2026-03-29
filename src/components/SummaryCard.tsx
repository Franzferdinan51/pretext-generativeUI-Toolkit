/**
 * SummaryCard - Summary/key points rendering component
 */

import React, { useMemo } from 'react'

export interface SummaryCardProps {
  content: string
  points?: string[]
  title?: string
  collapsible?: boolean
  defaultExpanded?: boolean
  onPointClick?: (point: string, index: number) => void
  councilor?: {
    name: string
    color: string
    avatar?: string
  }
  className?: string
  style?: React.CSSProperties
}

/**
 * Extract summary points from content
 */
function extractSummaryPoints(content: string): string[] {
  const points: string[] = []
  const lines = content.split('\n')
  
  for (const line of lines) {
    const trimmed = line.trim()
    
    // Skip header lines
    if (/^(in summary|to summarize|in conclusion|key points|bottom line):?/i.test(trimmed)) {
      continue
    }
    
    // Clean bullet points
    const cleaned = trimmed
      .replace(/^[-*•]\s*/, '')
      .replace(/^\d+\.\s*/, '')
      .trim()
    
    if (cleaned && cleaned.length > 5) {
      points.push(cleaned)
    }
  }
  
  return points
}

/**
 * SummaryCard component
 */
export const SummaryCard: React.FC<SummaryCardProps> = ({
  content,
  points: initialPoints,
  title = 'Summary',
  collapsible = false,
  defaultExpanded = true,
  onPointClick,
  councilor,
  className,
  style
}) => {
  const [expanded, setExpanded] = React.useState(defaultExpanded)
  
  const points = useMemo(
    () => initialPoints || extractSummaryPoints(content),
    [content, initialPoints]
  )
  
  return (
    <div
      className={className}
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        background: 'rgba(99, 102, 241, 0.03)',
        ...style
      }}
    >
      {/* Header */}
      <div
        onClick={collapsible ? () => setExpanded(e => !e) : undefined}
        style={{
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: collapsible ? 'pointer' : 'default',
          background: 'rgba(99, 102, 241, 0.05)',
          borderBottom: expanded ? '1px solid rgba(255,255,255,0.1)' : 'none'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '18px' }}>📝</span>
          <span style={{
            fontWeight: 600,
            color: '#6366f1',
            fontSize: '14px'
          }}>
            {title}
          </span>
          <span style={{
            color: '#6b7280',
            fontSize: '12px',
            marginLeft: '8px'
          }}>
            {points.length} point{points.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {councilor && (
            <span style={{
              color: '#6b7280',
              fontSize: '12px'
            }}>
              from {councilor.name}
            </span>
          )}
          
          {collapsible && (
            <span style={{
              color: '#6b7280',
              fontSize: '14px',
              transition: 'transform 0.2s ease',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)'
            }}>
              ▼
            </span>
          )}
        </div>
      </div>
      
      {/* Content */}
      {expanded && (
        <div style={{
          padding: '16px'
        }}>
          {points.map((point, index) => (
            <div
              key={index}
              onClick={() => onPointClick?.(point, index)}
              style={{
                display: 'flex',
                gap: '12px',
                padding: '10px 12px',
                marginBottom: index < points.length - 1 ? '8px' : 0,
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.03)',
                cursor: onPointClick ? 'pointer' : 'default',
                transition: 'background 0.2s ease'
              }}
            >
              {/* Number badge */}
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'rgba(99, 102, 241, 0.2)',
                color: '#6366f1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 600,
                flexShrink: 0
              }}>
                {index + 1}
              </div>
              
              {/* Text */}
              <div style={{
                flex: 1,
                color: '#e5e7eb',
                fontSize: '14px',
                lineHeight: 1.5
              }}>
                {point}
              </div>
            </div>
          ))}
          
          {points.length === 0 && (
            <div style={{
              color: '#6b7280',
              textAlign: 'center',
              padding: '20px'
            }}>
              No summary points available
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SummaryCard
