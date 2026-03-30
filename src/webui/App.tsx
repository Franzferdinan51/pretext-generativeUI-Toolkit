// GENERATIVE UI - PRETEXT + JSON-RENDER + A2UI STACK
import React, { useState, useEffect, useRef, Component, ReactNode } from 'react'
import { prepare, layout } from '@chenglou/pretext'
import { defineCatalog } from '@json-render/core'
import { defineRegistry, Renderer } from '@json-render/react'
import { VisibilityProvider, StateProvider } from '@json-render/react'
import { schema } from '@json-render/react/schema'
import { z } from 'zod'

// ============================================
// PRETEXT ENGINE - Zero-Reflow Text Measurement
// ============================================
class PretextEngine {
  private cache = new Map<string, { width: number; height: number; lineCount: number }>()
  
  measure(text: string, fontSize: number, maxWidth: number) {
    const key = `${text}:${fontSize}:${maxWidth}`
    if (!this.cache.has(key)) {
      const prepared = prepare(text, `${fontSize}px Inter, sans-serif`)
      const result = layout(prepared, maxWidth, fontSize * 1.4)
      this.cache.set(key, result)
    }
    return this.cache.get(key)!
  }
  
  getSize(text: string, fontSize: number) {
    // Estimate size without triggering reflow
    const avgCharWidth = fontSize * 0.6
    const lines = Math.ceil(text.length * avgCharWidth / 300) || 1
    return { width: 300, height: lines * fontSize * 1.4 }
  }
}

const pretextEngine = new PretextEngine()

// ============================================
// ERROR BOUNDARY
// ============================================
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: string }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false, error: '' }
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message }
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center p-8">
          <div className="text-center max-w-lg">
            <h1 className="text-2xl font-bold text-red-400 mb-4">⚠️ Error</h1>
            <p className="text-gray-400 mb-4 font-mono text-sm">{this.state.error}</p>
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-purple-600 rounded-lg">
              Reload Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

const MINIMAX_API_KEY = 'sk-cp-f6PbhZS6uNSD1L-mByhEw3RzISEgKDmaQ-kkQGUx79uBrnAZDVWVnDwmLwHC19V1jT07oW7CcU2Dn_3Zr8c90a5xYqk9J1BBNXd0C9bVRbyr-PLbfd31kUE'

interface UIComponent {
  id: string
  type: string
  props: Record<string, any>
  children?: string[]
  _measured?: { width: number; height: number }
}

// ============================================
// JSON RENDER CATALOG
// ============================================
const catalog = defineCatalog(schema, {
  components: {
    Header: { props: z.object({ content: z.string() }), description: 'Header bar with logo' },
    Text: { props: z.object({ content: z.string() }), description: 'Text paragraph' },
    Heading: { props: z.object({ content: z.string(), level: z.string() }), description: 'Heading' },
    Button: { props: z.object({ content: z.string() }), description: 'Button' },
    Card: { props: z.object({ title: z.string(), description: z.string().optional() }), description: 'Card' },
    Container: { props: z.object({ bgColor: z.string().optional() }), description: 'Container' },
    Stack: { props: z.object({ direction: z.string(), gap: z.number().optional() }), description: 'Stack' },
    Grid: { props: z.object({ columns: z.number() }), description: 'Grid' },
    Metric: { props: z.object({ label: z.string(), value: z.string() }), description: 'Metric' },
    Badge: { props: z.object({ content: z.string() }), description: 'Badge' },
    Link: { props: z.object({ content: z.string(), href: z.string() }), description: 'Link' },
  }
})

