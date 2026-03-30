// GENERATIVE UI - PRETEXT + JSON-RENDER + A2UI STACK
import React, { useState, useEffect, useRef, Component, ReactNode } from 'react'
import { prepare, layout } from '@chenglou/pretext'
import { defineCatalog } from '@json-render/core'
import { defineRegistry, Renderer } from '@json-render/react'
import { JSONUIProvider } from '@json-render/react'
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
}

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
  Header: ({ props }: { props: any }) => (
    <div className="w-full h-[70px] flex items-center px-8 bg-black/90 border-b border-white/10 backdrop-blur-xl">
      <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
        {props.content}
      </span>
    </div>
  ),
  
  Text: ({ props }: { props: any }) => (
    <p style={{ 
      fontSize: props.fontSize || 16, 
      color: props.isGradient ? 'transparent' : (props.color || '#fff'), 
      background: props.isGradient ? 'linear-gradient(to right, #a855f7, #ec4899)' : undefined, 
      WebkitBackgroundClip: props.isGradient ? 'text' : undefined, 
      WebkitTextFillColor: props.isGradient ? 'transparent' : undefined 
    }}>
      {props.content}
    </p>
  ),
  
  Heading: ({ props }: { props: any }) => {
    const sizes: Record<string, string> = { h1: 'text-6xl', h2: 'text-4xl', h3: 'text-2xl' }
    const style = props.isGradient 
      ? { background: 'linear-gradient(to right, #a855f7, #ec4899, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } 
      : { color: '#fff' }
    return <h2 className={`${sizes[props.level] || 'text-6xl'} font-black leading-tight`} style={style}>{props.content}</h2>
  },
  
  Button: ({ props, emit }: { props: any; emit: any }) => (
    <button 
      className="px-10 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
      onClick={() => emit?.('press')}
    >
      {props.content}
    </button>
  ),
  
  Card: ({ props, children }: { props: any; children?: ReactNode }) => (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
      <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        {props.title}
      </h3>
      {props.description && <p className="text-gray-400 leading-relaxed">{props.description}</p>}
      {children}
    </div>
  ),
  
  Container: ({ props, children }: { props: any; children?: ReactNode }) => (
    <div className="mx-auto px-8" style={{ maxWidth: props.maxWidth || 1200, backgroundColor: props.bgColor }}>
      {children}
    </div>
  ),
  
  Stack: ({ props, children }: { props: any; children?: ReactNode }) => (
    <div className={`flex ${props.direction === 'horizontal' ? 'flex-row' : 'flex-col'} gap-8`}>
      {children}
    </div>
  ),
  
  Grid: ({ props, children }: { props: any; children?: ReactNode }) => (
    <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${props.columns || 3}, minmax(0, 1fr))` }}>
      {children}
    </div>
  ),
  
  Metric: ({ props }: { props: any }) => (
    <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-sm">
      <div className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
        {props.value}
      </div>
      <div className="text-gray-400 text-sm uppercase tracking-wider">{props.label}</div>
    </div>
  ),
  
  Badge: ({ props }: { props: any }) => (
    <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
      {props.content}
    </span>
  ),
  
  Link: ({ props }: { props: any }) => (
    <a href={props.href} className="text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors">
      {props.content}
    </a>
  )
}

const { registry } = defineRegistry(catalog, { components })

// ============================================
// ENHANCED FALLBACK
// ============================================
function fallback(): UIComponent[] {
  return [
    { id: 'header-1', type: 'Header', props: { content: '🎨 Pretext AI UI Toolkit' } },
    { id: 'badge-1', type: 'Badge', props: { content: '🚀 Powered by AI' } },
    { id: 'hero-1', type: 'Heading', props: { content: 'Build Beautiful UIs with AI', level: 'h1', isGradient: true } },
    { id: 'text-1', type: 'Text', props: { content: 'Zero Reflow Text • Safe Components • A2UI Standard', color: '#9ca3af', fontSize: 20 } },
    { id: 'btn-1', type: 'Button', props: { content: '🚀 Generate Now' } },
    { id: 'section-1', type: 'Heading', props: { content: 'Features', level: 'h2' } },
    { id: 'grid-1', type: 'Grid', props: { columns: 3 } },
    { id: 'card-1', type: 'Card', props: { title: '⚡ Zero Reflow', description: 'Text measured at ~0.09ms without DOM reflow using Pretext' } },
    { id: 'card-2', type: 'Card', props: { title: '🎨 JSON Render', description: 'Safe component catalog with Zod validation for predictable rendering' } },
    { id: 'card-3', type: 'Card', props: { title: '🤖 A2UI Standard', description: 'Google\'s agent UI spec for declarative, secure UIs' } },
    { id: 'section-2', type: 'Heading', props: { content: 'Why Choose Us', level: 'h2' } },
    { id: 'stack-1', type: 'Stack', props: { direction: 'horizontal' } },
    { id: 'metric-1', type: 'Metric', props: { label: 'Speed', value: '0ms' } },
    { id: 'metric-2', type: 'Metric', props: { label: 'Components', value: '50+' } },
    { id: 'metric-3', type: 'Metric', props: { label: 'Security', value: '100%' } },
    { id: 'cta-1', type: 'Button', props: { content: '🚀 Get Started Free' } },
  ]
}

// ============================================
// ENHANCED AGENT SYSTEM (8 Specialized Agents)
// ============================================
const AGENTS = {
  // Phase 1: Structure
  architect: {
    name: 'Architect',
    emoji: '🏗️',
    phase: 'Foundation',
    system: `You are ARCHITECT - the foundation builder for AI-generated UIs.

TASK: Create HEADER, HERO section with strong value proposition.

OUTPUT FORMAT (A2UI spec):
{
  "root": "header-1",
  "elements": {
    "header-1": {"type": "Header", "props": {"content": "🎨 Brand Name"}},
    "badge-1": {"type": "Badge", "props": {"content": "🚀 Tagline"}},
    "hero-1": {"type": "Heading", "props": {"content": "Main Headline That Converts", "level": "h1", "isGradient": true}},
    "sub-1": {"type": "Text", "props": {"content": "Supporting text that explains value", "color": "#9ca3af", "fontSize": 20}},
    "cta-1": {"type": "Button", "props": {"content": "🚀 Call to Action"}}
  }
}

REQUIREMENTS:
• Header: Brand name with emoji
• Badge: Catchy tagline
• Hero: Large gradient heading (h1) that sells
• Subtitle: Clear value proposition
• CTA: Action-oriented button text
• Dark theme, purple/pink accents

OUTPUT JSON ONLY - no markdown, no explanation.`,

    input: 'Create HEADER + HERO for a landing page about Pretext AI UI Toolkit - a tool for building UIs with AI. Include strong copy that converts.'
  },

  // Phase 2: Visual Design
  designer: {
    name: 'Designer',
    emoji: '🎨',
    phase: 'Visual Design',
    system: `You are DESIGNER - the visual specialist for AI-generated UIs.

TASK: Create FEATURE CARDS that showcase benefits.

OUTPUT FORMAT:
{
  "root": "section-1",
  "elements": {
    "section-1": {"type": "Heading", "props": {"content": "Why Choose Us", "level": "h2"}},
    "grid-1": {"type": "Grid", "props": {"columns": 3}},
    "card-1": {"type": "Card", "props": {"title": "⚡ Feature One", "description": "Compelling description that explains the benefit in 15-20 words"}},
    "card-2": {"type": "Card", "props": {"title": "🎨 Feature Two", "description": "Compelling description that explains the benefit in 15-20 words"}},
    "card-3": {"type": "Card", "props": {"title": "🤖 Feature Three", "description": "Compelling description that explains the benefit in 15-20 words"}}
  }
}

REQUIREMENTS:
• Section heading explaining the section
• Grid with 3 columns
• 3 Feature cards with:
  - Emoji + benefit-focused title
  - Description explaining WHY it matters
  - 15-20 words each
• Cards should tell a story, not list features

OUTPUT JSON ONLY.`,

    input: 'Create a features section with 3 benefit-focused cards explaining why developers should use this toolkit.'
  },

  // Phase 3: Copywriting
  copywriter: {
    name: 'Copywriter',
    emoji: '✍️',
    phase: 'Copywriting',
    system: `You are COPYWRITER - the messaging specialist for AI-generated UIs.

TASK: Create compelling body copy and testimonials/social proof.

OUTPUT FORMAT:
{
  "root": "section-copy",
  "elements": {
    "section-copy": {"type": "Heading", "props": {"content": "How It Works", "level": "h2"}},
    "text-copy-1": {"type": "Text", "props": {"content": "Step 1 description", "fontSize": 18}},
    "text-copy-2": {"type": "Text", "props": {"content": "Step 2 description", "fontSize": 18}},
    "text-copy-3": {"type": "Text", "props": {"content": "Step 3 description", "fontSize": 18}}
  }
}

REQUIREMENTS:
• Section heading
• 3 clear steps with action-oriented text
• Each step should be concise (10-15 words)
• Use power words: "Create", "Build", "Generate", "Deploy"
• Focus on outcomes, not features

OUTPUT JSON ONLY.`,

    input: 'Create a "How It Works" section with 3 clear steps showing the user journey.'
  },

  // Phase 4: Social Proof
  social_proof: {
    name: 'Social Proof',
    emoji: '💬',
    phase: 'Social Proof',
    system: `You are SOCIAL PROOF - the trust builder for AI-generated UIs.

TASK: Create STATS section showing credibility and social proof.

OUTPUT FORMAT:
{
  "root": "stats-section",
  "elements": {
    "stats-heading": {"type": "Heading", "props": {"content": "Trusted by Developers", "level": "h2"}},
    "stats-stack": {"type": "Stack", "props": {"direction": "horizontal"}},
    "stat-1": {"type": "Metric", "props": {"label": "Developers", "value": "10K+"}},
    "stat-2": {"type": "Metric", "props": {"label": "Components", "value": "50+"}},
    "stat-3": {"type": "Metric", "props": {"label": "Uptime", "value": "99.9%"}},
    "stat-4": {"type": "Metric", "props": {"label": "Rating", "value": "4.9⭐"}}
  }
}

REQUIREMENTS:
• Trust-building heading
• 4 metrics in horizontal stack
• Metrics should be impressive and believable
• Use K, M, +, % for numbers
• Mix different types: users, features, performance

OUTPUT JSON ONLY.`,

    input: 'Create a stats/trust section with impressive metrics.'
  },

  // Phase 5: Conversion
  conversion: {
    name: 'Conversion',
    emoji: '🎯',
    phase: 'Conversion',
    system: `You are CONVERSION - the CTA specialist for AI-generated UIs.

TASK: Create final CTA section that drives action.

OUTPUT FORMAT:
{
  "root": "cta-section",
  "elements": {
    "cta-heading": {"type": "Heading", "props": {"content": "Ready to Start?", "level": "h2", "isGradient": true}},
    "cta-text": {"type": "Text", "props": {"content": "Final push text", "color": "#9ca3af"}},
    "cta-btn-1": {"type": "Button", "props": {"content": "🚀 Get Started Free"}},
    "cta-btn-2": {"type": "Button", "props": {"content": "📖 Learn More"}}
  }
}

REQUIREMENTS:
• Attention-grabbing heading
• Urgency/scarcity text if appropriate
• Primary CTA: Big, bold, action-oriented
• Secondary CTA: Softer option for consideration
• Button text should be benefit-driven

OUTPUT JSON ONLY.`,

    input: 'Create a powerful final CTA section with primary and secondary actions.'
  },

  // Phase 6: SEO & Meta
  seo: {
    name: 'SEO',
    emoji: '🔍',
    phase: 'SEO',
    system: `You are SEO SPECIALIST - optimizing for discoverability.

TASK: Review and enhance component text for SEO value.

INPUT: You will receive existing components. Add/modify:
- Keywords in headings
- Descriptive alt text concepts
- Structured data-friendly content

OUTPUT: Return enhanced components maintaining A2UI format.

Checklist:
□ Primary keyword in hero heading
□ Secondary keywords in feature cards
□ Natural keyword density in descriptions
□ Action-oriented CTA text with keywords
□ No keyword stuffing - keep it natural

OUTPUT JSON ONLY.`,

    input: 'Review and enhance: Pretext AI UI Toolkit - a tool for building UIs with AI using Pretext, JSON Render, and A2UI.'
  },

  // Phase 7: Quality Assurance
  qa: {
    name: 'QA',
    emoji: '🔍',
    phase: 'Quality',
    system: `You are QA - the quality assurance specialist.

TASK: Verify, validate, and FIX all generated components.

CHECKLIST:
□ Header: Valid content, not empty
□ Hero: Gradient heading exists, compelling copy
□ Subtitle: Clear value proposition
□ CTA: At least one button with action text
□ Features: At least 3 cards with title AND description
□ Stats: At least 3 metrics with label AND value
□ Body: Has explanatory content
□ Final CTA: Clear call to action

VALIDATION:
□ All required fields present
□ No empty strings where required
□ Component types are valid
□ JSON is valid and parseable

If issues found, FIX them. Output complete corrected JSON.

OUTPUT JSON ONLY - the FULL corrected spec.`,

    input: 'Review and fix the generated component list.'
  },

  // Phase 8: Performance Audit
  perf: {
    name: 'Performance',
    emoji: '⚡',
    phase: 'Performance',
    system: `You are PERFORMANCE AUDITOR - optimizing for speed.

TASK: Analyze and optimize component structure.

REVIEW:
□ Count total components (aim for 15-25)
□ Check for redundant elements
□ Verify proper nesting (parent-child relationships)
□ Ensure semantic structure

OPTIMIZE:
□ Remove duplicate cards/metrics
□ Consolidate similar elements
□ Ensure proper component hierarchy
□ Keep structure flat where possible

OUTPUT: Optimized component list maintaining A2UI format.

OUTPUT JSON ONLY.`,

    input: 'Optimize component structure for the generated landing page.'
  }
}

type AgentKey = keyof typeof AGENTS

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [spec, setSpec] = useState<any>(null)
  const [logs, setLogs] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(true)
  const [phase, setPhase] = useState('Initializing...')
  const [currentAgent, setCurrentAgent] = useState('')
  const [progress, setProgress] = useState(0)
  const [generationTime, setGenerationTime] = useState(0)
  const [streamText, setStreamText] = useState('')
  
  const initRef = useRef(false)
  const startTimeRef = useRef(0)
  
  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      startTimeRef.current = Date.now()
      runSwarm().catch(console.error)
    }
  }, [])
  
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
  
  async function runSwarm() {
    setIsGenerating(true)
    setLogs([])
    setProgress(0)
    setPhase('Initializing AI Swarm...')
    setStreamText('')
    
    const allComponents: UIComponent[] = []
    const agentKeys: AgentKey[] = ['architect', 'designer', 'copywriter', 'social_proof', 'conversion', 'qa', 'perf']
    const totalSteps = agentKeys.length
    
    for (let i = 0; i < agentKeys.length; i++) {
      const key = agentKeys[i]
      const agent = AGENTS[key]
      
      setCurrentAgent(agent.name)
      setPhase(`${agent.phase} (${i + 1}/${totalSteps})`)
      setProgress(Math.round((i / totalSteps) * 100))
      
      const time = new Date().toLocaleTimeString()
      setLogs(prev => [...prev.slice(-15), `${time} ${agent.emoji} ${agent.name}: Starting...`])
      
      let success = false
      for (let attempt = 0; attempt < 2 && !success; attempt++) {
        try {
          const result = await callMiniMax(agent.system, agent.input)
          const comps = parseAIResponse(result)
          
          if (comps.length > 0) {
            allComponents.push(...comps)
            setLogs(prev => [...prev.slice(-15), `${time} ✅ ${agent.name}: +${comps.length} components`])
            success = true
          }
        } catch (err) {
          const errMsg = err instanceof Error ? err.message : String(err)
          setLogs(prev => [...prev.slice(-15), `${time} ❌ ${agent.name}: ${errMsg}`])
        }
      }
    }
    
    // Final fallback
    if (allComponents.length < 5) {
      setLogs(prev => [...prev.slice(-15), `${new Date().toLocaleTimeString()} 🔧 Fallback: Using defaults...`])
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
    
    setSpec({ root, elements })
    setProgress(100)
    
    const elapsed = ((Date.now() - startTimeRef.current) / 1000).toFixed(1)
    setGenerationTime(parseFloat(elapsed))
    setLogs(prev => [...prev.slice(-15), `${new Date().toLocaleTimeString()} ✅ Complete in ${elapsed}s`])
    
    setPhase('Complete!')
    setCurrentAgent('')
    setIsGenerating(false)
    setStreamText('')
  }
  
  return (
    <ErrorBoundary>
      <JSONUIProvider registry={registry}>
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
                {!isGenerating && generationTime > 0 && (
                  <span className="text-sm text-green-400">⚡ {generationTime}s</span>
                )}
                <button 
                  onClick={runSwarm} 
                  disabled={isGenerating}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium text-sm disabled:opacity-50 hover:from-purple-500 hover:to-pink-500 transition-all"
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
                <div className="w-full max-w-2xl space-y-8">
                  {/* Status */}
                  <div className="text-center space-y-3">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      🐝 AI Swarm Building
                    </h2>
                    <p className="text-gray-400 text-lg">{phase}</p>
                    {currentAgent && (
                      <p className="text-purple-400 text-sm">Running {currentAgent}...</p>
                    )}
                  </div>
                  
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Agent Pipeline */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {(['architect', 'designer', 'copywriter', 'social_proof', 'conversion', 'qa', 'perf'] as AgentKey[]).map((key, i) => {
                      const agent = AGENTS[key]
                      const isComplete = progress > ((i / 7) * 100)
                      const isCurrent = currentAgent === agent.name
                      return (
                        <div 
                          key={key}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            isComplete ? 'bg-green-500/20 text-green-400' :
                            isCurrent ? 'bg-purple-500/20 text-purple-400 animate-pulse' :
                            'bg-white/5 text-gray-500'
                          }`}
                        >
                          {agent.emoji} {agent.name}
                        </div>
                      )
                    })}
                  </div>
                  
                  {/* Live Stream */}
                  <div className="bg-black/60 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs text-gray-400">Live Output</span>
                    </div>
                    <pre className="text-sm text-purple-300 whitespace-pre-wrap font-mono h-32 overflow-auto">
                      {streamText || 'Waiting for AI response...'}
                    </pre>
                  </div>
                  
                  {/* Logs */}
                  <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                    <pre className="text-xs text-gray-500 whitespace-pre-wrap font-mono">
                      {logs.join('\n') || 'Starting swarm...'}
                    </pre>
                  </div>
                </div>
              </div>
            ) : spec ? (
              <div className="p-8 max-w-6xl mx-auto space-y-16">
                <Renderer spec={spec} registry={registry} />
                <footer className="text-center text-gray-500 text-sm space-y-2">
                  <p>Built with 🐝 AI Swarm</p>
                  <p className="text-xs">Pretext + JSON Render + A2UI • Generated in {generationTime}s</p>
                </footer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[calc(100vh-80px)] text-gray-500">
                No components generated
              </div>
            )}
          </main>
        </div>
      </JSONUIProvider>
    </ErrorBoundary>
  )
}
