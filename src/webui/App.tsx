// ============================================================
// A2UI + PRETEXT - CSS-REPLACING LAYOUT ENGINE
// Pretext does: Masonry, Float, Shrinkwrap, Virtualization
// ============================================================
import React, { useState, useEffect, useRef, Component, ReactNode } from 'react'
import { prepare, layout, prepareWithSegments, layoutWithLines, walkLineRanges, layoutNextLine } from '@chenglou/pretext'

const MINIMAX_API_KEY = 'sk-cp-f6PbhZS6uNSD1L-mByhEw3RzISEgKDmaQ-kkQGUx79uBrnAZDVWVnDwmLwHC19V1jT07oW7CcU2Dn_3Zr8c90a5xYqk9J1BBNXd0C9bVRbyr-PLbfd31kUE'

// ============================================
// PRETEXT LAYOUT ENGINE (Replaces CSS)
// ============================================
class PretextLayout {
  // 1. MASONRY LAYOUT - CSS grid can't do this easily
  static masonry(items: Array<{ text: string; width: number }>, columnCount: number, gap: number) {
    const columns: Array<{ text: string; height: number; width: number }[]> = Array.from({ length: columnCount }, () => [])
    const columnHeights = new Array(columnCount).fill(0)
    
    for (const item of items) {
      const prepared = prepare(item.text, '16px Inter')
      const { height } = layout(prepared, item.width, 24)
      
      // Find shortest column
      let minCol = 0
      let minHeight = columnHeights[0]
      for (let i = 1; i < columnCount; i++) {
        if (columnHeights[i] < minHeight) {
          minCol = i
          minHeight = columnHeights[i]
        }
      }
      
      columns[minCol].push({ text: item.text, height, width: item.width })
      columnHeights[minCol] += height + gap
    }
    
    return columns
  }
  
  // 2. FLOAT AROUND - Like CSS float: left
  static floatAround(text: string, obstacle: { x: number; y: number; width: number; height: number }, columnWidth: number, fontSize: number = 16, lineHeight: number = 24) {
    const prepared = prepareWithSegments(text, `${fontSize}px Inter`)
    const lines: Array<{ text: string; x: number; y: number; width: number }> = []
    let cursor = { segmentIndex: 0, graphemeIndex: 0 }
    let y = 0
    
    while (true) {
      const inObstacle = y >= obstacle.y && y < obstacle.y + obstacle.height
      const width = inObstacle ? columnWidth - obstacle.width - 10 : columnWidth
      const line = layoutNextLine(prepared, cursor, width)
      if (!line) break
      lines.push({ text: line.text, x: inObstacle ? obstacle.width + 10 : 0, y, width: line.width })
      cursor = line.end
      y += lineHeight
    }
    
    return lines
  }
  
  // 3. SHRINKWRAP - Find tightest width
  static shrinkwrap(text: string, fontSize: number = 16) {
    const prepared = prepareWithSegments(text, `${fontSize}px Inter`)
    let maxWidth = 0
    walkLineRanges(prepared, 10000, (line) => {
      if (line.width > maxWidth) maxWidth = line.width
    })
    return maxWidth
  }
  
  // 4. BALANCED TEXT - Equal line widths
  static balanced(text: string, targetWidth: number, fontSize: number = 16) {
    const prepared = prepareWithSegments(text, `${fontSize}px Inter`)
    // Binary search for optimal width
    let low = 50, high = targetWidth
    while (high - low > 10) {
      const mid = (low + high) / 2
      let lineCount = 0
      walkLineRanges(prepared, mid, () => lineCount++)
      if (lineCount > 5) low = mid
      else high = mid
    }
    
    const { lines } = layoutWithLines(prepared, high, fontSize * 1.4)
    return lines
  }
  
  // 5. VIRTUALIZATION - Measure without DOM
  static virtualList(items: string[], itemHeight: number) {
    // Pre-calculate positions without rendering
    return items.map((text, i) => {
      const prepared = prepare(text, '16px Inter')
      const { height } = layout(prepared, 300, 24)
      return { text, y: i * itemHeight, height }
    })
  }
  
