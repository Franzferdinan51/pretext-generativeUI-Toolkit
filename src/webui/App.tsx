// ============================================================
// A2UI + PRETEXT - FULL WEBSITE GENERATOR
// ============================================================
import React, { useState, useEffect, useRef, Component, ReactNode } from 'react'
import { prepare, layout, prepareWithSegments, layoutWithLines, walkLineRanges, layoutNextLine } from '@chenglou/pretext'

const MINIMAX_API_KEY = 'sk-cp-f6PbhZS6uNSD1L-mByhEw3RzISEgKDmaQ-kkQGUx79uBrnAZDVWVnDwmLwHC19V1jT07oW7CcU2Dn_3Zr8c90a5xYqk9J1BBNXd0C9bVRbyr-PLbfd31kUE'

interface A2UIElement { type: string; props: Record<string, any>; children?: string[] }
interface A2UISpec { version: string; root: string; elements: Record<string, A2UIElement> }

// ============================================
// PRETEXT LAYOUT ENGINE
// ============================================
class PretextLayout {
  static masonry(items: Array<{ text: string; width: number }>, columnCount: number, gap: number) {
    const columns: Array<{ text: string; height: number }[]> = Array.from({ length: columnCount }, () => [])
    const heights = new Array(columnCount).fill(0)
    for (const item of items) {
      const prepared = prepare(item.text, '16px Inter')
      const { height } = layout(prepared, item.width, 24)
      let minCol = 0
      for (let i = 1; i < columnCount; i++) if (heights[i] < heights[minCol]) minCol = i
      columns[minCol].push({ text: item.text, height })
      heights[minCol] += height + gap
    }
    return columns
  }
  static floatAround(text: string, obs: { x: number; y: number; width: number; height: number }, colW: number, fs: number = 16, lh: number = 24) {
    const prep = prepareWithSegments(text, `${fs}px Inter`)
    const lines: Array<{ text: string; x: number; y: number }> = []
    let cur = { segmentIndex: 0, graphemeIndex: 0 }
    let y = 0
    while (true) {
      const inObs = y >= obs.y && y < obs.y + obs.height
      const w = inObs ? colW - obs.width - 10 : colW
      const line = layoutNextLine(prep, cur, w)
      if (!line) break
      lines.push({ text: line.text, x: inObs ? obs.width + 10 : 0, y })
      cur = line.end
      y += lh
    }
    return lines
  }
  static shrinkwrap(text: string, fs: number = 16) {
    const prep = prepareWithSegments(text, `${fs}px Inter`)
    let maxW = 0
    walkLineRanges(prep, 10000, (l) => { if (l.width > maxW) maxW = l.width })
    return maxW
  }
}

// ============================================
// ERROR BOUNDARY
// ============================================
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) return <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white"><h1 className="text-2xl text-red-400">Error</h1></div>
    return this.props.children
  }
}

// ============================================
// COMPONENTS
// ============================================
const Nav = ({ logo, links }: any) => <nav className="w-full h-[70px] flex items-center justify-between px-8 bg-black/90 border-b border-white/10"><span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{logo}</span><div className="flex gap-6">{links?.map((l: string, i: number) => <a key={i} href="#" className="text-gray-400 hover:text-white">{l}</a>)}</div><button className="px-6 py-2 rounded-xl bg-purple-600 font-bold">Get Started</button></nav>

