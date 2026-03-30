// GENERATIVE UI - AI COUNCIL SWARM EDITION
import React, { useState, useEffect, useRef, Component, ReactNode } from 'react'
import { prepare, layout } from '@chenglou/pretext'
import { defineCatalog } from '@json-render/core'
import { defineRegistry, Renderer } from '@json-render/react'
import { JSONUIProvider } from '@json-render/react'
import { schema } from '@json-render/react/schema'
import { z } from 'zod'

// ============================================
// PRETEXT ENGINE
// ============================================
class PretextEngine {
  private cache = new Map<string, { width: number; height: number; lineCount: number }>()
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
        <div className="text-center"><h1 className="text-2xl font-bold text-red-400 mb-4">⚠️ Error</h1><p className="text-gray-400 mb-4">{this.state.error}</p><button onClick={() => window.location.reload()} className="px-4 py-2 bg-purple-600 rounded-lg">Reload</button></div>
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
    Header: { props: z.object({ content: z.string() }), description: 'Header bar' },
    Text: { props: z.object({ content: z.string() }), description: 'Text' },
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
  Header: ({ props }: { props: any }) => <div className="w-full h-[70px] flex items-center px-8 bg-black/90 border-b border-white/10 backdrop-blur-xl"><span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">{props.content}</span></div>,
  Text: ({ props }: { props: any }) => <p style={{ fontSize: props.fontSize || 16, color: props.isGradient ? 'transparent' : (props.color || '#fff'), background: props.isGradient ? 'linear-gradient(to right, #a855f7, #ec4899)' : undefined, WebkitBackgroundClip: props.isGradient ? 'text' : undefined, WebkitTextFillColor: props.isGradient ? 'transparent' : undefined }}>{props.content}</p>,
  Heading: ({ props }: { props: any }) => {
    const sizes: Record<string, string> = { h1: 'text-6xl', h2: 'text-4xl', h3: 'text-2xl' }
    const style = props.isGradient ? { background: 'linear-gradient(to right, #a855f7, #ec4899, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : { color: '#fff' }
    return <h2 className={`${sizes[props.level] || 'text-6xl'} font-black leading-tight`} style={style}>{props.content}</h2>
  },
  Button: ({ props, emit }: { props: any; emit: any }) => <button className="px-10 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all shadow-xl shadow-purple-500/30" onClick={() => emit?.('press')}>{props.content}</button>,
  Card: ({ props, children }: { props: any; children?: ReactNode }) => <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/30 transition-all"><h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{props.title}</h3>{props.description && <p className="text-gray-400 leading-relaxed">{props.description}</p>}{children}</div>,
  Container: ({ props, children }: { props: any; children?: ReactNode }) => <div className="mx-auto px-8" style={{ maxWidth: props.maxWidth || 1200 }}>{children}</div>,
  Stack: ({ props, children }: { props: any; children?: ReactNode }) => <div className={`flex ${props.direction === 'horizontal' ? 'flex-row' : 'flex-col'} gap-8`}>{children}</div>,
  Grid: ({ props, children }: { props: any; children?: ReactNode }) => <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${props.columns || 3}, minmax(0, 1fr))` }}>{children}</div>,
  Metric: ({ props }: { props: any }) => <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10"><div className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">{props.value}</div><div className="text-gray-400 text-sm uppercase tracking-wider">{props.label}</div></div>,
  Badge: ({ props }: { props: any }) => <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">{props.content}</span>,
  Link: ({ props }: { props: any }) => <a href={props.href} className="text-purple-400 hover:text-purple-300 underline">{props.content}</a>
}
const { registry } = defineRegistry(catalog, { components })

// ============================================
// AI COUNCIL - 45 SPECIALIZED COUNCILORS
// ============================================
const COUNCIL_CATEGORIES = {
  foundation: {
    name: 'Foundation',
    emoji: '🏛️',
    councilors: ['Speaker', 'Technocrat', 'Ethicist', 'Pragmatist', 'Skeptic']
  },
  strategy: {
    name: 'Strategy',
    emoji: '💼',
    councilors: ['Economist', 'Product Manager', 'Marketing Expert', 'Finance Expert', 'Risk Manager']
  },
  technical: {
    name: 'Technical',
    emoji: '🔧',
    councilors: ['Solutions Architect', 'DevOps Engineer', 'Security Expert', 'Performance Engineer', 'QA Engineer', 'Coder']
  },
  user: {
    name: 'User & Community',
    emoji: '👥',
    councilors: ['User Advocate', 'Customer Support', 'Community Manager', 'Accessibility Expert']
  },
  creative: {
    name: 'Creative & Innovation',
    emoji: '🚀',
    councilors: ['Visionary', 'Innovation Coach', 'Propagandist', 'Psychologist']
  }
}

// ============================================
// SWARM WORKFLOW (FROM AI COUNCIL)
// ============================================
const WORKFLOW = {
  PLAN: { name: 'Plan', emoji: '📋', roles: ['Solutions Architect', 'Product Manager', 'Visionary'] },
  DESIGN: { name: 'Design', emoji: '🎨', roles: ['Designer', 'User Advocate', 'Accessibility Expert'] },
  IMPLEMENT: { name: 'Implement', emoji: '⚙️', roles: ['Coder', 'Backend Dev', 'Frontend Dev'] },
  REVIEW: { name: 'Review', emoji: '🔍', roles: ['QA Engineer', 'Security Expert', 'Performance Engineer'] },
  DEPLOY: { name: 'Deploy', emoji: '🚀', roles: ['DevOps Engineer', 'Sentinel'] }
}

// ============================================
// AGENTS (EXPANDED TO 12)
// ============================================
const AGENTS = {
  // Foundation
  speaker: { name: 'Speaker', emoji: '🎤', councilor: 'Speaker', workflow: 'PLAN', system: `You are SPEAKER - the neutral facilitator. Your role is to synthesize and guide deliberation.

TASK: Create HEADER section establishing brand presence.

OUTPUT:
{"root":"header-1","elements":{"header-1":{"type":"Header","props":{"content":"🎨 Brand Name"}}},"badge-1":{"type":"Badge","props":{"content":"🚀 Brand Tagline"}}}}

