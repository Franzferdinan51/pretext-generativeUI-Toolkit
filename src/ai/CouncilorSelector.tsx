/**
 * CouncilorSelector - AI-powered councilor selection for deliberation
 */

import React, { useState, useMemo, useCallback } from 'react'

// Types
export interface Councilor {
  id: string
  name: string
  title: string
  persona: string
  expertise: string[]
  color: string
  avatar?: string
  votingStyle?: 'analytical' | 'pragmatic' | 'idealistic' | 'cautious'
}

export interface CouncilorSelectorProps {
  availableCouncilors: Councilor[]
  selectedIds?: string[]
  maxSelections?: number
  minSelections?: number
  onSelectionChange?: (selected: Councilor[]) => void
  showExpertise?: boolean
  groupByExpertise?: boolean
  className?: string
  style?: React.CSSProperties
}

/**
 * Predefined councilor archetypes
 */
export const COUNCILOR_ARCHETYPES: Record<string, Omit<Councilor, 'id'>> = {
  analyst: {
    name: 'The Analyst',
    title: 'Data Strategist',
    persona: 'Logical, methodical, evidence-based decision maker',
    expertise: ['data analysis', 'statistics', 'research', 'problem solving'],
    color: '#3b82f6',
    votingStyle: 'analytical'
  },
  pragmatist: {
    name: 'The Pragmatist',
    title: 'Realist',
    persona: 'Practical, outcome-focused, cost-benefit driven',
    expertise: ['implementation', 'project management', 'risk assessment', 'resource allocation'],
    color: '#10b981',
    votingStyle: 'pragmatic'
  },
  creative: {
    name: 'The Creative',
    title: 'Innovation Specialist',
    persona: 'Imaginative, unconventional thinker, idea generator',
    expertise: ['brainstorming', 'design thinking', 'innovation', 'creative writing'],
    color: '#ec4899',
    votingStyle: 'idealistic'
  },
  skeptic: {
    name: 'The Skeptic',
    title: 'Critical Thinker',
    persona: 'Questioning, devil\'s advocate, risk identifier',
    expertise: ['critical thinking', 'risk analysis', 'quality assurance', 'security'],
    color: '#f59e0b',
    votingStyle: 'cautious'
  },
  ethicist: {
    name: 'The Ethicist',
    title: 'Moral Philosopher',
    persona: 'Principled, values-driven, fairness focused',
    expertise: ['ethics', 'philosophy', 'policy analysis', 'social impact'],
    color: '#6366f1',
    votingStyle: 'idealistic'
  },
  technologist: {
    name: 'The Technologist',
    title: 'Tech Visionary',
    persona: 'Forward-thinking, tech-savvy, innovation advocate',
    expertise: ['technology', 'software development', 'AI', 'digital transformation'],
    color: '#8b5cf6',
    votingStyle: 'analytical'
  }
}

/**
 * Select councilors based on context
 */
export function selectCouncilorsForContext(
  available: Councilor[],
  context: string,
  count: number = 3
): Councilor[] {
  const lowerContext = context.toLowerCase()
  const scored = available.map(councilor => {
    let score = 0
    
    // Check expertise match
    for (const expertise of councilor.expertise) {
      if (lowerContext.includes(expertise.toLowerCase())) {
        score += 2
      }
    }
    
    // Check persona keywords
    if (lowerContext.includes('data') && councilor.votingStyle === 'analytical') {
      score += 1
    }
    if (lowerContext.includes('risk') && councilor.votingStyle === 'cautious') {
      score += 1
    }
    if (lowerContext.includes('creative') && councilor.votingStyle === 'idealistic') {
      score += 1
    }
    
    // Diversity bonus - prefer different colors
    score += Math.random() * 0.5
    
    return { councilor, score }
  })
  
  // Sort by score and take top N
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(s => s.councilor)
}

/**
 * CouncilorSelector component
 */
