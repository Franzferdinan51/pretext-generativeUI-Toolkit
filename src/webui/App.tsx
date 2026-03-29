// GENERATIVE UI - PRETEXT + JSON-RENDER + AI SWARM
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { prepare, layout } from '@chenglou/pretext'
import { defineCatalog, Schema, Spec, SpecStream } from '@json-render/core'
import { defineRegistry, Renderer } from '@json-render/react'
import { schema as jsonSchema } from '@json-render/react/schema'
import { z } from 'zod'

const MINIMAX_API_KEY = 'sk-cp-f6PbhZS6uNSD1L-mByhEw3RzISEgKDmaQ-kkQGUx79uBrnAZDVWVnDwmLwHC19V1jT07oW7CcU2Dn_3Zr8c90a5xYqk9J1BBNXd0C9bVRbyr-PLbfd31kUE'

type Provider = 'minimax'

interface UIComponent {
  id: string
  type: string
  content: string
  x?: number; y?: number; width?: number; height?: number
  style?: Record<string, string>
  visible?: boolean
  action?: string
}

// Pretext text measurement helper
function measureText(text: string, fontSize: number, maxWidth: number) {
  const prepared = prepare(text, `${fontSize}px Inter`)
  const result = layout(prepared, maxWidth, fontSize + 4)
  return result
}

