/**
 * ModeSelector - AI-powered deliberation mode selection
 */

import React, { useState, useMemo, useCallback } from 'react'

// Types
export type DeliberationMode =
  | 'legislative'
  | 'research'
  | 'coding'
  | 'creative'
  | 'general'

export interface ModeOption {
  mode: DeliberationMode
  label: string
  description: string
  icon: string
  color: string
  defaultCouncilors?: number
}

export interface ModeSelectorProps {
  selectedMode?: DeliberationMode
  onModeChange?: (mode: DeliberationMode) => void
  showDescription?: boolean
  className?: string
  style?: React.CSSProperties
}

/**
 * Mode options configuration
 */
const MODE_OPTIONS: ModeOption[] = [
  {
    mode: 'legislative',
    label: 'Legislative',
    description: 'Debate proposals, vote on policies, reach consensus',
    icon: '⚖️',
    color: '#f59e0b',
    defaultCouncilors: 5
  },
  {
    mode: 'research',
    label: 'Deep Research',
    description: 'Multi-vector investigation, fact-finding, analysis',
    icon: '🔬',
    color: '#3b82f6',
    defaultCouncilors: 3
  },
  {
    mode: 'coding',
    label: 'Swarm Coding',
    description: 'Parallel software development, code review',
    icon: '💻',
    color: '#8b5cf6',
    defaultCouncilors: 4
  },
  {
    mode: 'creative',
    label: 'Creative',
    description: 'Brainstorming, ideation, creative writing',
    icon: '🎨',
    color: '#ec4899',
    defaultCouncilors: 3
  },
  {
    mode: 'general',
    label: 'General',
    description: 'Open discussion, Q&A, general advice',
    icon: '💬',
    color: '#6b7280',
    defaultCouncilors: 3
  }
]

/**
 * Detect optimal mode from input
 */
export function detectOptimalMode(input: string): DeliberationMode {
  const lower = input.toLowerCase()
  
  // Legislative keywords
  if (/\b(vote|proposal|bill|law|policy|amendment|regulation|legislat|congress|parliament)\b/.test(lower)) {
    return 'legislative'
  }
  
  // Research keywords
  if (/\b(research|study|investigate|analyze|fact|evidence|data|report|survey)\b/.test(lower)) {
    return 'research'
  }
  
  // Coding keywords
  if (/\b(code|program|implement|function|class|api|algorithm|bug|feature|refactor)\b/.test(lower)) {
    return 'coding'
  }
  
  // Creative keywords
  if (/\b(brainstorm|ideas?|creative|design|innovat|imagine|story|art)\b/.test(lower)) {
    return 'creative'
  }
  
  return 'general'
}

/**
 * Get mode option by mode type
 */
export function getModeOption(mode: DeliberationMode): ModeOption {
  return MODE_OPTIONS.find(m => m.mode === mode) || MODE_OPTIONS[4]
}

/**
 * ModeSelector component
 */
export const ModeSelector: React.FC<ModeSelectorProps> = ({
  selectedMode = 'general',
  onModeChange,
  showDescription = true,
  className,
  style
}) => {
  const handleSelect = useCallback((mode: DeliberationMode) => {
    if (onModeChange) {
      onModeChange(mode)
    }
  }, [onModeChange])
  
  return (
    <div className={className} style={style}>
      <div style={{
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap'
      }}>
        {MODE_OPTIONS.map(option => (
          <button
            key={option.mode}
            onClick={() => handleSelect(option.mode)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: selectedMode === option.mode
                ? `2px solid ${option.color}`
                : '2px solid transparent',
              background: selectedMode === option.mode
                ? `${option.color}20`
                : 'rgba(255, 255, 255, 0.05)',
              color: selectedMode === option.mode ? option.color : '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              fontSize: '14px',
              fontWeight: selectedMode === option.mode ? 600 : 400
            }}
          >
            <span>{option.icon}</span>
            <span>{option.label}</span>
          </button>
        ))}
      </div>
      
      {showDescription && (
        <div style={{
          marginTop: '12px',
          padding: '12px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#9ca3af'
        }}>
          {getModeOption(selectedMode).description}
        </div>
      )}
    </div>
  )
}

/**
 * AutoModeSelector - Automatically detects and selects mode
 */
export interface AutoModeSelectorProps extends Omit<ModeSelectorProps, 'selectedMode' | 'onModeChange'> {
  input: string
  onAutoSelect?: (mode: DeliberationMode) => void
}

export const AutoModeSelector: React.FC<AutoModeSelectorProps> = ({
  input,
  onAutoSelect,
  ...props
}) => {
  const detectedMode = useMemo(() => detectOptimalMode(input), [input])
  
  React.useEffect(() => {
    if (onAutoSelect) {
      onAutoSelect(detectedMode)
    }
  }, [detectedMode, onAutoSelect])
  
  return (
    <ModeSelector
      selectedMode={detectedMode}
      {...props}
    />
  )
}

/**
 * Hook for mode selection
 */
export function useModeSelector(initialMode: DeliberationMode = 'general') {
  const [selectedMode, setSelectedMode] = useState<DeliberationMode>(initialMode)
  const [input, setInput] = useState('')
  
  const detectedMode = useMemo(() => {
    if (!input) return selectedMode
    return detectOptimalMode(input)
  }, [input, selectedMode])
  
  return {
    selectedMode,
    setSelectedMode,
    input,
    setInput,
    detectedMode,
    option: getModeOption(selectedMode),
    detectMode: detectOptimalMode
  }
}

export default ModeSelector
