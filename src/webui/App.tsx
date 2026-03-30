// ============================================================
// PRETEXT AI UI - DEEP PRETEXT INTEGRATION
// Zero-Reflow Text • Canvas Rendering • Streaming • Flow-Around
// ============================================================
import React, { useState, useEffect, useRef, Component, ReactNode } from 'react'
import { prepare, layout, prepareWithSegments, layoutWithLines, layoutNextLine, walkLineRanges, clearCache } from '@chenglou/pretext'
import { defineCatalog } from '@json-render/core'
import { defineRegistry, Renderer } from '@json-render/react'
import { JSONUIProvider } from '@json-render/react'
import { schema } from '@json-render/react/schema'
import { z } from 'zod'

// ============================================
// PRETEXT ENGINE - Full Feature Set
// ============================================
class PretextCore {
  private cache = new Map<string, any>()
  
  // Measure height without DOM (~0.09ms cached)
  measure(text: string, fontSize: number, maxWidth: number, lineHeight: number = 24) {
    const key = `measure:${text}:${fontSize}:${maxWidth}:${lineHeight}`
    if (!this.cache.has(key)) {
      const prepared = prepare(text, `${fontSize}px Inter, sans-serif`)
      this.cache.set(key, layout(prepared, maxWidth, lineHeight))
    }
    return this.cache.get(key)
  }
  
  // Get exact line positions for Canvas
  getLines(text: string, fontSize: number, maxWidth: number, lineHeight: number = 26) {
    const key = `lines:${text}:${fontSize}:${maxWidth}:${lineHeight}`
    if (!this.cache.has(key)) {
      const prepared = prepareWithSegments(text, `${fontSize}px Inter, sans-serif`)
      this.cache.set(key, layoutWithLines(prepared, maxWidth, lineHeight))
    }
    return this.cache.get(key)
  }
  
  // Flow text around obstacle
  flowAround(text: string, fontSize: number, obstacle: { x: number; y: number; width: number; height: number }, columnWidth: number, lineHeight: number = 26) {
    const prepared = prepareWithSegments(text, `${fontSize}px Inter, sans-serif`)
    const lines: Array<{ text: string; x: number; y: number; width: number }> = []
    let cursor = { segmentIndex: 0, graphemeIndex: 0 }
    let y = 0
    
    while (true) {
      const inObstacle = y >= obstacle.y && y < obstacle.y + obstacle.height
      const width = inObstacle ? columnWidth - obstacle.width : columnWidth
      const line = layoutNextLine(prepared, cursor, width)
      if (!line) break
      lines.push({ text: line.text, x: inObstacle ? obstacle.width + 10 : 0, y, width: line.width })
      cursor = line.end
      y += lineHeight
    }
    return lines
  }
  
  // Shrinkwrap - find tightest width
  shrinkwrap(text: string, fontSize: number) {
    const prepared = prepareWithSegments(text, `${fontSize}px Inter, sans-serif`)
    let maxWidth = 0
    walkLineRanges(prepared, 10000, (line) => {
      if (line.width > maxWidth) maxWidth = line.width
    })
    return maxWidth
  }
  
  clearCache() { this.cache.clear() }
}

// Pretext canvas renderer for streaming text
class PretextCanvasRenderer {
  private canvas: HTMLCanvasElement | null = null
  private ctx: CanvasRenderingContext2D | null = null
  private prepared: any = null
  private lines: any[] = []
  private lineHeight = 26
  private fontSize = 18
  private maxWidth = 400
  
  init(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }
  
  prepare(text: string, fontSize: number = 18, maxWidth: number = 400) {
    this.fontSize = fontSize
    this.maxWidth = maxWidth
    this.lineHeight = fontSize * 1.4
    const font = `${fontSize}px Inter, sans-serif`
    this.prepared = prepareWithSegments(text, font)
    const result = layoutWithLines(this.prepared, maxWidth, this.lineHeight)
    this.lines = result.lines || []
    if (this.canvas) {
      this.canvas.width = maxWidth
      this.canvas.height = this.lines.length * this.lineHeight + 20
    }
    return result
  }
  
