// AI AUTO-HEALING UI ENGINE
// Detects errors → AI context → Auto-fix streaming → Re-render

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { prepare, layout } from '@chenglou/pretext'

// ============================================================================
// TYPES
// ============================================================================

export interface UIComponent {
  id: string
  type: 'text' | 'button' | 'card' | 'input' | 'header' | 'container' | 'image'
  content: string
  x: number
  y: number
  width: number
  height: number
  style: Record<string, string>
  onClick?: string
  visible: boolean
  error?: string
}

export interface ErrorReport {
  type: 'react' | 'canvas' | 'network' | 'parse'
  message: string
  stack?: string
  componentId?: string
  timestamp: number
}

export interface AutoHealingConfig {
  lmStudioUrl: string
  lmStudioKey: string
  model: string
  autoHeal: boolean
  maxRetries: number
  onError?: (error: ErrorReport) => void
  onHeal?: (fix: string) => void
  onThinking?: (thinking: string) => void
  onComponentUpdate?: (components: UIComponent[]) => void
}

// ============================================================================
// UTILITIES
// ============================================================================

// Sanitize AI output - remove explanations, markdown, invalid syntax
function sanitizeOutput(output: string): string {
  let cleaned = output
  
  // Remove markdown code blocks
  cleaned = cleaned.replace(/```(?:json|html|typescript)?\n?/gi, '')
  cleaned = cleaned.replace(/```\n?$/gi, '')
  
  // Remove any text before first [
  const firstBracket = cleaned.indexOf('[')
  if (firstBracket > 0) {
    cleaned = cleaned.slice(firstBracket)
  }
  
  // Remove any text after last ]
  const lastBracket = cleaned.lastIndexOf(']')
  if (lastBracket > 0 && lastBracket < cleaned.length - 1) {
    cleaned = cleaned.slice(0, lastBracket + 1)
  }
  
  // Remove trailing commas (invalid JSON)
  cleaned = cleaned.replace(/,\s*\]/g, ']')
  cleaned = cleaned.replace(/,\s*}/g, '}')
  
  // Fix common AI output errors
  cleaned = cleaned.replace(/(['"])?:\s*(['"])?/g, (match, p1, p2) => {
    if (p1 && p2) return match // Keep if both quotes exist
    return ':'
  })
  
  return cleaned
}

// Parse JSON safely with error recovery
function safeJSONParse(json: string): any | null {
  try {
    return JSON.parse(json)
  } catch (e) {
    // Try to fix common errors
    const sanitized = sanitizeOutput(json)
    try {
      return JSON.parse(sanitized)
    } catch {
      return null
    }
  }
}

// ============================================================================
// HOOK: useAutoHealingUI
// ============================================================================