OUTPUT JSON ONLY.` },
  
  technocrat: { name: 'Technocrat', emoji: '⚙️', councilor: 'Technocrat', workflow: 'PLAN', system: `You are TECHNOCRAT - efficiency expert focused on data and optimization.

TASK: Create HERO section with data-driven value proposition.

OUTPUT:
{"root":"hero-1","elements":{"hero-1":{"type":"Heading","props":{"content":"Data-Driven Headline","level":"h1","isGradient":true}},"hero-text":{"type":"Text","props":{"content":"Efficiency-focused copy","color":"#9ca3af","fontSize":20}},"cta-1":{"type":"Button","props":{"content":"🚀 Optimize Now"}}}}

OUTPUT JSON ONLY.` },
  
  ethicist: { name: 'Ethicist', emoji: '⚖️', councilor: 'Ethicist', workflow: 'PLAN', system: `You are ETHICIST - moral compass ensuring ethical considerations.

TASK: Create ETHICS/TRUST section highlighting responsible practices.

OUTPUT:
{"root":"ethics-1","elements":{"ethics-heading":{"type":"Heading","props":{"content":"Built with Ethics","level":"h2"}},"ethics-card":{"type":"Card","props":{"title":"🔒 Privacy First","description":"Your data stays yours - zero tracking, full privacy"}}}}}

OUTPUT JSON ONLY.` },
  
  // Strategy
  economist: { name: 'Economist', emoji: '📊', councilor: 'Economist', workflow: 'PLAN', system: `You are ECONOMIST - financial expert focused on ROI and cost-benefit.

TASK: Create ROI/VALUE section showing economic benefits.

OUTPUT:
{"root":"roi-1","elements":{"roi-heading":{"type":"Heading","props":{"content":"Maximize ROI","level":"h2"}},"roi-grid":{"type":"Grid","props":{"columns":3}},"roi-1":{"type":"Metric","props":{"label":"Cost Savings","value":"60%"}},"roi-2":{"type":"Metric","props":{"label":"Time Saved","value":"10x"}},"roi-3":{"type":"Metric","props":{"label":"Efficiency","value":"3x"}}}}}

OUTPUT JSON ONLY.` },
  
  product: { name: 'Product', emoji: '📦', councilor: 'Product Manager', workflow: 'DESIGN', system: `You are PRODUCT MANAGER - strategy expert focused on roadmap and user value.

TASK: Create FEATURES section aligned with user needs.

