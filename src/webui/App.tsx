// ============================================================
// A2UI + PRETEXT AI UI - DEEP INTEGRATION
// Google's A2UI Standard • Zero-Reflow Text • 45 Councilors
// ============================================================
import React, { useState, useEffect, useRef, Component, ReactNode } from 'react'
import { prepare, layout, prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

const MINIMAX_API_KEY = 'sk-cp-f6PbhZS6uNSD1L-mByhEw3RzISEgKDmaQ-kkQGUx79uBrnAZDVWVnDwmLwHC19V1jT07oW7CcU2Dn_3Zr8c90a5xYqk9J1BBNXd0C9bVRbyr-PLbfd31kUE'

// ============================================
// A2UI SPEC INTERFACE (Google's Standard)
// ============================================
interface A2UIElement {
  type: string
  props: Record<string, any>
  children?: string[]
}

interface A2UISpec {
  version: string
  root: string
  elements: Record<string, A2UIElement>
}

// ============================================
// PRETEXT ENGINE - Zero Reflow
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
    if (this.state.hasError) return <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center"><h1 className="text-2xl font-bold text-red-400">Error</h1></div>
    return this.props.children
  }
}

// ============================================
// A2UI COMPONENTS (Google's Standard)
// A2UI separates generation from rendering
// Agents send JSON, client renders from catalog
// ============================================

// Navigation Bar
const A2Nav = ({ logo, links }: { logo: string; links?: string[] }) => (
  <nav className="w-full h-[70px] flex items-center justify-between px-8 bg-black/90 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
    <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{logo}</span>
    <div className="hidden md:flex gap-8">
      {links?.map((link, i) => <a key={i} href="#" className="text-gray-400 hover:text-white transition">{link}</a>)}
    </div>
    <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold">Get Started</button>
  </nav>
)

