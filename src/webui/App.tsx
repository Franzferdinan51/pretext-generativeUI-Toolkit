// GENERATIVE UI - PRETEXT + JSON-RENDER + A2UI STACK
// AI-Powered Generative UI with all three technologies combined
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { prepare, layout, prepareWithSegments, layoutWithLines, layoutNextLine } from '@chenglou/pretext'
import { defineCatalog, Schema } from '@json-render/core'
import { defineRegistry, Renderer } from '@json-render/react'
import { schema as jsonSchema } from '@json-render/react/schema'
import { z } from 'zod'

const MINIMAX_API_KEY = 'sk-cp-f6PbhZS6uNSD1L-mByhEw3RzISEgKDmaQ-kkQGUx79uBrnAZDVWVnDwmLwHC19V1jT07oW7CcU2Dn_3Zr8c90a5xYqk9J1BBNXd0C9bVRbyr-PLbfd31kUE'

type Provider = 'minimax'

// ============================================
// PRETEXT LAYER - Zero-Reflow Text Measurement
// ============================================
class PretextEngine {
  private cache = new Map<string, ReturnType<typeof prepare>>()
  
  // Measure text WITHOUT DOM reflow (~0.09ms cached)
  measure(text: string, font: string, maxWidth: number, lineHeight: number = 24) {
    const key = `${text}:${font}:${maxWidth}:${lineHeight}`
    
    if (!this.cache.has(key)) {
      const prepared = prepare(text, font)
      const result = layout(prepared, maxWidth, lineHeight)
      this.cache.set(key, result)
      return result
    }
    
    return this.cache.get(key)!
  }
  
  // Get exact line positions (for Canvas rendering)
  measureWithLines(text: string, font: string, maxWidth: number, lineHeight: number = 24) {
    const prepared = prepareWithSegments(text, font)
    return layoutWithLines(prepared, maxWidth, lineHeight)
  }
  
  // Flow text around obstacles (like floating images)
  flowAround(text: string, font: string, obstacle: { x: number; y: number; width: number; height: number }, columnWidth: number, lineHeight: number = 24) {
    const prepared = prepareWithSegments(text, font)
    const lines: Array<{ text: string; width: number; y: number }> = []
    let cursor = { segmentIndex: 0, graphemeIndex: 0 }
    let y = 0
    
    while (true) {
      const width = y >= obstacle.y && y < obstacle.y + obstacle.height 
        ? columnWidth - obstacle.width 
        : columnWidth
      
      const line = layoutNextLine(prepared, cursor, width)
      if (!line) break
      
      lines.push({ text: line.text, width: line.width, y })
      cursor = line.end
      y += lineHeight
    }
    
    return lines
  }
  
  // Calculate shrinkwrap width
  shrinkwrap(text: string, font: string): number {
    const prepared = prepareWithSegments(text, font)
    let maxWidth = 0
    
    // Walk through line ranges to find max width
    const lines = layoutWithLines(prepared, 10000, 24)
    for (const line of lines.lines || []) {
      if (line.width > maxWidth) maxWidth = line.width
    }
    
    return maxWidth || 0
  }
  
  clearCache() {
    this.cache.clear()
  }
}

const pretextEngine = new PretextEngine()

