/**
 * AIGenerator - AI-powered component generation
 */

import React, { useState, useCallback, useMemo } from 'react'
import { detectContentType, ContentType, DetectionResult } from './ContentDetector'

// Types
export interface GeneratorOptions {
  includeVote?: boolean
  includeCode?: boolean
  includeCharts?: boolean
  streaming?: boolean
}

export interface GeneratedComponent {
  type: ContentType
  props: Record<string, any>
  children?: React.ReactNode
}

export interface AIGeneratorProps {
  content: string
  options?: GeneratorOptions
  onComponentGenerated?: (component: GeneratedComponent) => void
  councilor?: {
    name: string
    color: string
    avatar?: string
  }
  className?: string
  style?: React.CSSProperties
}

/**
 * Generate component props based on content type
 */
export function generateComponentProps(
  content: string,
  type: ContentType,
  detection: DetectionResult
): Record<string, any> {
  const baseProps: Record<string, any> = {
    content,
    confidence: detection.confidence
  }
  
  switch (type) {
    case 'vote':
      return {
        ...baseProps,
        options: extractVoteOptions(content),
        showResults: false
      }
    
    case 'code':
      return {
        ...baseProps,
        language: detection.metadata?.language || 'plain',
        showLineNumbers: true,
        theme: 'dark'
      }
    
    case 'list':
      return {
        ...baseProps,
        items: extractListItems(content),
        style: detection.metadata?.style || 'bullet'
      }
    
    case 'table':
      return {
        ...baseProps,
        headers: extractTableHeaders(content),
        rows: extractTableRows(content)
      }
    
    case 'chart':
      return {
        ...baseProps,
        chartType: detectChartType(content),
        data: extractChartData(content)
      }
    
    case 'question':
      return {
        ...baseProps,
        question: content,
        showAnswer: false
      }
    
    case 'summary':
      return {
        ...baseProps,
        points: extractSummaryPoints(content)
      }
    
    default:
      return baseProps
  }
}

/**
 * Extract vote options from content
 */
function extractVoteOptions(content: string): string[] {
  const options: string[] = []
  const lines = content.split('\n')
  
  for (const line of lines) {
    const match = line.match(/^[-*•]?\s*\[?\s*\d+\s*\]?\s*(.+)$/)
    if (match) {
      options.push(match[1].trim())
    }
  }
  
  return options.length > 0 ? options : ['Yes', 'No', 'Abstain']
}

/**
 * Extract list items from content
 */
function extractListItems(content: string): string[] {
  const items: string[] = []
  const lines = content.split('\n')
  
  for (const line of lines) {
    const match = line.match(/^(\d+\.|[-*•])\s+(.+)$/)
    if (match) {
      items.push(match[2].trim())
    }
  }
  
  return items
}

/**
 * Extract table headers from markdown table
 */
function extractTableHeaders(content: string): string[] {
  const lines = content.split('\n').filter(l => l.trim())
  
  if (lines.length < 2) return []
  
  const headerLine = lines.find(l => /^\|/.test(l))
  if (!headerLine) return []
  
  return headerLine
    .split('|')
    .filter(h => h.trim() && !/^-+$/.test(h.trim()))
    .map(h => h.trim())
}

/**
 * Extract table rows from markdown table
 */
function extractTableRows(content: string): string[][] {
  const lines = content.split('\n').filter(l => l.trim() && /^\|/.test(l))
  const rows: string[][] = []
  
  for (let i = 1; i < lines.length; i++) {
    // Skip separator line
    if (/^\|[-:\s]+\|$/.test(lines[i])) continue
    
    const row = lines[i]
      .split('|')
      .filter(c => c.trim())
      .map(c => c.trim())
    
    if (row.length > 0) {
      rows.push(row)
    }
  }
  
  return rows
}

/**
 * Detect chart type from content
 */
function detectChartType(content: string): 'bar' | 'line' | 'pie' | 'scatter' {
  const lower = content.toLowerCase()
  
  if (/bar|compare|category/i.test(lower)) return 'bar'
  if (/line|trend|time|over/i.test(lower)) return 'line'
  if (/pie|distribution|percentage/i.test(lower)) return 'pie'
  return 'scatter'
}

/**
 * Extract chart data from content
 */
function extractChartData(content: string): Array<{ label: string; value: number }> {
  const data: Array<{ label: string; value: number }> = []
  const numberRegex = /(\w+):\s*(\d+\.?\d*)/g
  let match
  
  while ((match = numberRegex.exec(content)) !== null) {
    data.push({
      label: match[1],
      value: parseFloat(match[2])
    })
  }
  
  return data
}

/**
 * Extract summary points from content
 */
function extractSummaryPoints(content: string): string[] {
  const points: string[] = []
  const lines = content.split('\n')
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (
      trimmed &&
      !/^(in summary|to summarize|in conclusion|key points):/i.test(trimmed)
    ) {
      // Remove leading bullet or number
      const cleaned = trimmed.replace(/^[-*•]?\s*\d+\.\s*/, '')
      if (cleaned) {
        points.push(cleaned)
      }
    }
  }
  
  return points
}

/**
 * AIGenerator component
 */
export const AIGenerator: React.FC<AIGeneratorProps> = ({
  content,
  options = {},
  onComponentGenerated,
  councilor,
  className,
  style
}) => {
  const [selectedType, setSelectedType] = useState<ContentType | 'auto'>('auto')
  
  // Detect content type
  const detection = useMemo(() => detectContentType(content), [content])
  const type = selectedType === 'auto' ? detection.type : selectedType
  
  // Generate component props
  const componentProps = useMemo(
    () => generateComponentProps(content, type, detection),
    [content, type, detection]
  )
  
  // Notify parent of generated component
  React.useEffect(() => {
    if (onComponentGenerated) {
      onComponentGenerated({
        type,
        props: componentProps
      })
    }
  }, [type, componentProps, onComponentGenerated])
  
  // Render appropriate component based on type
  const renderComponent = useCallback(() => {
    const { SmartMessage, VoteCard, CodeBlock, ListCard, DataTable, DataChart, QuestionBubble, SummaryCard } = require('../components')
    
    const props = {
      ...componentProps,
      councilor,
      streaming: options.streaming
    }
    
    switch (type) {
      case 'vote':
        return <VoteCard {...props} />
      case 'code':
        return <CodeBlock {...props} />
      case 'list':
        return <ListCard {...props} />
      case 'table':
        return <DataTable {...props} />
      case 'chart':
        return <DataChart {...props} />
      case 'question':
        return <QuestionBubble {...props} />
      case 'summary':
        return <SummaryCard {...props} />
      default:
        return <SmartMessage {...props} />
    }
  }, [type, componentProps, councilor, options.streaming])
  
  return (
    <div className={className} style={style}>
      {renderComponent()}
    </div>
  )
}

/**
 * Use AI component generation hook
 */
export function useAIGeneration(options: GeneratorOptions = {}) {
  const [content, setContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const detection = useMemo(() => detectContentType(content), [content])
  const componentProps = useMemo(
    () => generateComponentProps(content, detection.type, detection),
    [content, detection]
  )
  
  const generate = useCallback((text: string) => {
    setIsGenerating(true)
    setContent(text)
    
    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false)
    }, 100)
  }, [])
  
  return {
    content,
    detection,
    componentProps,
    isGenerating,
    generate
  }
}

export default AIGenerator