export const CouncilorSelector: React.FC<CouncilorSelectorProps> = ({
  availableCouncilors,
  selectedIds = [],
  maxSelections = 5,
  minSelections = 1,
  onSelectionChange,
  showExpertise = true,
  groupByExpertise = false,
  className,
  style
}) => {
  const [internalSelected, setInternalSelected] = useState<string[]>(selectedIds)
  
  const selected = selectedIds.length > 0 ? selectedIds : internalSelected
  const setSelected = onSelectionChange
    ? (ids: string[]) => {
        setInternalSelected(ids)
        const councilors = availableCouncilors.filter(c => ids.includes(c.id))
        onSelectionChange(councilors)
      }
    : setInternalSelected
  
  const handleToggle = useCallback((id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter(s => s !== id)
      : selected.length < maxSelections
        ? [...selected, id]
        : selected
    
    if (newSelected.length >= minSelections || !selected.includes(id)) {
      setSelected(newSelected)
    }
  }, [selected, maxSelections, minSelections, setSelected])
  
  // Group councilors by expertise if enabled
  const groupedCouncilors = useMemo(() => {
    if (!groupByExpertise) return { ungrouped: availableCouncilors }
    
    const groups: Record<string, Councilor[]> = {}
    
    for (const councilor of availableCouncilors) {
      for (const expertise of councilor.expertise.slice(0, 2)) {
        if (!groups[expertise]) {
          groups[expertise] = []
        }
        groups[expertise].push(councilor)
      }
    }
    
    return groups
  }, [availableCouncilors, groupByExpertise])
  
  const renderCouncilor = (councilor: Councilor) => {
    const isSelected = selected.includes(councilor.id)
    
    return (
      <div
        key={councilor.id}
        onClick={() => handleToggle(councilor.id)}
        style={{
          padding: '12px',
          borderRadius: '8px',
          border: isSelected ? `2px solid ${councilor.color}` : '2px solid transparent',
          background: isSelected ? `${councilor.color}15` : 'rgba(255, 255, 255, 0.03)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start'
        }}
      >
        {/* Avatar */}
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: councilor.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 600,
          color: '#fff',
          flexShrink: 0
        }}>
          {councilor.avatar || councilor.name.charAt(0)}
        </div>
        
        {/* Info */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontWeight: 600,
            color: isSelected ? councilor.color : '#fff',
            marginBottom: '2px'
          }}>
            {councilor.name}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#9ca3af',
            marginBottom: showExpertise ? '6px' : 0
          }}>
            {councilor.title}
          </div>
          
          {showExpertise && (
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {councilor.expertise.slice(0, 3).map(exp => (
                <span
                  key={exp}
                  style={{
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#9ca3af'
                  }}
                >
                  {exp}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Selection indicator */}
        <div style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: `2px solid ${isSelected ? councilor.color : '#4b5563'}`,
          background: isSelected ? councilor.color : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          {isSelected && (
            <span style={{ color: '#fff', fontSize: '12px' }}>✓</span>
          )}
        </div>
      </div>
    )
  }
  
  return (
    <div className={className} style={style}>
      {/* Selection count indicator */}
      <div style={{
        marginBottom: '12px',
        fontSize: '13px',
        color: '#9ca3af'
      }}>
        Selected: {selected.length} / {maxSelections}
        {minSelections > 1 && ` (min: ${minSelections})`}
      </div>
      
      {/* Councilor list */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {Object.entries(groupedCouncilors).map(([group, councilors]) => (
          <div key={group}>
            {groupByExpertise && group !== 'ungrouped' && (
              <div style={{
                fontSize: '12px',
                color: '#6b7280',
                marginBottom: '4px',
                marginTop: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {group}
              </div>
            )}
            {Array.isArray(councilors) && councilors.map(renderCouncilor)}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Hook for councilor selection
 */
export function useCouncilorSelector(
  availableCouncilors: Councilor[],
  initialSelection: string[] = []
) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelection)
  
  const selectedCouncilors = useMemo(
    () => availableCouncilors.filter(c => selectedIds.includes(c.id)),
    [availableCouncilors, selectedIds]
  )
  
  const select = useCallback((id: string) => {
    setSelectedIds(prev => [...prev, id])
  }, [])
  
  const deselect = useCallback((id: string) => {
    setSelectedIds(prev => prev.filter(i => i !== id))
  }, [])
  
  const toggle = useCallback((id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }, [])
  
  const selectForContext = useCallback((context: string, count: number = 3) => {
    const selected = selectCouncilorsForContext(availableCouncilors, context, count)
    setSelectedIds(selected.map(c => c.id))
    return selected
  }, [availableCouncilors])
  
  const clear = useCallback(() => {
    setSelectedIds([])
  }, [])
  
  return {
    selectedIds,
    selectedCouncilors,
    select,
    deselect,
    toggle,
    selectForContext,
    clear,
    setSelectedIds
  }
}

export default CouncilorSelector