  // 6. TEXT OVERFLOW - Detect if text overflows
  static overflows(text: string, maxWidth: number, fontSize: number = 16) {
    const shrinkwrapWidth = this.shrinkwrap(text, fontSize)
    return shrinkwrapWidth > maxWidth
  }
}

// ============================================
// A2UI INTERFACE
// ============================================
interface A2UIElement { type: string; props: Record<string, any>; children?: string[] }
interface A2UISpec { version: string; root: string; elements: Record<string, A2UIElement> }

// ============================================
// ERROR BOUNDARY
// ============================================
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: string }> {
  constructor(props: { children: ReactNode }) { super(props); this.state = { hasError: false, error: '' } }
  static getDerivedStateFromError(error: Error) { return { hasError: true, error: error.message } }
  render() {
    if (this.state.hasError) return <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white"><h1 className="text-2xl text-red-400">Error</h1></div>
    return this.props.children
  }
}

// ============================================
// PRETEXT-POWERED COMPONENTS (CSS replaced)
// ============================================

// Masonry Grid - Pretext calculates heights
const PretextMasonry = ({ items, columns = 3 }: { items: Array<{ text: string; emoji?: string }>; columns?: number }) => {
  const cols = PretextLayout.masonry(items.map(i => ({ text: i.text, width: 300 })), columns, 16)
  
  return (
    <div className="flex gap-8" style={{ alignItems: 'flex-start' }}>
      {cols.map((col, colIdx) => (
        <div key={colIdx} className="flex-1 flex flex-col gap-4">
          {col.map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
              {item.text}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// Float Text - Pretext flows around obstacle
const PretextFloat = ({ text, obstacle }: { text: string; obstacle?: { width: number; height: number } }) => {
  const obstacleData = obstacle || { x: 10, y: 20, width: 120, height: 120 }
  const lines = PretextLayout.floatAround(text, obstacleData, 600, 16, 24)
  
  return (
    <div className="relative p-4 bg-white/5 rounded-2xl">
      {/* Floating obstacle */}
      <div 
        className="absolute bg-purple-500/30 border border-purple-500/50 rounded-lg flex items-center justify-center text-4xl"
        style={{ 
          left: obstacleData.x, 
          top: obstacleData.y, 
          width: obstacleData.width, 
          height: obstacleData.height 
        }}
      >
        🖼️
      </div>
      {/* Flowing text */}
      <div className="relative z-10">
        {lines.map((line, i) => (
          <div key={i} style={{ position: 'absolute', left: line.x, top: line.y, width: line.width }}>
            {line.text}
          </div>
        ))}
        <div style={{ height: lines.length * 24 + 20 }} /> {/* Spacer */}
      </div>
    </div>
  )
}

// Shrinkwrap Text - Pretext calculates tightest width
const PretextShrinkwrap = ({ text }: { text: string }) => {
  const width = PretextLayout.shrinkwrap(text, 16)
  
  return (
    <div className="inline-block px-4 py-2 bg-purple-500/20 rounded-lg">
      <span className="text-purple-300 text-sm">Width: {Math.round(width)}px</span>
      <div 
        className="mt-2 px-2 py-1 bg-white/10 rounded text-white"
        style={{ width: Math.min(width + 16, 400) }}
      >
        {text}
      </div>
    </div>
  )
}

// Balanced Text - Equal line widths
const PretextBalanced = ({ text, width = 400 }: { text: string; width?: number }) => {
  const lines = PretextLayout.balanced(text, width, 18)
  
  return (
    <div className="p-6 bg-white/5 rounded-2xl">
      <span className="text-xs text-gray-500 block mb-4">Balanced Text ({lines.length} lines)</span>
      <div className="space-y-1" style={{ maxWidth: width }}>
        {lines.map((line, i) => (
          <div key={i} className="text-white">{line.text}</div>
        ))}
      </div>
    </div>
  )
}

// Virtual List - Pretext measures without DOM
const PretextVirtual = ({ items }: { items: string[] }) => {
  const virtualized = PretextLayout.virtualList(items, 60)
  
  const totalHeight = virtualized.reduce((sum, item) => sum + item.height + 16, 0)
  
  return (
    <div className="relative bg-white/5 rounded-2xl overflow-hidden" style={{ height: Math.min(totalHeight, 400), overflow: 'auto' }}>
      <div className="p-4 space-y-4">
        {virtualized.slice(0, 10).map((item, i) => (
          <div key={i} className="p-4 bg-white/5 rounded-xl">
            <span className="text-xs text-gray-500 mr-2">#{i + 1}</span>
            {item.text.slice(0, 50)}...
          </div>
        ))}
        {virtualized.length > 10 && (
          <div className="text-center text-gray-500 py-2">
            + {virtualized.length - 10} more items (virtualized)
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// A2UI COMPONENTS
// ============================================
const A2Nav = ({ logo, links }: { logo: string; links?: string[] }) => (
  <nav className="w-full h-[70px] flex items-center justify-between px-8 bg-black/90 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
    <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{logo}</span>
    <div className="hidden md:flex gap-8">
      {links?.map((link, i) => <a key={i} href="#" className="text-gray-400 hover:text-white transition">{link}</a>)}
    </div>
    <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold">Get Started</button>
  </nav>
)

const A2Hero = ({ badge, title, subtitle, description, primaryBtn, secondaryBtn }: any) => (
  <section className="py-32 px-8 text-center bg-gradient-to-b from-purple-900/30 via-black to-[#0a0a0f]">
    {badge && <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-purple-500/20 text-purple-300 mb-8">{badge}</span>}
    <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">{title}</h1>
    {subtitle && <p className="text-2xl text-gray-300 mb-4">{subtitle}</p>}
    {description && <p className="text-gray-400 max-w-2xl mx-auto mb-12">{description}</p>}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {primaryBtn && <button className="px-10 py-5 rounded-2xl font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-xl shadow-purple-500/30">{primaryBtn}</button>}
      {secondaryBtn && <button className="px-10 py-5 rounded-2xl font-bold text-lg bg-white/10 hover:bg-white/20 border border-white/20">{secondaryBtn}</button>}
    </div>
  </section>
)

const A2Section = ({ title, subtitle, children }: { title?: string; subtitle?: string; children: ReactNode }) => (
  <section className="py-24 px-8">
    <div className="max-w-6xl mx-auto">
      {title && <h2 className="text-4xl md:text-5xl font-black text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{title}</h2>}
      {subtitle && <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">{subtitle}</p>}
      {children}
    </div>
  </section>
)

const A2Grid = ({ cols = 3, children }: { cols?: number; children: ReactNode }) => (
  <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>{children}</div>
)

const A2Card = ({ emoji, title, description, featured }: any) => (
  <div className={`group p-8 rounded-3xl transition-all duration-300 ${featured ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>
    {emoji && <div className="text-5xl mb-6">{emoji}</div>}
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
)

const A2Metric = ({ value, label, trend, icon }: any) => (
  <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10">
    {icon && <div className="text-3xl mb-4">{icon}</div>}
    <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">{value}</div>
    <div className="text-gray-400 uppercase tracking-wider text-sm">{label}</div>
    {trend && <div className="text-green-400 text-sm mt-2">{trend}</div>}
  </div>
)

const A2Pricing = ({ tier, price, period, features, highlighted, buttonText }: any) => (
  <div className={`p-8 rounded-3xl ${highlighted ? 'bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-2 border-purple-500/50' : 'bg-white/5 border border-white/10'}`}>
    <div className="text-sm font-bold text-purple-400 mb-2">{tier}</div>
    <div className="flex items-baseline gap-1 mb-4">
      <span className="text-5xl font-black">{price}</span>
      {period && <span className="text-gray-500">/{period}</span>}
    </div>
    <ul className="space-y-3 mb-8">
      {features?.map((f: string, i: number) => <li key={i} className="flex items-center gap-3 text-gray-300"><span className="text-green-400">✓</span> {f}</li>)}
    </ul>
    <button className={`w-full py-4 rounded-2xl font-bold ${highlighted ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-white/10'}`}>{buttonText || 'Get Started'}</button>
  </div>
)

const A2FAQ = ({ question, answer }: any) => (
  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
    <h4 className="text-lg font-bold mb-2">{question}</h4>
    {answer && <p className="text-gray-400">{answer}</p>}
  </div>
)

const A2CTA = ({ title, subtitle, buttonText }: any) => (
  <section className="py-32 px-8 text-center bg-gradient-to-br from-purple-900/30 to-pink-900/30">
    <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{title}</h2>
    {subtitle && <p className="text-gray-400 mb-12 max-w-2xl mx-auto">{subtitle}</p>}
    <button className="px-14 py-5 rounded-2xl font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-xl shadow-purple-500/30">{buttonText || 'Start Free Trial'}</button>
  </section>
)

const A2Footer = ({ links, copyright }: any) => (
  <footer className="py-16 px-8 border-t border-white/10 bg-black/50">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {links && Object.entries(links).map(([category, items]: [string, any]) => (
          <div key={category}>
            <h4 className="font-bold mb-4 text-purple-400">{category}</h4>
            <ul className="space-y-2">
              {items.map((item: string, i: number) => <li key={i}><a href="#" className="text-gray-500 hover:text-white transition text-sm">{item}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="text-center text-gray-500 text-sm border-t border-white/5 pt-8">
        {copyright || '© 2026 Pretext + A2UI'}
      </div>
    </div>
  </footer>
)

// Pretext Demo Section
const PretextDemo = () => {
  const items = [
    'Short text',
    'This is a much longer piece of text that will take more vertical space',
    'Medium length here',
    'Another longer text that demonstrates how Pretext calculates heights for masonry layout automatically'
  ]
  
  return (
    <section className="py-16 px-8 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
      <div className="max-w-6xl mx-auto space-y-12">
        <h2 className="text-3xl font-black text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">📐 Pretext Layout Engine</h2>
        
        {/* Masonry Demo */}
        <div className="p-6 rounded-3xl bg-black/40">
          <h3 className="text-lg font-bold mb-4 text-purple-400">� masonry()</h3>
          <p className="text-gray-400 text-sm mb-4">Pretext calculates item heights for optimal column distribution</p>
          <PretextMasonry items={items.map(t => ({ text: t }))} columns={3} />
        </div>
        
        {/* Float Demo */}
        <div className="p-6 rounded-3xl bg-black/40">
          <h3 className="text-lg font-bold mb-4 text-purple-400">🌊 floatAround()</h3>
          <p className="text-gray-400 text-sm mb-4">Text flows around floating obstacle</p>
          <PretextFloat text="Pretext can flow text around obstacles just like CSS float. This is incredibly useful for rendering to Canvas, SVG, or anywhere CSS isn't available. The text automatically wraps around the floating element." />
        </div>
        
        {/* Balanced Text */}
        <div className="p-6 rounded-3xl bg-black/40">
          <h3 className="text-lg font-bold mb-4 text-purple-400">⚖️ balanced()</h3>
          <p className="text-gray-400 text-sm mb-4">Equal line widths for beautiful text blocks</p>
          <PretextBalanced text="This text will be automatically balanced across multiple lines with equal widths." />
        </div>
        
        {/* Shrinkwrap */}
        <div className="p-6 rounded-3xl bg-black/40">
          <h3 className="text-lg font-bold mb-4 text-purple-400">📦 shrinkwrap()</h3>
          <p className="text-gray-400 text-sm mb-4">Find the tightest container width</p>
          <div className="flex gap-4 flex-wrap">
            <PretextShrinkwrap text="Tight" />
            <PretextShrinkwrap text="Medium text here" />
            <PretextShrinkwrap text="This is a longer piece of text" />
          </div>
        </div>
        
        {/* Virtual List */}
        <div className="p-6 rounded-3xl bg-black/40">
          <h3 className="text-lg font-bold mb-4 text-purple-400">📜 virtualList()</h3>
          <p className="text-gray-400 text-sm mb-4">Pre-calculate positions without DOM</p>
          <PretextVirtual items={Array.from({ length: 100 }, (_, i) => `Virtual item ${i + 1} with some text content`)} />
        </div>
      </div>
    </section>
  )
}

// ============================================
// A2UI RENDERER
// ============================================
function renderA2UI(spec: A2UISpec): ReactNode {
  if (!spec?.elements) return null
  
  function render(id: string): ReactNode {
    const elem = spec.elements[id]
    if (!elem) return null
    const { type, props, children } = elem
    
    switch (type) {
      case 'Nav': return <A2Nav key={id} {...props} />
      case 'Hero': return <A2Hero key={id} {...props} />
      case 'Section': return <A2Section key={id} {...props}>{children?.map(c => render(c))}</A2Section>
      case 'Grid': return <A2Grid key={id} {...props}>{children?.map(c => render(c))}</A2Grid>
      case 'Card': return <A2Card key={id} {...props} />
      case 'Metric': return <A2Metric key={id} {...props} />
      case 'Pricing': return <A2Pricing key={id} {...props} />
      case 'FAQ': return <A2FAQ key={id} {...props} />
      case 'CTA': return <A2CTA key={id} {...props} />
      case 'Footer': return <A2Footer key={id} {...props} />
      default: return null
    }
  }
  
  return spec.root ? render(spec.root) : null
}

// ============================================
// AGENTS
// ============================================
const AGENTS = {
  nav: { system: `A2UI JSON: {"nav":{"type":"Nav","props":{"logo":"📐 Pretext+UI","links":["Features","Pricing","Docs","Community"]}}}` },
  hero: { system: `A2UI JSON: {"hero":{"type":"Hero","props":{"badge":"🚀 Zero Reflow","title":"Build UI with Pretext","subtitle":"Replace CSS with pure math","description":"Pretext measures text at ~0.09ms without DOM access. Masonry, float, shrinkwrap, virtual lists - all without layout reflow.","primaryBtn":"Start Building","secondaryBtn":"See Demos"}}}` },
  pretext: { system: `Return PRETEXT DEMO: {"pretext-demo":{"type":"Section","props":{"title":"📐 Pretext Layout Engine"}}}}` },
  features: { system: `A2UI JSON: {"features":{"type":"Section","props":{"title":"Powerful Features","subtitle":"Everything CSS can do, but faster"}},"grid":{"type":"Grid","props":{"cols":3}},"f1":{"type":"Card","props":{"emoji":"🏔️","title":"Masonry","description":"Auto-calculated column heights. No DOM measurement."}},"f2":{"type":"Card","props":{"emoji":"🌊","title":"Float Around","description":"Text flows around obstacles. Canvas/SVG ready."}},"f3":{"type":"Card","props":{"emoji":"📦","title":"Shrinkwrap","description":"Find tightest width without touching DOM."}},"f4":{"type":"Card","props":{"emoji":"⚖️","title":"Balanced Text","description":"Equal line widths for beautiful typography."}},"f5":{"type":"Card","props":{"emoji":"📜","title":"Virtual List","description":"Pre-calculate positions. Zero DOM access."}},"f6":{"type":"Card","props":{"emoji":"⚡","title":"0.09ms","description":"Cached measurement. No layout reflow ever."}}}}` },
  stats: { system: `A2UI JSON: {"stats":{"type":"Section","props":{"title":"By The Numbers"}},"grid":{"type":"Grid","props":{"cols":4}},"m1":{"type":"Metric","props":{"value":"0.09ms","label":"Per Call","icon":"⚡"}},"m2":{"type":"Metric","props":{"value":"0","label":"DOM Reflow","icon":"🚫"}},"m3":{"type":"Metric","props":{"value":"100%","label":"Cached","icon":"💾"}},"m4":{"type":"Metric","props":{"value":"∞","label":"Languages","icon":"🌍"}}}` },
  pricing: { system: `A2UI JSON: {"pricing":{"type":"Section","props":{"title":"Pricing","subtitle":"Start free"}},"grid":{"type":"Grid","props":{"cols":3}},"p1":{"type":"Pricing","props":{"tier":"Free","price":"$0","features":["Masonry layout","Float around","Shrinkwrap"]}},"p2":{"type":"Pricing","props":{"tier":"Pro","price":"$19","period":"month","features":["All layouts","Priority support","Unlimited usage"],"highlighted":true,"buttonText":"Start Trial"}},"p3":{"type":"Pricing","props":{"tier":"Enterprise","price":"Custom","features":["Everything","Dedicated support","Custom integrations"]}}}` },
  faq: { system: `A2UI JSON: {"faq":{"type":"Section","props":{"title":"FAQ"}},"q1":{"type":"FAQ","props":{"question":"What is Pretext?","answer":"Pure JS text measurement without DOM access."}},"q2":{"type":"FAQ","props":{"question":"How fast?","answer":"~0.09ms per call (cached)."}},"q3":{"type":"FAQ","props":{"question":"What can it replace?","answer":"getBoundingClientRect, offsetHeight, masonry layouts, CSS float."}}}` },
  cta: { system: `A2UI JSON: {"cta":{"type":"CTA","props":{"title":"Ready?","subtitle":"Build layout that CSS can't.","buttonText":"Get Started"}}}` },
  footer: { system: `A2UI JSON: {"footer":{"type":"Footer","props":{"links":{"Product":["Features","Pricing"],"Resources":["Docs","GitHub"]},"copyright":"© 2026 Pretext Layout Engine"}}}` },
}

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [spec, setSpec] = useState<A2UISpec | null>(null)
  const [logs, setLogs] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(true)
  const [phase, setPhase] = useState('Generating...')
  const [progress, setProgress] = useState(0)
  
  async function callAPI(system: string) {
    const res = await fetch('https://api.minimax.io/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MINIMAX_API_KEY}` },
      body: JSON.stringify({ model: 'MiniMax-M2.7', messages: [{ role: 'system', content: system }, { role: 'user', content: 'Return JSON only.' }], max_tokens: 2048 })
    })
    return (await res.json()).choices?.[0]?.message?.content || ''
  }
  
  function parseJSON(text: string): any {
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) return null
    try { return JSON.parse(match[0]) } catch { return null }
  }
  
  async function runSwarm() {
    setIsGenerating(true)
    setLogs([])
    const allElements: Record<string, A2UIElement> = {}
    const keys = Object.keys(AGENTS)
    
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      setPhase(`${key}...`)
      setProgress(Math.round(((i + 1) / keys.length) * 100))
      
      try {
        const text = await callAPI(AGENTS[key as keyof typeof AGENTS].system)
        const parsed = parseJSON(text)
        if (parsed?.elements) {
          Object.assign(allElements, parsed.elements)
          setLogs(prev => [...prev.slice(-6), `✅ ${key}: ${Object.keys(parsed.elements).length}`])
        }
      } catch (err) {
        setLogs(prev => [...prev.slice(-6), `❌ ${key}`])
      }
    }
    
    setSpec({ version: '0.8', root: 'app', elements: allElements })
    setIsGenerating(false)
  }
  
  useEffect(() => { runSwarm() }, [])
  
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#0a0a0f] text-white">
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-purple-500/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">📐 Pretext + A2UI</h1>
            <button onClick={runSwarm} disabled={isGenerating} className="px-4 py-2 bg-purple-600 rounded-xl text-sm font-bold disabled:opacity-50">
              {isGenerating ? '⏳' : '🔄'}
            </button>
          </div>
        </header>
        
        <main className="pt-20">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
              <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">📐 Generating...</h2>
              <p className="text-gray-400 mb-8">{phase}</p>
              <div className="w-80 h-2 bg-white/10 rounded-full"><div className="h-full bg-purple-500 transition-all" style={{ width: `${progress}%` }} /></div>
            </div>
          ) : spec ? (
            <div>
              {renderA2UI(spec)}
              <PretextDemo />
            </div>
          ) : null}
        </main>
      </div>
    </ErrorBoundary>
  )
}