OUTPUT:
{"root":"features-1","elements":{"features-heading":{"type":"Heading","props":{"content":"Core Features","level":"h2"}},"features-grid":{"type":"Grid","props":{"columns":3}},"feat-1":{"type":"Card","props":{"title":"⚡ Speed","description":"Deliver projects 10x faster"}},}}}

OUTPUT JSON ONLY.` },
  
  // Design
  designer: { name: 'Designer', emoji: '🎨', councilor: 'Designer', workflow: 'DESIGN', system: `You are DESIGNER - visual expert creating beautiful interfaces.

TASK: Create VISUAL SHOWCASE with compelling design cards.

OUTPUT:
{"root":"design-1","elements":{"design-heading":{"type":"Heading","props":{"content":"Beautiful by Design","level":"h2"}},"design-grid":{"type":"Grid","props":{"columns":3}},"design-1":{"type":"Card","props":{"title":"🎨 Pixel Perfect","description":"Every detail crafted with care"}}}}}

OUTPUT JSON ONLY.` },
  
  visionary: { name: 'Visionary', emoji: '🔮', councilor: 'Visionary', workflow: 'DESIGN', system: `You are VISIONARY - innovation expert thinking 5 years ahead.

TASK: Create FUTURE-PROOF section showcasing innovation.

OUTPUT:
{"root":"future-1","elements":{"future-heading":{"type":"Heading","props":{"content":"Future-Ready","level":"h2"}},"future-card":{"type":"Card","props":{"title":"🚀 Next Gen","description":"Built for tomorrow's challenges today"}}}}}

OUTPUT JSON ONLY.` },
  
  // Implementation
  coder: { name: 'Coder', emoji: '💻', councilor: 'Coder', workflow: 'IMPLEMENT', system: `You are CODER - technical expert writing clean code.

TASK: Create HOW IT WORKS section with clear implementation steps.

OUTPUT:
{"root":"how-1","elements":{"how-heading":{"type":"Heading","props":{"content":"How It Works","level":"h2"}},"step-1":{"type":"Card","props":{"title":"1️⃣ Define","description":"Describe your requirements"}}}}}

OUTPUT JSON ONLY.` },
  
  // Review
  qa: { name: 'QA', emoji: '✅', councilor: 'QA Engineer', workflow: 'REVIEW', system: `You are QA ENGINEER - quality expert ensuring excellence.

TASK: Create QUALITY section highlighting testing and reliability.

OUTPUT:
{"root":"quality-1","elements":{"quality-heading":{"type":"Heading","props":{"content":"Quality Assured","level":"h2"}},"quality-grid":{"type":"Grid","props":{"columns":3}},"q-1":{"type":"Metric","props":{"label":"Uptime","value":"99.9%"}},"q-2":{"type":"Metric","props":{"label":"Tests","value":"100%"}},"q-3":{"type":"Metric","props":{"label":"Coverage","value":"95%"}}}}}

OUTPUT JSON ONLY.` },
  
  security: { name: 'Security', emoji: '🔒', councilor: 'Security Expert', workflow: 'REVIEW', system: `You are SECURITY EXPERT - cybersecurity specialist ensuring safety.

TASK: Create SECURITY section highlighting protection.

OUTPUT:
{"root":"security-1","elements":{"security-heading":{"type":"Heading","props":{"content":"Secure by Design","level":"h2"}},"security-card":{"type":"Card","props":{"title":"🛡️ Protected","description":"Enterprise-grade security built-in"}}}}}

OUTPUT JSON ONLY.` },
  
  // Deploy
  devops: { name: 'DevOps', emoji: '🚀', councilor: 'DevOps Engineer', workflow: 'DEPLOY', system: `You are DEVOPS ENGINEER - deployment expert ensuring smooth launches.

TASK: Create FINAL CTA section driving conversion.

OUTPUT:
{"root":"cta-1","elements":{"cta-heading":{"type":"Heading","props":{"content":"Ready to Start?","level":"h2","isGradient":true}},"cta-text":{"type":"Text","props":{"content":"Join thousands of teams already building","color":"#9ca3af"}},"cta-btn":{"type":"Button","props":{"content":"🚀 Get Started Free"}}}}}

OUTPUT JSON ONLY.` },
  
  sentinel: { name: 'Sentinel', emoji: '🛡️', councilor: 'Sentinel', workflow: 'DEPLOY', system: `You are SENTINEL - security expert doing final safety check.

TASK: Create TRUST section with final trust signals.

