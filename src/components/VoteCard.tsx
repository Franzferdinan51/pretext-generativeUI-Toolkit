/**
 * VoteCard - Voting UI component
 */

import React, { useState, useMemo, useCallback } from 'react'

export interface VoteOption {
  id: string
  label: string
  votes?: number
  percentage?: number
}

export interface VoteCardProps {
  content: string
  options?: VoteOption[]
  showResults?: boolean
  allowMultiple?: boolean
  onVote?: (selectedIds: string[]) => void
  onComplete?: () => void
  councilor?: {
    name: string
    color: string
    avatar?: string
  }
  className?: string
  style?: React.CSSProperties
}

/**
 * Parse vote options from content
 */
function parseVoteOptions(content: string): VoteOption[] {
  const options: VoteOption[] = []
  const lines = content.split('\n')
  
  for (const line of lines) {
    const match = line.match(/^[-*•]?\s*\[?\s*(\d+)\s*\]?\s*(.+)$/)
    if (match) {
      options.push({
        id: match[1],
        label: match[2].trim()
      })
    }
  }
  
  // If no parsed options, provide defaults
  if (options.length === 0) {
    return [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
      { id: 'abstain', label: 'Abstain' }
    ]
  }
  
  return options
}

/**
 * VoteCard component
 */
export const VoteCard: React.FC<VoteCardProps> = ({
  content,
  options: initialOptions,
  showResults = false,
  allowMultiple = false,
  onVote,
  onComplete,
  councilor,
  className,
  style
}) => {
  const [selected, setSelected] = useState<string[]>([])
  const [hasVoted, setHasVoted] = useState(false)
  const [voteCounts, setVoteCounts] = useState<Record<string, number>>({})
  
  const options = useMemo(
    () => initialOptions || parseVoteOptions(content),
    [content, initialOptions]
  )
  
  const totalVotes = useMemo(
    () => Object.values(voteCounts).reduce((sum, count) => sum + count, 0),
    [voteCounts]
  )
  
  const handleSelect = useCallback((optionId: string) => {
    if (hasVoted) return
    
    setSelected(prev => {
      if (allowMultiple) {
        const newSelected = prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
        
        if (onVote) {
          onVote(newSelected)
        }
        
        return newSelected
      } else {
        const newSelected = [optionId]
        
        if (onVote) {
          onVote(newSelected)
        }
        
        // Auto-submit single vote
        setTimeout(() => {
          setHasVoted(true)
          if (onComplete) onComplete()
        }, 500)
        
        return newSelected
      }
    })
  }, [hasVoted, allowMultiple, onVote, onComplete])
  
  const handleSubmit = useCallback(() => {
    if (selected.length === 0) return
    
    // Simulate vote submission
    const newCounts = { ...voteCounts }
    selected.forEach(id => {
      newCounts[id] = (newCounts[id] || 0) + 1
    })
    
    setVoteCounts(newCounts)
    setHasVoted(true)
    
    if (onComplete) {
      onComplete()
    }
  }, [selected, voteCounts, onComplete])
  
  const getPercentage = (optionId: string) => {
    const count = voteCounts[optionId] || 0
    return totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0
  }
  
  return (
    <div
      className={className}
      style={{
        padding: '16px',
        borderRadius: '12px',
        background: 'rgba(245, 158, 11, 0.05)',
        border: '1px solid rgba(245, 158, 11, 0.2)',
        ...style
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px'
      }}>
        <span style={{ fontSize: '20px' }}>🗳️</span>
        <span style={{
          fontWeight: 600,
          color: '#f59e0b',
          fontSize: '16px'
        }}>
          Vote
        </span>
        {councilor && (
          <>
            <span style={{ color: '#6b7280' }}>by</span>
            <span style={{
              color: councilor.color,
              fontWeight: 600
            }}>
              {councilor.name}
            </span>
          </>
        )}
      </div>
      
      {/* Options */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {options.map(option => {
          const isSelected = selected.includes(option.id)
          const percentage = getPercentage(option.id)
          const showBar = showResults || hasVoted
          
          return (
            <div
              key={option.id}
              onClick={() => handleSelect(option.id)}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: isSelected
                  ? '2px solid #f59e0b'
                  : '2px solid rgba(255, 255, 255, 0.1)',
                background: isSelected
                  ? 'rgba(245, 158, 11, 0.1)'
                  : 'rgba(255, 255, 255, 0.03)',
                cursor: hasVoted ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Background bar */}
              {showBar && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${percentage}%`,
                  background: 'rgba(245, 158, 11, 0.2)',
                  transition: 'width 0.5s ease'
                }} />
              )}
              
              {/* Content */}
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  {/* Radio/checkbox indicator */}
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: allowMultiple ? '4px' : '50%',
                    border: isSelected ? '2px solid #f59e0b' : '2px solid #6b7280',
                    background: isSelected ? '#f59e0b' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {isSelected && (
                      <span style={{ color: '#fff', fontSize: '12px' }}>✓</span>
                    )}
                  </div>
                  
                  <span style={{
                    color: isSelected ? '#f59e0b' : '#e5e7eb',
                    fontWeight: isSelected ? 600 : 400
                  }}>
                    {option.label}
                  </span>
                </div>
                
                {/* Percentage */}
                {(showResults || hasVoted) && (
                  <span style={{
                    color: '#9ca3af',
                    fontSize: '14px',
                    fontWeight: 600
                  }}>
                    {percentage}%
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Submit button */}
      {allowMultiple && selected.length > 0 && !hasVoted && (
        <button
          onClick={handleSubmit}
          style={{
            marginTop: '16px',
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            background: '#f59e0b',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          Submit Vote ({selected.length})
        </button>
      )}
      
      {/* Vote count */}
      {(showResults || hasVoted) && totalVotes > 0 && (
        <div style={{
          marginTop: '12px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#6b7280'
        }}>
          {totalVotes} vote{totalVotes !== 1 ? 's' : ''} total
        </div>
      )}
    </div>
  )
}

export default VoteCard
