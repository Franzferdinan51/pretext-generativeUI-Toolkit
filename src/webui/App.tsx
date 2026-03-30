// GENERATIVE UI - PRETEXT + JSON-RENDER + A2UI + SWARM CODING
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
    <p style={{ fontSize: props.fontSize || 16, color: props.isGradient ? 'transparent' : (props.color || '#fff'), background: props.isGradient ? 'linear-gradient(to right, #a855f7, #ec4899)' : undefined, WebkitBackgroundClip: props.isGradient ? 'text' : undefined, WebkitTextFillColor: props.isGradient ? 'transparent' : undefined }}>
      {props.content}
    </p>
  ),
  
  Heading: ({ props }: { props: any }) => {
    const sizes: Record<string, string> = { h1: 'text-6xl', h2: 'text-4xl', h3: 'text-2xl' }
    const style = props.isGradient ? { background: 'linear-gradient(to right, #a855f7, #ec4899, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : { color: '#fff' }
    return <h2 className={`${sizes[props.level] || 'text-6xl'} font-black leading-tight`} style={style}>{props.content}</h2>
  },
  
  Button: ({ props, emit }: { props: any; emit: any }) => (
    <button className="px-10 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105" onClick={() => emit?.('press')}>
      {props.content}
    </button>
  ),
  
  Card: ({ props, children }: { props: any; children?: ReactNode }) => (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
      <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{props.title}</h3>
      {props.description && <p className="text-gray-400 leading-relaxed">{props.description}</p>}
      {children}
    </div>
  ),
  
  Container: ({ props, children }: { props: any; children?: ReactNode }) => (
    <div className="mx-auto px-8" style={{ maxWidth: props.maxWidth || 1200, backgroundColor: props.bgColor }}>{children}</div>
  ),
  
  Stack: ({ props, children }: { props: any; children?: ReactNode }) => (
    <div className={`flex ${props.direction === 'horizontal' ? 'flex-row' : 'flex-col'} gap-8`}>{children}</div>
  ),
  
  Grid: ({ props, children }: { props: any; children?: ReactNode }) => (
    <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${props.columns || 3}, minmax(0, 1fr))` }}>{children}</div>
  ),
  
  Metric: ({ props }: { props: any }) => (
    <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-sm">
      <div className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">{props.value}</div>
      <div className="text-gray-400 text-sm uppercase tracking-wider">{props.label}</div>
    </div>
  ),
  
  Badge: ({ props }: { props: any }) => (
    <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">{props.content}</span>
  ),
  
  Link: ({ props }: { props: any }) => (
    <a href={props.href} className="text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors">{props.content}</a>
  )
}

const { registry } = defineRegistry(catalog, { components })

// ============================================
// SWARM CODING WORKFLOW (From AI Council)
// ============================================
const SWARM_PHASES = {
  PLAN: {
    name: 'Plan',
    emoji: '📋',
    duration: '15-20 min',
    roles: ['Architect', 'Product Manager', 'Security Expert'],
    activities: [
      'Requirements Analysis',
      'Architecture Design', 
      'Technology Selection',
      'Risk Assessment'
    ],
    exitCriteria: [
      '✅ Architecture approved',
      '✅ Tech stack agreed',
      '✅ Risks documented'
    ]
  },
  IMPLEMENT: {
    name: 'Implement',
    emoji: '⚙️',
    duration: '30-60 min',
    roles: ['Backend Dev', 'Frontend Dev', 'DevOps'],
    activities: [
      'Code Generation',
      'Unit Testing',
      'Integration',
      'Documentation'
    ],
    exitCriteria: [
      '✅ All code generated',
      '✅ Tests passing',
      '✅ Documentation started'
    ]
  },
  REVIEW: {
    name: 'Review',
    emoji: '🔍',
    duration: '20-30 min',
    roles: ['QA Engineer', 'Security Expert', 'Performance Engineer'],
    activities: [
      'Code Review',
      'Security Audit',
      'Performance Review',
      'QA Review'
    ],
    exitCriteria: [
      '✅ Code review approved',
      '✅ Security issues resolved',
      '✅ Test coverage >80%'
    ]
  },
  DEPLOY: {
    name: 'Deploy',
    emoji: '🚀',
    duration: '15-20 min',
    roles: ['DevOps', 'Architect'],
    activities: [
      'CI/CD Setup',
      'Environment Setup',
      'Monitoring Setup',
      'Rollback Plan'
    ],
    exitCriteria: [
      '✅ CI/CD pipeline ready',
      '✅ Staging deployed',
      '✅ Monitoring active'
    ]
  }
}

const QUALITY_GATES = {
  code: { coverage: '>80%', complexity: '<10', duplication: '<5%' },
  security: { owasp: 'All checked', secrets: 'Zero', auth: 'Implemented' },
  performance: { response: '<200ms', bundle: '<500KB' }
}

// ============================================
// AGENTS (SWARM CODING STYLE)
// ============================================
const AGENTS = {
  architect: {
    name: 'Architect',
    emoji: '🏗️',
    phase: 'Plan',
    role: 'Solutions Architect',
    system: `You are ARCHITECT - Solutions Architect specializing in system design.

TASK: Create HEADER + HERO for a landing page with strong architecture.

OUTPUT FORMAT:
{
  "root": "header-1",
  "elements": {
    "header-1": {"type": "Header", "props": {"content": "🎨 Brand Name"}},
    "badge-1": {"type": "Badge", "props": {"content": "🚀 Primary Value Prop"}},
    "hero-1": {"type": "Heading", "props": {"content": "Main Headline", "level": "h1", "isGradient": true}},
    "hero-text-1": {"type": "Text", "props": {"content": "Supporting copy", "color": "#9ca3af", "fontSize": 20}},
    "cta-1": {"type": "Button", "props": {"content": "🚀 Get Started"}}
  }
}

REQUIREMENTS:
• Header with brand + emoji
• Badge with catchy tagline
• Hero: Gradient h1 with compelling headline
• Subtitle: Clear value proposition
• CTA: Action button

OUTPUT JSON ONLY.`,

    input: 'Design HEADER + HERO for Pretext AI UI Toolkit - AI-powered UI generation with zero-reflow text, safe components, and agent standards.'
  },

  designer: {
    name: 'Designer',
    emoji: '🎨',
    phase: 'Implement',
    role: 'Frontend Developer',
    system: `You are DESIGNER - Frontend Developer specializing in visual design.

TASK: Create FEATURE CARDS section showcasing benefits.

OUTPUT FORMAT:
{
  "root": "section-1",
  "elements": {
    "section-1": {"type": "Heading", "props": {"content": "Core Features", "level": "h2"}},
    "grid-1": {"type": "Grid", "props": {"columns": 3}},
    "card-1": {"type": "Card", "props": {"title": "⚡ Speed", "description": "Benefit-driven description in 15-20 words"}},
    "card-2": {"type": "Card", "props": {"title": "🎨 Design", "description": "Benefit-driven description in 15-20 words"}},
    "card-3": {"type": "Card", "props": {"title": "🤖 AI", "description": "Benefit-driven description in 15-20 words"}}
  }
}

REQUIREMENTS:
• Section heading
• 3-column grid
• Cards with emoji titles + benefit descriptions
• Hover effects (handled by CSS)

OUTPUT JSON ONLY.`,

    input: 'Create feature cards for: Zero-reflow Pretext text measurement, JSON Render safe components, A2UI agent standard.'
  },

  backend: {
    name: 'Backend',
    emoji: '⚙️',
    phase: 'Implement',
    role: 'Backend Developer',
    system: `You are BACKEND - Backend Developer specializing in functionality.

TASK: Create HOW IT WORKS section with clear steps.

OUTPUT FORMAT:
{
  "root": "how-section",
  "elements": {
    "how-heading": {"type": "Heading", "props": {"content": "How It Works", "level": "h2"}},
    "step-1": {"type": "Card", "props": {"title": "1️⃣ Step One", "description": "Clear action description"}},
    "step-2": {"type": "Card", "props": {"title": "2️⃣ Step Two", "description": "Clear action description"}},
    "step-3": {"type": "Card", "props": {"title": "3️⃣ Step Three", "description": "Clear action description"}}
  }
}

REQUIREMENTS:
• Clear section heading
• 3 step cards with numbered titles
• Concise descriptions (10-15 words each)
• Action-oriented language

OUTPUT JSON ONLY.`,

    input: 'Create a 3-step "How It Works" section: 1. Describe your UI, 2. AI generates components, 3. Deploy beautiful UIs.'
  },

  social_proof: {
    name: 'Social Proof',
    emoji: '💬',
    phase: 'Review',
    role: 'QA Engineer',
    system: `You are SOCIAL PROOF - QA Engineer verifying trust signals.

TASK: Create STATS + SOCIAL PROOF section.

OUTPUT FORMAT:
{
  "root": "stats-section",
  "elements": {
    "stats-heading": {"type": "Heading", "props": {"content": "Trusted by Developers", "level": "h2"}},
    "stats-grid": {"type": "Grid", "props": {"columns": 4}},
    "stat-1": {"type": "Metric", "props": {"label": "Users", "value": "10K+"}},
    "stat-2": {"type": "Metric", "props": {"label": "Components", "value": "50+"}},
    "stat-3": {"type": "Metric", "props": {"label": "Uptime", "value": "99.9%"}},
    "stat-4": {"type": "Metric", "props": {"label": "Rating", "value": "4.9⭐"}}
  }
}

REQUIREMENTS:
• Trust-building heading
• 4 impressive metrics
• Mix of user counts, features, performance
• Believable numbers

OUTPUT JSON ONLY.`,

    input: 'Create stats section: developers using tool, components available, uptime percentage, user rating.'
  },

  security: {
    name: 'Security',
    emoji: '🔒',
    phase: 'Review',
    role: 'Security Expert',
    system: `You are SECURITY - Security Expert auditing quality.

TASK: Verify and enhance component quality.

CHECKLIST:
□ All required components present
□ No empty or invalid fields
□ Component types are valid
□ Content is appropriate
□ No security concerns

OUTPUT: Return verified/fixed component list in A2UI format.

OUTPUT JSON ONLY.`,

    input: 'Review and verify all components for quality, completeness, and security.'
  },

  devops: {
    name: 'DevOps',
    emoji: '🚀',
    phase: 'Deploy',
    role: 'DevOps Engineer',
    system: `You are DEVOPS - DevOps Engineer finalizing deployment.

TASK: Create final CTA section for conversion.

OUTPUT FORMAT:
{
  "root": "cta-section",
  "elements": {
    "cta-heading": {"type": "Heading", "props": {"content": "Ready to Build?", "level": "h2", "isGradient": true}},
    "cta-text": {"type": "Text", "props": {"content": "Final value prop", "color": "#9ca3af"}},
    "cta-btn-1": {"type": "Button", "props": {"content": "🚀 Start Free"}},
    "cta-btn-2": {"type": "Button", "props": {"content": "📖 Documentation"}}
  }
}

REQUIREMENTS:
• Compelling heading
• Value reinforcement
• Primary CTA: Start/Generate
• Secondary CTA: Learn more

OUTPUT JSON ONLY.`,

    input: 'Create final CTA section: primary button to start, secondary for docs.'
  },

  qa: {
    name: 'QA',
    emoji: '✅',
    phase: 'Review',
    role: 'QA Engineer',
    system: `You are QA - Final quality check.

TASK: Verify all components meet quality gates.

QUALITY GATES:
□ Code Coverage: >80% (components complete)
□ Security: No vulnerabilities (safe content)
□ Performance: Fast loading (minimal components)
□ Documentation: Clear copy

FINAL CHECKLIST:
□ Header exists with brand
□ Hero with gradient heading
□ At least 3 feature cards
□ Stats/metrics section
□ CTA section
□ Footer or final message

OUTPUT: Final verified component list.

OUTPUT JSON ONLY.`,

    input: 'Final QA pass: verify structure, completeness, and quality standards.'
  }
}

type AgentKey = keyof typeof AGENTS

// ============================================
// FALLBACK
// ============================================
function fallback(): UIComponent[] {
  return [
    { id: 'header-1', type: 'Header', props: { content: '🎨 Pretext AI UI Toolkit' } },
    { id: 'badge-1', type: 'Badge', props: { content: '🚀 AI-Powered UI Generation' } },
    { id: 'hero-1', type: 'Heading', props: { content: 'Build Beautiful UIs with AI', level: 'h1', isGradient: true } },
    { id: 'hero-text-1', type: 'Text', props: { content: 'Zero Reflow • Safe Components • Agent Standards', color: '#9ca3af', fontSize: 20 } },
    { id: 'cta-1', type: 'Button', props: { content: '🚀 Generate Now' } },
    { id: 'section-1', type: 'Heading', props: { content: 'Core Features', level: 'h2' } },
    { id: 'grid-1', type: 'Grid', props: { columns: 3 } },
    { id: 'card-1', type: 'Card', props: { title: '⚡ Zero Reflow', description: 'Text measured at ~0.09ms without DOM reflow using Pretext' } },
    { id: 'card-2', type: 'Card', props: { title: '🎨 JSON Render', description: 'Safe component catalog with Zod validation' } },
    { id: 'card-3', type: 'Card', props: { title: '🤖 A2UI Standard', description: 'Google\'s agent UI spec for declarative UIs' } },
    { id: 'section-2', type: 'Heading', props: { content: 'Trusted by Developers', level: 'h2' } },
    { id: 'stats-grid', type: 'Grid', props: { columns: 4 } },
    { id: 'stat-1', type: 'Metric', props: { label: 'Users', value: '10K+' } },
    { id: 'stat-2', type: 'Metric', props: { label: 'Components', value: '50+' } },
    { id: 'stat-3', type: 'Metric', props: { label: 'Uptime', value: '99.9%' } },
    { id: 'stat-4', type: 'Metric', props: { label: 'Rating', value: '4.9⭐' } },
    { id: 'cta-section', type: 'Heading', props: { content: 'Ready to Build?', level: 'h2', isGradient: true } },
    { id: 'cta-btn-1', type: 'Button', props: { content: '🚀 Start Free' } },
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
  const [currentAgent, setCurrentAgent] = useState('')
  const [currentRole, setCurrentRole] = useState('')
  const [progress, setProgress] = useState(0)
  const [generationTime, setGenerationTime] = useState(0)
  const [streamText, setStreamText] = useState('')
  const [qualityGates, setQualityGates] = useState<Record<string, boolean>>({})
  
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
            comps.push({ id, type: (elem.type as string).toLowerCase(), props: elem.props || {}, children: elem.children || [] })
          }
        })
        return comps
      }
    } catch (e) { console.error('Parse error:', e) }
    return []
  }
  
  async function runSwarm() {
    setIsGenerating(true)
    setLogs([])
    setProgress(0)
    setPhase('Swarm Initializing...')
    setQualityGates({})
    setStreamText('')
    
    const allComponents: UIComponent[] = []
    const agentKeys: AgentKey[] = ['architect', 'designer', 'backend', 'social_proof', 'security', 'devops', 'qa']
    const totalSteps = agentKeys.length
    
    for (let i = 0; i < agentKeys.length; i++) {
      const key = agentKeys[i]
      const agent = AGENTS[key]
      
      setCurrentAgent(agent.name)
      setCurrentRole(agent.role)
      setPhase(`Phase ${agent.phase}: ${agent.name}`)
      
      const time = new Date().toLocaleTimeString()
      setLogs(prev => [...prev.slice(-15), `${time} ${agent.emoji} [${agent.role}] ${agent.name}: Starting...`])
      
      // Mark quality gate
      setQualityGates(prev => ({ ...prev, [agent.phase]: false }))
      
      let success = false
      for (let attempt = 0; attempt < 2 && !success; attempt++) {
        try {
          const result = await callMiniMax(agent.system, agent.input)
          const comps = parseAIResponse(result)
          
          if (comps.length > 0) {
            allComponents.push(...comps)
            setLogs(prev => [...prev.slice(-15), `${time} ✅ [${agent.role}] ${agent.name}: +${comps.length} components`])
            setQualityGates(prev => ({ ...prev, [agent.phase]: true }))
            success = true
          }
        } catch (err) {
          setLogs(prev => [...prev.slice(-15), `${time} ❌ ${agent.name}: ${err instanceof Error ? err.message : String(err)}`])
        }
      }
      
      setProgress(Math.round(((i + 1) / totalSteps) * 100))
    }
    
    // Fallback
    if (allComponents.length < 5) {
      setLogs(prev => [...prev.slice(-15), `${new Date().toLocaleTimeString()} 🔧 Fallback: Using defaults...`])
      allComponents.push(...fallback())
    }
    
    // Build spec
    const elements: Record<string, any> = {}
    let root = ''
    allComponents.forEach((c) => {
      if (!root) root = c.id
      elements[c.id] = { type: c.type.charAt(0).toUpperCase() + c.type.slice(1), props: c.props || {}, children: c.children || [] }
    })
    
    setSpec({ root, elements })
    
    const elapsed = ((Date.now() - startTimeRef.current) / 1000).toFixed(1)
    setGenerationTime(parseFloat(elapsed))
    setLogs(prev => [...prev.slice(-15), `${new Date().toLocaleTimeString()} ✅ Complete in ${elapsed}s`])
    
    setPhase('Complete!')
    setCurrentAgent('')
    setCurrentRole('')
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
                <span className="text-2xl">🐝</span>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Swarm Coding UI Generator
                </h1>
              </div>
              <div className="flex items-center gap-4">
                {!isGenerating && generationTime > 0 && (
                  <span className="text-sm text-green-400">⚡ {generationTime}s</span>
                )}
                <button onClick={runSwarm} disabled={isGenerating} className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium text-sm disabled:opacity-50 hover:from-purple-500 hover:to-pink-500 transition-all">
                  {isGenerating ? '⏳ Building...' : '🔄 Regenerate'}
                </button>
              </div>
            </div>
          </header>
          
          {/* Main */}
          <main className="pt-20">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6">
                <div className="w-full max-w-3xl space-y-8">
                  {/* Status */}
                  <div className="text-center space-y-3">
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      🐝 Swarm Coding
                    </h2>
                    <p className="text-gray-400 text-lg">{phase}</p>
                    {currentRole && <p className="text-purple-400">👤 {currentRole}</p>}
                  </div>
                  
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-purple-400">{progress}%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                  
                  {/* Quality Gates */}
                  <div className="flex flex-wrap justify-center gap-3">
                    {Object.entries(SWARM_PHASES).map(([key, phase]) => (
                      <div key={key} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                        qualityGates[phase.name] ? 'bg-green-500/20 text-green-400' : 
                        currentRole === phase.roles[0] ? 'bg-purple-500/20 text-purple-400 animate-pulse' :
                        'bg-white/5 text-gray-500'
                      }`}>
                        <span>{qualityGates[phase.name] ? '✅' : phase.emoji}</span>
                        <span>{phase.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Agent Pipeline */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {(['architect', 'designer', 'backend', 'social_proof', 'security', 'devops', 'qa'] as AgentKey[]).map((key) => {
                      const agent = AGENTS[key]
                      const isCurrent = currentAgent === agent.name
                      const isComplete = qualityGates[agent.phase] === true
                      return (
                        <div key={key} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          isComplete ? 'bg-green-500/20 text-green-400' :
                          isCurrent ? 'bg-purple-500/20 text-purple-400 animate-pulse' :
                          'bg-white/5 text-gray-500'
                        }`}>
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
                    <pre className="text-sm text-purple-300 whitespace-pre-wrap font-mono h-40 overflow-auto">
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
                <footer className="text-center text-gray-500 text-sm space-y-2 border-t border-white/10 pt-8">
                  <p>🐝 Built with Swarm Coding</p>
                  <p className="text-xs">Pretext + JSON Render + A2UI • {generationTime}s generation</p>
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