OUTPUT:
{"root":"trust-1","elements":{"trust-heading":{"type":"Heading","props":{"content":"Trusted Worldwide","level":"h2"}},"trust-grid":{"type":"Grid","props":{"columns":4}},"t-1":{"type":"Metric","props":{"label":"Users","value":"10K+"}},"t-2":{"type":"Metric","props":{"label":"Countries","value":"50+"}},"t-3":{"type":"Metric","props":{"label":"Rating","value":"4.9⭐"}},"t-4":{"type":"Metric","props":{"label":"Support","value":"24/7"}}}}}

OUTPUT JSON ONLY.` }
}

type AgentKey = keyof typeof AGENTS

// ============================================
// FALLBACK
// ============================================
function fallback(): UIComponent[] {
  return [
    { id: 'header-1', type: 'Header', props: { content: '🎨 AI Council UI Toolkit' } },
    { id: 'badge-1', type: 'Badge', props: { content: '🚀 45 Councilors Strong' } },
    { id: 'hero-1', type: 'Heading', props: { content: 'Build UIs with AI Council', level: 'h1', isGradient: true } },
    { id: 'hero-text', type: 'Text', props: { content: 'Swarm-powered UI generation', color: '#9ca3af', fontSize: 20 } },
    { id: 'cta-1', type: 'Button', props: { content: '🚀 Generate Now' } },
    { id: 'features-heading', type: 'Heading', props: { content: 'Features', level: 'h2' } },
    { id: 'features-grid', type: 'Grid', props: { columns: 3 } },
    { id: 'feat-1', type: 'Card', props: { title: '⚡ Speed', description: 'Generate UIs 10x faster' } },
    { id: 'feat-2', type: 'Card', props: { title: '🎨 Design', description: 'Beautiful by default' } },
    { id: 'feat-3', type: 'Card', props: { title: '🛡️ Security', description: 'Enterprise-grade' } },
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
  const [streamText, setStreamText] = useState('')
  const [workflowPhase, setWorkflowPhase] = useState<string>('')
  const [councilorsActive, setCouncilorsActive] = useState<string[]>([])
  
  const initRef = useRef(false)
  const startTimeRef = useRef(0)
  
  useEffect(() => { if (!initRef.current) { initRef.current = true; startTimeRef.current = Date.now(); runSwarm().catch(console.error) } }, [])
  
  async function callMiniMax(system: string, user: string) {
    setStreamText('')
    const res = await fetch('https://api.minimax.io/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MINIMAX_API_KEY}` },
      body: JSON.stringify({ model: 'MiniMax-M2.7', messages: [{ role: 'system', content: system }, { role: 'user', content: user }], stream: true, max_tokens: 2048 })
    })
    if (!res.ok) throw new Error(`API Error: ${res.status}`)
    const reader = res.body?.getReader()
    const decoder = new TextDecoder()
    let full = ''
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const chunk = decoder.decode(value, { stream: true })
      for (const line of chunk.split('\n')) {
        if (line.startsWith('data: ') && line !== 'data: [DONE]') {
          try { const data = JSON.parse(line.slice(6)); if (data.choices?.[0]?.delta?.content) { full += data.choices[0].delta.content; setStreamText(full) } } catch {}
        }
      }
    }
    return full
  }
  
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
          if (elem && elem.type) comps.push({ id, type: (elem.type as string).toLowerCase(), props: elem.props || {}, children: elem.children || [] })
        })
        return comps
      }
    } catch {}
    return []
  }
  
  async function runSwarm() {
    setIsGenerating(true); setLogs([]); setProgress(0); setCouncilorsActive([]); setStreamText('')
    const allComponents: UIComponent[] = []
    const agentKeys: AgentKey[] = ['speaker', 'technocrat', 'ethicist', 'economist', 'product', 'designer', 'visionary', 'coder', 'qa', 'security', 'devops', 'sentinel']
    const totalSteps = agentKeys.length
    
    for (let i = 0; i < agentKeys.length; i++) {
      const key = agentKeys[i]
      const agent = AGENTS[key]
      
      setPhase(`${agent.workflow}: ${agent.name}`)
      setWorkflowPhase(agent.workflow)
      setCouncilorsActive(prev => [...prev, agent.councilor])
      
      const time = new Date().toLocaleTimeString()
      setLogs(prev => [...prev.slice(-15), `${time} ${agent.emoji} [${agent.councilor}] Starting...`])
      
      let success = false
      for (let attempt = 0; attempt < 2 && !success; attempt++) {
        try {
          const result = await callMiniMax(agent.system, `Generate component for ${agent.councilor}.`)
          const comps = parseAIResponse(result)
          if (comps.length > 0) { allComponents.push(...comps); setLogs(prev => [...prev.slice(-15), `${time} ✅ +${comps.length} components`]); success = true }
        } catch (err) { setLogs(prev => [...prev.slice(-15), `${time} ❌ ${err instanceof Error ? err.message : String(err)}`]) }
      }
      setProgress(Math.round(((i + 1) / totalSteps) * 100))
    }
    
    if (allComponents.length < 5) { setLogs(prev => [...prev.slice(-15), `${new Date().toLocaleTimeString()} 🔧 Fallback...`]); allComponents.push(...fallback()) }
    
    const elements: Record<string, any> = {}; let root = ''
    allComponents.forEach((c) => { if (!root) root = c.id; elements[c.id] = { type: c.type.charAt(0).toUpperCase() + c.type.slice(1), props: c.props || {}, children: c.children || [] } })
    
    setSpec({ root, elements })
    const elapsed = ((Date.now() - startTimeRef.current) / 1000).toFixed(1)
    setGenerationTime(parseFloat(elapsed))
    setLogs(prev => [...prev.slice(-15), `${new Date().toLocaleTimeString()} ✅ Done in ${elapsed}s`])
    setPhase('Complete!'); setIsGenerating(false); setStreamText('')
  }
  
  return (
    <ErrorBoundary>
      <JSONUIProvider registry={registry}>
        <div className="min-h-screen bg-[#0a0a0f] text-white">
          <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-3"><span className="text-2xl">🏛️</span><h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">AI Council Swarm</h1></div>
              <div className="flex items-center gap-4">
                {!isGenerating && generationTime > 0 && <span className="text-sm text-green-400">⚡ {generationTime}s</span>}
                <button onClick={runSwarm} disabled={isGenerating} className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium text-sm disabled:opacity-50">{isGenerating ? '⏳ Building...' : '🔄 Regenerate'}</button>
              </div>
            </div>
          </header>
          
          <main className="pt-20">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6">
                <div className="w-full max-w-3xl space-y-8">
                  <div className="text-center space-y-3">
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">🏛️ AI Council Swarm</h2>
                    <p className="text-gray-400 text-lg">{phase}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-gray-500">Progress</span><span className="text-purple-400">{progress}%</span></div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all" style={{ width: `${progress}%` }} /></div>
                  </div>
                  
                  {/* Workflow Phases */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {Object.entries(WORKFLOW).map(([key, w]) => (
                      <div key={key} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${workflowPhase === w.name ? 'bg-purple-500/20 text-purple-400 animate-pulse' : 'bg-white/5 text-gray-500'}`}>
                        <span>{w.emoji}</span><span>{w.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Active Councilors */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {councilorsActive.slice(-8).map((c) => (
                      <div key={c} className="px-3 py-1.5 rounded-full text-xs bg-green-500/20 text-green-400">✅ {c}</div>
                    ))}
                  </div>
                  
                  <div className="bg-black/60 rounded-2xl p-6 border border-white/10">
                    <pre className="text-sm text-purple-300 whitespace-pre-wrap font-mono h-32 overflow-auto">{streamText || 'Council deliberating...'}</pre>
                  </div>
                  
                  <div className="bg-black/40 rounded-xl p-4 border border-white/5"><pre className="text-xs text-gray-500 whitespace-pre-wrap font-mono">{logs.join('\n') || 'Council assembling...'}</pre></div>
                </div>
              </div>
            ) : spec ? (
              <div className="p-8 max-w-6xl mx-auto space-y-16">
                <Renderer spec={spec} registry={registry} />
                <footer className="text-center text-gray-500 text-sm border-t border-white/10 pt-8">
                  <p>🏛️ Built by AI Council Swarm • {councilorsActive.length} Councilors</p>
                  <p className="text-xs">Pretext + JSON Render + A2UI • {generationTime}s</p>
                </footer>
              </div>
            ) : <div className="flex items-center justify-center h-[calc(100vh-80px)] text-gray-500">Awaiting Council...</div>}
          </main>
        </div>
      </JSONUIProvider>
    </ErrorBoundary>
  )
}
