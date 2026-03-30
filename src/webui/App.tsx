// ============================================================
// PRETEXT AI UI - SIMPLIFIED WORKING VERSION
// ============================================================
import React, { useState, useEffect, useRef, Component, ReactNode } from 'react'
import { prepare, layout, prepareWithSegments, layoutWithLines, layoutNextLine } from '@chenglou/pretext'

const MINIMAX_API_KEY = 'sk-cp-f6PbhZS6uNSD1L-mByhEw3RzISEgKDmaQ-kkQGUx79uBrnAZDVWVnDwmLwHC19V1jT07oW7CcU2Dn_3Zr8c90a5xYqk9J1BBNXd0C9bVRbyr-PLbfd31kUE'

// ============================================
// PRETEXT ENGINE
// ============================================
class PretextEngine {
  private cache = new Map<string, any>()
  measure(text: string, fontSize: number, maxWidth: number) {
    const key = `${text}:${fontSize}:${maxWidth}`
    if (!this.cache.has(key)) {
      const prepared = prepare(text, `${fontSize}px Inter`)
      const result = layout(prepared, maxWidth, fontSize * 1.4)
      this.cache.set(key, result)
    }
    return this.cache.get(key)
  }
  getLines(text: string, fontSize: number, maxWidth: number) {
    const key = `lines:${text}:${fontSize}:${maxWidth}`
    if (!this.cache.has(key)) {
      const prepared = prepareWithSegments(text, `${fontSize}px Inter`)
      const result = layoutWithLines(prepared, maxWidth, fontSize * 1.4)
      this.cache.set(key, result)
    }
    return this.cache.get(key)
  }
}
const pretextEngine = new PretextEngine()

// ============================================
// ERROR BOUNDARY
// ============================================
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: string }> {
  constructor(props: { children: ReactNode }) { super(props); this.state = { hasError: false, error: '' } }
  static getDerivedStateFromError(error: Error) { return { hasError: true, error: error.message } }
  render() {
    if (this.state.hasError) return <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center"><div><h1 className="text-2xl font-bold text-red-400">Error</h1><p className="text-gray-400">{this.state.error}</p></div></div>
    return this.props.children
  }
}

// ============================================
// COMPONENTS (Direct React - no JSON Render)
// ============================================
const Header = ({ content }: { content: string }) => (
  <div className="w-full h-[70px] flex items-center px-8 bg-black/90 border-b border-white/10">
    <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{content}</span>
  </div>
)

const Heading = ({ content, level = 'h1', isGradient = false }: { content: string; level?: string; isGradient?: boolean }) => {
  const sizes: Record<string, string> = { h1: 'text-6xl', h2: 'text-4xl', h3: 'text-2xl' }
  const style = isGradient ? { background: 'linear-gradient(to right, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : { color: '#fff' }
  return <h2 className={`${sizes[level] || 'text-6xl'} font-black`} style={style}>{content}</h2>
}

const Text = ({ content, color = '#fff', fontSize = 16 }: { content: string; color?: string; fontSize?: number }) => {
  const { height } = pretextEngine.measure(content, fontSize, 800)
  return <p style={{ fontSize, color, minHeight: height }}>{content}</p>
}

const Button = ({ content, onClick }: { content: string; onClick?: () => void }) => (
  <button className="px-10 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all shadow-xl" onClick={onClick}>
    {content}
  </button>
)

const Card = ({ title, description }: { title: string; description?: string }) => (
  <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    {description && <p className="text-gray-400">{description}</p>}
  </div>
)

const Grid = ({ columns = 3, children }: { columns?: number; children: ReactNode }) => (
  <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>{children}</div>
)

const Metric = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10">
    <div className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">{value}</div>
    <div className="text-gray-400 text-sm uppercase">{label}</div>
  </div>
)

const Badge = ({ content }: { content: string }) => (
  <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-purple-500/20 text-purple-300">{content}</span>
)