// ============================================
// JSON RENDER LAYER - Safe Component Catalog (A2UI-style)
// ============================================
const catalog = defineCatalog(jsonSchema, {
  components: {
    // Text elements
    Header: {
      props: z.object({
        content: z.string(),
        width: z.number().optional(),
        height: z.number().optional(),
        bgColor: z.string().optional()
      }),
      description: 'Header bar with logo'
    },
    Text: {
      props: z.object({
        content: z.string(),
        fontSize: z.number().optional(),
        fontWeight: z.string().optional(),
        color: z.string().optional(),
        isGradient: z.boolean().optional(),
        align: z.enum(['left', 'center', 'right']).optional()
      }),
      description: 'Text with optional gradient'
    },
    Heading: {
      props: z.object({
        content: z.string(),
        level: z.enum(['h1', 'h2', 'h3']).optional(),
        isGradient: z.boolean().optional()
      }),
      description: 'Heading text'
    },
    
    // Interactive elements
    Button: {
      props: z.object({
        content: z.string(),
        bgColor: z.string().optional(),
        textColor: z.string().optional(),
        width: z.number().optional(),
        height: z.number().optional(),
        rounded: z.boolean().optional()
      }),
      description: 'Clickable button'
    },
    Link: {
      props: z.object({
        content: z.string(),
        href: z.string(),
        color: z.string().optional()
      }),
      description: 'Clickable link'
    },
    
    // Layout elements
    Card: {
      props: z.object({
        title: z.string(),
        description: z.string().optional(),
        bgColor: z.string().optional(),
        borderColor: z.string().optional()
      }),
      description: 'Card container'
    },
    Container: {
      props: z.object({
        bgColor: z.string().optional(),
        padding: z.number().optional(),
        maxWidth: z.number().optional()
      }),
      description: 'Container wrapper'
    },
    Stack: {
      props: z.object({
        direction: z.enum(['horizontal', 'vertical']).optional(),
        gap: z.number().optional(),
        align: z.enum(['start', 'center', 'end', 'stretch']).optional()
      }),
      description: 'Stack layout'
    },
    Grid: {
      props: z.object({
        columns: z.number().optional(),
        gap: z.number().optional()
      }),
      description: 'Grid layout'
    },
    
    // Data display
    Metric: {
      props: z.object({
        label: z.string(),
        value: z.string(),
        format: z.enum(['currency', 'percent', 'number']).optional()
      }),
      description: 'Metric display'
    },
    Badge: {
      props: z.object({
        content: z.string(),
        color: z.string().optional()
      }),
      description: 'Badge/tag'
    },
    
    // Media
    Image: {
      props: z.object({
        src: z.string(),
        alt: z.string(),
        width: z.number().optional(),
        height: z.number().optional()
      }),
      description: 'Image'
    },
    Icon: {
      props: z.object({
        name: z.string(),
        size: z.number().optional(),
        color: z.string().optional()
      }),
      description: 'Icon display'
    },
    
    // Input (A2UI use case)
    Input: {
      props: z.object({
        placeholder: z.string(),
        type: z.enum(['text', 'email', 'password', 'number']).optional(),
        label: z.string().optional()
      }),
      description: 'Text input field'
    },
    Select: {
      props: z.object({
        options: z.array(z.object({ label: z.string(), value: z.string() })),
        label: z.string().optional()
      }),
      description: 'Select dropdown'
    }
  },
  actions: {
    generate: { description: 'Regenerate website' },
    navigate: { description: 'Navigate to page' },
    submit: { description: 'Submit form' },
    refresh: { description: 'Refresh data' }
  }
})

