// ============================================================
// A2UI + PRETEXT - FULL WEBSITE GENERATOR v3
// Integrated with OpenClaw A2UI + steipete agent-rules
// ============================================================
import React, { useState, useEffect, Component, ReactNode } from 'react'
import { prepare, layout, prepareWithSegments, layoutWithLines, walkLineRanges, layoutNextLine } from '@chenglou/pretext'

const MINIMAX_API_KEY = 'sk-cp-f6PbhZS6uNSD1L-mByhEw3RzISEgKDmaQ-kkQGUx79uBrnAZDVWVnDwmLwHC19V1jT07oW7CcU2Dn_3Zr8c90a5xYqk9J1BBNXd0C9bVRbyr-PLbfd31kUE'

interface A2UIElement { type: string; props: Record<string, any>; children?: string[] }
interface A2UISpec { version: string; root: string; elements: Record<string, A2UIElement> }

// ============================================
// AGENT RULES (from steipete/agent-rules)
// ============================================
const AGENT_RULES = `
CRITICAL: Write code that is:
1. SIMPLE - Prefer obvious over clever
2. COMPLETE - No TODOs, no placeholders
3. CONSISTENT - Same pattern everywhere
4. TESTED - Works on first try

JSON OUTPUT RULES:
- Always output valid JSON
- Use this exact format: {"elements":{"KEY":{"type":"TYPE","props":{...}}}}
- Never output markdown code blocks
- Never add explanations, only JSON

COPYWRITING RULES (from steipete's style):
- Benefit-driven headlines, not feature lists
- Technical but accessible
- Specific numbers over vague claims
- Sound like a real product, not AI gibberish
`

// ============================================
// CREATIVE BRIEF
// ============================================
const CREATIVE_BRIEF = `
You are building a landing page for "PretextFlow" - a text layout engine for developers.

BRAND: Professional, innovative, developer-focused. Think Stripe/Linear/Vercel.
STYLE: Dark mode, minimal, purple/pink gradients on #0a0a0f black.
TARGET: Developers who want fast UI without layout reflows.

KEY MESSAGES:
- "Zero layout reflow. Pure math."
- "~0.09ms per measurement"
- "Replace getBoundingClientRect"

SECTIONS: Nav → Hero → Features → Stats → How It Works → Code → Pricing → FAQ → CTA → Footer

Return ONLY valid JSON matching this structure:
{"SECTION_ID":{"type":"ComponentType","props":{...},"children":["child_id"]}}
`

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
// COMPONENTS (A2UI spec)
// ============================================
const Nav = ({ logo, links }: any) => <nav className="w-full h-[70px] flex items-center justify-between px-8 bg-black/90 border-b border-white/10"><span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{logo}</span><div className="flex gap-6">{links?.map((l: string, i: number) => <a key={i} href="#" className="text-gray-400 hover:text-white text-sm">{l}</a>)}</div><button className="px-5 py-2 rounded-xl bg-purple-600 font-bold text-sm">Get Started</button></nav>

