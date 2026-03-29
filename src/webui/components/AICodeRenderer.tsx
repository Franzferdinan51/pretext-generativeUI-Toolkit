// AICodeRenderer - Renders AI-generated JSX code as React components
import React, { useState, useEffect, useMemo } from 'react'
import { ParticleEmitter } from '../../effects/ParticleEmitter'
import { AnimatedGrid } from '../../magicui/AnimatedGrid'
import { GradientMesh } from '../../effects/GradientMesh'
import { GlowBorder } from '../../effects/GlowBorder'
import { SmartMessage } from '../../components/SmartMessage'
import { StreamableText } from '../../streaming/StreamableText'
import { DataChart } from '../../components/DataChart'

// Component registry mapping component names to implementations
const componentRegistry: Record<string, React.ComponentType<any>> = {
  ParticleEmitter,
  AnimatedGrid,
  GradientMesh,
  GlowBorder,
  SmartMessage,
  StreamableText,
  DataChart,
}

// Parse and validate JSX-like code
function parseJSX(code: string): { type: string; props: Record<string, any>; children?: any } | null {
  try {
    // Extract component name and props
    const match = code.match(/<(\w+)([^>]*)>/)
    if (!match) return null

    const type = match[1]
    const propsString = match[2] || ''

    // Parse props
    const props: Record<string, any> = {}
    const propMatches = propsString.matchAll(/(\w+)(?:=["']([^"']*)["'])?/g)
    for (const propMatch of propMatches) {
      const [, key, value] = propMatch
      if (value !== undefined) {
        // Try to parse as number or keep as string
        props[key] = isNaN(Number(value)) ? value : Number(value)
      }
    }

    return { type, props }
  } catch (err) {
    console.error('JSX parse error:', err)
    return null
  }
}

// Render a parsed JSX component
function renderComponent(parsed: { type: string; props: Record<string, any> }): React.ReactNode {
  const { type, props } = parsed

  // Check if it's in our registry
  if (componentRegistry[type]) {
    const Component = componentRegistry[type]
    return <Component key={type} {...props} />
  }

  // Unknown component - show placeholder
  return (
    <div className="p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-yellow-400">
      <p className="text-sm">Unknown component: {type}</p>
      <pre className="text-xs mt-2 text-yellow-300">{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}

interface AICodeRendererProps {
  code: string
  streaming?: boolean
  className?: string
}

export default function AICodeRenderer({ code, streaming = false, className = '' }: AICodeRendererProps) {
  const [displayedCode, setDisplayedCode] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  // Update displayed code when code changes (for streaming)
  useEffect(() => {
    if (streaming) {
      setDisplayedCode(code)
      setIsComplete(code.length > 0 && !code.endsWith('>') && !code.endsWith('}'))
    } else {
      setDisplayedCode(code)
      setIsComplete(true)
    }
  }, [code, streaming])

  // Parse and render components
  const renderedComponents = useMemo(() => {
    if (!displayedCode.trim()) return null

    // Try to extract multiple components
    const components: React.ReactNode[] = []
    const componentMatches = displayedCode.matchAll(/<(\w+)([^>]*(?:/>|>[\s\S]*?<\/\1>))/g)

    for (const match of componentMatches) {
      const parsed = parseJSX(match[0])
      if (parsed) {
        components.push(renderComponent(parsed))
      }
    }

    // If no components found but we have code, show as text
    if (components.length === 0 && displayedCode.trim()) {
      return (
        <div className="p-4 bg-white/5 rounded-lg">
          <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap">
            {displayedCode}
          </pre>
        </div>
      )
    }

    return components.length > 0 ? components : null
  }, [displayedCode])

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Rendered components */}
      <div className="space-y-4">
        {renderedComponents}
      </div>

      {/* Streaming indicator */}
      {streaming && !isComplete && (
        <div className="flex items-center gap-2 text-purple-400 text-sm animate-pulse">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0.1s' }} />
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
          <span>Generating...</span>
        </div>
      )}
    </div>
  )
}

// Utility function to extract code blocks from markdown
export function extractCodeFromMarkdown(markdown: string): string {
  // Remove markdown code block markers
  return markdown
    .replace(/```jsx?\n?/g, '')
    .replace(/```\n?/g, '')
    .replace(/`{1,3}/g, '')
    .trim()
}

// Utility function to validate if code is renderable
export function isValidJSX(code: string): boolean {
  // Basic validation
  if (!code.trim()) return false
  
  // Check for balanced tags
  const openTags = (code.match(/<\w+/g) || []).length
  const closeTags = (code.match(/<\/\w+>/g) || []).length
  const selfClosing = (code.match(/\/\s*>/g) || []).length
  
  return openTags === closeTags + selfClosing
}