  render(gradient: boolean = true) {
    if (!this.ctx || !this.lines.length) return
    const ctx = this.ctx
    
    ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height)
    
    if (gradient) {
      const grad = ctx.createLinearGradient(0, 0, this.maxWidth, 0)
      grad.addColorStop(0, '#a855f7')
      grad.addColorStop(0.5, '#ec4899')
      grad.addColorStop(1, '#06b6d4')
      ctx.fillStyle = grad
    } else {
      ctx.fillStyle = '#ffffff'
    }
    
    ctx.font = `${this.fontSize}px Inter, sans-serif`
    ctx.textBaseline = 'top'
    
    this.lines.forEach((line, i) => {
      ctx.fillText(line.text, 0, i * this.lineHeight)
    })
  }
  
  getLines() { return this.lines }
  getHeight() { return this.lines.length * this.lineHeight }
}

const pretextCore = new PretextCore()
const pretextRenderer = new PretextCanvasRenderer()

// ============================================
// ERROR BOUNDARY
// ============================================
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: string }> {
  constructor(props: { children: ReactNode }) { super(props); this.state = { hasError: false, error: '' } }
  static getDerivedStateFromError(error: Error) { return { hasError: true, error: error.message } }
  render() {
    if (this.state.hasError) return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-red-400 mb-4">⚠️ Error</h1><p className="text-gray-400">{this.state.error}</p></div></div>
    )
    return this.props.children
  }
}

const MINIMAX_API_KEY = 'sk-cp-f6PbhZS6uNSD1L-mByhEw3RzISEgKDmaQ-kkQGUx79uBrnAZDVWVnDwmLwHC19V1jT07oW7CcU2Dn_3Zr8c90a5xYqk9J1BBNXd0C9bVRbyr-PLbfd31kUE'
interface UIComponent { id: string; type: string; props: Record<string, any>; children?: string[] }

// ============================================
// JSON RENDER CATALOG (with Pretext integration)
// ============================================
const catalog = defineCatalog(schema, {
  components: {
    Header: { props: z.object({ content: z.string() }), description: 'Header' },
    Text: { props: z.object({ content: z.string() }), description: 'Text with Pretext measurement' },
    Heading: { props: z.object({ content: z.string(), level: z.string() }), description: 'Heading' },
    Button: { props: z.object({ content: z.string() }), description: 'Button' },
    Card: { props: z.object({ title: z.string(), description: z.string().optional() }), description: 'Card' },
    Stack: { props: z.object({ direction: z.string(), gap: z.number().optional() }), description: 'Stack' },
    Grid: { props: z.object({ columns: z.number() }), description: 'Grid' },
    Metric: { props: z.object({ label: z.string(), value: z.string() }), description: 'Metric' },
    Badge: { props: z.object({ content: z.string() }), description: 'Badge' },
    CanvasText: { props: z.object({ content: z.string(), fontSize: z.number().optional(), maxWidth: z.number().optional(), gradient: z.boolean().optional() }), description: 'Pretext Canvas rendering' },
    FlowText: { props: z.object({ content: z.string(), obstacleX: z.number(), obstacleY: z.number(), obstacleWidth: z.number(), obstacleHeight: z.number() }), description: 'Text flowing around obstacle' },
    StreamingText: { props: z.object({ content: z.string() }), description: 'Streaming text animation' },
  }
})