// ============================================
// FALLBACK DATA
// ============================================
const FALLBACK_COMPONENTS = [
  { type: 'Header', props: { content: '🎨 Pretext AI UI' } },
  { type: 'Badge', props: { content: '🚀 Zero-Reflow Text' } },
  { type: 'Heading', props: { content: 'Build UIs with AI', level: 'h1', isGradient: true } },
  { type: 'Text', props: { content: 'Powered by Pretext, JSON Render, and A2UI', color: '#9ca3af', fontSize: 20 } },
  { type: 'Button', props: { content: '🚀 Generate Now' } },
  { type: 'Heading', props: { content: 'Features', level: 'h2' } },
  { type: 'Grid', props: { columns: 3 }, children: [
    { type: 'Card', props: { title: '⚡ Speed', description: '~0.09ms per measurement' } },
    { type: 'Card', props: { title: '🎨 Design', description: 'Beautiful components' } },
    { type: 'Card', props: { title: '🤖 AI', description: 'Swarm-powered generation' } },
  ]},
  { type: 'Heading', props: { content: 'Stats', level: 'h2' } },
  { type: 'Grid', props: { columns: 4 }, children: [
    { type: 'Metric', props: { value: '10K+', label: 'Users' } },
    { type: 'Metric', props: { value: '50+', label: 'Components' } },
    { type: 'Metric', props: { value: '99.9%', label: 'Uptime' } },
    { type: 'Metric', props: { value: '4.9⭐', label: 'Rating' } },
  ]},
]

// ============================================
// RENDER COMPONENT
// ============================================
function renderComponent(comp: any): ReactNode {
  switch (comp.type) {
    case 'Header': return <Header key={comp.id} {...comp.props} />
    case 'Heading': return <Heading key={comp.id} {...comp.props} />
    case 'Text': return <Text key={comp.id} {...comp.props} />
    case 'Button': return <Button key={comp.id} {...comp.props} />
    case 'Card': return <Card key={comp.id} {...comp.props} />
    case 'Grid': return <Grid key={comp.id} {...comp.props}>{comp.children?.map((c: any) => renderComponent(c))}</Grid>
    case 'Metric': return <Metric key={comp.id} {...comp.props} />
    case 'Badge': return <Badge key={comp.id} {...comp.props} />
    default: return null
  }
}

