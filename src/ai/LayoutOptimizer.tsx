/**
 * LayoutOptimizer - AI-powered layout optimization
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react'

// Types
export interface LayoutSuggestion {
  type: 'grid' | 'stack' | 'masonry' | 'adaptive' | 'split'
  config: Record<string, any>
  reason: string
  score: number
}

export interface LayoutContext {
  contentLength: number
  contentTypes: string[]
  viewportWidth: number
  viewportHeight: number
  itemCount: number
  hasMixedMedia: boolean
}

export interface LayoutOptimizerProps {
  children?: React.ReactNode
  context: LayoutContext
  onSuggestion?: (suggestion: LayoutSuggestion) => void
  className?: string
  style?: React.CSSProperties
}

/**
 * Analyze content and suggest optimal layout
 */
export function analyzeLayout(context: LayoutContext): LayoutSuggestion[] {
  const suggestions: LayoutSuggestion[] = []
  
  // Grid layout for uniform content
  if (context.itemCount > 3 && !context.hasMixedMedia) {
    suggestions.push({
      type: 'grid',
      config: {
        columns: Math.min(context.itemCount, 4),
        gap: 16
      },
      reason: 'Grid layout works well for multiple uniform items',
      score: 0.9
    })
  }
  
  // Masonry for mixed height content
  if (context.hasMixedMedia || context.contentTypes.length > 2) {
    suggestions.push({
      type: 'masonry',
      config: {
        columns: context.viewportWidth > 768 ? 3 : 2,
        gap: 16
      },
      reason: 'Masonry handles variable-height content gracefully',
      score: 0.85
    })
  }
  
  // Adaptive for responsive needs
  if (context.viewportWidth < 600) {
    suggestions.push({
      type: 'adaptive',
      config: {
        breakpoints: [
          { minWidth: 1200, columns: 4 },
          { minWidth: 900, columns: 3 },
          { minWidth: 600, columns: 2 },
          { minWidth: 0, columns: 1 }
        ]
      },
      reason: 'Adaptive layout ensures good mobile experience',
      score: 0.95
    })
  }
  
  // Stack for long-form content
  if (context.contentLength > 2000 || context.itemCount <= 2) {
    suggestions.push({
      type: 'stack',
      config: {
        direction: 'column',
        gap: 16,
        align: 'stretch'
      },
      reason: 'Stack layout is best for long-form or minimal content',
      score: 0.8
    })
  }
  
  // Split for comparison content
  if (context.contentTypes.includes('table') && context.itemCount === 2) {
    suggestions.push({
      type: 'split',
      config: {
        direction: 'row',
        ratio: [1, 1],
        gap: 24
      },
      reason: 'Split view allows easy comparison of two items',
      score: 0.88
    })
  }
  
  // Sort by score
  return suggestions.sort((a, b) => b.score - a.score)
}

/**
 * Get best layout suggestion
 */
export function getBestLayout(context: LayoutContext): LayoutSuggestion {
  const suggestions = analyzeLayout(context)
  return suggestions[0] || {
    type: 'stack',
    config: { direction: 'column', gap: 16 },
    reason: 'Default to stack layout',
    score: 0.5
  }
}

/**
 * Calculate optimal grid columns
 */
export function calculateOptimalColumns(
  viewportWidth: number,
  itemCount: number,
  minItemWidth = 200,
  maxItemWidth = 400
): number {
  const optimalWidth = Math.max(minItemWidth, Math.min(maxItemWidth, viewportWidth / itemCount))
  return Math.max(1, Math.floor(viewportWidth / optimalWidth))
}

/**
 * LayoutOptimizer component
 */
export const LayoutOptimizer: React.FC<LayoutOptimizerProps> = ({
  children,
  context,
  onSuggestion,
  className,
  style
}) => {
  const [suggestion, setSuggestion] = useState<LayoutSuggestion | null>(null)
  
  // Analyze and get best suggestion
  useEffect(() => {
    const best = getBestLayout(context)
    setSuggestion(best)
    
    if (onSuggestion) {
      onSuggestion(best)
    }
  }, [context, onSuggestion])
  
  // Apply suggested layout
  const renderLayout = useCallback(() => {
    if (!suggestion) return children
    
    const { PretextLayout, StackLayout, GridLayout, MasonryLayout, AdaptiveLayout } = require('../pretext')
    
    switch (suggestion.type) {
      case 'grid':
        return (
          <GridLayout
            columns={suggestion.config.columns}
            gap={suggestion.config.gap}
          >
            {children}
          </GridLayout>
        )
      
      case 'masonry':
        return (
          <MasonryLayout
            columns={suggestion.config.columns}
            gap={suggestion.config.gap}
          >
            {children}
          </MasonryLayout>
        )
      
      case 'adaptive':
        return (
          <AdaptiveLayout
            breakpoints={suggestion.config.breakpoints}
            gap={suggestion.config.gap}
          >
            {children}
          </AdaptiveLayout>
        )
      
      case 'split':
        return (
          <StackLayout
            direction={suggestion.config.direction}
            gap={suggestion.config.gap}
            justify="space-between"
          >
            {children}
          </StackLayout>
        )
      
      case 'stack':
      default:
        return (
          <StackLayout
            direction={suggestion.config.direction || 'column'}
            gap={suggestion.config.gap || 16}
            align={suggestion.config.align || 'stretch'}
          >
            {children}
          </StackLayout>
        )
    }
  }, [suggestion, children])
  
  return (
    <div className={className} style={style}>
      {renderLayout()}
    </div>
  )
}

/**
 * Hook for layout optimization
 */
export function useLayoutOptimizer(context: LayoutContext) {
  const suggestions = useMemo(() => analyzeLayout(context), [context])
  const best = useMemo(() => getBestLayout(context), [context])
  
  return {
    suggestions,
    best,
    getSuggestion: (type: LayoutSuggestion['type']) =>
      suggestions.find(s => s.type === type) || best,
    calculateColumns: (minWidth?: number, maxWidth?: number) =>
      calculateOptimalColumns(context.viewportWidth, context.itemCount, minWidth, maxWidth)
  }
}

export default LayoutOptimizer