// ============================================
// PRETEXT COMPONENTS
// ============================================
const PretextCanvasComponent = ({ content, fontSize = 18, maxWidth = 600, gradient = true }: { content: string; fontSize?: number; maxWidth?: number; gradient?: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [lines, setLines] = useState<any[]>([])
  const [height, setHeight] = useState(0)
  
  useEffect(() => {
    if (!canvasRef.current) return
    const prepared = prepareWithSegments(content, `${fontSize}px Inter, sans-serif`)
    const result = layoutWithLines(prepared, maxWidth, fontSize * 1.4)
    const lineData = result.lines || []
    setLines(lineData)
    setHeight(lineData.length * fontSize * 1.4 + 20)
    
    // Draw on canvas
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return
    canvasRef.current.width = maxWidth
    canvasRef.current.height = height
    
    if (gradient) {
      const grad = ctx.createLinearGradient(0, 0, maxWidth, 0)
      grad.addColorStop(0, '#a855f7')
      grad.addColorStop(0.5, '#ec4899')
      grad.addColorStop(1, '#06b6d4')
      ctx.fillStyle = grad
    } else {
      ctx.fillStyle = '#ffffff'
    }
    
    ctx.font = `${fontSize}px Inter, sans-serif`
    ctx.textBaseline = 'top'
    lineData.forEach((line: any, i: number) => {
      ctx.fillText(line.text, 0, i * fontSize * 1.4)
    })
  }, [content, fontSize, maxWidth, gradient])
  
  return <canvas ref={canvasRef} className="rounded" />
}

// Streaming text with Pretext
const StreamingText = ({ content }: { content: string }) => {
  const [displayed, setDisplayed] = useState('')
  const [lines, setLines] = useState<any[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i <= content.length) {
        setDisplayed(content.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [content])
  
  useEffect(() => {
    if (!displayed || !canvasRef.current) return
    const prepared = prepareWithSegments(displayed, '18px Inter, sans-serif')
    const result = layoutWithLines(prepared, 600, 26)
    setLines(result.lines || [])
    
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return
    canvasRef.current.width = 600
    canvasRef.current.height = (result.lines || []).length * 26 + 20
    
    const grad = ctx.createLinearGradient(0, 0, 600, 0)
    grad.addColorStop(0, '#a855f7')
    grad.addColorStop(1, '#ec4899')
    ctx.fillStyle = grad
    ctx.font = '18px Inter, sans-serif'
    ;(result.lines || []).forEach((line: any, i: number) => {
      ctx.fillText(line.text, 0, i * 26)
    })
  }, [displayed])
  
  return <canvas ref={canvasRef} />
}

// Flow text around image
const FlowText = ({ content, obstacleX, obstacleY, obstacleWidth, obstacleHeight }: { content: string; obstacleX: number; obstacleY: number; obstacleWidth: number; obstacleHeight: number }) => {
  const [lines, setLines] = useState<any[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const prepared = prepareWithSegments(content, '16px Inter, sans-serif')
    const lineHeight = 24
    const columnWidth = 600
    const obstacle = { x: obstacleX, y: obstacleY, width: obstacleWidth, height: obstacleHeight }
    const flowLines: any[] = []
    let cursor = { segmentIndex: 0, graphemeIndex: 0 }
    let y = 0
    
    while (true) {
      const inObstacle = y >= obstacle.y && y < obstacle.y + obstacle.height
      const width = inObstacle ? columnWidth - obstacle.width : columnWidth
      const line = layoutNextLine(prepared, cursor, width)
      if (!line) break
      flowLines.push({ text: line.text, x: inObstacle ? obstacle.width + 10 : 0, y, width: line.width })
      cursor = line.end
      y += lineHeight
    }
    
    setLines(flowLines)
    
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx || !flowLines.length) return
    canvasRef.current!.width = columnWidth
    canvasRef.current!.height = y + 20
    
    // Draw obstacle placeholder
    ctx.fillStyle = '#374151'
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
    ctx.fillStyle = '#9ca3af'
    ctx.font = '12px Inter'
    ctx.fillText('Image', obstacle.x + 10, obstacle.y + obstacle.height / 2)
    
    // Draw text
    ctx.fillStyle = '#ffffff'
    ctx.font = '16px Inter'
    flowLines.forEach(l => ctx.fillText(l.text, l.x, l.y))
  }, [content, obstacleX, obstacleY, obstacleWidth, obstacleHeight])
  
  return <canvas ref={canvasRef} className="rounded-lg border border-white/10" />
}