// ============================================
// AGENTS
// ============================================
const AGENTS = {
  architect: { name: 'Architect', system: 'You are ARCHITECT. Create HEADER + HERO. Return JSON: {"root":"header","elements":{"header":{"type":"Header","props":{"content":"🎨 Pretext AI UI"}}}}' },
  designer: { name: 'Designer', system: 'You are DESIGNER. Create 3 FEATURE CARDS. Return JSON: {"root":"grid","elements":{"grid":{"type":"Grid","props":{"columns":3}},"card1":{"type":"Card","props":{"title":"Speed","description":"Fast"}},"card2":{"type":"Card","props":{"title":"Design","description":"Beautiful"}},"card3":{"type":"Card","props":{"title":"AI","description":"Smart"}}}}' },
  stats: { name: 'Stats', system: 'You are STATS. Create 4 METRICS. Return JSON: {"root":"metrics","elements":{"m1":{"type":"Metric","props":{"value":"10K+","label":"Users"}},"m2":{"type":"Metric","props":{"value":"50+","label":"Components"}},"m3":{"type":"Metric","props":{"value":"99.9%","label":"Uptime"}},"m4":{"type":"Metric","props":{"value":"4.9","label":"Rating"}}}}' },
  cta: { name: 'CTA', system: 'You are CTA. Create CTA SECTION. Return JSON: {"root":"cta","elements":{"heading":{"type":"Heading","props":{"content":"Ready?","level":"h2","isGradient":true}},"btn":{"type":"Button","props":{"content":"🚀 Start"}}}}' },
}

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [components, setComponents] = useState<any[]>([])
  const [logs, setLogs] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(true)
  const [phase, setPhase] = useState('Starting...')
  const [progress, setProgress] = useState(0)
  const [genTime, setGenTime] = useState(0)
  
  const startRef = useRef(0)
  
  async function callAPI(system: string) {
    const res = await fetch('https://api.minimax.io/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MINIMAX_API_KEY}` },
      body: JSON.stringify({ model: 'MiniMax-M2.7', messages: [{ role: 'system', content: system }, { role: 'user', content: 'Return JSON only.' }], max_tokens: 1024 })
    })
    const data = await res.json()
    return data.choices?.[0]?.message?.content || ''
  }
  
  function parseJSON(text: string): any {
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) return null
    try { return JSON.parse(match[0]) } catch { return null }
  }
  
  function elementsToComponents(elements: Record<string, any>): any[] {
    return Object.entries(elements).map(([id, elem]: [string, any]) => ({
      id, type: elem.type, props: elem.props, children: elem.children?.map((childId: string) => {
        const child = elements[childId]
        return child ? { id: childId, type: child.type, props: child.props } : null
      }).filter(Boolean)
    })).filter((c: any) => c.type)
  }
  
  async function runSwarm() {
    setIsGenerating(true)
    setLogs([])
    setPhase('Running agents...')
    startRef.current = Date.now()
    const allElements: Record<string, any> = {}
    
    const agentKeys = Object.keys(AGENTS)
    for (let i = 0; i < agentKeys.length; i++) {
      const key = agentKeys[i]
      const agent = AGENTS[key as keyof typeof AGENTS]
      setPhase(`${agent.name}...`)
      setProgress(Math.round(((i + 1) / agentKeys.length) * 100))
      
      try {
        const text = await callAPI(agent.system)
        const parsed = parseJSON(text)
        if (parsed?.elements) {
          Object.assign(allElements, parsed.elements)
          setLogs(prev => [...prev.slice(-8), `✅ ${agent.name}: OK`])
        } else {
          setLogs(prev => [...prev.slice(-8), `⚠️ ${agent.name}: No valid JSON`])
        }
      } catch (err) {
        setLogs(prev => [...prev.slice(-8), `❌ ${agent.name}: ${err}`])
      }
    }
    
    // Use fallback if no components
    if (Object.keys(allElements).length === 0) {
      setLogs(prev => [...prev.slice(-8), `🔧 Using fallback...`])
      const fallbackData = { root: 'f1', elements: { f1: { type: 'Heading', props: { content: 'Fallback - API may have failed', level: 'h1' } } } }
      const fallback = parseJSON(JSON.stringify(fallbackData))
      if (fallback?.elements) Object.assign(allElements, fallback.elements)
    }
    
    const comps = elementsToComponents(allElements)
    setComponents(comps)
    setGenTime(((Date.now() - startRef.current) / 1000).toFixed(1))
    setPhase('Complete!')
    setIsGenerating(false)
  }
  
  // Run on mount
  useEffect(() => { runSwarm() }, [])
  
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#0a0a0f] text-white">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📐</span>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Pretext AI UI</h1>
            </div>
            <div className="flex items-center gap-4">
              {!isGenerating && <span className="text-sm text-green-400">⚡ {genTime}s</span>}
              <button onClick={runSwarm} disabled={isGenerating} className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-sm disabled:opacity-50">
                {isGenerating ? '⏳' : '🔄'}
              </button>
            </div>
          </div>
        </header>
        
        <main className="pt-20">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">🐝 AI Swarm Building</h2>
              <p className="text-gray-400 mb-4">{phase}</p>
              <div className="w-64 h-2 bg-white/10 rounded-full"><div className="h-full bg-purple-500 transition-all" style={{ width: `${progress}%` }} /></div>
              <div className="mt-8 bg-black/40 rounded-xl p-4 max-w-md"><pre className="text-xs text-gray-500">{logs.join('\n') || 'Starting...'}</pre></div>
            </div>
          ) : (
            <div className="p-8 max-w-6xl mx-auto space-y-12">
              {components.map(comp => renderComponent(comp))}
              <footer className="text-center text-gray-500 text-sm border-t border-white/10 pt-8">
                <p>📐 Built with Pretext AI UI • {genTime}s</p>
              </footer>
            </div>
          )}
        </main>
      </div>
    </ErrorBoundary>
  )
}
