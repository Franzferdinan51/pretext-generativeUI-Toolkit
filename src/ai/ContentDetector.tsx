/**
 * ContentDetector - AI-powered content type detection
 */

export type ContentType =
  | 'normal'
  | 'vote'
  | 'code'
  | 'list'
  | 'table'
  | 'chart'
  | 'question'
  | 'summary'
  | 'error'
  | 'warning'
  | 'success'
  | 'info'

export interface DetectionResult {
  type: ContentType
  confidence: number
  metadata?: Record<string, any>
}

/**
 * Detect content type from text
 */
export function detectContentType(content: string): DetectionResult {
  const trimmed = content.trim()
  
  if (!trimmed) {
    return { type: 'normal', confidence: 1 }
  }
  
  // Vote detection
  if (/<vote>|<\/vote>/i.test(trimmed) || /\b(vote|ayes?|nays?|motion|amendment)\b/i.test(trimmed)) {
    return {
      type: 'vote',
      confidence: 0.9,
      metadata: { hasVoteTags: /<vote>/i.test(trimmed) }
    }
  }
  
  // Code detection
  if (/```[\s\S]*?```/.test(trimmed) || /^`[\s\S]*`$/m.test(trimmed)) {
    const languageMatch = trimmed.match(/```(\w+)/)
    return {
      type: 'code',
      confidence: 0.95,
      metadata: { language: languageMatch?.[1] || 'plain' }
    }
  }
  
  // List detection
  if (/^(\d+\.|[-*•]|\•)\s/m.test(trimmed) || /^\[[\s|x]\]\s/m.test(trimmed)) {
    return {
      type: 'list',
      confidence: 0.85,
      metadata: { style: /^\d+\./.test(trimmed) ? 'numbered' : 'bullet' }
    }
  }
  
  // Table detection
  if (/^\|.*\|$/m.test(trimmed) && trimmed.split('\n').length >= 2) {
    return {
      type: 'table',
      confidence: 0.9,
      metadata: { rows: trimmed.split('\n').length }
    }
  }
  
  // Chart/data visualization detection
  if (/chart|graph|plot|diagram|visualization|data point|axis|series/i.test(trimmed)) {
    return {
      type: 'chart',
      confidence: 0.7,
      metadata: { keywords: ['chart', 'graph', 'plot'] }
    }
  }
  
  // Question detection
  if (/\?\s*$/.test(trimmed) || /^(what|who|where|when|why|how|should|could|would)\b/i.test(trimmed)) {
    return {
      type: 'question',
      confidence: 0.85,
      metadata: { endsWithQuestion: /\?$/.test(trimmed) }
    }
  }
  
  // Summary detection
  if (/in summary|to summarize|in conclusion|key points|main takeaways|bottom line/i.test(trimmed)) {
    return {
      type: 'summary',
      confidence: 0.8
    }
  }
  
  // Error detection
  if (/^error|failed|exception|uncaught|typeerror|referenceerror/i.test(trimmed)) {
    return {
      type: 'error',
      confidence: 0.9
    }
  }
  
  // Warning detection
  if (/^warning|warn|caution|notice|deprecated/i.test(trimmed)) {
    return {
      type: 'warning',
      confidence: 0.9
    }
  }
  
  // Success detection
  if (/^success|completed|done|saved|created|updated|installed/i.test(trimmed)) {
    return {
      type: 'success',
      confidence: 0.85
    }
  }
  
  // Info detection
  if (/^info|note|tip|hint|did you know/i.test(trimmed)) {
    return {
      type: 'info',
      confidence: 0.8
    }
  }
  
  return { type: 'normal', confidence: 1 }
}

/**
 * Detect multiple content types in mixed content
 */
export function detectMixedContent(content: string): DetectionResult[] {
  const results: DetectionResult[] = []
  const blocks = content.split(/\n\n+/)
  
  for (const block of blocks) {
    if (block.trim()) {
      results.push(detectContentType(block))
    }
  }
  
  return results
}

/**
 * Extract structured data from content
 */
export function extractStructuredData(content: string): {
  headings: string[]
  bulletPoints: string[]
  codeBlocks: string[]
  links: Array<{ text: string; url: string }>
  numbers: number[]
} {
  const headings: string[] = []
  const bulletPoints: string[] = []
  const codeBlocks: string[] = []
  const links: Array<{ text: string; url: string }> = []
  const numbers: number[] = []
  
  // Extract headings
  const headingRegex = /^#{1,6}\s+(.+)$/gm
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push(match[1])
  }
  
  // Extract bullet points
  const bulletRegex = /^[-*•]\s+(.+)$/gm
  while ((match = bulletRegex.exec(content)) !== null) {
    bulletPoints.push(match[1])
  }
  
  // Extract numbered items
  const numberedRegex = /^\d+\.\s+(.+)$/gm
  while ((match = numberedRegex.exec(content)) !== null) {
    bulletPoints.push(match[1])
  }
  
  // Extract code blocks
  const codeRegex = /```[\s\S]*?```/g
  while ((match = codeRegex.exec(content)) !== null) {
    codeBlocks.push(match[0])
  }
  
  // Extract links
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  while ((match = linkRegex.exec(content)) !== null) {
    links.push({ text: match[1], url: match[2] })
  }
  
  // Extract numbers
  const numberRegex = /\b\d+\.?\d*\b/g
  while ((match = numberRegex.exec(content)) !== null) {
    const num = parseFloat(match[0])
    if (!isNaN(num) && isFinite(num)) {
      numbers.push(num)
    }
  }
  
  return { headings, bulletPoints, codeBlocks, links, numbers }
}

/**
 * Get content type color
 */
export function getContentTypeColor(type: ContentType): string {
  const colors: Record<ContentType, string> = {
    normal: '#ffffff',
    vote: '#f59e0b',
    code: '#8b5cf6',
    list: '#3b82f6',
    table: '#10b981',
    chart: '#ec4899',
    question: '#06b6d4',
    summary: '#6366f1',
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    info: '#3b82f6'
  }
  
  return colors[type] || colors.normal
}

/**
 * Get content type icon
 */
export function getContentTypeIcon(type: ContentType): string {
  const icons: Record<ContentType, string> = {
    normal: '💬',
    vote: '🗳️',
    code: '💻',
    list: '📋',
    table: '📊',
    chart: '📈',
    question: '❓',
    summary: '📝',
    error: '❌',
    warning: '⚠️',
    success: '✅',
    info: 'ℹ️'
  }
  
  return icons[type] || icons.normal
}

export default detectContentType