const Hero = ({ badge, title, subtitle, desc, pBtn, sBtn }: any) => <section className="py-32 px-8 text-center bg-gradient-to-b from-purple-900/20 via-black to-[#0a0a0f]">{badge && <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 mb-6">{badge}</span>}<h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent leading-tight">{title}</h1>{subtitle && <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">{subtitle}</p>}{desc && <p className="text-gray-500 max-w-xl mx-auto mb-10 text-sm">{desc}</p>}<div className="flex gap-4 justify-center">{pBtn && <button className="px-8 py-4 rounded-xl font-bold bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-500/25">{pBtn}</button>}{sBtn && <button className="px-8 py-4 rounded-xl font-bold bg-white/10 hover:bg-white/15 border border-white/10">{sBtn}</button>}</div></section>

const Section = ({ title, sub, children }: any) => <section className="py-20 px-8"><div className="max-w-6xl mx-auto">{title && <h2 className="text-3xl font-black text-center mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{title}</h2>}{sub && <p className="text-gray-500 text-center mb-12 text-sm">{sub}</p>}{children}</div></section>

const Grid = ({ cols, children }: any) => <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${cols || 3}, minmax(0, 1fr))` }}>{children}</div>

const Card = ({ emoji, title, desc }: any) => <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] transition-all"><div className="text-2xl mb-3">{emoji}</div><h3 className="text-lg font-semibold mb-2">{title}</h3>{desc && <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>}</div>

const Metric = ({ val, label, trend }: any) => <div className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]"><div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">{val}</div><div className="text-gray-500 uppercase text-xs tracking-wider">{label}</div>{trend && <div className="text-green-400/80 text-xs mt-2">{trend}</div>}</div>

const Step = ({ num, title, desc }: any) => <div className="flex gap-4"><div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center font-bold text-purple-400 shrink-0">{num}</div><div><h4 className="font-semibold mb-1">{title}</h4><p className="text-gray-500 text-sm">{desc}</p></div></div>

const CodeBlock = ({ code, lang }: any) => <div className="rounded-xl bg-black/60 border border-white/10 overflow-hidden"><div className="flex gap-1.5 px-4 py-3 border-b border-white/5"><div className="w-3 h-3 rounded-full bg-red-500/60"></div><div className="w-3 h-3 rounded-full bg-yellow-500/60"></div><div className="w-3 h-3 rounded-full bg-green-500/60"></div><span className="ml-2 text-xs text-gray-500">{lang || 'typescript'}</span></div><pre className="p-4 text-sm overflow-x-auto"><code className="text-gray-300">{code}</code></pre></div>

const Pricing = ({ tier, price, period, features, highlight, btn }: any) => <div className={`p-6 rounded-2xl ${highlight ? 'bg-gradient-to-b from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30' : 'bg-white/[0.03] border border-white/[0.08]'} relative`}>{highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-500 rounded-full text-xs font-bold">POPULAR</div>}<div className="text-sm font-bold text-purple-400 mb-1">{tier}</div><div className="flex items-baseline gap-1 mb-4"><span className="text-4xl font-black">{price}</span>{period && <span className="text-gray-500 text-sm">/{period}</span>}</div><ul className="space-y-2.5 mb-6">{features?.map((f: string, i: number) => <li key={i} className="flex items-center gap-2 text-gray-400 text-sm"><span className="text-green-400/80">✓</span> {f}</li>)}</ul><button className={`w-full py-3 rounded-xl font-semibold text-sm ${highlight ? 'bg-purple-600 hover:bg-purple-500' : 'bg-white/10 hover:bg-white/15'}`}>{btn || 'Get Started'}</button></div>

const FAQ = ({ q, a }: any) => <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]"><h4 className="font-semibold mb-2 text-sm">{q}</h4>{a && <p className="text-gray-500 text-sm leading-relaxed">{a}</p>}</div>

const CTA = ({ title, sub, btn }: any) => <section className="py-24 px-8 text-center bg-gradient-to-br from-purple-900/20 to-pink-900/20"><h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{title}</h2>{sub && <p className="text-gray-400 mb-8 max-w-lg mx-auto text-sm">{sub}</p>}<button className="px-10 py-4 rounded-xl font-bold bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-500/25">{btn || 'Start Free Trial'}</button></section>

const Footer = ({ links, copy }: any) => <footer className="py-12 px-8 border-t border-white/10 bg-black/50"><div className="max-w-6xl mx-auto"><div className="grid grid-cols-4 gap-8 mb-8">{links && Object.entries(links).map(([cat, items]: [string, any]) => <div key={cat}><h4 className="font-semibold mb-3 text-purple-400 text-sm">{cat}</h4><ul className="space-y-2">{items.map((item: string, i: number) => <li key={i}><a href="#" className="text-gray-500 hover:text-white text-sm">{item}</a></li>)}</ul></div>)}</div><div className="text-center text-gray-600 text-xs border-t border-white/5 pt-8">{copy}</div></div></footer>

// ============================================
// FALLBACK SPEC (High quality - PretextFlow)
// ============================================
const FALLBACK_SPEC: A2UISpec = {
  version: "0.8",
  root: "app",
  elements: {
    nav: { type: "Nav", props: { logo: "⚡ PretextFlow", links: ["Docs", "Features", "Pricing", "GitHub"] }},
    hero: { type: "Hero", props: { badge: "🚀 ZERO LAYOUT REFLOW", title: "Text Measurement Without Limits", subtitle: "Pure math. No DOM. No jank.", desc: "PretextFlow measures text at ~0.09ms using only JavaScript arithmetic. No getBoundingClientRect. No layout thrashing. Just fast.", pBtn: "Start Free", sBtn: "View Docs" }},
    featSection: { type: "Section", props: { title: "Why PretextFlow?", sub: "The modern way to handle text layout" }, children: ["featGrid"]},
    featGrid: { type: "Grid", props: { cols: 3 }, children: ["f1", "f2", "f3", "f4", "f5", "f6"]},
    f1: { type: "Card", props: { emoji: "⚡", title: "Blazing Fast", desc: "~0.09ms per measurement. Cached results. No DOM access." }},
    f2: { type: "Card", props: { emoji: "🔒", title: "Secure by Design", desc: "No eval. No code execution. Pure declarative JSON." }},
    f3: { type: "Card", props: { emoji: "🌍", title: "Universal", desc: "Works with React, Vue, Svelte, or vanilla JS." }},
    f4: { type: "Card", props: { emoji: "📱", title: "Any Surface", desc: "Render to DOM, Canvas, SVG, or game engines." }},
    f5: { type: "Card", props: { emoji: "🎯", title: "Precise", desc: "Uses the browser's own font engine as ground truth." }},
    f6: { type: "Card", props: { emoji: "♿", title: "Accessible", desc: "Built-in support for RTL languages and screen readers." }},
    statsSection: { type: "Section", props: { title: "Numbers Don't Lie" }, children: ["statsGrid"]},
    statsGrid: { type: "Grid", props: { cols: 4 }, children: ["m1", "m2", "m3", "m4"]},
    m1: { type: "Metric", props: { val: "0.09ms", label: "Per Call" }},
    m2: { type: "Metric", props: { val: "10M+", label: "Calls/Day" }},
    m3: { type: "Metric", props: { val: "99.99%", label: "Uptime" }},
    m4: { type: "Metric", props: { val: "4.9/5", label: "Dev Rating" }},
    howSection: { type: "Section", props: { title: "How It Works", sub: "Three steps to layout bliss" }, children: ["howGrid"]},
    howGrid: { type: "Grid", props: { cols: 3 }, children: ["s1", "s2", "s3"]},
    s1: { type: "Step", props: { num: "1", title: "Install", desc: "npm install @pretextflow/core" }},
    s2: { type: "Step", props: { num: "2", title: "Measure", desc: "pretext.measure(text, width)" }},
    s3: { type: "Step", props: { num: "3", title: "Render", desc: "Use positions in Canvas, SVG, or DOM" }},
    codeSection: { type: "Section", props: { title: "Simple API", sub: "One function. Infinite possibilities." }, children: ["code"]},
    code: { type: "CodeBlock", props: { lang: "typescript", code: "import { prepare, layout } from '@pretextflow/core'\n\nconst text = 'Hello, PretextFlow!'\nconst prepared = prepare(text, '16px Inter')\nconst { height } = layout(prepared, 400, 24)\n\nconsole.log(`Height: ${height}px`) // ~21px\n// No DOM access. No reflow. Pure math." }},
    pricingSection: { type: "Section", props: { title: "Simple Pricing", sub: "Start free. Scale as you grow." }, children: ["pricingGrid"]},
    pricingGrid: { type: "Grid", props: { cols: 3 }, children: ["p1", "p2", "p3"]},
    p1: { type: "Pricing", props: { tier: "Hobby", price: "$0", features: ["100K calls/month", "Community support", "1 project"]}},
    p2: { type: "Pricing", props: { tier: "Pro", price: "$29", period: "mo", features: ["Unlimited calls", "Priority support", "10 projects", "Analytics"], highlight: true, btn: "Start Trial"}},
    p3: { type: "Pricing", props: { tier: "Enterprise", price: "Custom", features: ["Everything in Pro", "Dedicated support", "Unlimited projects", "SLA guarantee"]}},
    faqSection: { type: "Section", props: { title: "FAQ", sub: "Common questions, clear answers" }, children: ["faqGrid"]},
    faqGrid: { type: "Grid", props: { cols: 2 }, children: ["faq1", "faq2", "faq3", "faq4", "faq5"]},
    faq1: { type: "FAQ", props: { q: "What makes it so fast?", a: "Pretext uses the browser's native font engine to measure text once, then caches everything. Subsequent calls are pure arithmetic." }},
    faq2: { type: "FAQ", props: { q: "Does it work with TypeScript?", a: "Yes! Full TypeScript support with types included. Works in Node.js and browsers." }},
    faq3: { type: "FAQ", props: { q: "Can I use it for game development?", a: "Absolutely. Pretext outputs raw coordinates, making it perfect for Canvas, WebGL, and game UI systems." }},
    faq4: { type: "FAQ", props: { q: "Is there a React integration?", a: "Yes, we have official React bindings plus examples for Vue, Svelte, and Solid." }},
    faq5: { type: "FAQ", props: { q: "What about RTL languages?", a: "Full support for Arabic, Hebrew, and other RTL scripts built in." }},
    cta: { type: "CTA", props: { title: "Ready to go fast?", sub: "Join thousands of developers who eliminated layout thrashing.", btn: "Get Started Free" }},
    footer: { type: "Footer", props: { links: { Product: ["Features", "Pricing", "Changelog"], Developers: ["Docs", "API", "Examples", "Status"], Company: ["About", "Blog", "Careers"], Legal: ["Privacy", "Terms", "Security"]}, copy: "© 2026 PretextFlow. Built for developers who care about performance." }}
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
      case "Step": return <Step key={id} {...props} />
      case "CodeBlock": return <CodeBlock key={id} {...props} />
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
// AGENTS WITH RULES
// ============================================
const AGENTS = {
  nav: { name: "Nav", prompt: `${AGENT_RULES}\n\n${CREATIVE_BRIEF}\n\nGenerate ONLY the navigation JSON. No markdown.` },
  hero: { name: "Hero", prompt: `${AGENT_RULES}\n\n${CREATIVE_BRIEF}\n\nGenerate ONLY the hero section JSON. Make it compelling.` },
  features: { name: "Features", prompt: `${AGENT_RULES}\n\n${CREATIVE_BRIEF}\n\nGenerate ONLY the features section: 6 cards showcasing capabilities.` },
  stats: { name: "Stats", prompt: `${AGENT_RULES}\n\n${CREATIVE_BRIEF}\n\nGenerate ONLY the stats section: 4 impressive metrics.` },
  how: { name: "How It Works", prompt: `${AGENT_RULES}\n\n${CREATIVE_BRIEF}\n\nGenerate ONLY the How It Works section: 3 steps.` },
  code: { name: "Code Example", prompt: `${AGENT_RULES}\n\n${CREATIVE_BRIEF}\n\nGenerate ONLY the code example section with working TypeScript.` },
  pricing: { name: "Pricing", prompt: `${AGENT_RULES}\n\n${CREATIVE_BRIEF}\n\nGenerate ONLY the pricing section: 3 tiers.` },
  faq: { name: "FAQ", prompt: `${AGENT_RULES}\n\n${CREATIVE_BRIEF}\n\nGenerate ONLY the FAQ section: 5 questions and answers.` },
  cta: { name: "CTA", prompt: `${AGENT_RULES}\n\n${CREATIVE_BRIEF}\n\nGenerate ONLY the final CTA section JSON.` },
  footer: { name: "Footer", prompt: `${AGENT_RULES}\n\n${CREATIVE_BRIEF}\n\nGenerate ONLY the footer JSON.` }
}

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [spec, setSpec] = useState<A2UISpec>(FALLBACK_SPEC)
  const [logs, setLogs] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(true)
  const [phase, setPhase] = useState('Enhancing...')
  const [progress, setProgress] = useState(0)
  
  async function callAPI(prompt: string) {
    const res = await fetch('https://api.minimax.io/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MINIMAX_API_KEY}` },
      body: JSON.stringify({ model: 'MiniMax-M2.7', messages: [{ role: 'user', content: prompt }], max_tokens: 1200 })
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
    setLogs(['✨ Enhancing with AI...'])
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
        
        if (parsed?.elements) {
          Object.assign(elements, parsed.elements)
          setLogs(prev => [...prev.slice(-4), `✅ ${agent.name}`])
        } else if (parsed && Object.keys(parsed).length > 0) {
          Object.assign(elements, parsed)
          setLogs(prev => [...prev.slice(-4), `✅ ${agent.name}`])
        } else {
          setLogs(prev => [...prev.slice(-4), `⚠️ ${agent.name}: skipped`])
        }
      } catch (err) {
        setLogs(prev => [...prev.slice(-4), `❌ ${agent.name}: failed`])
      }
    }
    
    if (Object.keys(elements).length > 0) {
      setSpec({ version: "0.8", root: "app", elements })
    }
    
    setIsGenerating(false)
    setLogs(prev => [...prev.slice(-4), `✅ Done!`])
  }
  
  useEffect(() => { enhanceWithAI() }, [])
  
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#0a0a0f] text-white">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-purple-500/20 px-6 py-3">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">PretextFlow</span>
            </div>
            <div className="flex items-center gap-3">
              {!isGenerating && <span className="text-xs text-green-400/80">✨ Enhanced</span>}
              {isGenerating && <span className="text-xs text-purple-400">{phase}</span>}
              <button onClick={enhanceWithAI} disabled={isGenerating} className="px-3 py-1.5 bg-purple-600 rounded-lg text-xs font-bold disabled:opacity-50 hover:bg-purple-500 transition">
                {isGenerating ? '⏳' : '✨'}
              </button>
            </div>
          </div>
        </header>
        
        {/* Progress */}
        {isGenerating && <div className="fixed top-[52px] left-0 right-0 z-40 h-0.5 bg-white/10"><div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all" style={{ width: `${progress}%` }} /></div>}
        
        {/* Logs */}
        {isGenerating && logs.length > 0 && <div className="fixed bottom-4 right-4 bg-black/80 rounded-lg p-3 max-w-[200px]"><pre className="text-xs text-gray-500">{logs.join('\n')}</pre></div>}
        
        <main className="pt-16">{renderSpec(spec)}</main>
      </div>
    </ErrorBoundary>
  )
}