const Hero = ({ badge, title, subtitle, desc, pBtn, sBtn }: any) => <section className="py-32 px-8 text-center bg-gradient-to-b from-purple-900/30 to-[#0a0a0f]">{badge && <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-purple-500/20 text-purple-300 mb-8">{badge}</span>}<h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{title}</h1>{subtitle && <p className="text-2xl text-gray-300 mb-4">{subtitle}</p>}{desc && <p className="text-gray-400 max-w-2xl mx-auto mb-12">{desc}</p>}<div className="flex gap-4 justify-center">{pBtn && <button className="px-10 py-4 rounded-2xl font-bold bg-purple-600">{pBtn}</button>}{sBtn && <button className="px-10 py-4 rounded-2xl font-bold bg-white/10">{sBtn}</button>}</div></section>

const Section = ({ title, sub, children }: any) => <section className="py-24 px-8"><div className="max-w-6xl mx-auto">{title && <h2 className="text-4xl font-black text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{title}</h2>}{sub && <p className="text-gray-400 text-center mb-12">{sub}</p>}{children}</div></section>

const Grid = ({ cols, children }: any) => <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${cols || 3}, minmax(0, 1fr))` }}>{children}</div>

const Card = ({ emoji, title, desc }: any) => <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10"><div className="text-4xl mb-4">{emoji}</div><h3 className="text-xl font-bold mb-2">{title}</h3>{desc && <p className="text-gray-400">{desc}</p>}</div>

const Metric = ({ val, label, trend }: any) => <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10"><div className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">{val}</div><div className="text-gray-400 uppercase text-sm">{label}</div>{trend && <div className="text-green-400 text-sm mt-2">{trend}</div>}</div>

const Pricing = ({ tier, price, period, features, highlight, btn }: any) => <div className={`p-8 rounded-3xl ${highlight ? 'bg-purple-600/20 border-2 border-purple-500/50' : 'bg-white/5 border-white/10'}`}><div className="text-sm font-bold text-purple-400 mb-2">{tier}</div><div className="flex items-baseline gap-1 mb-4"><span className="text-5xl font-black">{price}</span>{period && <span className="text-gray-500">/{period}</span>}</div><ul className="space-y-3 mb-8">{features?.map((f: string, i: number) => <li key={i} className="flex items-center gap-2 text-gray-300"><span className="text-green-400">✓</span> {f}</li>)}</ul><button className={`w-full py-4 rounded-2xl font-bold ${highlight ? 'bg-purple-600' : 'bg-white/10'}`}>{btn || 'Get Started'}</button></div>

const FAQ = ({ q, a }: any) => <div className="p-6 rounded-2xl bg-white/5 border border-white/10"><h4 className="font-bold mb-2">{q}</h4>{a && <p className="text-gray-400">{a}</p>}</div>

const CTA = ({ title, sub, btn }: any) => <section className="py-32 px-8 text-center bg-gradient-to-br from-purple-900/30 to-pink-900/30"><h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{title}</h2>{sub && <p className="text-gray-400 mb-12">{sub}</p>}<button className="px-14 py-5 rounded-2xl font-bold text-xl bg-purple-600 shadow-xl">{btn || 'Start Free Trial'}</button></section>

const Footer = ({ links, copy }: any) => <footer className="py-16 px-8 border-t border-white/10 bg-black/50"><div className="max-w-6xl mx-auto"><div className="grid grid-cols-4 gap-8 mb-12">{links && Object.entries(links).map(([cat, items]: [string, any]) => <div key={cat}><h4 className="font-bold mb-4 text-purple-400">{cat}</h4><ul className="space-y-2">{items.map((item: string, i: number) => <li key={i}><a href="#" className="text-gray-500 hover:text-white text-sm">{item}</a></li>)}</ul></div>)}</div><div className="text-center text-gray-500 text-sm border-t border-white/5 pt-8">{copy || '© 2026'}</div></div></footer>

// ============================================
// FALLBACK (shows immediately)
// ============================================
const FALLBACK_SPEC: A2UISpec = {
  version: "0.8",
  root: "app",
  elements: {
    nav: { type: "Nav", props: { logo: "📐 Pretext+UI", links: ["Features", "Pricing", "Docs", "Community"] }},
    hero: { type: "Hero", props: { badge: "🚀 Zero Reflow", title: "Build Amazing UIs", subtitle: "With Pretext + A2UI", desc: "Create stunning user interfaces that are safe, fast, and beautiful. Pretext measures text at ~0.09ms without DOM access.", pBtn: "Start Building", sBtn: "Learn More" }},
    featSection: { type: "Section", props: { title: "Features", sub: "Everything you need" }, children: ["featGrid"]},
    featGrid: { type: "Grid", props: { cols: 3 }, children: ["f1", "f2", "f3", "f4", "f5", "f6"]},
    f1: { type: "Card", props: { emoji: "⚡", title: "Lightning Fast", desc: "~0.09ms per measurement" }},
    f2: { type: "Card", props: { emoji: "🛡️", title: "Secure", desc: "No executable code" }},
    f3: { type: "Card", props: { emoji: "🤖", title: "AI-Powered", desc: "Any LLM can generate" }},
    f4: { type: "Card", props: { emoji: "🌐", title: "Cross-Platform", desc: "React, Flutter, more" }},
    f5: { type: "Card", props: { emoji: "🔄", title: "Incrementally Updatable", desc: "Progressive rendering" }},
    f6: { type: "Card", props: { emoji: "📦", title: "Open Standard", desc: "Google A2UI" }},
    statsSection: { type: "Section", props: { title: "By The Numbers" }, children: ["statsGrid"]},
    statsGrid: { type: "Grid", props: { cols: 4 }, children: ["m1", "m2", "m3", "m4"]},
    m1: { type: "Metric", props: { val: "0.09ms", label: "Per Call" }},
    m2: { type: "Metric", props: { val: "0", label: "DOM Reflow" }},
    m3: { type: "Metric", props: { val: "100%", label: "Cached" }},
    m4: { type: "Metric", props: { val: "∞", label: "Languages" }},
    cta: { type: "CTA", props: { title: "Ready to Build?", sub: "Start creating amazing UIs today.", btn: "Get Started Free" }},
    footer: { type: "Footer", props: { links: { Product: ["Features", "Pricing"], Resources: ["Docs", "GitHub"], Company: ["About", "Blog"], Legal: ["Privacy", "Terms"]}, copy: "© 2026 Pretext + A2UI" }}
  }
}

// ============================================
// RENDERER
// ============================================
function renderSpec(spec: A2UISpec): ReactNode {
  if (!spec?.elements) return null
  function render(id: string): ReactNode {
    const elem = spec.elements[id]
    if (!elem) return null
    const { type, props, children } = elem
    switch (type) {
      case "Nav": return <Nav key={id} {...props} />
      case "Hero": return <Hero key={id} {...props} />
      case "Section": return <Section key={id} {...props}>{children?.map((c: string) => render(c))}</Section>
      case "Grid": return <Grid key={id} {...props}>{children?.map((c: string) => render(c))}</Grid>
      case "Card": return <Card key={id} {...props} />
      case "Metric": return <Metric key={id} {...props} />
      case "Pricing": return <Pricing key={id} {...props} />
      case "FAQ": return <FAQ key={id} {...props} />
      case "CTA": return <CTA key={id} {...props} />
      case "Footer": return <Footer key={id} {...props} />
      default: return null
    }
  }
  return spec.root ? render(spec.root) : null
}

// ============================================
// AGENTS WITH PROPER GUIDANCE
// ============================================
const AGENTS = {
  // Generate NAVIGATION
  nav: { name: "Nav", prompt: `You are an expert UI designer. Create a navigation bar with logo and links.

Generate ONLY valid JSON in this exact format (no other text):
{"nav":{"type":"Nav","props":{"logo":"🚀 BrandName","links":["Features","Pricing","About","Contact"]}}

Return ONLY the JSON, nothing else.` },
  
  // Generate HERO
  hero: { name: "Hero", prompt: `You are an expert UI designer. Create an epic hero section.

Generate ONLY valid JSON in this exact format:
{"hero":{"type":"Hero","props":{"badge":"🚀 Tagline","title":"Main Headline That Converts","subtitle":"Supporting message","desc":"Detailed description of what you offer and why it matters. Make it compelling.","pBtn":"Primary CTA Text","sBtn":"Secondary CTA Text"}}}

Make the headline bold and compelling. Return ONLY JSON.` },
  
  // Generate FEATURES
  features: { name: "Features", prompt: `You are an expert UI designer. Create a features section with 6 feature cards.

Generate ONLY valid JSON:
{"featSection":{"type":"Section","props":{"title":"Our Features","subtitle":"Everything you need"},"featGrid":{"type":"Grid","props":{"cols":3},"children":["f1","f2","f3","f4","f5","f6"]},"f1":{"type":"Card","props":{"emoji":"⚡","title":"Feature One","desc":"Description of feature one"}}},"f2":{"type":"Card","props":{"emoji":"🎨","title":"Feature Two","desc":"Description of feature two"}}},"f3":{"type":"Card","props":{"emoji":"🤖","title":"Feature Three","desc":"Description of feature three"}}},"f4":{"type":"Card","props":{"emoji":"🔒","title":"Feature Four","desc":"Description of feature four"}}},"f5":{"type":"Card","props":{"emoji":"🌟","title":"Feature Five","desc":"Description of feature five"}}},"f6":{"type":"Card","props":{"emoji":"💎","title":"Feature Six","desc":"Description of feature six"}}}}