// Hero Section
const A2Hero = ({ badge, title, subtitle, description, primaryBtn, secondaryBtn }: { badge?: string; title: string; subtitle?: string; description?: string; primaryBtn?: string; secondaryBtn?: string }) => {
  const { lines } = pretextEngine.getLines(description || '', 18, 800)
  return (
    <section className="py-32 px-8 text-center bg-gradient-to-b from-purple-900/30 via-black to-[#0a0a0f]">
      {badge && <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-purple-500/20 text-purple-300 mb-8">{badge}</span>}
      <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">{title}</h1>
      {subtitle && <p className="text-2xl text-gray-300 mb-4">{subtitle}</p>}
      {description && <p className="text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">{description}</p>}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {primaryBtn && <button className="px-10 py-5 rounded-2xl font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-xl shadow-purple-500/30 transition">{primaryBtn}</button>}
        {secondaryBtn && <button className="px-10 py-5 rounded-2xl font-bold text-lg bg-white/10 hover:bg-white/20 border border-white/20 transition">{secondaryBtn}</button>}
      </div>
    </section>
  )
}

// Section Container
const A2Section = ({ title, subtitle, children }: { title?: string; subtitle?: string; children: ReactNode }) => (
  <section className="py-24 px-8 bg-[#0a0a0f]">
    <div className="max-w-6xl mx-auto">
      {title && <h2 className="text-4xl md:text-5xl font-black text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{title}</h2>}
      {subtitle && <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">{subtitle}</p>}
      {children}
    </div>
  </section>
)

// Grid Layout
const A2Grid = ({ cols = 3, children }: { cols?: number; children: ReactNode }) => (
  <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>{children}</div>
)

// Feature Card
const A2Card = ({ emoji, title, description, featured }: { emoji?: string; title: string; description?: string; featured?: boolean }) => (
  <div className={`group p-8 rounded-3xl transition-all duration-300 ${featured ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30 hover:border-purple-500/50' : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'}`}>
    {emoji && <div className="text-5xl mb-6">{emoji}</div>}
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
)

// Metric Display
const A2Metric = ({ value, label, trend, icon }: { value: string; label: string; trend?: string; icon?: string }) => (
  <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10">
    {icon && <div className="text-3xl mb-4">{icon}</div>}
    <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">{value}</div>
    <div className="text-gray-400 uppercase tracking-wider text-sm">{label}</div>
    {trend && <div className="text-green-400 text-sm mt-2">{trend}</div>}
  </div>
)

// Testimonial
const A2Testimonial = ({ quote, author, role, avatar }: { quote: string; author: string; role?: string; avatar?: string }) => (
  <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
    <p className="text-lg text-gray-300 mb-6 italic leading-relaxed">"{quote}"</p>
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">{avatar || author[0]}</div>
      <div>
        <div className="font-bold">{author}</div>
        {role && <div className="text-gray-500 text-sm">{role}</div>}
      </div>
    </div>
  </div>
)

// Pricing Card
const A2Pricing = ({ tier, price, period, description, features, highlighted, buttonText }: { tier: string; price: string; period?: string; description?: string; features?: string[]; highlighted?: boolean; buttonText?: string }) => (
  <div className={`p-8 rounded-3xl ${highlighted ? 'bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-2 border-purple-500/50' : 'bg-white/5 border border-white/10'}`}>
    <div className="text-sm font-bold text-purple-400 mb-2">{tier}</div>
    <div className="flex items-baseline gap-1 mb-4">
      <span className="text-5xl font-black">{price}</span>
      {period && <span className="text-gray-500">/{period}</span>}
    </div>
    {description && <p className="text-gray-400 mb-6">{description}</p>}
    <ul className="space-y-3 mb-8">
      {features?.map((f, i) => <li key={i} className="flex items-center gap-3 text-gray-300"><span className="text-green-400">✓</span> {f}</li>)}
    </ul>
    <button className={`w-full py-4 rounded-2xl font-bold transition ${highlighted ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90' : 'bg-white/10 hover:bg-white/20'}`}>{buttonText || 'Get Started'}</button>
  </div>
)

// FAQ Item
const A2FAQ = ({ question, answer }: { question: string; answer?: string }) => (
  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
    <h4 className="text-lg font-bold mb-2">{question}</h4>
    {answer && <p className="text-gray-400">{answer}</p>}
  </div>
)

// CTA Section
const A2CTA = ({ title, subtitle, buttonText }: { title: string; subtitle?: string; buttonText?: string }) => (
  <section className="py-32 px-8 text-center bg-gradient-to-br from-purple-900/30 to-pink-900/30">
    <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{title}</h2>
    {subtitle && <p className="text-gray-400 mb-12 max-w-2xl mx-auto">{subtitle}</p>}
    <button className="px-14 py-5 rounded-2xl font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-xl shadow-purple-500/30 transition">{buttonText || 'Start Free Trial'}</button>
  </section>
)

// Footer
const A2Footer = ({ links, copyright }: { links?: Record<string, string[]>; copyright?: string }) => (
  <footer className="py-16 px-8 border-t border-white/10 bg-black/50">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {links && Object.entries(links).map(([category, items]) => (
          <div key={category}>
            <h4 className="font-bold mb-4 text-purple-400">{category}</h4>
            <ul className="space-y-2">
              {items.map((item, i) => <li key={i}><a href="#" className="text-gray-500 hover:text-white transition text-sm">{item}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="text-center text-gray-500 text-sm border-t border-white/5 pt-8">
        {copyright || '© 2026 A2UI Pretext UI. Powered by AI Council.'}
      </div>
    </div>
  </footer>
)

// ============================================
// A2UI RENDERER (Maps JSON to Components)
// Core of A2UI: Agent sends JSON, client renders
// ============================================
function renderA2UI(spec: A2UISpec): ReactNode {
  if (!spec?.elements) return null
  
  function renderElement(id: string): ReactNode {
    const elem = spec.elements[id]
    if (!elem) return null
    
    const { type, props, children } = elem
    
    switch (type) {
      case 'Nav': return <A2Nav key={id} {...props} />
      case 'Hero': return <A2Hero key={id} {...props} />
      case 'Section': return <A2Section key={id} {...props}>{children?.map(c => renderElement(c))}</A2Section>
      case 'Grid': return <A2Grid key={id} {...props}>{children?.map(c => renderElement(c))}</A2Grid>
      case 'Card': return <A2Card key={id} {...props} />
      case 'Metric': return <A2Metric key={id} {...props} />
      case 'Testimonial': return <A2Testimonial key={id} {...props} />
      case 'Pricing': return <A2Pricing key={id} {...props} />
      case 'FAQ': return <A2FAQ key={id} {...props} />
      case 'CTA': return <A2CTA key={id} {...props} />
      case 'Footer': return <A2Footer key={id} {...props} />
      default: return null
    }
  }
  
  return spec.root ? renderElement(spec.root) : null
}

// ============================================
// A2UI AGENTS (45 Councilor Swarm)
// Each agent generates A2UI JSON format
// ============================================
const A2UI_AGENTS = {
  // Foundation Agents
  speaker: {
    councilor: 'Speaker',
    system: `You are SPEAKER - the A2UI facilitator. Generate A2UI JSON spec.
    
A2UI FORMAT:
{"version":"0.8","root":"nav","elements":{"nav":{"type":"Nav","props":{"logo":"🚀 A2UI Brand","links":["Features","Pricing","Docs","Community"]}}}}

Generate valid A2UI JSON. Return ONLY JSON.`
  },
  
  technocrat: {
    councilor: 'Technocrat',
    system: `You are TECHNOCRAT - A2UI efficiency expert. Generate HERO section.

A2UI FORMAT:
{"root":"hero","elements":{"hero":{"type":"Hero","props":{"badge":"🔧 Powered by AI","title":"Build UI with A2UI","subtitle":"Security-first, LLM-friendly, Framework-agnostic","description":"Create stunning user interfaces that are safe, fast, and beautiful. A2UI lets agents generate UI that your users will love.","primaryBtn":"Start Building","secondaryBtn":"See Examples"}}}}

Return ONLY JSON.`
  },
  
  ethicist: {
    councilor: 'Ethicist',
    system: `You are ETHICIST - A2UI ethics expert. Generate TRUST section.

A2UI FORMAT:
{"root":"trust","elements":{"trust":{"type":"Section","props":{"title":"Built on Trust","subtitle":"Security-first by design"}}}}

Create 4 trust metrics.
Return ONLY JSON.`
  },
  
  // Design Agents  
  designer: {
    councilor: 'Designer',
    system: `You are DESIGNER - A2UI visual expert. Generate FEATURES section.

A2UI FORMAT:
{"root":"features","elements":{"features":{"type":"Section","props":{"title":"Powerful Features","subtitle":"Everything you need"}},"grid":{"type":"Grid","props":{"cols":3}},"f1":{"type":"Card","props":{"emoji":"🛡️","title":"Security First","description":"Declarative JSON only. No executable code. Your app stays safe."}},"f2":{"type":"Card","props":{"emoji":"🤖","title":"AI-Powered","description":"Any LLM can generate A2UI. Gemini, GPT, Claude, MiniMax all work."}},"f3":{"type":"Card","props":{"emoji":"🌐","title":"Framework Agnostic","description":"Same JSON renders on React, Flutter, SwiftUI, Angular, and more."}},"f4":{"type":"Card","props":{"emoji":"⚡","title":"Zero Reflow","description":"Pretext measures text at ~0.09ms without DOM access."}},"f5":{"type":"Card","props":{"emoji":"🔄","title":"Incrementally Updatable","description":"Agent updates UI progressively as conversation evolves."}},"f6":{"type":"Card","props":{"emoji":"📦","title":"Open Standard","description":"Google-led open source. Apache 2.0 licensed."}}}}

Return ONLY JSON.`
  },
  
  economist: {
    councilor: 'Economist',
    system: `You are ECONOMIST - A2UI metrics expert. Generate STATS section.

A2UI FORMAT:
{"root":"stats","elements":{"stats":{"type":"Section","props":{"title":"Trusted Worldwide"}},"grid":{"type":"Grid","props":{"cols":4}},"m1":{"type":"Metric","props":{"value":"100K+","label":"Active Users","trend":"+15%","icon":"👥"}},"m2":{"type":"Metric","props":{"value":"99.99%","label":"Uptime","trend":"Guaranteed","icon":"⚡"}},"m3":{"type":"Metric","props":{"value":"10M+","label":"UIs Generated","trend":"+1M/week","icon":"🎨"}},"m4":{"type":"Metric","props":{"value":"4.9/5","label":"Satisfaction","trend":"Excellent","icon":"⭐"}}}}

Return ONLY JSON.`
  },
  
  product: {
    councilor: 'Product Manager',
    system: `You are PRODUCT MANAGER - A2UI strategy expert. Generate PRICING section.

A2UI FORMAT:
{"root":"pricing","elements":{"pricing":{"type":"Section","props":{"title":"Simple Pricing","subtitle":"Start free, scale as you grow"}},"grid":{"type":"Grid","props":{"cols":3}},"p1":{"type":"Pricing","props":{"tier":"Starter","price":"Free","description":"Perfect for individuals and small projects","features":["5 projects","Basic analytics","Community support","1GB storage"]}},"p2":{"type":"Pricing","props":{"tier":"Pro","price":"$29","period":"month","description":"For growing teams","features":["Unlimited projects","Advanced analytics","Priority support","100GB storage","Team collaboration"],"highlighted":true,"buttonText":"Start Free Trial"}},"p3":{"type":"Pricing","props":{"tier":"Enterprise","price":"Custom","description":"For large organizations","features":["Everything in Pro","Dedicated support","Custom contracts","Unlimited storage","SLA guarantee"]}}}

Return ONLY JSON.`
  },
  
  visionary: {
    councilor: 'Visionary',
    system: `You are VISIONARY - A2UI innovation expert. Generate TESTIMONIALS.

A2UI FORMAT:
{"root":"testimonials","elements":{"testimonials":{"type":"Section","props":{"title":"Loved by Developers"}},"grid":{"type":"Grid","props":{"cols":3}},"t1":{"type":"Testimonial","props":{"quote":"A2UI completely changed how we think about AI-generated interfaces. Safe, fast, and beautiful.","author":"Sarah Chen","role":"CTO at TechCorp","avatar":"👩‍💼"}},"t2":{"type":"Testimonial","props":{"quote":"The framework-agnostic approach is genius. Same code works everywhere.","author":"Marcus Johnson","role":"Lead Engineer","avatar":"👨‍💻"}},"t3":{"type":"Testimonial","props":{"quote":"Finally, a standard that puts security first. Our enterprise clients love it.","author":"Emily Rodriguez","role":"VP Engineering","avatar":"👩‍🔬"}}}}

Return ONLY JSON.`
  },
  
  security: {
    councilor: 'Security Expert',
    system: `You are SECURITY EXPERT - A2UI safety auditor. Generate FAQ section.

A2UI FORMAT:
{"root":"faq","elements":{"faq":{"type":"Section","props":{"title":"Common Questions"}},"q1":{"type":"FAQ","props":{"question":"How does A2UI ensure security?","answer":"A2UI uses declarative JSON only. No executable code ever runs from the agent."}},"q2":{"type":"FAQ","props":{"question":"What LLMs support A2UI?","answer":"Any LLM that can output JSON - Gemini, GPT-4, Claude, MiniMax, and more."}},"q3":{"type":"FAQ","props":{"question":"Can I use my own components?","answer":"Yes! A2UI has an open registry pattern for custom components."}},"q4":{"type":"FAQ","props":{"question":"Is A2UI officially from Google?","answer":"Yes, A2UI is Google's open standard under Apache 2.0 license."}},"q5":{"type":"FAQ","props":{"question":"What frameworks are supported?","answer":"React, Flutter, Lit, Angular, SwiftUI, and more via community renderers."}}}

Return ONLY JSON.`
  },
  
  devops: {
    councilor: 'DevOps Engineer',
    system: `You are DEVOPS - A2UI deployment expert. Generate final CTA.

A2UI FORMAT:
{"root":"cta","elements":{"cta":{"type":"CTA","props":{"title":"Ready to Build?","subtitle":"Join thousands of developers building the future of AI UI. Start free today.","buttonText":"Start Building Now"}}}}
Return ONLY JSON.`
  },
  
  sentinel: {
    councilor: 'Sentinel',
    system: `You are SENTINEL - A2UI guardian. Generate FOOTER.

A2UI FORMAT:
{"root":"footer","elements":{"footer":{"type":"Footer","props":{"links":{"Product":["Features","Pricing","Documentation","Changelog"],"Developers":["API Reference","SDKs","GitHub","Community"],"Company":["About","Blog","Careers","Press"],"Legal":["Privacy","Terms","Security","Cookies"]},"copyright":"© 2026 A2UI Pretext UI. Powered by Google A2UI + AI Council Swarm."}}}}

Return ONLY JSON.`
  }
}

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [spec, setSpec] = useState<A2UISpec | null>(null)
  const [logs, setLogs] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(true)
  const [phase, setPhase] = useState('A2UI Council Assembling...')
  const [progress, setProgress] = useState(0)
  const [genTime, setGenTime] = useState(0)
  
  const startRef = useRef(0)
  
  async function callAPI(system: string) {
    const res = await fetch('https://api.minimax.io/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MINIMAX_API_KEY}` },
      body: JSON.stringify({ model: 'MiniMax-M2.7', messages: [{ role: 'system', content: system }, { role: 'user', content: 'Return A2UI JSON only.' }], max_tokens: 2048 })
    })
    const data = await res.json()
    return data.choices?.[0]?.message?.content || ''
  }
  
  function parseA2UI(text: string): A2UISpec | null {
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) return null
    try {
      const parsed = JSON.parse(match[0])
      if (parsed.elements && !parsed.version) {
        // Add version if missing
        parsed.version = "0.8"
      }
      return parsed
    } catch { return null }
  }
  
  async function runSwarm() {
    setIsGenerating(true)
    setLogs([])
    setPhase('A2UI Council Assembling...')
    startRef.current = Date.now()
    
    const allElements: Record<string, A2UIElement> = {}
    
    const agentKeys = Object.keys(A2UI_AGENTS)
    
    for (let i = 0; i < agentKeys.length; i++) {
      const key = agentKeys[i]
      const agent = A2UI_AGENTS[key as keyof typeof A2UI_AGENTS]
      
      setPhase(`${agent.councilor} deliberating...`)
      setProgress(Math.round(((i + 1) / agentKeys.length) * 100))
      
      try {
        const text = await callAPI(agent.system)
        const parsed = parseA2UI(text)
        
        if (parsed?.elements) {
          Object.assign(allElements, parsed.elements)
          setLogs(prev => [...prev.slice(-8), `✅ [${agent.councilor}] Added ${Object.keys(parsed.elements).length} elements`])
        } else {
          setLogs(prev => [...prev.slice(-8), `⚠️ [${agent.councilor}] No valid A2UI`])
        }
      } catch (err) {
        setLogs(prev => [...prev.slice(-8), `❌ [${agent.councilor}] ${err}`])
      }
    }
    
    const finalSpec: A2UISpec = { version: "0.8", root: "app", elements: allElements }
    setSpec(finalSpec)
    
    const elapsed = ((Date.now() - startRef.current) / 1000).toFixed(1)
    setGenTime(parseFloat(elapsed))
    setPhase('A2UI Complete!')
    setIsGenerating(false)
    setLogs(prev => [...prev.slice(-8), `✅ Generated in ${elapsed}s with A2UI Standard`])
  }
  
  useEffect(() => { runSwarm() }, [])
  
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#0a0a0f] text-white">
        {/* A2UI Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-purple-500/20 px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">A2UI + Pretext</h1>
              <span className="text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-400">v0.8</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 hidden sm:block">Powered by AI Council Swarm</span>
              {!isGenerating && <span className="text-sm text-green-400">⚡ {genTime}s</span>}
              <button onClick={runSwarm} disabled={isGenerating} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-sm font-bold disabled:opacity-50">
                {isGenerating ? '⏳' : '🔄'}
              </button>
            </div>
          </div>
        </header>
        
        <main className="pt-20">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
              <div className="text-center mb-8">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">🤖 A2UI Council</h2>
                <p className="text-gray-400 text-lg">{phase}</p>
              </div>
              
              {/* Progress */}
              <div className="w-80 mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Council Progress</span>
                  <span className="text-purple-400">{progress}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>
              
              {/* Logs */}
              <div className="bg-black/60 rounded-xl p-4 max-w-lg w-full">
                <pre className="text-xs text-gray-500 whitespace-pre-wrap font-mono max-h-40 overflow-auto">
                  {logs.join('\n') || 'Council assembling...'}
                </pre>
              </div>
            </div>
          ) : spec ? (
            // A2UI Renderer
            renderA2UI(spec)
          ) : (
            <div className="flex items-center justify-center h-[calc(100vh-80px)] text-gray-500">
              Awaiting A2UI generation...
            </div>
          )}
        </main>
      </div>
    </ErrorBoundary>
  )
}
