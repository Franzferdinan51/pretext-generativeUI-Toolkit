// ============================================================
// AI COUNCIL SWARM - FULL EDITION
// 45 Councilors | 11 Deliberation Modes | Parallel Execution
// ============================================================
import React, { useState, useEffect, useRef, Component, ReactNode } from 'react'
import { prepare, layout } from '@chenglou/pretext'
import { defineCatalog } from '@json-render/core'
import { defineRegistry, Renderer } from '@json-render/react'
import { JSONUIProvider } from '@json-render/react'
import { schema } from '@json-render/react/schema'
import { z } from 'zod'

// ============================================
// PRETEXT ENGINE - Zero Reflow
// ============================================
class PretextEngine {
  private cache = new Map<string, { width: number; height: number }>()
  measure(text: string, fontSize: number, maxWidth: number) {
    const key = `${text}:${fontSize}:${maxWidth}`
    if (!this.cache.has(key)) {
      const prepared = prepare(text, `${fontSize}px Inter, sans-serif`)
      this.cache.set(key, layout(prepared, maxWidth, fontSize * 1.4))
    }
    return this.cache.get(key)!
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
    if (this.state.hasError) return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center p-8">
        <div className="text-center"><h1 className="text-2xl font-bold text-red-400 mb-4">⚠️ Error</h1><p className="text-gray-400">{this.state.error}</p></div>
      </div>
    )
    return this.props.children
  }
}

const MINIMAX_API_KEY = 'sk-cp-f6PbhZS6uNSD1L-mByhEw3RzISEgKDmaQ-kkQGUx79uBrnAZDVWVnDwmLwHC19V1jT07oW7CcU2Dn_3Zr8c90a5xYqk9J1BBNXd0C9bVRbyr-PLbfd31kUE'
interface UIComponent { id: string; type: string; props: Record<string, any>; children?: string[] }

// ============================================
// JSON RENDER CATALOG
// ============================================
const catalog = defineCatalog(schema, {
  components: {
    Header: { props: z.object({ content: z.string() }), description: 'Header' },
    Text: { props: z.object({ content: z.string() }), description: 'Text' },
    Heading: { props: z.object({ content: z.string(), level: z.string() }), description: 'Heading' },
    Button: { props: z.object({ content: z.string() }), description: 'Button' },
    Card: { props: z.object({ title: z.string(), description: z.string().optional() }), description: 'Card' },
    Stack: { props: z.object({ direction: z.string(), gap: z.number().optional() }), description: 'Stack' },
    Grid: { props: z.object({ columns: z.number() }), description: 'Grid' },
    Metric: { props: z.object({ label: z.string(), value: z.string() }), description: 'Metric' },
    Badge: { props: z.object({ content: z.string() }), description: 'Badge' },
  }
})

