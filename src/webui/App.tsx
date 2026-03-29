// GENERATIVE UI - PRETEXT + JSON-RENDER + A2UI STACK
import React, { useState, useEffect, useRef } from 'react'
import { prepare, layout } from '@chenglou/pretext'
import { defineCatalog } from '@json-render/core'
import { defineRegistry, Renderer } from '@json-render/react'
import { schema } from '@json-render/react/schema'
import { z } from 'zod'

const MINIMAX_API_KEY = 'sk-cp-f6PbhZS6uNSD1L-mByhEw3RzISEgKDmaQ-kkQGUx79uBrnAZDVWVnDwmLwHC19V1jT07oW7CcU2Dn_3Zr8c90a5xYqk9J1BBNXd0C9bVRbyr-PLbfd31kUE'

type Provider = 'minimax'

interface UIComponent {
  id: string
  type: string
  props: Record<string, any>
  children?: string[]
}

// Pretext engine for text measurement
function measureText(text: string, fontSize: number, maxWidth: number) {
  const prepared = prepare(text, `${fontSize}px Inter`)
  const result = layout(prepared, maxWidth, fontSize + 4)
  return result
}

// JSON Render catalog
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

// Component renderers
const components = {
  Header: ({ props }: { props: any }) => (
    <div className="w-full h-[60px] flex items-center px-6 bg-black/90 border-b border-white/10">
      <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        {props.content}
      </span>
    </div>
  ),
  Text: ({ props }: { props: any }) => (
    <p className={`${props.isGradient ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-black' : ''}`} style={{ color: props.isGradient ? 'transparent' : props.color || '#fff', fontSize: props.fontSize || 16 }}>
      {props.content}
    </p>
  ),
  Heading: ({ props }: { props: any }) => {
    const sizes: Record<string, string> = { h1: 'text-4xl', h2: 'text-3xl', h3: 'text-2xl' }
    return <h2 className={`${sizes[props.level] || 'text-4xl'} font-black ${props.isGradient ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent' : ''}`}>{props.content}</h2>
  },
  Button: ({ props, emit }: { props: any; emit: any }) => (
    <button className="px-6 py-3 rounded-lg font-bold bg-purple-600 hover:bg-purple-700 transition" onClick={() => emit?.('press')}>
      {props.content}
    </button>
  ),
  Card: ({ props, children }: { props: any; children?: React.ReactNode }) => (
    <div className="p-6 rounded-xl bg-white/8 border border-white/10">
      <h3 className="text-lg font-bold mb-2">{props.title}</h3>
      {props.description && <p className="text-gray-400">{props.description}</p>}
      {children}
    </div>
  ),
  Container: ({ props, children }: { props: any; children?: React.ReactNode }) => (
    <div className="mx-auto px-4" style={{ maxWidth: props.maxWidth || 1200, backgroundColor: props.bgColor }}>
      {children}
    </div>
  ),
  Stack: ({ props, children }: { props: any; children?: React.ReactNode }) => (
    <div className={`flex ${props.direction === 'horizontal' ? 'flex-row' : 'flex-col'} gap-${props.gap || 4}`}>
      {children}
    </div>
  ),
  Grid: ({ props, children }: { props: any; children?: React.ReactNode }) => (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${props.columns || 3}, minmax(0, 1fr))` }}>
      {children}
    </div>
  ),
  Metric: ({ props }: { props: any }) => (
    <div className="text-center p-4">
      <div className="text-3xl font-black text-white">{props.value}</div>
      <div className="text-gray-400 text-sm">{props.label}</div>
    </div>
  ),
  Badge: ({ props }: { props: any }) => (
    <span className="px-2 py-1 rounded text-xs font-bold bg-purple-600 text-white">
      {props.content}
    </span>
  ),
  Link: ({ props }: { props: any }) => (
    <a href={props.href} className="text-purple-400 hover:text-purple-300 underline">
      {props.content}
    </a>
  )
}

const { registry } = defineRegistry(catalog, { components })

// A2UI spec builder
function buildSpec(comps: UIComponent[]) {
  const elements: Record<string, any> = {}
  let root = ''
  comps.forEach((c) => {
    if (!root) root = c.id
    elements[c.id] = { type: c.type.charAt(0).toUpperCase() + c.type.slice(1), props: c.props || {}, children: c.children || [] }
  })
  return { root, elements }
}

// Fallback components
function fallback(): UIComponent[] {
  return [
    { id: 'header-1', type: 'Header', props: { content: '🎨 Pretext AI UI' } },
    { id: 'hero-1', type: 'Heading', props: { content: 'Build UI with AI', level: 'h1', isGradient: true } },
    { id: 'text-1', type: 'Text', props: { content: 'Zero Reflow • JSON Render • A2UI', color: '#aaa' } },
    { id: 'btn-1', type: 'Button', props: { content: '🚀 Get Started' } },
    { id: 'card-1', type: 'Card', props: { title: '⚡ Zero Reflow', description: 'Text measured instantly' } },
    { id: 'card-2', type: 'Card', props: { title: '🎨 JSON Render', description: 'Safe components' } },
    { id: 'card-3', type: 'Card', props: { title: '🤖 A2UI', description: 'Agent standard' } },
    { id: 'metric-1', type: 'Metric', props: { label: 'Speed', value: '0ms' } },
    { id: 'metric-2', type: 'Metric', props: { label: 'Components', value: '50+' } },
    { id: 'metric-3', type: 'Metric', props: { label: 'Free', value: '100%' } },
  ]
}

// Agent prompts
const PROMPTS = {
  architect: `You are the ARCHITECT agent. Create HEADER and HERO.

MUST OUTPUT JSON like this:
{"root":"header-1","elements":{"header-1":{"type":"Header","props":{"content":"🎨 Pretext AI UI"}},"hero-1":{"type":"Heading","props":{"content":"Build UI with AI","level":"h1","isGradient":true}},"text-1":{"type":"Text","props":{"content":"Zero Reflow • JSON Render • A2UI"}},"btn-1":{"type":"Button","props":{"content":"🚀 Get Started"}}}}

Checklist:
✓ Header with logo text
✓ Heading with gradient
✓ CTA button
✓ Dark theme #0a0a0f`,

  designer: `You are the DESIGNER agent. Create FEATURE CARDS.

MUST OUTPUT JSON:
{"root":"grid-1","elements":{"grid-1":{"type":"Grid","props":{"columns":3}},"card-1":{"type":"Card","props":{"title":"⚡ Zero Reflow","description":"Text measured instantly"}},"card-2":{"type":"Card","props":{"title":"🎨 JSON Render","description":"Safe components"}},"card-3":{"type":"Card","props":{"title":"🤖 A2UI","description":"Agent standard"}}}}

Checklist:
✓ Exactly 3 Cards
✓ Each has title AND description
✓ Grid with columns: 3`,

  frontend: `You are the FRONTEND agent. Create CTA, STATS, FOOTER.

MUST OUTPUT JSON:
{"root":"cta-1","elements":{"cta-1":{"type":"Button","props":{"content":"🚀 Get Started"}},"metric-1":{"type":"Metric","props":{"label":"Speed","value":"0ms"}},"metric-2":{"type":"Metric","props":{"label":"Components","value":"50+"}},"metric-3":{"type":"Metric","props":{"label":"Free","value":"100%"}},"footer-1":{"type":"Text","props":{"content":"© 2026 Pretext AI UI"}}}

Checklist:
✓ CTA button exists
✓ 3 Metrics with label AND value`,

  qa: `You are the QA AGENT. Verify and FIX components.

TASK: Check this list and fix issues:
1. Missing Header → add Header {content:"🎨 Pretext AI UI"}
2. No gradient heading → add Heading {isGradient:true}
3. < 3 Cards → add Cards
4. No CTA → add Button
5. Empty fields → fill with valid content

OUTPUT the FIXED JSON.`
}

