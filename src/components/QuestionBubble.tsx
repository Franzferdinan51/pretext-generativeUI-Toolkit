/**
 * QuestionBubble - Q&A bubble component
 */

import React, { useState } from 'react'

export interface QuestionBubbleProps {
  content: string
  answer?: string
  showAnswer?: boolean
  allowReveal?: boolean
  onReveal?: () => void
  councilor?: {
    name: string
    color: string
    avatar?: string
  }
  className?: string
  style?: React.CSSProperties
}

/**
 * QuestionBubble component
 */
export const QuestionBubble: React.FC<QuestionBubbleProps> = ({
  content,
  answer,
  showAnswer = false,
  allowReveal = true,
  onReveal,
  councilor,
  className,
  style
}) => {
  const [revealed, setRevealed] = useState(showAnswer || !allowReveal)
  
  const handleReveal = () => {
    if (!revealed) {
      setRevealed(true)
      if (onReveal) onReveal()
    }
  }
  
  return (
    <div
      className={className}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Question */}
      <div style={{
        padding: '16px 20px',
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
        borderRadius: '16px 16px 0 0',
        border: '1px solid rgba(6, 182, 212, 0.3)',
        borderBottom: answer && !revealed ? 'none' : '1px solid rgba(6, 182, 212, 0.3)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            flexShrink: 0
          }}>
            ?
          </div>
          
          <div style={{ flex: 1 }}>
            <div style={{
              color: '#06b6d4',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '6px'
            }}>
              Question
              {councilor && (
                <span style={{
                  color: '#6b7280',
                  fontWeight: 400,
                  marginLeft: '8px'
                }}>
                  from {councilor.name}
                </span>
              )}
            </div>
            
            <div style={{
              color: '#e5e7eb',
              fontSize: '15px',
              lineHeight: 1.5,
              fontWeight: 500
            }}>
              {content}
            </div>
          </div>
        </div>
      </div>
      
      {/* Answer */}
      {answer && (
        <div style={{
          padding: '16px 20px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: revealed ? '0 0 16px 16px' : 0,
          border: '1px solid rgba(6, 182, 212, 0.3)',
          borderTop: revealed ? 'none' : '1px dashed rgba(6, 182, 212, 0.3)',
          transition: 'all 0.3s ease'
        }}>
          {revealed ? (
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                flexShrink: 0
              }}>
                💡
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{
                  color: '#10b981',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '6px'
                }}>
                  Answer
                </div>
                
                <div style={{
                  color: '#e5e7eb',
                  fontSize: '14px',
                  lineHeight: 1.6
                }}>
                  {answer}
                </div>
              </div>
            </div>
          ) : allowReveal ? (
            <button
              onClick={handleReveal}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px dashed rgba(6, 182, 212, 0.5)',
                background: 'rgba(6, 182, 212, 0.05)',
                color: '#06b6d4',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <span>👆</span>
              <span>Click to reveal answer</span>
            </button>
          ) : (
            <div style={{
              color: '#6b7280',
              textAlign: 'center',
              fontSize: '13px',
              fontStyle: 'italic'
            }}>
              Answer hidden
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default QuestionBubble
