/**
 * SmartMessage - AI content type detection and rendering
 */

import React, { useMemo, useCallback } from 'react'
import { detectContentType, ContentType, getContentTypeColor, getContentTypeIcon } from '../ai/ContentDetector'
import { VoteCard } from './VoteCard'
import { CodeBlock } from './CodeBlock'
import { DataTable } from './DataTable'
import { DataChart } from './DataChart'
import { ListCard } from './ListCard'
import { SummaryCard } from './SummaryCard'
import { QuestionBubble } from './QuestionBubble'

// Types
export interface SmartMessageProps {
  content: string
  councilor?: {
    name: string
    color: string
    avatar?: string
  }
  streaming?: boolean
  showIcon?: boolean
  showTimestamp?: boolean
  timestamp?: Date
  className?: string
  style?: React.CSSProperties
}

export interface NormalMessageProps extends SmartMessageProps {
  onImageLoad?: () => void
}

const NormalMessage: React.FC<NormalMessageProps> = ({
  content,
  councilor,
  showIcon = true,
  timestamp,
  className,
  style
}) => {
  const timeString = timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  
  return (
    <div
      className={className}
      style={{
        padding: '12px 16px',
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        ...style
      }}
    >
      {/* Header */}
      {councilor && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px'
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
          {timeString && (
            <span style={{
              fontSize: '11px',
              color: '#6b7280',
              marginLeft: 'auto'
            }}>
              {timeString}
            </span>
          )}
        </div>
      )}
      
      {/* Content */}
      <div style={{
        fontSize: '15px',
        lineHeight: 1.5,
        color: '#e5e7eb',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
      }}>
        {content}
      </div>
    </div>
  )
}

/**
 * SmartMessage - Automatically detects content type and renders appropriately
 */
export const SmartMessage: React.FC<SmartMessageProps> = ({
  content,
  councilor,
  streaming = false,
  showIcon = true,
  timestamp,
  className,
  style
}) => {
  const detection = useMemo(() => detectContentType(content), [content])
  const type = detection.type
  const icon = showIcon ? getContentTypeIcon(type) : null
  const color = getContentTypeColor(type)
  
  // Render specific components
  const renderContent = useCallback(() => {
    switch (type) {
      case 'vote':
        return <VoteCard content={content} councilor={councilor} />
      
      case 'code':
        return (
          <CodeBlock
            content={content}
            language={detection.metadata?.language}
            councilor={councilor}
          />
        )
      
      case 'list':
        return (
          <ListCard
            content={content}
            style={detection.metadata?.style}
            councilor={councilor}
          />
        )
      
      case 'table':
        return (
          <DataTable
            content={content}
            headers={detection.metadata?.headers}
            councilor={councilor}
          />
        )
      
      case 'chart':
        return (
          <DataChart
            content={content}
            chartType={detection.metadata?.chartType}
            councilor={councilor}
          />
        )
      
      case 'question':
        return (
          <QuestionBubble
            content={content}
            councilor={councilor}
          />
        )
      
      case 'summary':
        return (
          <SummaryCard
            content={content}
            councilor={councilor}
          />
        )
      
      case 'error':
        return (
          <div style={{
            padding: '12px 16px',
            borderRadius: '12px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#fca5a5'
          }}>
            <div style={{ marginBottom: '4px' }}>❌ Error</div>
            <div style={{ color: '#e5e7eb' }}>{content}</div>
          </div>
        )
      
      case 'warning':
        return (
          <div style={{
            padding: '12px 16px',
            borderRadius: '12px',
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            color: '#fcd34d'
          }}>
            <div style={{ marginBottom: '4px' }}>⚠️ Warning</div>
            <div style={{ color: '#e5e7eb' }}>{content}</div>
          </div>
        )
      
      case 'success':
        return (
          <div style={{
            padding: '12px 16px',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#6ee7b7'
          }}>
            <div style={{ marginBottom: '4px' }}>✅ Success</div>
            <div style={{ color: '#e5e7eb' }}>{content}</div>
          </div>
        )
      
      case 'info':
        return (
          <div style={{
            padding: '12px 16px',
            borderRadius: '12px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            color: '#93c5fd'
          }}>
            <div style={{ marginBottom: '4px' }}>ℹ️ Info</div>
            <div style={{ color: '#e5e7eb' }}>{content}</div>
          </div>
        )
      
      default:
        return (
          <NormalMessage
            content={content}
            councilor={councilor}
            showIcon={showIcon}
            timestamp={timestamp}
          />
      )
    }
  }, [type, content, councilor, showIcon, timestamp, detection])
  
  return (
    <div className={className} style={style}>
      {/* Type indicator */}
      {type !== 'normal' && type !== 'success' && type !== 'error' && type !== 'warning' && type !== 'info' && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '6px',
          fontSize: '12px',
          color
        }}>
          <span>{icon}</span>
          <span style={{
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 600
          }}>
            {type}
          </span>
        </div>
      )}
      
      {renderContent()}
    </div>
  )
}

export default SmartMessage