// ============================================
// STANDARD COMPONENTS
// ============================================
const components = {
  Header: ({ props }: { props: any }) => <div className="w-full h-[70px] flex items-center px-8 bg-black/90 border-b border-white/10"><span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{props.content}</span></div>,
  Text: ({ props }: { props: any }) => {
    const measured = pretextCore.measure(props.content, props.fontSize || 16, props.maxWidth || 600)
    return <p style={{ fontSize: props.fontSize || 16, color: props.color || '#fff' }} className={props.className}>{props.content}</p>
  },
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
  CanvasText: PretextCanvasComponent,
  FlowText,
  StreamingText,
}
const { registry } = defineRegistry(catalog, { components })

// ============================================
// PRETEXT-ONLY AGENTS (Each uses Pretext)
// ============================================
const PRETEXT_AGENTS = {
  architect: {
    name: 'Architect', emoji: '🏗️',
    system: `You are PRETEXT ARCHITECT. Use Pretext APIs: prepare(), layout(), layoutWithLines().

Create HEADER + HERO with Pretext Canvas rendering:
{"root":"header","elements":{"header":{"type":"Header","props":{"content":"🎨 Pretext AI UI"}},"hero":{"type":"Heading","props":{"content":"Zero-Reflow Text","level":"h1","isGradient":true}},"canvas-hero":{"type":"CanvasText","props":{"content":"AI measures every pixel","fontSize":24,"maxWidth":600,"gradient":true}}}}`,
    input: 'Create header with Pretext branding.'
  },
  streamer: {
    name: 'Streamer', emoji: '📺',
    system: `You are STREAMING SPECIALIST using Pretext.

Create FEATURES with streaming text:
{"root":"features","elements":{"feat-heading":{"type":"Heading","props":{"content":"Pretext Features","level":"h2"}},"feat-stream":{"type":"StreamingText","props":{"content":"Watch text appear character by character as Pretext measures each position..."}},"feat-grid":{"type":"Grid","props":{"columns":3}},"feat1":{"type":"Card","props":{"title":"⚡ ~0.09ms","description":"Cached measurement"}}}}`,
    input: 'Create streaming text feature.'
  },
  flow: {
    name: 'Flow', emoji: '🌊',
    system: `You are TEXT FLOW SPECIALIST using Pretext layoutNextLine().

Create HOW IT WORKS showing text flowing around image:
{"root":"how","elements":{"how-heading":{"type":"Heading","props":{"content":"Text Flows Around Obstacles","level":"h2"}},"flow-text":{"type":"FlowText","props":{"content":"Pretext can measure text position and flow it around floating elements like images, ads, or quotes. This enables precise text placement without DOM measurement.","obstacleX":10,"obstacleY":60,"obstacleWidth":120,"obstacleHeight":120}}}}`,
    input: 'Create flow text demo.'
  },
  metrics: {
    name: 'Metrics', emoji: '📊',
    system: `You are METRICS SPECIALIST.

Create STATS with Pretext performance data:
{"root":"stats","elements":{"stats-heading":{"type":"Heading","props":{"content":"Pretext Performance","level":"h2"}},"stats-grid":{"type":"Grid","props":{"columns":4}},"stat1":{"type":"Metric","props":{"label":"Measure","value":"0.09ms"}},"stat2":{"type":"Metric","props":{"label":"DOM Reflow","value":"0"}},"stat3":{"type":"Metric","props":{"label":"Cache","value":"100%"}},"stat4":{"type":"Metric","props":{"label":"Languages","value":"∞"}}}}`,
    input: 'Create metrics showing Pretext speed.'
  },
  cards: {
    name: 'Cards', emoji: '🎴',
    system: `You are DESIGNER using Pretext for layout.

Create FEATURE CARDS:
{"root":"cards","elements":{"cards-heading":{"type":"Heading","props":{"content":"Why Pretext?","level":"h2"}},"cards-grid":{"type":"Grid","props":{"columns":3}},"card1":{"type":"Card","props":{"title":"🚫 No Reflow","description":"Zero DOM access means zero layout reflow"}}},"card2":{"type":"Card","props":{"title":"📐 Exact Positions","description":"Know every character's x,y before rendering"}}},"card3":{"type":"Card","props":{"title":"🎮 Canvas/ SVG","description":"Render anywhere - DOM, Canvas, or SVG"}}}}}`,
    input: 'Create 3 feature cards.'
  },
  cta: {
    name: 'CTA', emoji: '🎯',
    system: `You are CTA SPECIALIST.

Create FINAL CTA:
{"root":"cta","elements":{"cta-heading":{"type":"Heading","props":{"content":"Ready to Build?","level":"h2","isGradient":true}},"cta-btn":{"type":"Button","props":{"content":"🚀 Generate with Pretext"}}}}`,
    input: 'Create call to action.'
  },
}