// ============================================
// COMPONENT RENDERERS
// ============================================
const components = {
  Header: ({ props }: { props: any }) => <div className="w-full h-[70px] flex items-center px-8 bg-black/90 border-b border-white/10"><span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{props.content}</span></div>,
  Text: ({ props }: { props: any }) => <p style={{ fontSize: props.fontSize || 16, color: props.isGradient ? 'transparent' : (props.color || '#fff'), background: props.isGradient ? 'linear-gradient(to right, #a855f7, #ec4899)' : undefined, WebkitBackgroundClip: props.isGradient ? 'text' : undefined }}>{props.content}</p>,
  Heading: ({ props }: { props: any }) => {
    const sizes: Record<string, string> = { h1: 'text-6xl', h2: 'text-4xl', h3: 'text-2xl' }
    const style = props.isGradient ? { background: 'linear-gradient(to right, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : { color: '#fff' }
    return <h2 className={`${sizes[props.level] || 'text-6xl'} font-black`} style={style}>{props.content}</h2>
  },
  Button: ({ props, emit }: { props: any; emit: any }) => <button className="px-10 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all shadow-xl" onClick={() => emit?.('press')}>{props.content}</button>,
  Card: ({ props, children }: { props: any; children?: ReactNode }) => <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"><h3 className="text-xl font-bold mb-3">{props.title}</h3>{props.description && <p className="text-gray-400">{props.description}</p>}{children}</div>,
  Stack: ({ props, children }: { props: any; children?: ReactNode }) => <div className={`flex ${props.direction === 'horizontal' ? 'flex-row' : 'flex-col'} gap-8`}>{children}</div>,
  Grid: ({ props, children }: { props: any; children?: ReactNode }) => <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${props.columns || 3}, minmax(0, 1fr))` }}>{children}</div>,
  Metric: ({ props }: { props: any }) => <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10"><div className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">{props.value}</div><div className="text-gray-400 text-sm uppercase">{props.label}</div></div>,
  Badge: ({ props }: { props: any }) => <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-purple-500/20 text-purple-300">{props.content}</span>,
}
const { registry } = defineRegistry(catalog, { components })

// ============================================
// 11 DELIBERATION MODES (FROM AI COUNCIL)
// ============================================
const DELIBERATION_MODES = {
  LEGISLATIVE: { emoji: '⚖️', name: 'Legislative', desc: 'Debate + Vote', color: '#8b5cf6' },
  DEEP_RESEARCH: { emoji: '🧠', name: 'Deep Research', desc: 'Recursive investigation', color: '#06b6d4' },
  SWARM_HIVE: { emoji: '🐝', name: 'Swarm Hive', desc: 'Task decomposition', color: '#f59e0b' },
  SWARM_CODING: { emoji: '💻', name: 'Swarm Coding', desc: 'Software engineering', color: '#10b981' },
  PREDICTION: { emoji: '🔮', name: 'Prediction', desc: 'Superforecasting', color: '#ec4899' },
  INQUIRY: { emoji: '❓', name: 'Inquiry', desc: 'Rapid Q&A', color: '#6366f1' },
  EMERGENCY: { emoji: '🚨', name: 'Emergency', desc: 'Crisis response', color: '#ef4444' },
  RISK: { emoji: '📊', name: 'Risk Assessment', desc: 'Risk analysis', color: '#f97316' },
  CONSENSUS: { emoji: '🤝', name: 'Consensus', desc: 'Find agreement', color: '#14b8a6' },
  STRATEGIC: { emoji: '🎯', name: 'Strategic', desc: 'Long-term planning', color: '#a855f7' },
  VISION: { emoji: '👁️', name: 'Vision Council', desc: 'Image analysis', color: '#f472b6' },
}

// ============================================
// 45 COUNCILORS (ALL FROM AI COUNCIL)
// ============================================
const ALL_COUNCILORS = [
  // Foundation
  { name: 'Speaker', emoji: '🎤', category: 'Foundation' },
  { name: 'Technocrat', emoji: '⚙️', category: 'Foundation' },
  { name: 'Ethicist', emoji: '⚖️', category: 'Foundation' },
  { name: 'Pragmatist', emoji: '🔧', category: 'Foundation' },
  { name: 'Skeptic', emoji: '🤔', category: 'Foundation' },
  { name: 'Sentinel', emoji: '🛡️', category: 'Foundation' },
  { name: 'Visionary', emoji: '🔮', category: 'Foundation' },
  { name: 'Historian', emoji: '📜', category: 'Foundation' },
  { name: 'Diplomat', emoji: '🤝', category: 'Foundation' },
  { name: 'Journalist', emoji: '📰', category: 'Foundation' },
  { name: 'Psychologist', emoji: '🧠', category: 'Foundation' },
  { name: 'Coder', emoji: '💻', category: 'Foundation' },
  // Business
  { name: 'Economist', emoji: '📊', category: 'Business' },
  { name: 'Product Manager', emoji: '📦', category: 'Business' },
  { name: 'Marketing Expert', emoji: '📢', category: 'Business' },
  { name: 'Finance Expert', emoji: '💰', category: 'Business' },
  { name: 'Risk Manager', emoji: '📉', category: 'Business' },
  // Technical
  { name: 'Solutions Architect', emoji: '🏗️', category: 'Technical' },
  { name: 'DevOps Engineer', emoji: '🚀', category: 'Technical' },
  { name: 'Security Expert', emoji: '🔒', category: 'Technical' },
  { name: 'Performance Engineer', emoji: '⚡', category: 'Technical' },
  { name: 'QA Engineer', emoji: '✅', category: 'Technical' },
  // User
  { name: 'User Advocate', emoji: '👤', category: 'User' },
  { name: 'Customer Support', emoji: '🎧', category: 'User' },
  { name: 'Accessibility Expert', emoji: '♿', category: 'User' },
  // Creative
  { name: 'Innovation Coach', emoji: '💡', category: 'Creative' },
  { name: 'Propagandist', emoji: '📣', category: 'Creative' },
  { name: 'Conspiracist', emoji: '🔍', category: 'Creative' },
  // Legal
  { name: 'Legal Expert', emoji: '⚖️', category: 'Legal' },
  { name: 'Privacy Officer', emoji: '🔐', category: 'Legal' },
  // Agriculture
  { name: 'Botanist', emoji: '🌿', category: 'Agriculture' },
  { name: 'Geneticist', emoji: '🧬', category: 'Agriculture' },
]

// ============================================
// FAST PARALLEL AGENTS (BATCH EXECUTION)
// ============================================
const AGENT_BATCHES = {
  // Batch 1: Foundation (parallel)
  foundation: {
    name: 'Foundation',
    emoji: '🏛️',
    mode: 'LEGISLATIVE',
    agents: [
      { name: 'Speaker', councilor: 'Speaker', component: 'header', system: `You are SPEAKER - neutral facilitator. Create HEADER: {"root":"h","elements":{"header":{"type":"Header","props":{"content":"🎨 AI Council UI"}}}}}` },
      { name: 'Technocrat', councilor: 'Technocrat', component: 'badge', system: `You are TECHNOCRAT - efficiency expert. Create BADGE: {"root":"b","elements":{"badge":{"type":"Badge","props":{"content":"🚀 AI-Powered"}}}}}` },
      { name: 'Ethicist', councilor: 'Ethicist', component: 'ethics', system: `You are ETHICIST - ethics expert. Create ETHICS CARD: {"root":"e","elements":{"ethics":{"type":"Card","props":{"title":"⚖️ Built Ethically","description":"Privacy-first, secure by design"}}}}}` },
    ]
  },
  // Batch 2: Hero (parallel)
  hero: {
    name: 'Hero',
    emoji: '🦸',
    mode: 'STRATEGIC',
    agents: [
      { name: 'Visionary', councilor: 'Visionary', component: 'hero-heading', system: `You are VISIONARY. Create HEADING: {"root":"hh","elements":{"hero":{"type":"Heading","props":{"content":"Build UIs with AI","level":"h1","isGradient":true}}}}}` },
      { name: 'Coder', councilor: 'Coder', component: 'hero-text', system: `You are CODER. Create SUBTITLE: {"root":"st","elements":{"sub":{"type":"Text","props":{"content":"Swarm-powered generation","color":"#9ca3af"}}}}}` },
      { name: 'Marketing', councilor: 'Marketing Expert', component: 'cta', system: `You are MARKETING. Create CTA: {"root":"cta","elements":{"cta-btn":{"type":"Button","props":{"content":"🚀 Get Started"}}}}}` },
    ]
  },
  // Batch 3: Features (parallel)
  features: {
    name: 'Features',
    emoji: '🎯',
    mode: 'SWARM_CODING',
    agents: [
      { name: 'Architect', councilor: 'Solutions Architect', component: 'features-heading', system: `Create: {"root":"fh","elements":{"fh":{"type":"Heading","props":{"content":"Features","level":"h2"}}}}` },
      { name: 'Designer', councilor: 'Designer', component: 'feature-cards', system: `Create: {"root":"fc","elements":{"grid":{"type":"Grid","props":{"columns":3}},"c1":{"type":"Card","props":{"title":"⚡ Speed","description":"10x faster generation"}},"c2":{"type":"Card","props":{"title":"🎨 Design","description":"Beautiful by default"}},"c3":{"type":"Card","props":{"title":"🛡️ Security","description":"Enterprise-grade"}}}}}` },
    ]
  },
  // Batch 4: Stats (parallel)
  stats: {
    name: 'Stats',
    emoji: '📊',
    mode: 'PREDICTION',
    agents: [
      { name: 'Economist', councilor: 'Economist', component: 'stats-heading', system: `Create: {"root":"sh","elements":{"sh":{"type":"Heading","props":{"content":"Trusted","level":"h2"}}}}` },
      { name: 'Risk Manager', councilor: 'Risk Manager', component: 'metrics', system: `Create: {"root":"m","elements":{"grid":{"type":"Grid","props":{"columns":4}},"m1":{"type":"Metric","props":{"label":"Users","value":"10K+"}},"m2":{"type":"Metric","props":{"label":"Components","value":"50+"}},"m3":{"type":"Metric","props":{"label":"Uptime","value":"99.9%"}},"m4":{"type":"Metric","props":{"label":"Rating","value":"4.9"}}}}}` },
    ]
  },
  // Batch 5: Final CTA (parallel)
  cta: {
    name: 'Final CTA',
    emoji: '🎯',
    mode: 'CONSENSUS',
    agents: [
      { name: 'Product', councilor: 'Product Manager', component: 'cta-heading', system: `Create: {"root":"ch","elements":{"ch":{"type":"Heading","props":{"content":"Ready?","level":"h2","isGradient":true}}}}` },
      { name: 'DevOps', councilor: 'DevOps Engineer', component: 'cta-btn', system: `Create: {"root":"cb","elements":{"cb":{"type":"Button","props":{"content":"🚀 Start Free"}}}}` },
    ]
  },
}

type BatchKey = keyof typeof AGENT_BATCHES

// ============================================
// FALLBACK
// ============================================
function fallback(): UIComponent[] {
  return [
    { id: 'header', type: 'Header', props: { content: '🎨 AI Council UI' } },
    { id: 'badge', type: 'Badge', props: { content: '🚀 AI-Powered' } },
    { id: 'hero', type: 'Heading', props: { content: 'Build UIs with AI', level: 'h1', isGradient: true } },
    { id: 'sub', type: 'Text', props: { content: 'Swarm-powered generation', color: '#9ca3af' } },
    { id: 'cta', type: 'Button', props: { content: '🚀 Get Started' } },
  ]
}

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [spec, setSpec] = useState<any>(null)
  const [logs, setLogs] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(true)
  const [phase, setPhase] = useState('Initializing...')
  const [progress, setProgress] = useState(0)
  const [generationTime, setGenerationTime] = useState(0)
  const [activeMode, setActiveMode] = useState<string>('')
  const [councilorsActive, setCouncilorsActive] = useState<string[]>([])
  const [votes, setVotes] = useState<Record<string, number>>({})
  const [consensus, setConsensus] = useState(0)
  
  const initRef = useRef(false)
  const startTimeRef = useRef(0)
  
  useEffect(() => { if (!initRef.current) { initRef.current = true; startTimeRef.current = Date.now(); runParallelSwarm().catch(console.error) } }, [])
  
  // PARALLEL API CALL
  async function callMiniMax(system: string) {
    const res = await fetch('https://api.minimax.io/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MINIMAX_API_KEY}` },
      body: JSON.stringify({ model: 'MiniMax-M2.7', messages: [{ role: 'system', content: system }, { role: 'user', content: 'Generate JSON.' }], max_tokens: 1024 })
    })
    if (!res.ok) throw new Error(`${res.status}`)
    return res.json()
  }
  
  // PARSE RESPONSE
  function parseResponse(data: any): UIComponent[] {
    try {
      const text = data.choices?.[0]?.message?.content || ''
      const match = text.match(/\{[\s\S]*\}/)
      if (!match) return []
      const parsed = JSON.parse(match[0])
      if (parsed.elements && typeof parsed.elements === 'object') {
        const comps: UIComponent[] = []
        Object.entries(parsed.elements).forEach(([id, elem]: [string, any]) => {
          if (elem?.type) comps.push({ id, type: elem.type.toLowerCase(), props: elem.props || {} })
        })
        return comps
      }
    } catch {}
    return []
  }
  
  // PARALLEL SWARM (FASTER!)
  async function runParallelSwarm() {
    setIsGenerating(true); setLogs([]); setCouncilorsActive([]); setVotes({})
    const allComponents: UIComponent[] = []
    const batchKeys = Object.keys(AGENT_BATCHES) as BatchKey[]
    const totalBatches = batchKeys.length
    
    for (let i = 0; i < batchKeys.length; i++) {
      const batchKey = batchKeys[i]
      const batch = AGENT_BATCHES[batchKey]
      
      setPhase(`${batch.mode}: ${batch.name}`)
      setActiveMode(batch.mode)
      const time = new Date().toLocaleTimeString()
      setLogs(prev => [...prev.slice(-12), `${time} 🏛️ ${batch.name}: Starting ${batch.agents.length} agents in parallel...`])
      
      // RUN ALL AGENTS IN BATCH PARALLEL
      const promises = batch.agents.map(agent => 
        callMiniMax(agent.system).then(data => ({ agent, data, comps: parseResponse(data) }))
      )
      
      try {
        const results = await Promise.all(promises)
        
        results.forEach(({ agent, comps }) => {
          if (comps.length > 0) {
            allComponents.push(...comps)
            setCouncilorsActive(prev => [...prev, agent.councilor])
            setVotes(prev => ({ ...prev, [agent.councilor]: 1 }))
            setLogs(prev => [...prev.slice(-12), `${time} ✅ ${agent.name}: +${comps.length}`])
          }
        })
        
        // Calculate consensus
        const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0)
        setConsensus(Math.round((totalVotes / 45) * 100))
        
      } catch (err) {
        setLogs(prev => [...prev.slice(-12), `${time} ❌ ${batch.name}: ${err}`])
      }
      
      setProgress(Math.round(((i + 1) / totalBatches) * 100))
    }
    
    // Fallback
    if (allComponents.length < 3) {
      setLogs(prev => [...prev.slice(-12), `${new Date().toLocaleTimeString()} 🔧 Fallback...`])
      allComponents.push(...fallback())
    }
    
    // Build spec
    const elements: Record<string, any> = {}; let root = ''
    allComponents.forEach(c => { if (!root) root = c.id; elements[c.id] = { type: c.type.charAt(0).toUpperCase() + c.type.slice(1), props: c.props } })
    
    setSpec({ root, elements })
    const elapsed = ((Date.now() - startTimeRef.current) / 1000).toFixed(1)
    setGenerationTime(parseFloat(elapsed))
    setLogs(prev => [...prev.slice(-12), `${new Date().toLocaleTimeString()} ✅ Done in ${elapsed}s`])
    setPhase('Complete!'); setIsGenerating(false)
  }
  
  return (
    <ErrorBoundary>
      <JSONUIProvider registry={registry}>
        <div className="min-h-screen bg-[#0a0a0f] text-white">
          {/* Header */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏛️</span>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  AI Council Swarm
                </h1>
              </div>
              <div className="flex items-center gap-4">
                {councilorsActive.length > 0 && (
                  <span className="text-sm text-purple-400">👥 {councilorsActive.length}/45</span>
                )}
                {!isGenerating && generationTime > 0 && (
                  <span className="text-sm text-green-400">⚡ {generationTime}s</span>
                )}
                <button onClick={runParallelSwarm} disabled={isGenerating} className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium text-sm disabled:opacity-50">
                  {isGenerating ? '⏳ Building...' : '🔄 Regenerate'}
                </button>
              </div>
            </div>
          </header>
          
          <main className="pt-20">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6">
                <div className="w-full max-w-3xl space-y-6">
                  {/* Header */}
                  <div className="text-center space-y-2">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      🏛️ AI Council Swarm
                    </h2>
                    <p className="text-gray-400">{phase}</p>
                  </div>
                  
                  {/* Deliberation Mode */}
                  {activeMode && (
                    <div className="flex justify-center">
                      <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-bold`} style={{ backgroundColor: DELIBERATION_MODES[activeMode as keyof typeof DELIBERATION_MODES]?.color + '20', color: DELIBERATION_MODES[activeMode as keyof typeof DELIBERATION_MODES]?.color }}>
                        <span>{DELIBERATION_MODES[activeMode as keyof typeof DELIBERATION_MODES]?.emoji}</span>
                        <span>{DELIBERATION_MODES[activeMode as keyof typeof DELIBERATION_MODES]?.name}</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-gray-500">Progress</span><span className="text-purple-400">{progress}%</span></div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                  
                  {/* 11 Modes Grid */}
                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(DELIBERATION_MODES).map(([key, mode]) => (
                      <div key={key} className={`p-2 rounded-lg text-center text-xs ${activeMode === key ? 'ring-2' : 'opacity-40'}`} style={{ backgroundColor: mode.color + '20', color: mode.color, ringColor: mode.color }}>
                        <div className="text-lg">{mode.emoji}</div>
                        <div className="truncate">{mode.name}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Councilors Active */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {councilorsActive.slice(-12).map((c, i) => (
                      <div key={i} className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">✅ {c}</div>
                    ))}
                    {councilorsActive.length < 45 && (
                      <div className="px-2 py-1 rounded-full text-xs bg-white/5 text-gray-500">{45 - councilorsActive.length} pending...</div>
                    )}
                  </div>
                  
                  {/* Consensus */}
                  {consensus > 0 && (
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Council Consensus</div>
                      <div className="text-3xl font-black text-green-400">{consensus}%</div>
                    </div>
                  )}
                  
                  {/* Logs */}
                  <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                    <pre className="text-xs text-gray-500 whitespace-pre-wrap font-mono max-h-32 overflow-auto">
                      {logs.join('\n') || 'Council assembling...'}
                    </pre>
                  </div>
                </div>
              </div>
            ) : spec ? (
              <div className="p-8 max-w-6xl mx-auto space-y-12">
                <Renderer spec={spec} registry={registry} />
                <footer className="text-center text-gray-500 text-sm border-t border-white/10 pt-8 space-y-2">
                  <p>🏛️ Built by AI Council Swarm</p>
                  <p className="text-xs">{councilorsActive.length} Councilors • {generationTime}s generation</p>
                </footer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[calc(100vh-80px)] text-gray-500">
                Awaiting Council...
              </div>
            )}
          </main>
        </div>
      </JSONUIProvider>
    </ErrorBoundary>
  )
}
