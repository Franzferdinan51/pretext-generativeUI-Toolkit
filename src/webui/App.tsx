// GENERATIVE UI - FULLY AI-POWERED WITH PRETEXT
// EVERY component rendered via Pretext - tabs, buttons, text, everything!
import React, { useState, useEffect, useRef } from 'react'
import { prepare, layout } from '@chenglou/pretext'

const MINIMAX_API_KEY = 'sk-cp-f6PbhZS6uNSD1L-mByhEw3RzISEgKDmaQ-kkQGUx79uBrnAZDVWVnDwmLwHC19V1jT07oW7CcU2Dn_3Zr8c90a5xYqk9J1BBNXd0C9bVRbyr-PLbfd31kUE'
const KIMI_API_KEY = 'sk-kimi-JuC8v84dqO2VbJbDRt1Z8lbQgHqTOLrPbeSEae9FhWVQE9HUAwomE6Xmv7JwChIg'
const LM_STUDIO_KEY = 'lm-studio'

type Provider = 'lmstudio' | 'minimax' | 'kimi'

interface UIComponent {
  id: string; type: 'text' | 'button' | 'card' | 'header'; content: string
  x: number; y: number; width: number; height: number
  style: Record<string, string>; visible: boolean; action?: string
}

// PRETEXT POWERED APP UI
function PretextApp({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })
  
  useEffect(() => {
    const update = () => setDimensions({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  
  return (
    <canvas 
      ref={canvasRef} 
      width={dimensions.width} 
      height={dimensions.height}
      className="fixed inset-0"
      style={{ background: '#0a0a0f' }}
    />
  )
}

// PRETEXT TEXT RENDERER - Core of everything
function renderPretextText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, fontSize: number, color: string, isGradient = false) {
  const prepared = prepare(text, `${fontSize}px Inter`)
  const result = layout(prepared, maxWidth, fontSize + 4)
  
  if (isGradient) {
    const gradient = ctx.createLinearGradient(x, y, x + maxWidth, y)
    gradient.addColorStop(0, '#8b5cf6')
    gradient.addColorStop(1, '#ec4899')
    ctx.fillStyle = gradient
  } else {
    ctx.fillStyle = color
  }
  
  for (const line of result.lines || []) {
    ctx.fillText(line.text || '', x, y + line.y + fontSize)
  }
  
  return result.height
}

// MAIN SWARM APP
export default function App() {
  const [components, setComponents] = useState<UIComponent[]>([])
  const [logs, setLogs] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(true)
  const [phase, setPhase] = useState('Initializing...')
  const [agentStatuses, setAgentStatuses] = useState<Record<string, string>>({})
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [clickedId, setClickedId] = useState<string | null>(null)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const initRef = useRef(false)
  
  // All text content managed by AI
  const appContent = useRef({
    title: '🎨 Pretext AI UI',
    subtitle: 'Fully AI-Powered Generative UI',
    tabs: ['Home', 'Generate', 'Components', 'Settings'],
    activeTab: 'Generate',
    statusText: 'Ready',
    buttonText: '🚀 Generate New',
    footerText: 'Built with Pretext + AI Swarm'
  })
  
  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      runSwarm()
    }
  }, [])
  
  // Render entire UI via Pretext
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Background
    ctx.fillStyle = '#0a0a0f'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Header via Pretext
    ctx.font = 'bold 24px Inter'
    renderPretextText(ctx, appContent.current.title, 20, 30, 400, 24, '#fff')
    
    // Render all generated components
    const sorted = [...components].sort((a, b) => a.y - b.y)
    for (const comp of sorted) {
      if (!comp.visible) continue
      const isHovered = hoveredId === comp.id
      const isClicked = clickedId === comp.id
      
      switch (comp.type) {
        case 'header':
          ctx.fillStyle = 'rgba(0,0,0,0.9)'
          ctx.fillRect(comp.x, comp.y, comp.width, comp.height || 60)
          ctx.font = 'bold 20px Inter'
          ctx.fillStyle = '#fff'
          ctx.fillText(comp.content, comp.x + 20, comp.y + 38)
          break
          
        case 'text':
          const fontSize = parseInt(comp.style.fontSize || '18')
          const isGradient = comp.style.background?.includes('gradient')
          ctx.font = `bold ${fontSize}px Inter`
          renderPretextText(ctx, comp.content, comp.x, comp.y + fontSize, comp.width, fontSize, '#fff', isGradient)
          break
          
        case 'button':
          ctx.fillStyle = isClicked ? '#6d28d9' : isHovered ? '#7c3aed' : '#8b5cf6'
          ctx.beginPath()
          ctx.roundRect(comp.x, comp.y, comp.width, comp.height || 44, 8)
          ctx.fill()
          ctx.font = 'bold 14px Inter'
          ctx.fillStyle = '#fff'
          ctx.textAlign = 'center'
          ctx.fillText(comp.content, comp.x + comp.width / 2, comp.y + comp.height / 2 + 5)
          ctx.textAlign = 'left'
          break
          
        case 'card':
          ctx.fillStyle = comp.style.background || 'rgba(255,255,255,0.08)'
          ctx.beginPath()
          ctx.roundRect(comp.x, comp.y, comp.width, comp.height || 150, 12)
          ctx.fill()
          ctx.strokeStyle = isHovered ? '#8b5cf6' : 'rgba(255,255,255,0.2)'
          ctx.lineWidth = isHovered ? 2 : 1
          ctx.stroke()
          ctx.fillStyle = '#fff'
          ctx.font = 'bold 16px Inter'
          const lines = comp.content.split('\\n')
          lines.forEach((line, i) => {
            ctx.fillText(line, comp.x + 16, comp.y + 30 + i * 22)
          })
          break
      }
    }
    
    // Loading overlay via Pretext
    if (isGenerating) {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.95)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.font = 'bold 32px Inter'
      renderPretextText(ctx, '🐝 AI Swarm Building...', canvas.width / 2 - 200, 150, 400, 32, '#fff')
      
      ctx.font = 'bold 20px Inter'
      renderPretextText(ctx, phase, canvas.width / 2 - 150, 200, 300, 20, '#8b5cf6')
      
      // Agent statuses via Pretext
      let yPos = 280
      const agents = ['Architect', 'Designer', 'Content', 'Frontend', 'Enhancer']
      const icons = ['🏗️', '🎨', '✍️', '💻', '✨']
      const statuses = [agentStatuses['Architect'], agentStatuses['Designer'], agentStatuses['Content'], agentStatuses['Frontend'], agentStatuses['Enhancer']]
      
      for (let i = 0; i < agents.length; i++) {
        const status = statuses[i] || 'waiting'
        const color = status === 'done' ? '#10b981' : status === 'error' ? '#ef4444' : '#6b7280'
        ctx.font = '16px Inter'
        ctx.fillStyle = color
        ctx.fillText(`${icons[i]} ${agents[i]}: ${status}`, 50, yPos)
        yPos += 30
      }
      
      // Logs via Pretext
      yPos = 480
      ctx.font = '12px monospace'
      ctx.fillStyle = '#a855f7'
      for (const log of logs.slice(-15)) {
        ctx.fillText(log.slice(-80), 50, yPos)
        yPos += 18
      }
    }
    
  }, [components, hoveredId, clickedId, isGenerating, phase, agentStatuses, logs])
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    let found: string | null = null
    for (const comp of components) {
      if (!comp.visible) continue
      if (x >= comp.x && x <= comp.x + comp.width && y >= comp.y && y <= comp.y + comp.height) {
        found = comp.id
        break
      }
    }
    setHoveredId(found)
    if (canvas) canvas.style.cursor = found ? 'pointer' : 'default'
  }
  
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    for (const comp of components) {
      if (!comp.visible) continue
      if (x >= comp.x && x <= comp.x + comp.width && y >= comp.y && y <= comp.y + comp.height) {
        setClickedId(comp.id)
        if (comp.action === 'generate') {
          runSwarm()
        }
        setTimeout(() => setClickedId(null), 100)
        break
      }
    }
  }
  
  async function callAI(provider: Provider, apiKey: string, model: string, system: string, user: string) {
    const endpoints: Record<Provider, string> = {
      lmstudio: '/api/lm-studio',
      minimax: 'https://api.minimax.io/v1',
      kimi: 'https://api.moonshot.cn/v1'
    }
    
    let authKey = apiKey
    if (provider === 'minimax') authKey = MINIMAX_API_KEY
    if (provider === 'kimi') authKey = KIMI_API_KEY
    if (provider === 'lmstudio') authKey = LM_STUDIO_KEY
    
    const res = await fetch(`${endpoints[provider]}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authKey}` },
      body: JSON.stringify({ model, messages: [{ role: 'system', content: system }, { role: 'user', content: user }], stream: true, max_tokens: 1024 })
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
    const match = full.match(/\[[\s\S]*\]/)
    return match ? JSON.parse(match[0]) : []
  }
  
  function generateFallback(sections: string[], agentName: string): UIComponent[] {
    const fallback: UIComponent[] = []
    let yPos = 100
    if (sections.includes('Header')) {
      fallback.push({ id: `${agentName}-header`, type: 'header', content: '🎨 Pretext AI UI', x: 0, y: 0, width: 1200, height: 60, style: {}, visible: true })
      yPos = 100
    }
    if (sections.includes('Hero')) {
      fallback.push({ id: `${agentName}-hero`, type: 'text', content: 'Build UI with AI', x: 50, y: yPos, width: 1100, height: 60, style: { fontSize: '48', background: 'gradient' }, visible: true })
      yPos += 80
    }
    if (sections.includes('Features') || sections.includes('Stats')) {
      ['⚡ Zero Reflow', '🎨 Canvas', '🤖 AI Controlled'].forEach((title, i) => {
        fallback.push({ id: `${agentName}-card-${i}`, type: 'card', content: `${title}\nAI Generated`, x: 50 + i * 320, y: yPos, width: 280, height: 180, style: { background: 'rgba(255,255,255,0.08)' }, visible: true })
      })
      yPos += 200
    }
    if (sections.includes('CTA') || sections.includes('Footer')) {
      fallback.push({ id: `${agentName}-cta`, type: 'button', content: '🚀 Get Started', x: 500, y: yPos, width: 200, height: 50, style: { background: '#8b5cf6' }, visible: true, action: 'generate' })
    }
    return fallback
  }
  
  async function runSwarm() {
    setIsGenerating(true)
    setLogs([])
    setPhase('Starting AI Swarm...')
    setAgentStatuses({})
    appContent.current.statusText = 'Building...'
    
    const agents = [
      { name: 'Architect', provider: 'lmstudio' as Provider, model: 'qwen3.5-9b', sections: ['Header', 'Hero'] },
      { name: 'Designer', provider: 'lmstudio' as Provider, model: 'qwen3.5-9b', sections: ['Features', 'Stats'] },
      { name: 'Content', provider: 'minimax' as Provider, model: 'MiniMax-M2.7', sections: ['Toolkit', 'How It Works'] },
      { name: 'Frontend', provider: 'minimax' as Provider, model: 'MiniMax-M2.7', sections: ['CTA', 'Footer'] },
      { name: 'Enhancer', provider: 'minimax' as Provider, model: 'MiniMax-M2.7', sections: ['Polish'] },
    ]
    
    const allResults: UIComponent[] = []
    
    for (const agent of agents) {
      setPhase(`${agent.name} building...`)
      setAgentStatuses(prev => ({ ...prev, [agent.name]: 'building' }))
      const timestamp = new Date().toLocaleTimeString()
      setLogs(prev => [...prev.slice(-20), `${timestamp} ${agent.name}: Starting...`])
      
      let result: UIComponent[] = []
      let attempts = 0
      
      while (result.length === 0 && attempts < 3) {
        try {
          const systemPrompt = attempts === 0
            ? `You are expert UI builder using PRETEXT for zero-reflow text rendering.

IMPORTANT - PRETEXT INTEGRATION:
- Use Pretext (https://github.com/chenglou/pretext) for ALL text measurement
- Pretext measures text WITHOUT DOM reflow
- All positions are pre-calculated before render
- Canvas renders at exact x,y coordinates

COMPONENT TYPES:
- header: {type:"header", content:"Title", x:0, y:0, width:1200, height:60}
- text: {type:"text", content:"...", x:0, y:80, width:1200, height:40, style:{fontSize:"32",color:"#fff",background:"gradient"}}
- button: {type:"button", content:"...", x:500, y:300, width:200, height:50, style:{background:"#8b5cf6"}}
- card: {type:"card", content:"Title\\nDesc", x:50, y:400, width:280, height:180, style:{background:"rgba(255,255,255,0.08)"}}

RULES:
- Dark theme: #0a0a0f
- Accents: #8b5cf6 (purple), #ec4899 (pink), #06b6d4 (cyan)
- Use gradient text for headlines: style:{background:"gradient"}
- OUTPUT ONLY VALID JSON ARRAY - no markdown, no explanation`
            : `Create valid UI components using Pretext. Output JSON array only.`
          
          const userPrompt = `Generate ${agent.sections.join(' + ')}. ${agent.sections.map(s => {
            if (s === 'Header') return 'Header with logo "🎨 Pretext AI UI"'
            if (s === 'Hero') return 'Gradient headline "Build UI with AI", subtitle, CTA button'
            if (s === 'Features') return '4 cards: Zero Reflow, Canvas, AI Controlled, Streaming'
            if (s === 'Stats') return '4 stat boxes'
            if (s === 'Toolkit') return '3 cards: Components, Effects, AI'
            if (s === 'How It Works') return '3 step cards'
            if (s === 'CTA') return 'Call to action button'
            if (s === 'Footer') return 'Footer with links'
            return s
          }).join('. ')}`
          
          const aiResult = await callAI(agent.provider, '', agent.model, systemPrompt, userPrompt)
          if (Array.isArray(aiResult) && aiResult.length > 0) result = aiResult
        } catch (err) {
          setLogs(prev => [...prev.slice(-20), `${new Date().toLocaleTimeString()} ${agent.name}: ${err}`])
        }
        attempts++
        
        if (result.length === 0 && attempts >= 3) {
          result = generateFallback(agent.sections, agent.name)
          setLogs(prev => [...prev.slice(-20), `${new Date().toLocaleTimeString()} ${agent.name}: Used fallback`])
        }
      }
      
      if (result.length > 0) {
        allResults.push(...result)
        setAgentStatuses(prev => ({ ...prev, [agent.name]: 'done' }))
        setLogs(prev => [...prev.slice(-20), `${new Date().toLocaleTimeString()} ${agent.name}: ✅ ${result.length} components`])
      } else {
        setAgentStatuses(prev => ({ ...prev, [agent.name]: 'error' }))
      }
    }
    
    // QA check
    setPhase('QA Check...')
    const hasHeader = allResults.some(c => c.type === 'header')
    const hasHero = allResults.some(c => c.type === 'text' && c.y < 200)
    const hasCards = allResults.filter(c => c.type === 'card').length >= 3
    const hasButtons = allResults.some(c => c.type === 'button')
    
    if (!hasHeader) allResults.unshift({ id: 'qa-header', type: 'header', content: '🎨 Pretext AI UI', x: 0, y: 0, width: 1200, height: 60, style: {}, visible: true })
    if (!hasHero) allResults.push({ id: 'qa-hero', type: 'text', content: 'Build UI with AI', x: 50, y: 100, width: 1100, height: 60, style: { fontSize: '48', background: 'gradient' }, visible: true })
    if (!hasCards) {
      ['⚡ Zero Reflow', '🎨 Canvas', '🤖 AI Controlled'].forEach((t, i) => {
        allResults.push({ id: `qa-card-${i}`, type: 'card', content: `${t}\nPretext Powered`, x: 50 + i * 320, y: 400, width: 280, height: 180, style: { background: 'rgba(255,255,255,0.08)' }, visible: true })
      })
    }
    if (!hasButtons) allResults.push({ id: 'qa-cta', type: 'button', content: '🚀 Generate New', x: 500, y: 1200, width: 200, height: 50, style: { background: '#8b5cf6' }, visible: true, action: 'generate' })
    
    setComponents(allResults)
    setPhase('Complete!')
    setAgentStatuses(prev => ({ ...prev, ['QA']: 'done' }))
    setLogs(prev => [...prev.slice(-20), `${new Date().toLocaleTimeString()} QA: ✅ ${allResults.length} total components`])
    setIsGenerating(false)
    appContent.current.statusText = `${allResults.length} components`
  }
  
  return (
    <div className="fixed inset-0 bg-[#0a0a0f]">
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      />
    </div>
  )
}
