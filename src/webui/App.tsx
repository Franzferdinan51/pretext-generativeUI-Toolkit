// GENERATIVE UI - ENHANCED SWARM WITH MULTI-PROVIDER
import React, { useState, useEffect, useRef } from 'react'

const PROVIDERS = {
  lmstudio: { name: 'LM Studio', endpoint: '/api/lm-studio', icon: '🖥️', color: '#10b981' },
  minimax: { name: 'MiniMax', endpoint: 'https://api.minimax.io/v1', icon: '🚀', color: '#f59e0b' },
  kimi: { name: 'Kimi', endpoint: 'https://api.moonshot.cn/v1', icon: '🌙', color: '#6366f1' },
  openai: { name: 'OpenAI', endpoint: 'https://api.openai.com/v1', icon: '🤖', color: '#10a54a' },
  anthropic: { name: 'Claude', endpoint: 'https://api.anthropic.com/v1', icon: '🧠', color: '#d946ef' },
  google: { name: 'Gemini', endpoint: 'https://generativelanguage.googleapis.com/v1', icon: '🔵', color: '#4285f4' },
  groq: { name: 'Groq', endpoint: 'https://api.groq.com/openai/v1', icon: '⚡', color: '#f97316' },
  deepseek: { name: 'DeepSeek', endpoint: 'https://api.deepseek.com/v1', icon: '🔮', color: '#06b6d4' },
  ollama: { name: 'Ollama', endpoint: 'http://localhost:11434/v1', icon: '🦙', color: '#84cc16' },
  together: { name: 'Together', endpoint: 'https://api.together.xyz/v1', icon: '☁️', color: '#8b5cf6' }
}

const MINIMAX_API_KEY = 'sk-cp-f6PbhZS6uNSD1L-mByhEw3RzISEgKDmaQ-kkQGUx79uBrnAZDVWVnDwmLwHC19V1jT07oW7CcU2Dn_3Zr8c90a5xYqk9J1BBNXd0C9bVRbyr-PLbfd31kUE'
const LM_STUDIO_KEY = 'lm-studio'  // No auth needed for local

type Provider = keyof typeof PROVIDERS

interface UIComponent {
  id: string; type: 'text' | 'button' | 'card' | 'header'; content: string
  x: number; y: number; width: number; height: number
  style: Record<string, string>; visible: boolean
}

interface SwarmAgent {
  id: string; name: string; role: string; icon: string
  sections: string[]; provider: Provider; model: string
  status: 'waiting' | 'building' | 'done' | 'error'; retryCount: number
  result?: UIComponent[]
}

function CanvasRenderer({ components }: { components: UIComponent[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const maxY = Math.max(...components.map(c => c.y + c.height), 800) + 100
    canvas.width = 1200
    canvas.height = maxY
    
    ctx.fillStyle = '#0a0a0f'
    ctx.fillRect(0, 0, 1200, maxY)
    
    const sorted = [...components].sort((a, b) => a.y - b.y)
    
    for (const comp of sorted) {
      if (!comp.visible) continue
      const isHovered = hoveredId === comp.id
      
      switch (comp.type) {
        case 'header':
          ctx.fillStyle = 'rgba(0,0,0,0.9)'
          ctx.fillRect(comp.x, comp.y, comp.width, comp.height || 60)
          ctx.fillStyle = '#fff'
          ctx.font = 'bold 20px Inter'
          ctx.fillText(comp.content, comp.x + 20, comp.y + 38)
          break
        case 'text':
          const fontSize = parseInt(comp.style.fontSize || '18')
          ctx.font = `bold ${fontSize}px Inter`
          if (comp.style.background?.includes('gradient')) {
            const gradient = ctx.createLinearGradient(comp.x, comp.y, comp.x + 400, comp.y)
            gradient.addColorStop(0, '#8b5cf6')
            gradient.addColorStop(1, '#ec4899')
            ctx.fillStyle = gradient
          } else {
            ctx.fillStyle = comp.style.color || '#fff'
          }
          const words = comp.content.split(' ')
          let line = '', lineY = comp.y + fontSize
          for (const word of words) {
            const test = line + word + ' '
            if (ctx.measureText(test).width > comp.width && line !== '') {
              ctx.fillText(line, comp.x, lineY)
              line = word + ' '
              lineY += fontSize + 4
            } else line = test
          }
          ctx.fillText(line, comp.x, lineY)
          break
        case 'button':
          ctx.fillStyle = isHovered ? '#7c3aed' : '#8b5cf6'
          ctx.beginPath()
          ctx.roundRect(comp.x, comp.y, comp.width, comp.height || 44, 8)
          ctx.fill()
          ctx.fillStyle = '#fff'
          ctx.font = 'bold 14px Inter'
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
          comp.content.split('\\n').forEach((line, i) => ctx.fillText(line, comp.x + 16, comp.y + 30 + i * 22))
          break
      }
    }
  }, [components, hoveredId])
  
  const handleMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left, y = e.clientY - rect.top
    let found: string | null = null
    for (const comp of components) {
      if (!comp.visible) continue
      if (x >= comp.x && x <= comp.x + comp.width && y >= comp.y && y <= comp.y + comp.height) { found = comp.id; break }
    }
    setHoveredId(found)
    canvas.style.cursor = found ? 'pointer' : 'default'
  }
  
  if (components.length === 0) return <div className="flex items-center justify-center h-64 text-gray-500">No components</div>
  return <canvas ref={canvasRef} className="w-full rounded-xl" onMouseMove={handleMove} />
}