export function useAutoHealingUI(config: AutoHealingConfig) {
  const [components, setComponents] = useState<UIComponent[]>([])
  const [errors, setErrors] = useState<ErrorReport[]>([])
  const [aiThinking, setAiThinking] = useState('')
  const [isHealing, setIsHealing] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const healAttemptsRef = useRef<Map<string, number>>(new Map())

  // Report an error (called by error boundaries)
  const reportError = useCallback((error: ErrorReport) => {
    setErrors(prev => [...prev, error])
    config.onError?.(error)
    
    if (config.autoHeal) {
      healError(error)
    }
  }, [config.autoHeal, config.onError])

  // AI heals an error
  const healError = useCallback(async (error: ErrorReport) => {
    const attempts = healAttemptsRef.current.get(error.message) || 0
    if (attempts >= config.maxRetries) {
      console.error('Max heal attempts reached for:', error.message)
      return
    }
    healAttemptsRef.current.set(error.message, attempts + 1)

    setIsHealing(true)
    const thinkingStart = `🔧 Detected error: ${error.message}\n🩹 AI healing...`
    setAiThinking(thinkingStart)
    config.onThinking?.(thinkingStart)

    const systemPrompt = `You are an AI UI auto-healer. Fix errors in real-time.

Current components:
${JSON.stringify(components, null, 2)}

Error to fix:
- Type: ${error.type}
- Message: ${error.message}
- Component: ${error.componentId || 'unknown'}
- Timestamp: ${new Date(error.timestamp).toISOString()}

Your job:
1. Analyze the error
2. Generate a JSON array of components to FIX the issue
3. You can add, remove, or modify components
4. Keep working components intact
5. Output ONLY valid JSON array
6. Preserve component IDs that are working
7. Fix only the broken parts

Output ONLY valid JSON array of UIComponent objects.`

    try {
      const response = await fetch(`${config.lmStudioUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.lmStudioKey}`
        },
        body: JSON.stringify({
          model: config.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Fix this error: ${error.message}` }
          ],
          stream: true,
          max_tokens: 2048
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullResponse = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6)
            if (dataStr === '[DONE]') continue
            try {
              const data = JSON.parse(dataStr)
              if (data.choices?.[0]?.delta?.content) {
                const token = data.choices[0].delta.content
                fullResponse += token
                const updated = thinkingStart + token
                setAiThinking(updated)
                config.onThinking?.(updated)
              }
            } catch {
              // Skip malformed JSON in stream
            }
          }
        }
      }

      // Apply fix
      const jsonMatch = fullResponse.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        try {
          const fixed = JSON.parse(jsonMatch[0])
          setComponents(fixed)
          config.onComponentUpdate?.(fixed)
          const successMsg = '\n✅ Error healed!'
          setAiThinking(prev => prev + successMsg)
          config.onThinking?.(prev => prev + successMsg)
          config.onHeal?.(fullResponse)
        } catch (parseErr) {
          console.error('Failed to parse healed components:', parseErr)
          setAiThinking(prev => prev + `\n❌ Parse error: ${parseErr}`)
        }
      } else {
        setAiThinking(prev => prev + '\n❌ No valid JSON in response')
      }

    } catch (err: any) {
      console.error('Healing failed:', err)
      const failMsg = `\n❌ Healing failed: ${err.message || err}`
      setAiThinking(prev => prev + failMsg)
      config.onThinking?.(prev => prev + failMsg)
    } finally {
      setIsHealing(false)
    }
  }, [components, config])

  // Generate UI with AI
  const generateUI = useCallback(async (prompt: string) => {
    setIsGenerating(true)
    setErrors([])
    setAiThinking('')
    healAttemptsRef.current.clear()

    // Structured system prompt inspired by aiwebsite_generator
    // Clear sections, sanitized output, error-free generation
    const systemPrompt = `You are an expert web developer AI. Generate complete, beautiful websites.

## OUTPUT RULES (CRITICAL):
1. Output ONLY valid JSON array - NO markdown, NO explanations, NO text outside JSON
2. Start with [ and end with ]
3. Each component MUST have: id, type, content, x, y, width, height, style, visible
4. No trailing commas, no comments, no invalid syntax

## COMPONENT TYPES:
- header: Navigation bar (height:60)
- text: Paragraph text (multi-line supported)
- button: Clickable button (width:150, height:44)
- card: Container card (various sizes)
- input: Text input field
- container: Generic container for grouping
- image: Image placeholder

## DESIGN RULES:
- Dark theme: background #0a0a0f
- Accents: #8b5cf6 (purple), #ec4899 (pink), #06b6d4 (cyan)
- Modern gradients, rounded corners (8-12px)
- Hover effects on buttons
- Professional spacing

## LAYOUT RULES:
- Canvas size: 1200x800 pixels
- Header: y:0, width:1200, height:60
- Content starts at y:80
- Max content width: 1000px centered
- Vertical spacing: 40-60px between sections
- Card width: 280-350px
- Button width: 150-200px

## GENERATION ORDER:
1. Header with logo and nav links
2. Hero section (large text + CTA button)
3. Features section (3-4 cards in row)
4. Content section (text + optional image)
5. CTA section (centered button)
6. Footer (small text, links)

## EXAMPLE OUTPUT:
[{"id":"1","type":"header","content":"🎨 MyApp","x":0,"y":0,"width":1200,"height":60,"style":{"background":"rgba(0,0,0,0.8)"},"visible":true},
{"id":"2","type":"text","content":"Welcome to the future","x":100,"y":100,"width":1000,"height":80,"style":{"fontSize":"32","color":"#fff"},"visible":true}]

Generate a complete website now. Output ONLY the JSON array.`

    try {
      const response = await fetch(`${config.lmStudioUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.lmStudioKey}`
        },
        body: JSON.stringify({
          model: config.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ],
          stream: true,
          max_tokens: 2048
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullResponse = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6)
            if (dataStr === '[DONE]') continue
            try {
              const data = JSON.parse(dataStr)
              if (data.choices?.[0]?.delta?.content) {
                const token = data.choices[0].delta.content
                fullResponse += token
                setAiThinking(prev => prev + token)
                config.onThinking?.(prev => prev + token)

                // Try to parse and render
                const jsonMatch = fullResponse.match(/\[[\s\S]*\]/)
                if (jsonMatch) {
                  try {
                    const parsed = safeJSONParse(jsonMatch[0])
                    setComponents(parsed)
                    config.onComponentUpdate?.(parsed)
                  } catch (parseErr) {
                    // Auto-heal parse errors
                    reportError({
                      type: 'parse',
                      message: `JSON parse error: ${parseErr}`,
                      timestamp: Date.now()
                    })
                  }
                }
              }
            } catch {
              // Skip malformed JSON in stream
            }
          }
        }
      }

      // Final parse attempt
      const jsonMatch = fullResponse.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        try {
          const parsed = safeJSONParse(jsonMatch[0])
          setComponents(parsed)
          config.onComponentUpdate?.(parsed)
        } catch (parseErr) {
          reportError({
            type: 'parse',
            message: `Final JSON parse error: ${parseErr}`,
            timestamp: Date.now()
          })
        }
      }

    } catch (err: any) {
      reportError({
        type: 'network',
        message: `Network error: ${err.message || err}`,
        timestamp: Date.now()
      })
    } finally {
      setIsGenerating(false)
    }
  }, [config, reportError])

  // Clear all components
  const clearComponents = useCallback(() => {
    setComponents([])
    setErrors([])
    setAiThinking('')
    healAttemptsRef.current.clear()
  }, [])

  // Remove a component by ID
  const removeComponent = useCallback((id: string) => {
    setComponents(prev => prev.filter(c => c.id !== id))
  }, [])

  // Update a component by ID
  const updateComponent = useCallback((id: string, changes: Partial<UIComponent>) => {
    setComponents(prev => prev.map(c => c.id === id ? { ...c, ...changes } : c))
  }, [])

  // Force heal (manual trigger)
  const forceHeal = useCallback(() => {
    if (errors.length > 0) {
      healError(errors[errors.length - 1])
    }
  }, [errors, healError])

  return {
    components,
    setComponents,
    errors,
    aiThinking,
    isHealing,
    isGenerating,
    generateUI,
    reportError,
    healError,
    clearComponents,
    removeComponent,
    updateComponent,
    forceHeal
  }
}

// ============================================================================
// ERROR BOUNDARY COMPONENT
// ============================================================================

interface ErrorBoundaryProps {
  children: React.ReactNode
  onError: (error: ErrorReport) => void
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: string | null
  errorInfo?: string
}

export class UIErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error: error.message }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.props.onError({
      type: 'react',
      message: error.message,
      stack: info.componentStack,
      timestamp: Date.now()
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      return (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
          <p className="text-red-400">⚠️ Error detected: {this.state.error}</p>
          <p className="text-sm text-gray-400 mt-2">AI is healing...</p>
        </div>
      )
    }
    return this.props.children
  }
}

// ============================================================================
// CANVAS RENDERER
// ============================================================================

export interface CanvasRendererProps {
  components: UIComponent[]
  width?: number
  height?: number
  className?: string
  onClick?: (component: UIComponent, x: number, y: number) => void
}

export const CanvasRenderer: React.FC<CanvasRendererProps> = ({
  components,
  width = 800,
  height = 600,
  className,
  onClick
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw each visible component
    for (const component of components) {
      if (!component.visible) continue

      const x = component.x
      const y = component.y
      const w = component.width
      const h = component.height

      // Apply styles
      const bgColor = component.style?.backgroundColor || '#1a1a2e'
      const textColor = component.style?.color || '#ffffff'
      const borderRadius = parseInt(component.style?.borderRadius || '8')
      const fontSize = parseInt(component.style?.fontSize || '16')

      // Draw based on type
      switch (component.type) {
        case 'header':
        case 'text':
          // Draw text
          ctx.fillStyle = bgColor
          ctx.fillRect(x, y, w, h)
          ctx.fillStyle = textColor
          ctx.font = `${fontSize}px Inter, sans-serif`
          ctx.textBaseline = 'top'
          
          // Word wrap text
          const words = component.content.split(' ')
          let line = ''
          let lineY = y + 8
          const maxWidth = w - 16
          
          for (const word of words) {
            const testLine = line + word + ' '
            const metrics = ctx.measureText(testLine)
            if (metrics.width > maxWidth && line !== '') {
              ctx.fillText(line, x + 8, lineY)
              line = word + ' '
              lineY += fontSize * 1.4
            } else {
              line = testLine
            }
          }
          ctx.fillText(line, x + 8, lineY)
          break

        case 'button':
          // Draw button
          ctx.fillStyle = component.style?.background || '#8b5cf6'
          ctx.beginPath()
          ctx.roundRect(x, y, w, h, borderRadius)
          ctx.fill()
          
          // Button text
          ctx.fillStyle = component.style?.color || '#ffffff'
          ctx.font = `bold ${fontSize}px Inter, sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(component.content, x + w / 2, y + h / 2)
          ctx.textAlign = 'left'
          break

        case 'card':
          // Draw card with gradient
          const gradient = ctx.createLinearGradient(x, y, x + w, y + h)
          gradient.addColorStop(0, component.style?.background || '#1e1e3f')
          gradient.addColorStop(1, component.style?.backgroundEnd || '#2d2d5f')
          
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.roundRect(x, y, w, h, borderRadius)
          ctx.fill()
          
          // Card glow
          if (component.style?.boxShadow) {
            ctx.shadowColor = component.style.boxShadow
            ctx.shadowBlur = 20
            ctx.fill()
            ctx.shadowBlur = 0
          }
          
          // Card text
          ctx.fillStyle = textColor
          ctx.font = `${fontSize}px Inter, sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(component.content, x + w / 2, y + h / 2)
          ctx.textAlign = 'left'
          break

        case 'container':
          // Draw container
          ctx.fillStyle = bgColor
          ctx.fillRect(x, y, w, h)
          break

        case 'input':
          // Draw input field
          ctx.fillStyle = '#0a0a1a'
          ctx.strokeStyle = component.style?.borderColor || '#4a4a6a'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.roundRect(x, y, w, h, borderRadius)
          ctx.fill()
          ctx.stroke()
          
          // Placeholder text
          ctx.fillStyle = '#6a6a8a'
          ctx.font = `${fontSize}px Inter, sans-serif`
          ctx.textBaseline = 'middle'
          ctx.fillText(component.content || 'Enter text...', x + 12, y + h / 2)
          break

        case 'image':
          // Draw image placeholder
          ctx.fillStyle = bgColor
          ctx.fillRect(x, y, w, h)
          ctx.strokeStyle = '#4a4a6a'
          ctx.lineWidth = 1
          ctx.strokeRect(x, y, w, h)
          
          // Image icon placeholder
          ctx.fillStyle = '#6a6a8a'
          ctx.font = '24px Inter'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText('🖼️', x + w / 2, y + h / 2)
          ctx.textAlign = 'left'
          break
      }
    }
  }, [components, width, height])

  // Handle click events
  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onClick) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Find clicked component (reverse order for z-index)
    for (const component of [...components].reverse()) {
      if (!component.visible) continue
      if (x >= component.x && x <= component.x + component.width &&
          y >= component.y && y <= component.y + component.height) {
        onClick(component, x, y)
        break
      }
    }
  }, [components, onClick])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      onClick={handleClick}
      style={{ display: 'block', backgroundColor: '#0a0a0f', cursor: 'pointer' }}
    />
  )
}

// ============================================================================
// DEFAULT CONFIG
// ============================================================================

export const defaultConfig: AutoHealingConfig = {
  lmStudioUrl: 'http://100.116.54.125:1234',
  lmStudioKey: 'sk-lm-zO7bswIc:WkHEMTUfVNkq5WYNyFOW',
  model: 'qwen3.5-27b',
  autoHeal: true,
  maxRetries: 3
}

// ============================================================================
// EXPORT DEFAULT HOOK
// ============================================================================

export function useAutoHealingUIDefault() {
  return useAutoHealingUI(defaultConfig)
}

// ============================================================================
// EXPORT FUNCTIONALITY (Inspired by aiwebsite_generator)
// ============================================================================

// Convert components to HTML
export function componentsToHTML(components: UIComponent[]): string {
  const visibleComponents = components.filter(c => c.visible)
  
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Generated Website</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background: #0a0a0f; color: white; font-family: Inter, system-ui, sans-serif; }
    .gradient-text { background: linear-gradient(to right, #8b5cf6, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  </style>
</head>
<body>
  <div class="min-h-screen">
`

  // Generate sections based on components
  const headers = visibleComponents.filter(c => c.type === 'header')
  const texts = visibleComponents.filter(c => c.type === 'text')
  const buttons = visibleComponents.filter(c => c.type === 'button')
  const cards = visibleComponents.filter(c => c.type === 'card')
  const inputs = visibleComponents.filter(c => c.type === 'input')
  
  // Header
  if (headers.length > 0) {
    html += `    <header class="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur border-b border-white/10 p-4">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <h1 class="text-xl font-bold gradient-text">${headers[0].content}</h1>
        <nav class="flex gap-4">
`
    headers.slice(1).forEach(h => {
      html += `          <a href="#" class="hover:text-purple-400 transition">${h.content}</a>\n`
    })
    html += `        </nav>
      </div>
    </header>\n`
  }
  
  // Hero (first large text)
  const heroText = texts.find(t => t.height > 50)
  if (heroText) {
    const fontSize = parseInt(heroText.style.fontSize || '24')
    html += `    <section class="pt-32 pb-16 text-center px-4">
      <h2 class="text-${Math.floor(fontSize / 8)}xl font-black mb-4" style="color: ${heroText.style.color || '#fff'}">${heroText.content}</h2>
    </section>\n`
  }
  
  // Cards
  if (cards.length > 0) {
    html += `    <section class="py-16 px-4">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-${Math.min(cards.length, 3)} gap-6">\n`
    cards.forEach(card => {
      const bg = card.style.background || 'rgba(255,255,255,0.08)'
      html += `        <div class="p-6 rounded-xl border border-white/10" style="background: ${bg}">
          <h3 class="text-lg font-bold mb-2">${card.content}</h3>
          <p class="text-gray-400">Generated by AI</p>
        </div>\n`
    })
    html += `      </div>
    </section>\n`
  }
  
  // Buttons
  if (buttons.length > 0) {
    html += `    <section class="py-8 text-center">
`
    buttons.forEach(btn => {
      const bg = btn.style.background || '#8b5cf6'
      html += `      <button class="px-6 py-3 rounded-lg font-bold mx-2 hover:opacity-90 transition" style="background: ${bg}">${btn.content}</button>\n`
    })
    html += `    </section>\n`
  }
  
  html += `  </div>
</body>
</html>`
  
  return html
}

// Download website as HTML file
export function downloadAsHTML(components: UIComponent[], filename = 'generated-website.html') {
  const html = componentsToHTML(components)
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