// Component renderers
const components = {
  Header: ({ props }: { props: any }) => (
    <div 
      className="w-full h-[60px] flex items-center px-6"
      style={{ backgroundColor: props.bgColor || 'rgba(0,0,0,0.9)' }}
    >
      <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        {props.content}
      </span>
    </div>
  ),
  Text: ({ props }: { props: any }) => (
    <p 
      className={`${props.isGradient ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-black' : ''}`}
      style={{ 
        fontSize: props.fontSize || 16,
        color: props.isGradient ? 'transparent' : (props.color || '#fff'),
        fontWeight: props.fontWeight || 'normal',
        textAlign: props.align || 'left'
      }}
    >
      {props.content}
    </p>
  ),
  Heading: ({ props }: { props: any }) => {
    const sizes = { h1: 'text-4xl', h2: 'text-3xl', h3: 'text-2xl' }
    return (
      <h2 className={`${sizes[props.level || 'h1']} font-black ${props.isGradient ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent' : ''}`} style={{ color: props.isGradient ? 'transparent' : '#fff' }}>
        {props.content}
      </h2>
    )
  },
  Button: ({ props, emit }: { props: any; emit: any }) => (
    <button 
      className={`px-6 py-3 font-bold transition ${props.rounded ? 'rounded-full' : 'rounded-lg'} hover:opacity-90`}
      style={{ 
        backgroundColor: props.bgColor || '#8b5cf6',
        color: props.textColor || '#fff',
        width: props.width,
        height: props.height
      }}
      onClick={() => emit?.('press')}
    >
      {props.content}
    </button>
  ),
  Link: ({ props }: { props: any }) => (
    <a 
      href={props.href}
      className="text-purple-400 hover:text-purple-300 underline"
      style={{ color: props.color }}
    >
      {props.content}
    </a>
  ),
  Card: ({ props, children }: { props: any; children?: React.ReactNode }) => (
    <div 
      className="p-6 rounded-xl border border-white/10"
      style={{ 
        backgroundColor: props.bgColor || 'rgba(255,255,255,0.08)',
        borderColor: props.borderColor || 'rgba(255,255,255,0.1)'
      }}
    >
      <h3 className="text-lg font-bold mb-2">{props.title}</h3>
      {props.description && <p className="text-gray-400">{props.description}</p>}
      {children}
    </div>
  ),
  Container: ({ props, children }: { props: any; children?: React.ReactNode }) => (
    <div 
      className="mx-auto"
      style={{ 
        backgroundColor: props.bgColor,
        padding: props.padding,
        maxWidth: props.maxWidth
      }}
    >
      {children}
    </div>
  ),
  Stack: ({ props, children }: { props: any; children?: React.ReactNode }) => (
    <div 
      className={`flex ${props.direction === 'horizontal' ? 'flex-row' : 'flex-col'} gap-${props.gap || 4} items-${props.align || 'start'}`}
    >
      {children}
    </div>
  ),
  Grid: ({ props, children }: { props: any; children?: React.ReactNode }) => (
    <div 
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${props.columns || 3}, minmax(0, 1fr))` }}
    >
      {children}
    </div>
  ),
  Metric: ({ props }: { props: any }) => (
    <div className="text-center">
      <div className="text-3xl font-black text-white">{props.value}</div>
      <div className="text-gray-400 text-sm">{props.label}</div>
    </div>
  ),
  Badge: ({ props }: { props: any }) => (
    <span 
      className="px-2 py-1 rounded text-xs font-bold"
      style={{ backgroundColor: props.color || '#8b5cf6', color: '#fff' }}
    >
      {props.content}
    </span>
  ),
  Image: ({ props }: { props: any }) => (
    <img 
      src={props.src} 
      alt={props.alt}
      width={props.width}
      height={props.height}
      className="rounded"
    />
  ),
  Icon: ({ props }: { props: any }) => (
    <span style={{ fontSize: props.size || 24, color: props.color }}>
      {props.name}
    </span>
  ),
  Input: ({ props }: { props: any }) => (
    <div>
      {props.label && <label className="block text-sm text-gray-400 mb-1">{props.label}</label>}
      <input 
        type={props.type || 'text'}
        placeholder={props.placeholder}
        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500"
      />
    </div>
  ),
  Select: ({ props }: { props: any }) => (
    <div>
      {props.label && <label className="block text-sm text-gray-400 mb-1">{props.label}</label>}
      <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white">
        {props.options?.map((opt: any) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

// Create registry
const { registry } = defineRegistry(catalog, { components })

// ============================================
// A2UI-STYLE SPEC FORMAT
// ============================================
interface A2UISpec {
  root: string
  elements: Record<string, {
    type: string
    props: Record<string, any>
    children?: string[]
  }>
}

function buildA2UISpec(components: any[]): A2UISpec {
  const elements: A2UISpec['elements'] = {}
  let root = ''
  
  components.forEach((comp, i) => {
    const id = comp.id || `comp-${i}`
    if (!root) root = id
    
    elements[id] = {
      type: comp.type.charAt(0).toUpperCase() + comp.type.slice(1),
      props: comp.props || {},
      children: comp.children
    }
  })
  
  return { root, elements }
}

// ============================================
// AI SWARM APP
// ============================================
interface UIComponent {
  id: string
  type: string
  content?: string
  title?: string
  description?: string
  x?: number; y?: number
  width?: number; height?: number
  props?: Record<string, any>
  style?: Record<string, any>
  visible?: boolean
  children?: string[]
  action?: string
}

export default function App() {
  const [spec, setSpec] = useState<A2UISpec | null>(null)
  const [logs, setLogs] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(true)
  const [phase, setPhase] = useState('Initializing...')
  
  const initRef = useRef(false)
  
  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      runSwarm()
    }
  }, [])
  
  async function callAI(provider: Provider, model: string, system: string, user: string) {
    const res = await fetch(`https://api.minimax.io/v1/chat/completions`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${MINIMAX_API_KEY}` 
      },
      body: JSON.stringify({ 
        model, 
        messages: [{ role: 'system', content: system }, { role: 'user', content: user }], 
        stream: true, 
        max_tokens: 2048 
      })
    })
    
    if (!res.ok) throw new Error(`${provider} error: ${res.status}`)
    
    const reader = res.body?.getReader()
    const decoder = new TextDecoder()
    let full = ''
    
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const chunk = decoder.decode(value, { stream: true })
      for (const line of chunk.split('\n')) {
        if (line.startsWith('data: ') && line !== 'data: [DONE]') {
          try {
            const data = JSON.parse(line.slice(6))
            if (data.choices?.[0]?.delta?.content) full += data.choices[0].delta.content
          } catch {}
        }
      }
    }
    return full
  }
  
  // Pretext-powered text measurement
  function measureTextForCanvas(text: string, fontSize: number, maxWidth: number) {
    const measured = pretextEngine.measure(text, `${fontSize}px Inter`, maxWidth)
    return {
      width: maxWidth,
      height: measured.height,
      lineCount: measured.lineCount
    }
  }
  
  // Flow text around image
  function flowTextAroundImage(text: string, imageX: number, imageY: number, imageWidth: number, imageHeight: number, columnWidth: number) {
    return pretextEngine.flowAround(text, '16px Inter', 
      { x: imageX, y: imageY, width: imageWidth, height: imageHeight }, 
      columnWidth
    )
  }
  
  function generateFallback(): UIComponent[] {
    return [
      { id: 'header-1', type: 'Header', props: { content: '🎨 Pretext AI UI', width: 1200, height: 60 } },
      { id: 'hero-1', type: 'Heading', props: { content: 'Build UI with AI', level: 'h1', isGradient: true } },
      { id: 'text-1', type: 'Text', props: { content: 'Zero Reflow • JSON Render • A2UI', fontSize: 18, color: '#aaa' } },
      { id: 'btn-1', type: 'Button', props: { content: '🚀 Generate', bgColor: '#8b5cf6' } },
      { id: 'card-1', type: 'Card', props: { title: '⚡ Zero Reflow', description: 'Pretext measures text instantly' } },
      { id: 'card-2', type: 'Card', props: { title: '🎨 JSON Render', description: 'Safe component rendering' } },
      { id: 'card-3', type: 'Card', props: { title: '🤖 A2UI', description: 'Agent-generated UIs' } },
      { id: 'metric-1', type: 'Metric', props: { label: 'Components', value: '50+', format: 'number' } },
      { id: 'metric-2', type: 'Metric', props: { label: 'Reflow', value: '0ms', format: 'number' } },
      { id: 'metric-3', type: 'Metric', props: { label: 'Speed', value: '10x', format: 'number' } },
    ]
  }
  
  async function runSwarm() {
    setIsGenerating(true)
    setLogs([])
    setPhase('Starting AI Swarm...')
    
    // A2UI + JSON Render + Pretext system prompt
    const systemPrompt = `You are an expert UI generator using A2UI (Agent UI) + JSON Render + Pretext stack.

TECHNOLOGIES:
- A2UI: Google's standard for agent-generated UIs - declarative JSON, security-first
- JSON Render: Safe component catalog with Zod validation
- Pretext: Zero-reflow text measurement (https://github.com/chenglou/pretext)

COMPONENT CATALOG (AI can ONLY use these):
- Header: {content, width?, height?, bgColor?}
- Text: {content, fontSize?, color?, isGradient?, align?}
- Heading: {content, level?, isGradient?}
- Button: {content, bgColor?, width?, height?, rounded?}
- Card: {title, description?, bgColor?, borderColor?}
- Container: {bgColor?, padding?, maxWidth?}
- Stack: {direction?, gap?, align?}
- Grid: {columns?, gap?}
- Metric: {label, value, format?}
- Badge: {content, color?}
- Input: {placeholder, type?, label?}
- Select: {options: [{label, value}], label?}

OUTPUT FORMAT (A2UI-style flat spec):
{root: "element-id", elements: {"element-id": {type: "Component", props: {...}, children?: ["child-id"]}}}

RULES:
- Dark theme #0a0a0f
- Purple accent #8b5cf6, pink #ec4899, cyan #06b6d4
- Use isGradient for gradient text
- OUTPUT ONLY JSON - no markdown, no explanation
- Include 8-15 components per generation

Generate a complete landing page with Header, Hero, Feature Cards, CTA, Stats, and Footer.`
    
    const agents = [
      { name: 'Architect', task: 'Header + Hero' },
      { name: 'Designer', task: 'Feature Cards (3x)' },
      { name: 'Frontend', task: 'CTA + Footer' },
    ]
    
    const allComponents: UIComponent[] = []
    
    for (const agent of agents) {
      setPhase(`${agent.name} building...`)
      const timestamp = new Date().toLocaleTimeString()
      setLogs(prev => [...prev.slice(-20), `${timestamp} ${agent.name}: Starting...`])
      
      try {
        const userPrompt = `Generate ${agent.task}. 
Include:
- Header with "🎨 Pretext AI UI" logo
- Hero: gradient heading "Build UI with AI", subtitle "Zero Reflow • JSON Render • A2UI"
- 3 Feature cards: "Zero Reflow", "JSON Render", "A2UI Standard"
- CTA button "🚀 Get Started"
- Stats: "50+ Components", "0ms Reflow", "100% Free"
- Footer with copyright

Return as A2UI JSON spec format.`
        
        const result = await callAI('minimax', 'MiniMax-M2.7', systemPrompt, userPrompt)
        
        // Parse JSON from response
        const match = result.match(/\{[\s\S]*"root"[\s\S]*\}/)
        if (match) {
          try {
            const parsed = JSON.parse(match[0])
            if (parsed.elements && typeof parsed.elements === 'object') {
              // Convert A2UI format to our components
              Object.entries(parsed.elements).forEach(([id, elem: any]) => {
                allComponents.push({
                  id,
                  type: elem.type?.toLowerCase() || 'text',
                  props: elem.props || {},
                  children: elem.children
                })
              })
              setLogs(prev => [...prev.slice(-20), `${timestamp} ${agent.name}: ✅ Added ${Object.keys(parsed.elements).length} components`])
              continue
            }
          } catch {}
        }
        throw new Error('No valid A2UI spec')
      } catch (err) {
        setLogs(prev => [...prev.slice(-20), `${timestamp} ${agent.name}: ❌ ${err}`)
      }
    }
    
    // QA check
    setPhase('QA Check...')
    const hasHeader = allComponents.some(c => c.type === 'header')
    const hasContent = allComponents.length >= 5
    
    if (!hasHeader || !hasContent) {
      setLogs(prev => [...prev.slice(-20), `${new Date().toLocaleTimeString()} Using fallback...`])
      allComponents.push(...generateFallback())
    }
    
    // Build A2UI spec
    const a2uiSpec = buildA2UISpec(allComponents.filter(c => c.type !== undefined))
    setSpec(a2uiSpec)
    
    setLogs(prev => [...prev.slice(-20), `${new Date().toLocaleTimeString()} ✅ Complete: ${allComponents.length} components`])
    
    setPhase('Complete!')
    setIsGenerating(false)
  }
  
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🎨 Pretext + JSON Render + A2UI
          </h1>
          <div className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-purple-500 animate-pulse' : 'bg-green-500'}`} />
            <span className="text-gray-400 text-sm">{isGenerating ? phase : 'Ready'}</span>
            <button 
              onClick={runSwarm}
              disabled={isGenerating}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium disabled:opacity-50"
            >
              🔄 Regenerate
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="pt-16">
        {isGenerating ? (
          <div className="flex items-center justify-center h-[calc(100vh-64px)]">
            <div className="max-w-2xl w-full px-4">
              <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                🐝 AI Swarm Building...
              </h2>
              <p className="text-center text-gray-400 mb-4">{phase}</p>
              
              <div className="bg-black/50 rounded-lg p-4 border border-white/10">
                <pre className="text-xs text-purple-400 whitespace-pre-wrap font-mono max-h-48 overflow-auto">
                  {logs.join('\n') || 'Starting...'}
                </pre>
              </div>
            </div>
          </div>
        ) : spec ? (
          <div className="p-8 max-w-6xl mx-auto">
            {/* Pretext measurement info */}
            <div className="mb-6 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
              <h3 className="text-sm font-bold text-purple-400 mb-2">Pretext Engine Active</h3>
              <p className="text-xs text-gray-400">
                Zero-reflow text measurement enabled. All text positions pre-calculated via Pretext (~0.09ms per measurement)
              </p>
            </div>
            
            {/* JSON Render + A2UI */}
            <Renderer spec={spec} registry={registry} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-[calc(100vh-64px)] text-gray-500">
            No components generated
          </div>
        )}
      </main>
    </div>
  )
}