function HTMLPreview({ components }: { components: UIComponent[] }) {
  const headers = components.filter(c => c.type === 'header')
  const texts = [...components.filter(c => c.type === 'text')].sort((a, b) => a.y - b.y)
  const cards = components.filter(c => c.type === 'card')
  const buttons = components.filter(c => c.type === 'button')
  
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    *{margin:0;padding:0;box-sizing:border-box}body{background:#0a0a0f;color:#fff;font-family:Inter,sans-serif;min-height:100vh}
    .gradient-text{background:linear-gradient(135deg,#8b5cf6,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .gradient-bg{background:linear-gradient(135deg,#8b5cf6,#ec4899);border:none;color:#fff;padding:12px 24px;border-radius:8px;font-weight:bold}
    .card{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px}
    .cards-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:24px;margin:32px 0}
    .btn-container{text-align:center;margin:32px 0}.header{position:fixed;top:0;left:0;right:0;background:rgba(0,0,0,0.9);padding:16px 32px}
    .container{max-width:1200px;margin:0 auto;padding:80px 20px 20px}
    .text-hero{font-size:48px;font-weight:900}.text-subtitle{font-size:18px;color:#aaa;margin-top:8px}
    .text-section{margin-bottom:32px}
  </style></head><body>
  ${headers.length ? `<div class="header"><span style="font-size:18px;font-weight:bold" class="gradient-text">${headers[0].content}</span></div>` : ''}
  <div class="container">
    ${texts.map(t => {
      const fs = parseInt(t.style.fontSize || '18')
      const isHero = fs >= 36
      return `<div class="text-section">
        <h1 class="${isHero ? 'text-hero gradient-text' : ''}" style="color:${isHero ? 'transparent' : t.style.color || '#fff'};font-size:${fs}px;font-weight:${isHero ? 900 : 'bold'}">${t.content}</h1>
        ${isHero ? '<p class="text-subtitle">Generated by AI Swarm</p>' : ''}
      </div>`
    }).join('')}
    ${cards.length ? `<div class="cards-grid">${cards.map(c => {
      const lines = c.content.split('\\n')
      return `<div class="card"><h3 style="font-size:20px;font-weight:bold">${lines[0]||''}</h3><p style="color:#888;margin-top:8px">${lines[1]||'AI Generated'}</p></div>`
    }).join('')}</div>` : ''}
    ${buttons.length ? `<div class="btn-container">${buttons.map(b => `<button class="gradient-bg">${b.content}</button>`).join('')}</div>` : ''}
  </div></body></html>`
  
  if (!components.length) return <div className="flex items-center justify-center h-64 text-gray-500">No components</div>
  return <iframe className="w-full h-full border-0 bg-white" srcDoc={html} sandbox="allow-scripts" />
}

export default function App() {
  const [components, setComponents] = useState<UIComponent[]>([])
  const [logs, setLogs] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(true)
  const [view, setView] = useState<'canvas' | 'html'>('canvas')
  const [phase, setPhase] = useState('')
  const [agentStatuses, setAgentStatuses] = useState<Record<string, string>>({})
  
  const initRef = useRef(false)
  useEffect(() => { if (!initRef.current) { initRef.current = true; runSwarm() } }, [])
  
  const addLog = (msg: string) => setLogs(prev => [...prev.slice(-20), `${new Date().toLocaleTimeString()} ${msg}`])
  
  function generateFallback(sections: string[], agentName: string): UIComponent[] {
    const fallback: UIComponent[] = []
    let yPos = 100
    
    if (sections.includes('Header')) {
      fallback.push({ id: `fallback-${agentName}-header`, type: 'header', content: '🎨 Pretext AI UI', x: 0, y: 0, width: 1200, height: 60, style: {}, visible: true })
      yPos = 100
    }
    if (sections.includes('Hero')) {
      fallback.push({ id: `fallback-${agentName}-hero`, type: 'text', content: 'Build UI with AI', x: 50, y: yPos, width: 1100, height: 60, style: { fontSize: '48', background: 'gradient' }, visible: true })
      fallback.push({ id: `fallback-${agentName}-hero-btn`, type: 'button', content: '🚀 Get Started', x: 500, y: yPos + 80, width: 200, height: 50, style: { background: '#8b5cf6' }, visible: true })
      yPos += 160
    }
    if (sections.includes('Features') || sections.includes('Stats')) {
      const cards = ['⚡ Zero Reflow', '🎨 Canvas', '🤖 AI Controlled']
      cards.forEach((title, i) => {
        fallback.push({ id: `fallback-${agentName}-card-${i}`, type: 'card', content: `${title}\nAI Generated`, x: 50 + i * 320, y: yPos, width: 280, height: 180, style: { background: 'rgba(255,255,255,0.08)' }, visible: true })
      })
      yPos += 200
    }
    if (sections.includes('Toolkit') || sections.includes('How It Works')) {
      fallback.push({ id: `fallback-${agentName}-text`, type: 'text', content: 'How It Works', x: 50, y: yPos, width: 400, height: 40, style: { fontSize: '24', color: '#8b5cf6' }, visible: true })
      yPos += 60
    }
    if (sections.includes('CTA') || sections.includes('Footer')) {
      fallback.push({ id: `fallback-${agentName}-cta`, type: 'button', content: '🚀 Get Started', x: 500, y: yPos, width: 200, height: 50, style: { background: '#8b5cf6' }, visible: true })
    }
    
    addLog(`🔧 ${agentName}: Generated ${fallback.length} fallback components`)
    return fallback
  }
  
  async function callAI(provider: Provider, apiKey: string, model: string, system: string, user: string) {
    const p = PROVIDERS[provider]
    let authKey = apiKey
    if (provider === 'minimax') authKey = MINIMAX_API_KEY
    if (provider === 'lmstudio') authKey = LM_STUDIO_KEY
    
    const res = await fetch(`${p.endpoint}/chat/completions`, {
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
  
  async function runSwarm() {
    setIsGenerating(true)
    setLogs([])
    setPhase('initializing')
    setAgentStatuses({})
    
    const agents = [
      { id: '1', name: 'Architect', icon: '🏗️', provider: 'lmstudio' as Provider, model: 'qwen3.5-9b', sections: ['Header', 'Hero'] },
      { id: '2', name: 'Designer', icon: '🎨', provider: 'lmstudio' as Provider, model: 'qwen3.5-9b', sections: ['Features', 'Stats'] },
      { id: '3', name: 'Content', icon: '✍️', provider: 'minimax' as Provider, model: 'MiniMax-M2.7', sections: ['Toolkit', 'How It Works'] },
      { id: '4', name: 'Frontend', icon: '💻', provider: 'minimax' as Provider, model: 'MiniMax-M2.7', sections: ['CTA', 'Footer'] },
      { id: '5', name: 'Enhancer', icon: '✨', provider: 'minimax' as Provider, model: 'MiniMax-M2.7', sections: ['Polish'] },
    ]
    
    const allResults: UIComponent[] = []
    
    // PHASE 1: Fast generation
    setPhase('PHASE 1: Fast Generation')
    addLog('📦 Starting fast generation (LM Studio)...')
    
    for (const agent of agents.slice(0, 2)) {
      setAgentStatuses(prev => ({ ...prev, [agent.name]: 'building' }))
      addLog(`${agent.icon} ${agent.name}: Building ${agent.sections.join(', ')}...`)
      
      let result: UIComponent[] = []
      let attempts = 0
      
      while (result.length === 0 && attempts < 3) {
        try {
          const systemPrompt = attempts === 0 
            ? `Create UI components. Types: header, text, button, card. JSON array only.`
            : `Create UI components with defaults if needed. Types: header{h:60}, text{fs:32}, button{w:200,h:50}, card{w:280,h:180}. Dark theme #0a0a0f, accents #8b5cf6. Output JSON array only.`
          
          const userPrompt = attempts === 0
            ? `Generate ${agent.sections.join(' + ')}: ${agent.sections.map(s => {
                if (s === 'Header') return '1200x60px dark header "🎨 Pretext AI UI"'
                if (s === 'Hero') return 'gradient headline "Build UI with AI", subtitle "Zero Reflow • Streaming", CTA button'
                if (s === 'Features') return '4 cards: "⚡ Zero Reflow", "🎨 Canvas", "🤖 AI Controlled", "✨ Streaming"'
                if (s === 'Stats') return '4 boxes: "50+ Components", "0ms Reflow", "100% Free", "Live Preview"'
                return s
              }).join('. ')}`
            : `Fallback: Create simple ${agent.sections.join(' + ')} with basic components`
          
          const aiResult = await callAI(agent.provider, '', agent.model, systemPrompt, userPrompt)
          
          if (Array.isArray(aiResult) && aiResult.length > 0) {
            result = aiResult
          } else if (attempts === 1) {
            // Final fallback - generate default components
            result = generateFallback(agent.sections, agent.name)
          }
        } catch (err) {
          addLog(`⚠️ ${agent.name} attempt ${attempts + 1} failed: ${err}`)
          if (attempts === 1) result = generateFallback(agent.sections, agent.name)
        }
        attempts++
      }
      
      if (result.length > 0) {
        allResults.push(...result)
        addLog(`✅ ${agent.name}: ${result.length} components`)
      }
      setAgentStatuses(prev => ({ ...prev, [agent.name]: result.length > 0 ? 'done' : 'error' }))
    }
    
    // PHASE 2: Quality build
    setPhase('PHASE 2: Quality Build')
    addLog('🎯 Quality build (MiniMax M2.7)...')
    
    for (const agent of agents.slice(2, 4)) {
      setAgentStatuses(prev => ({ ...prev, [agent.name]: 'building' }))
      addLog(`${agent.icon} ${agent.name}: Building ${agent.sections.join(', ')}...`)
      
      let result: UIComponent[] = []
      let attempts = 0
      
      while (result.length === 0 && attempts < 3) {
        try {
          const systemPrompt = attempts === 0
            ? `You are expert UI builder. Create polished components with gradient text for headlines. Types: header{h:60}, text{fs:32}, button{w:200,h:50}, card{w:280,h:180}. Dark #0a0a0f, accents #8b5cf6,#ec4899. JSON array only.`
            : `Create simple but valid components. Output JSON array with header, text, button, card types.`
          
          const userPrompt = attempts === 0
            ? `Generate ${agent.sections.join(' + ')} with high quality. Include gradient text headlines.`
            : `Create basic ${agent.sections.join(' + ')} components as JSON array.`
          
          const aiResult = await callAI(agent.provider, '', agent.model, systemPrompt, userPrompt)
          
          if (Array.isArray(aiResult) && aiResult.length > 0) {
            result = aiResult
          } else if (attempts === 1) {
            result = generateFallback(agent.sections, agent.name)
          }
        } catch (err) {
          addLog(`⚠️ ${agent.name} attempt ${attempts + 1} failed: ${err}`)
          if (attempts === 1) result = generateFallback(agent.sections, agent.name)
        }
        attempts++
      }
      
      if (result.length > 0) {
        allResults.push(...result)
        addLog(`✅ ${agent.name}: ${result.length} components`)
      }
      setAgentStatuses(prev => ({ ...prev, [agent.name]: result.length > 0 ? 'done' : 'error' }))
    }
    
    // PHASE 3: Enhancement
    setPhase('PHASE 3: Enhancement')
    addLog('✨ Enhancing (MiniMax)...')
    setAgentStatuses(prev => ({ ...prev, ['Enhancer']: 'building' }))
    
    try {
      const enhance = await callAI(
        'minimax', '', 'MiniMax-M2.7',
        `Add polish: gradient texts, decorative elements, glows, better spacing. Return 3-5 components as JSON array.`,
        `Current: ${JSON.stringify(allResults.slice(0, 6))}`
      )
      if (Array.isArray(enhance) && enhance.length > 0) {
        allResults.push(...enhance)
        addLog(`✨ Enhancer: Added ${enhance.length} polish components`)
      }
    } catch (err) {
      addLog(`⚠️ Enhancement skipped: ${err}`)
    }
    setAgentStatuses(prev => ({ ...prev, ['Enhancer']: 'done' }))
    
    // PHASE 4: QA Enforcement
    setPhase('PHASE 4: QA Check')
    addLog('✅ QA: Enforcing standards...')
    
    const hasHeader = allResults.some(c => c.type === 'header')
    const hasHero = allResults.some(c => c.type === 'text' && c.y < 200)
    const hasCards = allResults.filter(c => c.type === 'card').length >= 3
    const hasButtons = allResults.some(c => c.type === 'button')
    
    if (!hasHeader) { allResults.unshift({ id: 'qa-header', type: 'header', content: '🎨 Pretext AI UI', x: 0, y: 0, width: 1200, height: 60, style: {}, visible: true }); addLog('🔧 QA: Added missing header') }
    if (!hasHero) { allResults.push({ id: 'qa-hero', type: 'text', content: 'Build UI with AI', x: 50, y: 100, width: 1100, height: 60, style: { fontSize: '48', background: 'gradient' }, visible: true }); addLog('🔧 QA: Added missing hero') }
    if (!hasCards) { 
      ['⚡ Zero Reflow', '🎨 Canvas', '🤖 AI Controlled'].forEach((c, i) => {
        allResults.push({ id: `qa-card-${i}`, type: 'card', content: `${c}\nAI Generated`, x: 50 + i * 300, y: 400, width: 280, height: 180, style: { background: 'rgba(255,255,255,0.08)' }, visible: true })
      })
      addLog('🔧 QA: Added missing cards')
    }
    if (!hasButtons) { allResults.push({ id: 'qa-cta', type: 'button', content: '🚀 Get Started', x: 500, y: 1200, width: 200, height: 50, style: { background: '#8b5cf6' }, visible: true }); addLog('🔧 QA: Added missing CTA') }
    
    addLog(`✅ QA: ${allResults.length} total components`)
    setAgentStatuses(prev => ({ ...prev, ['QA']: 'done' }))
    
    setComponents(allResults)
    setPhase('complete')
    setIsGenerating(false)
    addLog(`🎉 Done! ${allResults.length} components built`)
  }
  
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">🎨 Pretext AI UI</h1>
        <div className="flex items-center gap-3">
          <span className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-purple-500 animate-pulse' : 'bg-green-500'}`} />
          <span className="text-gray-400 text-sm hidden md:inline">{isGenerating ? phase : `${components.length} components`}</span>
          <div className="flex bg-white/5 rounded-lg p-1">
            <button onClick={() => setView('canvas')} className={`px-3 py-1 rounded text-sm ${view === 'canvas' ? 'bg-purple-600' : ''}`}>Canvas</button>
            <button onClick={() => setView('html')} className={`px-3 py-1 rounded text-sm ${view === 'html' ? 'bg-purple-600' : ''}`}>HTML</button>
          </div>
          <button onClick={runSwarm} disabled={isGenerating} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium disabled:opacity-50">
            🐝 New Swarm
          </button>
        </div>
      </header>
      
      {isGenerating && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0f]/95 pt-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {phase}
            </h2>
            
            <div className="grid grid-cols-5 gap-2 mb-4">
              {['Architect', 'Designer', 'Content', 'Frontend', 'Enhancer'].map(name => (
                <div key={name} className={`rounded-lg p-2 text-center ${agentStatuses[name] === 'done' ? 'bg-green-900/30 border border-green-500/30' : agentStatuses[name] === 'error' ? 'bg-red-900/30 border border-red-500/30' : 'bg-white/5'}`}>
                  <div className="text-xl">{name === 'Architect' ? '🏗️' : name === 'Designer' ? '🎨' : name === 'Content' ? '✍️' : name === 'Frontend' ? '💻' : '✨'}</div>
                  <div className="text-xs">{name}</div>
                  <div className={`text-xs ${agentStatuses[name] === 'done' ? 'text-green-400' : agentStatuses[name] === 'error' ? 'text-red-400' : 'text-gray-500'}`}>
                    {agentStatuses[name] === 'done' ? '✅' : agentStatuses[name] === 'error' ? '❌' : agentStatuses[name] === 'building' ? '⏳' : '⭕'}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-black/50 rounded-lg p-4 h-48 overflow-auto border border-white/10">
              <pre className="text-xs text-purple-400 whitespace-pre-wrap font-mono">
                {logs.join('\n') || 'Starting...'}
              </pre>
            </div>
          </div>
        </div>
      )}
      
      <main className="pt-16 h-screen">
        <div className="h-full overflow-auto">
          {view === 'canvas' ? (
            <div className="p-4 flex justify-center">
              <CanvasRenderer components={components} />
            </div>
          ) : (
            <HTMLPreview components={components} />
          )}
        </div>
      </main>
    </div>
  )
}