// ============================================
// COMPONENT RENDERERS
// ============================================
const components = {
  Header: ({ props }: { props: any }) => {
    const size = pretextEngine.measure(props.content, 20, 400)
    return (
      <div className="w-full h-[60px] flex items-center px-6 bg-black/90 border-b border-white/10">
        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {props.content}
        </span>
      </div>
    )
  },
  
  Text: ({ props }: { props: any }) => {
    const size = pretextEngine.measure(props.content, props.fontSize || 16, 800)
    return (
      <p style={{ 
        fontSize: props.fontSize || 16, 
        color: props.isGradient ? 'transparent' : (props.color || '#fff'), 
        background: props.isGradient ? 'linear-gradient(to right, #a855f7, #ec4899)' : undefined, 
        WebkitBackgroundClip: props.isGradient ? 'text' : undefined, 
        WebkitTextFillColor: props.isGradient ? 'transparent' : undefined 
      }}>
        {props.content}
      </p>
    )
  },
  
  Heading: ({ props }: { props: any }) => {
    const sizes: Record<string, string> = { h1: 'text-5xl', h2: 'text-4xl', h3: 'text-3xl' }
    const fontSizes: Record<string, number> = { h1: 48, h2: 36, h3: 24 }
    const size = pretextEngine.measure(props.content, fontSizes[props.level] || 48, 800)
    const style = props.isGradient 
      ? { background: 'linear-gradient(to right, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } 
      : { color: '#fff' }
    return <h2 className={`${sizes[props.level] || 'text-5xl'} font-black`} style={style}>{props.content}</h2>
  },
  
  Button: ({ props, emit }: { props: any; emit: any }) => {
    const size = pretextEngine.measure(props.content, 16, 200)
    return (
      <button 
        className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
        onClick={() => emit?.('press')}
      >
        {props.content}
      </button>
    )
  },
  
  Card: ({ props, children }: { props: any; children?: ReactNode }) => (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur hover:bg-white/10 transition-all duration-300">
      <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        {props.title}
      </h3>
      {props.description && <p className="text-gray-400 leading-relaxed">{props.description}</p>}
      {children}
    </div>
  ),
  
  Container: ({ props, children }: { props: any; children?: ReactNode }) => (
    <div className="mx-auto px-6" style={{ maxWidth: props.maxWidth || 1200, backgroundColor: props.bgColor }}>
      {children}
    </div>
  ),
  
  Stack: ({ props, children }: { props: any; children?: ReactNode }) => (
    <div className={`flex ${props.direction === 'horizontal' ? 'flex-row' : 'flex-col'} gap-6`}>
      {children}
    </div>
  ),
  
  Grid: ({ props, children }: { props: any; children?: ReactNode }) => (
    <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${props.columns || 3}, minmax(0, 1fr))` }}>
      {children}
    </div>
  ),
  
  Metric: ({ props }: { props: any }) => (
    <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
      <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        {props.value}
      </div>
      <div className="text-gray-400 text-sm mt-2">{props.label}</div>
    </div>
  ),
  
  Badge: ({ props }: { props: any }) => (
    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
      {props.content}
    </span>
  ),
  
  Link: ({ props }: { props: any }) => (
    <a href={props.href} className="text-purple-400 hover:text-purple-300 underline underline-offset-4">
      {props.content}
    </a>
  )
}

const { registry } = defineRegistry(catalog, { components })

// ============================================
// FALLBACK COMPONENTS
// ============================================
function fallback(): UIComponent[] {
  return [
    { id: 'header-1', type: 'Header', props: { content: '🎨 Pretext AI UI Toolkit' } },
    { id: 'hero-1', type: 'Heading', props: { content: 'Build UI with AI', level: 'h1', isGradient: true } },
    { id: 'text-1', type: 'Text', props: { content: 'Zero Reflow • JSON Render • A2UI', color: '#9ca3af', fontSize: 18 } },
    { id: 'btn-1', type: 'Button', props: { content: '🚀 Generate Now' } },
    { id: 'grid-1', type: 'Grid', props: { columns: 3 } },
    { id: 'card-1', type: 'Card', props: { title: '⚡ Zero Reflow', description: 'Text measured at ~0.09ms without DOM reflow' } },
    { id: 'card-2', type: 'Card', props: { title: '🎨 JSON Render', description: 'Safe component catalog with Zod validation' } },
    { id: 'card-3', type: 'Card', props: { title: '🤖 A2UI Standard', description: 'Google\'s agent UI spec for declarative UIs' } },
    { id: 'stack-1', type: 'Stack', props: { direction: 'horizontal', gap: 6 } },
    { id: 'metric-1', type: 'Metric', props: { label: 'Speed', value: '0ms' } },
    { id: 'metric-2', type: 'Metric', props: { label: 'Components', value: '50+' } },
    { id: 'metric-3', type: 'Metric', props: { label: 'Security', value: '100%' } },
  ]
}

// ============================================
// AGENT PROMPTS (Enhanced)
// ============================================
const PROMPTS = {
  architect: `You are ARCHITECT - the foundation builder for AI-generated UIs.

TASK: Create HEADER and HERO section

OUTPUT FORMAT (A2UI spec):
{"root":"header-1","elements":{"header-1":{"type":"Header","props":{"content":"🎨 Your Brand"},"hero-1":{"type":"Heading","props":{"content":"Main Headline","level":"h1","isGradient":true}},"sub-1":{"type":"Text","props":{"content":"Subtitle text","color":"#9ca3af"}},"cta-1":{"type":"Button","props":{"content":"🚀 Get Started"}}}}

REQUIREMENTS:
• Header: content with emoji logo
• Hero: Large gradient Heading (h1) with main message
• Subtitle: Text with gray color
• CTA: Button with action text
• Dark theme #0a0a0f, purple accent #8b5cf6

OUTPUT JSON ONLY`,

  designer: `You are DESIGNER - the visual specialist for AI-generated UIs.

TASK: Create FEATURE CARDS section

OUTPUT FORMAT:
{"root":"grid-1","elements":{"grid-1":{"type":"Grid","props":{"columns":3}},"card-1":{"type":"Card","props":{"title":"Feature 1","description":"Description text"}},"card-2":{"type":"Card","props":{"title":"Feature 2","description":"Description text"}},"card-3":{"type":"Card","props":{"title":"Feature 3","description":"Description text"}}}}

REQUIREMENTS:
• Grid with columns: 3
• 3 Cards with title AND description
• Feature titles with emoji
• Descriptions should be 10-20 words
• Hover effects built-in (handled by CSS)

OUTPUT JSON ONLY`,

  frontend: `You are FRONTEND - the conversion specialist for AI-generated UIs.

TASK: Create CTA and STATS section

OUTPUT FORMAT:
{"root":"cta-1","elements":{"cta-1":{"type":"Button","props":{"content":"🚀 Get Started"}},"stack-1":{"type":"Stack","props":{"direction":"horizontal"}},"metric-1":{"type":"Metric","props":{"label":"Label","value":"100+"}},"metric-2":{"type":"Metric","props":{"label":"Label","value":"0ms"}},"metric-3":{"type":"Metric","props":{"label":"Label","value":"100%"}}}}

REQUIREMENTS:
• Primary CTA button
• 3 Metrics in horizontal stack
• Metric values should be impressive numbers
• Labels should be short (1-2 words)

OUTPUT JSON ONLY`,

  qa: `You are QA - the quality assurance specialist.

TASK: Verify and FIX component output

CHECKLIST:
□ Header exists with valid content
□ At least 1 Heading with content
□ At least 1 Button with content  
□ At least 1 Card with title and description
□ All required fields are non-empty
□ Component types are valid

If issues found, FIX them. Output the corrected JSON.`
}

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [spec, setSpec] = useState<any>(null)
  const [logs, setLogs] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(true)
  const [phase, setPhase] = useState('Initializing...')
  const [streamText, setStreamText] = useState('')
  const [currentAgent, setCurrentAgent] = useState('')
  const [generationTime, setGenerationTime] = useState(0)
  
  const initRef = useRef(false)
  const startTimeRef = useRef(0)
  
  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      startTimeRef.current = Date.now()
      runSwarm().catch(console.error)
    }
  }, [])
  
  // MiniMax API call
  async function callMiniMax(system: string, user: string) {
    setStreamText('')
    
    const res = await fetch('https://api.minimax.io/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${MINIMAX_API_KEY}` 
      },
      body: JSON.stringify({ 
        model: 'MiniMax-M2.7', 
        messages: [{ role: 'system', content: system }, { role: 'user', content: user }], 
        stream: true, 
        max_tokens: 2048 
      })
    })
    
    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`)
    
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
            if (data.choices?.[0]?.delta?.content) {
              full += data.choices[0].delta.content
              setStreamText(full)
            }
          } catch {}
        }
      }
    }
    return full
  }
  
  // Parse AI response
  function parseAIResponse(response: string): UIComponent[] {
    const match = response.match(/\{[\s\S]*\}/)
    if (!match) return []
    try {
      const parsed = JSON.parse(match[0])
      if (parsed.elements && typeof parsed.elements === 'object') {
        const comps: UIComponent[] = []
        Object.entries(parsed.elements).forEach((entry) => {
          const id = entry[0] as string
          const elem = entry[1] as any
          if (elem && elem.type) {
            comps.push({ 
              id, 
              type: (elem.type as string).toLowerCase(), 
              props: elem.props || {}, 
              children: elem.children || [] 
            })
          }
        })
        return comps
      }
    } catch (e) {
      console.error('Parse error:', e)
    }
    return []
  }
  
  // Main swarm function
  async function runSwarm() {
    setIsGenerating(true)
    setLogs([])
    setPhase('Starting AI Swarm...')
    setStreamText('')
    
    const allComponents: UIComponent[] = []
    const agents = [
      { name: 'Architect', prompt: PROMPTS.architect },
      { name: 'Designer', prompt: PROMPTS.designer },
      { name: 'Frontend', prompt: PROMPTS.frontend },
    ]
    
    for (const agent of agents) {
      setCurrentAgent(agent.name)
      setPhase(`${agent.name} building...`)
      const time = new Date().toLocaleTimeString()
      setLogs(prev => [...prev.slice(-12), `${time} 🏗️ ${agent.name}: Starting...`])
      
      let success = false
      for (let attempt = 0; attempt < 3 && !success; attempt++) {
        try {
          const result = await callMiniMax(agent.prompt, 'Generate valid JSON component spec.')
          const comps = parseAIResponse(result)
          
          if (comps.length > 0) {
            allComponents.push(...comps)
            setLogs(prev => [...prev.slice(-12), `${time} ✅ ${agent.name}: ${comps.length} components`])
            success = true
          }
        } catch (err) {
          const errMsg = err instanceof Error ? err.message : String(err)
          setLogs(prev => [...prev.slice(-12), `${time} ❌ ${agent.name}: ${errMsg}`])
          if (attempt === 2) {
            setLogs(prev => [...prev.slice(-12), `${time} ⚠️ ${agent.name}: Failed after 3 attempts`])
          }
        }
      }
    }
    
    // QA Agent
    setCurrentAgent('QA')
    setPhase('QA Check...')
    setLogs(prev => [...prev.slice(-12), `${new Date().toLocaleTimeString()} 🔍 QA: Verifying...`])
    
    try {
      const qaResult = await callMiniMax(PROMPTS.qa, `Review: ${JSON.stringify(allComponents.slice(0, 8))}`)
      const qaComps = parseAIResponse(qaResult)
      
      if (qaComps.length >= allComponents.length) {
        allComponents.length = 0
        allComponents.push(...qaComps)
        setLogs(prev => [...prev.slice(-12), `${new Date().toLocaleTimeString()} ✅ QA: Verified ${qaComps.length} components`])
      }
    } catch (err) {
      setLogs(prev => [...prev.slice(-12), `${new Date().toLocaleTimeString()} ⚠️ QA: Skipped`])
    }
    
    // Fallback if needed
    if (allComponents.length < 5) {
      setLogs(prev => [...prev.slice(-12), `${new Date().toLocaleTimeString()} 🔧 Using fallback...`])
      allComponents.push(...fallback())
    }
    
    // Build spec
    const elements: Record<string, any> = {}
    let root = ''
    allComponents.forEach((c) => {
      if (!root) root = c.id
      elements[c.id] = { 
        type: c.type.charAt(0).toUpperCase() + c.type.slice(1), 
        props: c.props || {}, 
        children: c.children || [] 
      }
    })
    
    const finalSpec = { root, elements }
    setSpec(finalSpec)
    
    const elapsed = ((Date.now() - startTimeRef.current) / 1000).toFixed(1)
    setGenerationTime(parseFloat(elapsed))
    setLogs(prev => [...prev.slice(-12), `${new Date().toLocaleTimeString()} ✅ Done in ${elapsed}s`])
    
    setPhase('Complete!')
    setCurrentAgent('')
    setIsGenerating(false)
    setStreamText('')
  }
  
  return (
    <ErrorBoundary>
      <StateProvider>
        <div className="min-h-screen bg-[#0a0a0f] text-white">
          {/* Header */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎨</span>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Pretext + JSON Render + A2UI
                </h1>
              </div>
              <div className="flex items-center gap-4">
                {isGenerating && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                    <span>{phase}</span>
                  </div>
                )}
                {!isGenerating && generationTime > 0 && (
                  <span className="text-sm text-green-400">⚡ {generationTime}s</span>
                )}
                <button 
                  onClick={runSwarm} 
                  disabled={isGenerating}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-500 hover:to-pink-500 transition-all"
                >
                  {isGenerating ? '⏳ Generating...' : '🔄 Regenerate'}
                </button>
              </div>
            </div>
          </header>
          
          {/* Main */}
          <main className="pt-20">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6">
                <div className="w-full max-w-2xl space-y-6">
                  {/* Agent status */}
                  <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      🐝 AI Swarm Building
                    </h2>
                    <p className="text-gray-400">
                      {currentAgent ? `Running ${currentAgent} agent...` : 'Initializing...'}
                    </p>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" style={{ width: '60%' }} />
                  </div>
                  
                  {/* Live stream */}
                  <div className="bg-black/60 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs text-gray-400">Live Output</span>
                    </div>
                    <pre className="text-sm text-purple-300 whitespace-pre-wrap font-mono h-32 overflow-auto">
                      {streamText || 'Waiting for response...'}
                    </pre>
                  </div>
                  
                  {/* Logs */}
                  <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                    <pre className="text-xs text-gray-500 whitespace-pre-wrap font-mono">
                      {logs.join('\n') || 'Starting agents...'}
                    </pre>
                  </div>
                </div>
              </div>
            ) : spec ? (
              <div className="p-8 max-w-6xl mx-auto space-y-12">
                {/* Generated UI */}
                <section className="animate-fadeIn">
                  <Renderer spec={spec} registry={registry} />
                </section>
                
                {/* Stats footer */}
                <footer className="text-center text-gray-500 text-sm">
                  <p>Generated with 🐝 AI Swarm • Pretext + JSON Render + A2UI</p>
                </footer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[calc(100vh-80px)] text-gray-500">
                No components generated
              </div>
            )}
          </main>
        </div>
      </VisibilityProvider>
      </StateProvider>
    </ErrorBoundary>
  )
}
