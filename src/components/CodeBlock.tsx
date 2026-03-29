/**
 * CodeBlock - Syntax highlighted code component
 */

import React, { useState, useMemo, useCallback } from 'react'

export interface CodeBlockProps {
  content: string
  language?: string
  showLineNumbers?: boolean
  showCopyButton?: boolean
  theme?: 'dark' | 'light'
  maxHeight?: number
  onCopy?: () => void
  councilor?: {
    name: string
    color: string
    avatar?: string
  }
  className?: string
  style?: React.CSSProperties
}

/**
 * Language display names
 */
const LANGUAGE_NAMES: Record<string, string> = {
  js: 'JavaScript',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  py: 'Python',
  python: 'Python',
  rb: 'Ruby',
  ruby: 'Ruby',
  go: 'Go',
  rust: 'Rust',
  rs: 'Rust',
  java: 'Java',
  cpp: 'C++',
  c: 'C',
  cs: 'C#',
  csharp: 'C#',
  php: 'PHP',
  swift: 'Swift',
  kt: 'Kotlin',
  kotlin: 'Kotlin',
  tsx: 'TSX',
  jsx: 'JSX',
  html: 'HTML',
  css: 'CSS',
  sql: 'SQL',
  bash: 'Bash',
  sh: 'Shell',
  json: 'JSON',
  yaml: 'YAML',
  yml: 'YAML',
  xml: 'XML',
  md: 'Markdown',
  graphql: 'GraphQL',
  dockerfile: 'Dockerfile',
  plain: 'Plain Text'
}

/**
 * Simple syntax highlighting
 */
function highlightCode(code: string, language: string): string {
  // Remove code block markers
  let processed = code
    .replace(/^```\w*\n?/, '')
    .replace(/\n?```$/, '')
    .trim()
  
  // Apply basic highlighting based on language
  const patterns: Array<[RegExp, string]> = [
    // Strings
    [/(["'`])(?:(?!\1)[^\\]|\\.)*\1/g, 'token-string'],
    // Comments
    [/\/\/.*$/gm, 'token-comment'],
    [/\/\*[\s\S]*?\*\//g, 'token-comment'],
    [/#.*$/gm, 'token-comment'],
    // Keywords
    [/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|try|catch|throw|new|this|static|public|private|extends|implements)\b/g, 'token-keyword'],
    // Types
    [/\b(string|number|boolean|void|null|undefined|any|object|array|interface|type|enum)\b/g, 'token-type'],
    // Numbers
    [/\b\d+\.?\d*\b/g, 'token-number'],
    // Functions
    [/\b[a-zA-Z_]\w*(?=\s*\()/g, 'token-function'],
    // HTML tags
    [/<\/?[\w-]+/g, 'token-tag'],
    [/\/?>/g, 'token-tag'],
    // CSS properties
    [/[\w-]+(?=\s*:)/g, 'token-property']
  ]
  
  // Apply patterns
  const replacements: Array<{ pattern: RegExp; className: string }> = patterns.map(([pattern, className]) => ({
    pattern,
    className
  }))
  
  // Simple token replacement (in production, use a proper highlighter)
  for (const { pattern, className } of replacements) {
    processed = processed.replace(pattern, (match) => `<span class="${className}">${match}</span>`)
  }
  
  return processed
}

/**
 * CodeBlock component
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({
  content,
  language = 'plain',
  showLineNumbers = true,
  showCopyButton = true,
  theme = 'dark',
  maxHeight,
  onCopy,
  councilor,
  className,
  style
}) => {
  const [copied, setCopied] = useState(false)
  
  // Extract code content
  const code = useMemo(() => {
    return content
      .replace(/^```\w*\n?/, '')
      .replace(/\n?```$/, '')
      .trim()
  }, [content])
  
  // Get display language
  const displayLanguage = useMemo(() => {
    return LANGUAGE_NAMES[language.toLowerCase()] || language.toUpperCase()
  }, [language])
  
  // Split into lines for line numbers
  const lines = useMemo(() => code.split('\n'), [code])
  
  // Copy to clipboard
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      if (onCopy) onCopy()
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [code, onCopy])
  
  const bgColor = theme === 'dark' ? '#1e1e1e' : '#f5f5f5'
  const textColor = theme === 'dark' ? '#d4d4d4' : '#24292e'
  
  return (
    <div
      className={className}
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
        ...style
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        background: theme === 'dark' ? '#2d2d2d' : '#eaeaea',
        borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '16px' }}>💻</span>
          <span style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#8b5cf6',
            textTransform: 'uppercase'
          }}>
            {displayLanguage}
          </span>
        </div>
        
        {showCopyButton && (
          <button
            onClick={handleCopy}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: 'none',
              background: copied ? '#10b981' : 'rgba(255,255,255,0.1)',
              color: copied ? '#fff' : textColor,
              fontSize: '11px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {copied ? '✓ Copied' : '📋 Copy'}
          </button>
        )}
      </div>
      
      {/* Code content */}
      <div style={{
        background: bgColor,
        maxHeight: maxHeight,
        overflow: 'auto',
        padding: '12px'
      }}>
        <pre style={{
          margin: 0,
          fontFamily: 'Monaco, Menlo, "Courier New", monospace',
          fontSize: '13px',
          lineHeight: 1.5,
          color: textColor
        }}>
          <code>
            {lines.map((line, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '16px'
              }}>
                {showLineNumbers && (
                  <span style={{
                    color: '#6b7280',
                    userSelect: 'none',
                    minWidth: '24px',
                    textAlign: 'right',
                    flexShrink: 0
                  }}>
                    {i + 1}
                  </span>
                )}
                <span dangerouslySetInnerHTML={{ __html: highlightCode(line, language) }} />
              </div>
            ))}
          </code>
        </pre>
      </div>
      
      {/* Councilor attribution */}
      {councilor && (
        <div style={{
          padding: '8px 12px',
          background: theme === 'dark' ? '#2d2d2d' : '#eaeaea',
          borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          color: '#9ca3af'
        }}>
          <span>Shared by</span>
          <span style={{
            color: councilor.color,
            fontWeight: 600
          }}>
            {councilor.name}
          </span>
        </div>
      )}
    </div>
  )
}

export default CodeBlock