Return ONLY JSON.` },
  
  // Generate STATS
  stats: { name: "Stats", prompt: `You are an expert UI designer. Create a stats/metrics section with 4 impressive metrics.

Generate ONLY valid JSON:
{"statsSection":{"type":"Section","props":{"title":"By The Numbers"},"statsGrid":{"type":"Grid","props":{"cols":4},"children":["m1","m2","m3","m4"]},"m1":{"type":"Metric","props":{"val":"100K+","label":"Active Users","trend":"+15%"}},"m2":{"type":"Metric","props":{"val":"99.99%","label":"Uptime","trend":"Guaranteed"}},"m3":{"type":"Metric","props":{"val":"50M+","label":"Tasks Done","trend":"+5M"}},"m4":{"type":"Metric","props":{"val":"4.9/5","label":"Rating","trend":"Excellent"}}}

Return ONLY JSON.` },
  
  // Generate PRICING
  pricing: { name: "Pricing", prompt: `You are an expert UI designer. Create a pricing section with 3 tiers.

Generate ONLY valid JSON:
{"pricingSection":{"type":"Section","props":{"title":"Simple Pricing","subtitle":"Start free, scale as you grow"},"pricingGrid":{"type":"Grid","props":{"cols":3},"children":["p1","p2","p3"]},"p1":{"type":"Pricing","props":{"tier":"Starter","price":"$0","features":["5 projects","Basic support","1GB storage"]}},"p2":{"type":"Pricing","props":{"tier":"Pro","price":"$29","period":"month","features":["Unlimited projects","Priority support","100GB storage","Team collaboration"],"highlight":true,"btn":"Start Free Trial"}},"p3":{"type":"Pricing","props":{"tier":"Enterprise","price":"Custom","features":["Everything in Pro","Dedicated support","Unlimited storage"]}}}

Return ONLY JSON.` },
  
  // Generate FAQ
  faq: { name: "FAQ", prompt: `You are an expert UI designer. Create an FAQ section with 5 questions and answers.

Generate ONLY valid JSON:
{"faqSection":{"type":"Section","props":{"title":"Common Questions"},"faq1":{"type":"FAQ","props":{"q":"What is this product?","a":"A detailed answer explaining what the product is and how it helps users."}},"faq2":{"type":"FAQ","props":{"q":"How do I get started?","a":"Step-by-step guide on how to begin using the product."}},"faq3":{"type":"FAQ","props":{"q":"Is there a free trial?","a":"Yes, explain the free trial details and duration."}},"faq4":{"type":"FAQ","props":{"q":"What payment methods do you accept?","a":"List of accepted payment methods."}},"faq5":{"type":"FAQ","props":{"q":"Can I cancel anytime?","a":"Yes, explain the cancellation policy."}}}

Return ONLY JSON.` },
  
  // Generate CTA
  cta: { name: "CTA", prompt: `You are an expert UI designer. Create a final call-to-action section.

Generate ONLY valid JSON:
{"cta":{"type":"CTA","props":{"title":"Ready to Get Started?","sub":"Join thousands of happy customers. Start your free trial today.","btn":"Start Free Trial Now"}}}

Return ONLY JSON.` },
  
  // Generate FOOTER
  footer: { name: "Footer", prompt: `You are an expert UI designer. Create a footer with link categories.

Generate ONLY valid JSON:
{"footer":{"type":"Footer","props":{"links":{"Product":["Features","Pricing","Integrations","Changelog"],"Company":["About","Blog","Careers","Contact"],"Resources":["Documentation","API","Community","Support"],"Legal":["Privacy","Terms","Cookies"]},"copy":"© 2026 Your Brand. All rights reserved."}}}

Return ONLY JSON.` }
}

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [spec, setSpec] = useState<A2UISpec>(FALLBACK_SPEC) // Show fallback immediately
  const [logs, setLogs] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(true)
  const [phase, setPhase] = useState('AI Enhancing...')
  const [progress, setProgress] = useState(0)
  
  async function callAPI(prompt: string) {
    const res = await fetch('https://api.minimax.io/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MINIMAX_API_KEY}` },
      body: JSON.stringify({ model: 'MiniMax-M2.7', messages: [{ role: 'user', content: prompt }], max_tokens: 1500 })
    })
    const data = await res.json()
    return data.choices?.[0]?.message?.content || ''
  }
  
  function parseJSON(text: string): any {
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) return null
    try { return JSON.parse(match[0]) } catch { return null }
  }
  
  async function enhanceWithAI() {
    setIsGenerating(true)
    setLogs(['Starting AI enhancement...'])
    const elements: Record<string, A2UIElement> = {}
    const keys = Object.keys(AGENTS)
    
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const agent = AGENTS[key as keyof typeof AGENTS]
      setPhase(`${agent.name}...`)
      setProgress(Math.round(((i + 1) / keys.length) * 100))
      
      try {
        const text = await callAPI(agent.prompt)
        const parsed = parseJSON(text)
        
        if (parsed && parsed.elements) {
          Object.assign(elements, parsed.elements)
          setLogs(prev => [...prev.slice(-5), `✅ ${agent.name}: OK`])
        } else if (parsed && parsed.nav) {
          // Handle single-element responses
          Object.assign(elements, parsed)
          setLogs(prev => [...prev.slice(-5), `✅ ${agent.name}: OK`])
        } else {
          setLogs(prev => [...prev.slice(-5), `⚠️ ${agent.name}: No valid JSON`])
        }
      } catch (err) {
        setLogs(prev => [...prev.slice(-5), `❌ ${agent.name}: Failed`])
      }
    }
    
    if (Object.keys(elements).length > 0) {
      setSpec({ version: "0.8", root: "app", elements })
    }
    
    setPhase('Complete!')
    setIsGenerating(false)
    setLogs(prev => [...prev.slice(-5), `✅ Enhancement complete!`])
  }
  
  useEffect(() => { enhanceWithAI() }, [])
  
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#0a0a0f] text-white">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-purple-500/20 px-6 py-3">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="text-xl">📐</span>
              <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Pretext + A2UI</span>
            </div>
            <div className="flex items-center gap-3">
              {!isGenerating && <span className="text-xs text-green-400">✨ Enhanced</span>}
              {isGenerating && <span className="text-xs text-purple-400">{phase}</span>}
              <button onClick={enhanceWithAI} disabled={isGenerating} className="px-3 py-1.5 bg-purple-600 rounded-lg text-xs font-bold disabled:opacity-50">
                {isGenerating ? '⏳' : '✨'}
              </button>
            </div>
          </div>
        </header>
        
        <main className="pt-16">
          {/* Progress bar when generating */}
          {isGenerating && (
            <div className="sticky top-[52px] z-40 h-1 bg-white/10">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
          )}
          
          {/* Logs */}
          {isGenerating && logs.length > 0 && (
            <div className="fixed bottom-4 right-4 bg-black/80 rounded-lg p-3 max-w-xs">
              <pre className="text-xs text-gray-400">{logs.join('\n')}</pre>
            </div>
          )}
          
          {/* Rendered content */}
          {renderSpec(spec)}
        </main>
      </div>
    </ErrorBoundary>
  )
}