// Define component catalog for JSON Render
const catalog = defineCatalog(jsonSchema, {
  components: {
    Header: {
      props: z.object({
        content: z.string(),
        width: z.number().optional(),
        height: z.number().optional(),
        bgColor: z.string().optional()
      }),
      description: 'Header bar component'
    },
    Text: {
      props: z.object({
        content: z.string(),
        fontSize: z.number().optional(),
        color: z.string().optional(),
        isGradient: z.boolean().optional(),
        x: z.number().optional(),
        y: z.number().optional(),
        width: z.number().optional()
      }),
      description: 'Text element with optional styling'
    },
    Button: {
      props: z.object({
        content: z.string(),
        bgColor: z.string().optional(),
        x: z.number().optional(),
        y: z.number().optional(),
        width: z.number().optional(),
        height: z.number().optional()
      }),
      description: 'Clickable button'
    },
    Card: {
      props: z.object({
        title: z.string(),
        description: z.string().optional(),
        x: z.number().optional(),
        y: z.number().optional(),
        width: z.number().optional(),
        height: z.number().optional(),
        bgColor: z.string().optional()
      }),
      description: 'Card container'
    }
  },
  actions: {
    generate: { description: 'Regenerate website' },
    click: { description: 'Handle click' }
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
    <div 
      className={props.isGradient ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-black' : ''}
      style={{ 
        fontSize: props.fontSize || 18,
        color: props.isGradient ? 'transparent' : (props.color || '#fff'),
        fontWeight: props.fontSize && props.fontSize > 24 ? 900 : 'bold'
      }}
    >
      {props.content}
    </div>
  ),
  Button: ({ props, emit }: { props: any; emit: any }) => (
    <button 
      className="px-6 py-3 rounded-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition"
      onClick={() => emit?.('click')}
    >
      {props.content}
    </button>
  ),
  Card: ({ props, children }: { props: any; children?: React.ReactNode }) => (
    <div 
      className="p-6 rounded-xl border border-white/10"
      style={{ backgroundColor: props.bgColor || 'rgba(255,255,255,0.08)' }}
    >
      <h3 className="text-lg font-bold mb-2">{props.title}</h3>
      <p className="text-gray-400">{props.description || 'AI Generated'}</p>
      {children}
    </div>
  )
}

// Create registry
const { registry } = defineRegistry(catalog, { components })

export default function App() {
  const [spec, setSpec] = useState<any>(null)
  const [logs, setLogs] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(true)
  const [phase, setPhase] = useState('Initializing...')
  const [error, setError] = useState<string | null>(null)
  
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
  
  function buildSpec(components: UIComponent[]) {
    const elements: Record<string, any> = {}
    let rootId = 'header-1'
    
    components.forEach((comp, i) => {
      const id = comp.id || `comp-${i}`
      
      if (comp.type === 'header') {
        elements[id] = { type: 'Header', props: { content: comp.content, width: comp.width || 1200, height: comp.height || 60 } }
        if (!rootId) rootId = id
      } else if (comp.type === 'text') {
        elements[id] = { 
          type: 'Text', 
          props: { 
            content: comp.content, 
            fontSize: parseInt(comp.style?.fontSize || '18'),
            isGradient: comp.style?.background?.includes('gradient') || false
          } 
        }
      } else if (comp.type === 'button') {
        elements[id] = { type: 'Button', props: { content: comp.content } }
      } else if (comp.type === 'card') {
        const lines = comp.content.split('\n')
        elements[id] = { 
          type: 'Card', 
          props: { title: lines[0] || '', description: lines[1] || '' } 
        }
      }
    })
    
    return { root: rootId, elements }
  }
  
  function generateFallback(): UIComponent[] {
    return [
      { id: 'header-1', type: 'header', content: '🎨 Pretext AI UI', x: 0, y: 0, width: 1200, height: 60, style: {}, visible: true },
      { id: 'hero-1', type: 'text', content: 'Build UI with AI', x: 50, y: 100, width: 1100, height: 60, style: { fontSize: '48', background: 'gradient' }, visible: true },
      { id: 'subtitle-1', type: 'text', content: 'Powered by Pretext + JSON Render', x: 50, y: 160, width: 1100, height: 30, style: { fontSize: '18', color: '#aaa' }, visible: true },
      { id: 'btn-1', type: 'button', content: '🚀 Generate', x: 500, y: 220, width: 200, height: 50, style: { background: '#8b5cf6' }, visible: true, action: 'generate' },
      { id: 'card-1', type: 'card', content: '⚡ Zero Reflow\nPretext measures text instantly', x: 50, y: 300, width: 280, height: 180, style: { background: 'rgba(255,255,255,0.08)' }, visible: true },
      { id: 'card-2', type: 'card', content: '🎨 JSON Render\nAI generates component JSON', x: 350, y: 300, width: 280, height: 180, style: { background: 'rgba(255,255,255,0.08)' }, visible: true },
      { id: 'card-3', type: 'card', content: '🤖 AI Swarm\n5 agents working together', x: 650, y: 300, width: 280, height: 180, style: { background: 'rgba(255,255,255,0.08)' }, visible: true },
    ]
  }
  
  async function runSwarm() {
    setIsGenerating(true)
    setLogs([])
    setPhase('Starting AI Swarm...')
    setError(null)
    
    const systemPrompt = `You are an expert UI generator using PRETEXT (https://github.com/chenglou/pretext) for zero-reflow text measurement and JSON-RENDER for safe component rendering.

Generate website components as JSON array with this exact format:
[{"id":"header-1","type":"header","content":"🎨 Title","x":0,"y":0,"width":1200,"height":60},{"id":"hero-1","type":"text","content":"Headline","x":50,"y":100,"width":1100,"height":60,"style":{"fontSize":"48","background":"gradient"}},{"id":"btn-1","type":"button","content":"Click Me","x":500,"y":200,"width":200,"height":50,"style":{"background":"#8b5cf6"}},{"id":"card-1","type":"card","content":"Title\\nDescription","x":50,"y":300,"width":280,"height":180,"style":{"background":"rgba(255,255,255,0.08)"}}]

Include: Header, Hero text, Subtitle, CTA button, 3 Feature cards.
Dark theme #0a0a0f, accents purple #8b5cf6, pink #ec4899.
Output ONLY JSON array, no markdown.`
    
    const agents = [
      { name: 'Architect', sections: 'Header + Hero section' },
      { name: 'Designer', sections: 'Feature cards (3x)' },
      { name: 'Frontend', sections: 'CTA button + Footer' },
    ]
    
    const allComponents: UIComponent[] = []
    
    for (const agent of agents) {
      setPhase(`${agent.name} building...`)
      const timestamp = new Date().toLocaleTimeString()
      setLogs(prev => [...prev.slice(-15), `${timestamp} ${agent.name}: Starting...`])
      
      try {
        const userPrompt = `Generate ${agent.sections} for a landing page. Include: logo header with "🎨 Pretext AI UI", hero with gradient headline "Build UI with AI" and subtitle "Zero Reflow • JSON Render • AI Swarm", 3 feature cards (Zero Reflow, Canvas, AI Controlled), CTA button "🚀 Get Started". Return as JSON array.`
        
        const result = await callAI('minimax', 'MiniMax-M2.7', systemPrompt, userPrompt)
        
        // Extract JSON
        const match = result.match(/\[[\s\S]*\]/)
        if (match) {
          const parsed = JSON.parse(match[0])
          if (Array.isArray(parsed) && parsed.length > 0) {
            allComponents.push(...parsed)
            setLogs(prev => [...prev.slice(-15), `${timestamp} ${agent.name}: ✅ ${parsed.length} components`])
            continue
          }
        }
        throw new Error('No valid JSON')
      } catch (err) {
        setLogs(prev => [...prev.slice(-15), `${timestamp} ${agent.name}: ❌ ${err}`])
      }
    }
    
    // QA check
    setPhase('QA Check...')
    const hasHeader = allComponents.some(c => c.type === 'header')
    const hasText = allComponents.some(c => c.type === 'text')
    const hasCards = allComponents.filter(c => c.type === 'card').length >= 2
    const hasButton = allComponents.some(c => c.type === 'button')
    
    if (!hasHeader) allComponents.unshift({ id: 'qa-header', type: 'header', content: '🎨 Pretext AI UI', visible: true })
    if (!hasText) allComponents.push({ id: 'qa-hero', type: 'text', content: 'Build UI with AI', style: { fontSize: '48', background: 'gradient' }, visible: true })
    if (!hasCards) {
      allComponents.push(
        { id: 'qa-card-1', type: 'card', content: '⚡ Zero Reflow\nText measured instantly', visible: true },
        { id: 'qa-card-2', type: 'card', content: '🎨 JSON Render\nSafe component rendering', visible: true },
        { id: 'qa-card-3', type: 'card', content: '🤖 AI Swarm\n5 agents working', visible: true }
      )
    }
    if (!hasButton) allComponents.push({ id: 'qa-btn', type: 'button', content: '🚀 Get Started', visible: true })
    
    setLogs(prev => [...prev.slice(-15), `${new Date().toLocaleTimeString()} QA: ✅ ${allComponents.length} components`])
    
    if (allComponents.length === 0) {
      setLogs(prev => [...prev.slice(-15), `${new Date().toLocaleTimeString()} Using fallback...`])
      allComponents.push(...generateFallback())
    }
    
    // Build spec for JSON Render
    const builtSpec = buildSpec(allComponents.filter(c => c.visible !== false))
    setSpec(builtSpec)
    
    setPhase('Complete!')
    setIsGenerating(false)
  }
  
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🎨 Pretext AI UI
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
            <Renderer spec={spec} registry={registry} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-[calc(100vh-64px)] text-gray-500">
            No components generated
          </div>
        )}
      </main>
      
      {/* Error display */}
      {error && (
        <div className="fixed bottom-4 left-4 right-4 bg-red-900/50 border border-red-500 rounded-lg p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}
    </div>
  )
}