type AgentKey = keyof typeof PRETEXT_AGENTS

// ============================================
// FALLBACK
// ============================================
function fallback(): UIComponent[] {
  return [
    { id: 'header', type: 'Header', props: { content: '🎨 Pretext AI UI' } },
    { id: 'hero', type: 'Heading', props: { content: 'Zero-Reflow Text Measurement', level: 'h1', isGradient: true } },
    { id: 'canvas', type: 'CanvasText', props: { content: '~0.09ms per measurement', fontSize: 20, maxWidth: 500 } },
    { id: 'feat-heading', type: 'Heading', props: { content: 'Features', level: 'h2' } },
    { id: 'feat-grid', type: 'Grid', props: { columns: 3 } },
    { id: 'feat1', type: 'Card', props: { title: '⚡ Speed', description: '0.09ms cached' } },
    { id: 'feat2', type: 'Card', props: { title: '🚫 No Reflow', description: 'Zero DOM access' } },
    { id: 'feat3', type: 'Card', props: { title: '📐 Exact', description: 'Pixel positions' } },
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
  const [pretextStats, setPretextStats] = useState<any>(null)
  
  const initRef = useRef(false)
  const startTimeRef = useRef(0)
  
  useEffect(() => { if (!initRef.current) { initRef.current = true; startTimeRef.current = Date.now(); runSwarm().catch(console.error) } }, [])
  
  async function callMiniMax(system: string) {
    const res = await fetch('https://api.minimax.io/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MINIMAX_API_KEY}` },
      body: JSON.stringify({ model: 'MiniMax-M2.7', messages: [{ role: 'system', content: system }, { role: 'user', content: 'Generate JSON.' }], max_tokens: 1536 })
    })
    if (!res.ok) throw new Error(`${res.status}`)
    return res.json()
  }
  
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
  
  // Pretext benchmark
  function runPretextBenchmark() {
    const testText = 'Pretext measures text without DOM reflow at ~0.09ms per call.'
    const iterations = 100
    
    const start = performance.now()
    for (let i = 0; i < iterations; i++) {
      pretextCore.measure(testText, 16, 600, 24)
    }
    const end = performance.now()
    const totalMs = end - start
    const perCall = totalMs / iterations
    
    setPretextStats({ iterations, totalMs: totalMs.toFixed(2), perCall: perCall.toFixed(3) })
  }
  
  useEffect(() => { runPretextBenchmark() }, [])
  
  async function runSwarm() {
    setIsGenerating(true); setLogs([])
    const allComponents: UIComponent[] = []
    const agentKeys = Object.keys(PRETEXT_AGENTS) as AgentKey[]
    const total = agentKeys.length
    
    // Parallel execution
    const promises = agentKeys.map(async (key, i) => {
      const agent = PRETEXT_AGENTS[key]
      setPhase(`${agent.name}...`)
      setProgress(Math.round(((i + 1) / total) * 100))
      
      try {
        const data = await callMiniMax(agent.system)
        const comps = parseResponse(data)
        if (comps.length > 0) {
          setLogs(prev => [...prev.slice(-10), `✅ ${agent.name}: +${comps.length}`])
          return comps
        }
      } catch (err) {
        setLogs(prev => [...prev.slice(-10), `❌ ${agent.name}: ${err}`])
      }
      return []
    })
    
    const results = await Promise.all(promises)
    results.forEach(comps => allComponents.push(...comps))
    
    if (allComponents.length < 3) {
      allComponents.push(...fallback())
    }
    
    const elements: Record<string, any> = {}; let root = ''
    allComponents.forEach(c => { if (!root) root = c.id; elements[c.id] = { type: c.type.charAt(0).toUpperCase() + c.type.slice(1), props: c.props } })
    
    setSpec({ root, elements })
    setGenerationTime(((Date.now() - startTimeRef.current) / 1000).toFixed(1))
    setPhase('Complete!'); setIsGenerating(false)
    setLogs(prev => [...prev.slice(-10), `✅ Done in ${((Date.now() - startTimeRef.current) / 1000).toFixed(1)}s`])
  }
  
  return (
    <ErrorBoundary>
      <JSONUIProvider registry={registry}>
        <div className="min-h-screen bg-[#0a0a0f] text-white">
          <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📐</span>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Pretext AI UI</h1>
              </div>
              <div className="flex items-center gap-4">
                {pretextStats && (
                  <span className="text-xs text-purple-400">⚡ {pretextStats.perCall}ms/call</span>
                )}
                {!isGenerating && <span className="text-sm text-green-400">⚡ {generationTime}s</span>}
                <button onClick={runSwarm} disabled={isGenerating} className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-sm disabled:opacity-50">
                  {isGenerating ? '⏳ Building...' : '🔄 Regenerate'}
                </button>
              </div>
            </div>
          </header>
          
          <main className="pt-20">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6">
                <div className="w-full max-w-2xl space-y-6">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">📐 Pretext Swarm</h2>
                    <p className="text-gray-400 mt-2">{phase}</p>
                  </div>
                  
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  
                  {/* Pretext Stats */}
                  {pretextStats && (
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-4 rounded-xl bg-white/5">
                        <div className="text-2xl font-bold text-purple-400">{pretextStats.perCall}ms</div>
                        <div className="text-xs text-gray-500">Per Call</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5">
                        <div className="text-2xl font-bold text-pink-400">{pretextStats.iterations}</div>
                        <div className="text-xs text-gray-500">Iterations</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5">
                        <div className="text-2xl font-bold text-cyan-400">{pretextStats.totalMs}ms</div>
                        <div className="text-xs text-gray-500">Total</div>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-black/40 rounded-xl p-4">
                    <pre className="text-xs text-gray-500 whitespace-pre-wrap">{logs.join('\n') || 'Starting...'}</pre>
                  </div>
                </div>
              </div>
            ) : spec ? (
              <div className="p-8 max-w-6xl mx-auto space-y-12">
                <Renderer spec={spec} registry={registry} />
                <footer className="text-center text-gray-500 text-sm border-t border-white/10 pt-8">
                  <p>📐 Built with Pretext • Zero-Reflow Text Measurement</p>
                  <p className="text-xs">~0.09ms per measurement • No DOM reflow</p>
                </footer>
              </div>
            ) : <div className="flex items-center justify-center h-[calc(100vh-80px)]">Awaiting...</div>}
          </main>
        </div>
      </JSONUIProvider>
    </ErrorBoundary>
  )
}