export default function App() {
  const [spec, setSpec] = useState<any>(null)
  const [logs, setLogs] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(true)
  const [phase, setPhase] = useState('Starting...')
  
  const initRef = useRef(false)
  
  useEffect(() => { if (!initRef.current) { initRef.current = true; runSwarm() } }, [])
  
  async function callAI(provider: Provider, model: string, system: string, user: string) {
    const res = await fetch('https://api.minimax.io/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MINIMAX_API_KEY}` },
      body: JSON.stringify({ model, messages: [{ role: 'system', content: system }, { role: 'user', content: user }], stream: true, max_tokens: 2048 })
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
            comps.push({ id, type: elem.type.toLowerCase(), props: elem.props || {}, children: elem.children || [] })
          }
        })
        return comps
      }
    } catch {}
    return []
  }
  
  async function runSwarm() {
    setIsGenerating(true)
    setLogs([])
    setPhase('Running...')
    
    const allComponents: UIComponent[] = []
    
    const agents = [
      { name: 'Architect', prompt: PROMPTS.architect },
      { name: 'Designer', prompt: PROMPTS.designer },
      { name: 'Frontend', prompt: PROMPTS.frontend },
    ]
    
    for (const agent of agents) {
      setPhase(`${agent.name}...`)
      const time = new Date().toLocaleTimeString()
      setLogs(prev => [...prev.slice(-15), `${time} 🏗️ ${agent.name}: Building...`])
      
      let success = false
      for (let try_ = 0; try_ < 3 && !success; try_++) {
        try {
          const result = await callAI('minimax', 'MiniMax-M2.7', agent.prompt, 'Generate valid JSON.')
          const comps = parseAIResponse(result)
          
          if (comps.length > 0) {
            allComponents.push(...comps)
            setLogs(prev => [...prev.slice(-15), `${time} ✅ ${agent.name}: ${comps.length} components`])
            success = true
          }
        } catch (err) {
          setLogs(prev => [...prev.slice(-15), `${time} ❌ ${agent.name}: ${err}`])
        }
      }
    }
    
    // QA Agent
    setPhase('QA Check...')
    setLogs(prev => [...prev.slice(-15), `${new Date().toLocaleTimeString()} 🔍 QA: Verifying...`])
    
    try {
      const qaResult = await callAI('minimax', 'MiniMax-M2.7', PROMPTS.qa, `Fix: ${JSON.stringify(allComponents.slice(0, 8))}`)
      const qaComps = parseAIResponse(qaResult)
      
      if (qaComps.length >= allComponents.length) {
        allComponents.length = 0
        allComponents.push(...qaComps)
        setLogs(prev => [...prev.slice(-15), `${new Date().toLocaleTimeString()} ✅ QA: Fixed to ${qaComps.length} components`])
      }
    } catch (err) {
      setLogs(prev => [...prev.slice(-15), `${new Date().toLocaleTimeString()} ⚠️ QA: ${err}`])
    }
    
    // Fallback if needed
    if (allComponents.length < 5) {
      setLogs(prev => [...prev.slice(-15), `${new Date().toLocaleTimeString()} 🔧 Fallback: Adding defaults...`])
      allComponents.push(...fallback())
    }
    
    setSpec(buildSpec(allComponents))
    setLogs(prev => [...prev.slice(-15), `${new Date().toLocaleTimeString()} ✅ Done: ${allComponents.length} components`])
    setPhase('Complete!')
    setIsGenerating(false)
  }
  
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🎨 Pretext + JSON Render + A2UI
          </h1>
          <div className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-purple-500 animate-pulse' : 'bg-green-500'}`} />
            <button onClick={runSwarm} disabled={isGenerating} className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-medium disabled:opacity-50">
              🔄 Regenerate
            </button>
          </div>
        </div>
      </header>
      
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
          <div className="p-8 max-w-6xl mx-auto space-y-8">
            <Renderer spec={spec} registry={registry} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-[calc(100vh-64px)] text-gray-500">
            No components
          </div>
        )}
      </main>
    </div>
  )
}
