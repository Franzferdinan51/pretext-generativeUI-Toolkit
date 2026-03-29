// GENERATIVE UI - AI SWARM BUILDING WITH MULTI-PROVIDER SUPPORT
// Multiple AI agents build different sections in parallel

import React, { useState, useEffect, useRef } from 'react'

// Provider configurations
const PROVIDERS = {
  lmstudio: { name: 'LM Studio', endpoint: '/api/lm-studio', icon: '🖥️', color: '#10b981' },
  minimax: { name: 'MiniMax', endpoint: 'https://api.minimax.io/v1', icon: '🚀', color: '#f59e0b' },
  openai: { name: 'OpenAI', endpoint: 'https://api.openai.com/v1', icon: '🤖', color: '#10a54a' },
  anthropic: { name: 'Claude', endpoint: 'https://api.anthropic.com/v1', icon: '🧠', color: '#d946ef' },
  moonshot: { name: 'Kimi', endpoint: 'https://api.moonshot.cn/v1', icon: '🌙', color: '#6366f1' },
  google: { name: 'Gemini', endpoint: 'https://generativelanguage.googleapis.com/v1', icon: '🔵', color: '#4285f4' },
  groq: { name: 'Groq', endpoint: 'https://api.groq.com/openai/v1', icon: '⚡', color: '#f97316' },
  deepseek: { name: 'DeepSeek', endpoint: 'https://api.deepseek.com/v1', icon: '🔮', color: '#06b6d4' },
  ollama: { name: 'Ollama', endpoint: 'http://localhost:11434/v1', icon: '🦙', color: '#84cc16' },
  together: { name: 'Together', endpoint: 'https://api.together.xyz/v1', icon: '☁️', color: '#8b5cf6' }
}

type Provider = keyof typeof PROVIDERS

interface UIComponent {
  id: string
  type: 'text' | 'button' | 'card' | 'input' | 'container' | 'header' | 'list'
  content: string
  x: number; y: number; width: number; height: number
  style: Record<string, string>
  onClick?: string
  visible: boolean
}

// Swarm agent definition
interface SwarmAgent {
  id: string
  name: string
  role: string
  icon: string
  sections: string[]
  provider: Provider
  model: string
  status: 'waiting' | 'building' | 'done' | 'error'
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
    
    canvas.width = 1200
    canvas.height = 1400
    
    ctx.fillStyle = '#0a0a0f'
    ctx.fillRect(0, 0, 1200, 1400)
    
    for (const comp of components) {
      if (!comp.visible) continue
      const isHovered = hoveredId === comp.id
      
      switch (comp.type) {
        case 'header':
          ctx.fillStyle = 'rgba(0,0,0,0.8)'
          ctx.fillRect(comp.x, comp.y, comp.width, comp.height || 60)
          ctx.fillStyle = '#fff'
          ctx.font = 'bold 20px Inter'
          ctx.fillText(comp.content, comp.x + 20, comp.y + 38)
          break
        case 'text':
          const fontSize = parseInt(comp.style.fontSize || '16')
          ctx.font = `${fontSize}px Inter`
          ctx.fillStyle = comp.style.color || '#fff'
          if (comp.style.background?.includes('gradient')) {
            const gradient = ctx.createLinearGradient(comp.x, comp.y, comp.x + 400, comp.y)
            gradient.addColorStop(0, '#8b5cf6')
            gradient.addColorStop(1, '#ec4899')
            ctx.fillStyle = gradient
          }
          ctx.fillText(comp.content, comp.x, comp.y + fontSize)
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
          ctx.strokeStyle = isHovered ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.1)'
          ctx.stroke()
          ctx.fillStyle = '#fff'
          ctx.font = 'bold 18px Inter'
          const lines = comp.content.match(/.{1,30}/g) || [comp.content]
          lines.forEach((line, i) => {
            ctx.fillText(line, comp.x + 16, comp.y + 35 + i * 24)
          })
          break
      }
    }
  }, [components, hoveredId])
  
  const handleMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
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
    canvas.style.cursor = found ? 'pointer' : 'default'
  }
  
  return <canvas ref={canvasRef} className="w-full rounded-xl" onMouseMove={handleMove} />
}

function HTMLPreview({ components }: { components: UIComponent[] }) {
  const visible = components.filter(c => c.visible)
  const texts = visible.filter(c => c.type === 'text')
  const cards = visible.filter(c => c.type === 'card')
  const buttons = visible.filter(c => c.type === 'button')
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Generated</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background: #0a0a0f; color: white; font-family: Inter, system-ui, sans-serif; }
    .gradient-text { background: linear-gradient(to right, #8b5cf6, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .gradient-bg { background: linear-gradient(135deg, #8b5cf6, #ec4899); }
  </style>
</head>
<body class="min-h-screen">
  <section class="pt-32 pb-16 px-4 text-center">
    ${texts.map(t => `<h2 class="text-4xl font-black mb-4" style="color: ${t.style.color || '#fff'}">${t.content}</h2>`).join('')}
  </section>
  ${cards.length > 0 ? `<section class="py-16 px-4">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-${Math.min(cards.length, 3)} gap-6">
      ${cards.map(c => `<div class="p-6 rounded-xl border border-white/10" style="background: ${c.style.background || 'rgba(255,255,255,0.05)'}">
        <h3 class="text-lg font-bold mb-2">${c.content}</h3>
        <p class="text-gray-400">Generated by AI Swarm</p>
      </div>`).join('')}
    </div>
  </section>` : ''}
  ${buttons.length > 0 ? `<section class="py-12 text-center">
    ${buttons.map(b => `<button class="px-6 py-3 rounded-lg font-bold gradient-bg hover:opacity-90 transition mx-2">${b.content}</button>`).join('')}
  </section>` : ''}
</body>
</html>`
  
  return <iframe className="w-full h-full border-0" srcDoc={html} title="Preview" sandbox="allow-scripts" />
}

function SettingsModal({ isOpen, onClose, settings, onSave, swarmAgents, onSwarmChange }: { 
  isOpen: boolean; 
  onClose: () => void; 
  settings: { provider: Provider; apiKey: string; model: string };
  onSave: (s: any) => void;
  swarmAgents: SwarmAgent[];
  onSwarmChange: (agents: SwarmAgent[]) => void;
}) {
  const [provider, setProvider] = useState(settings.provider)
  const [apiKey, setApiKey] = useState(settings.apiKey)
  const [model, setModel] = useState(settings.model)
  
  if (!isOpen) return null
  
  const updateAgent = (index: number, field: keyof SwarmAgent, value: any) => {
    const newAgents = [...swarmAgents]
    newAgents[index] = { ...newAgents[index], [field]: value }
    onSwarmChange(newAgents)
  }
  
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#1a1a2e] rounded-2xl p-6 max-w-2xl w-full border border-white/10 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">⚙️ Swarm Settings</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Default Provider</h3>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(PROVIDERS).map(([key, p]) => (
                <button
                  key={key}
                  onClick={() => { setProvider(key as Provider); setModel('') }}
                  className={`p-2 rounded-lg text-center text-xs ${provider === key ? 'bg-purple-600 ring-2 ring-purple-400' : 'bg-white/5 hover:bg-white/10'}`}
                >
                  <div className="text-lg">{p.icon}</div>
                  <div className="truncate">{p.name}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Model</label>
              <input
                type="text"
                value={model}
                onChange={e => setModel(e.target.value)}
                placeholder="auto"
                className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">🐝 Swarm Agents</h3>
            <div className="space-y-2">
              {swarmAgents.map((agent, i) => (
                <div key={agent.id} className="bg-black/30 rounded-lg p-3 flex items-center gap-3">
                  <span className="text-2xl">{agent.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{agent.name}</div>
                    <div className="text-xs text-gray-400">{agent.sections.join(', ')}</div>
                  </div>
                  <select
                    value={agent.provider}
                    onChange={e => updateAgent(i, 'provider', e.target.value)}
                    className="bg-white/10 border-0 rounded px-2 py-1 text-xs"
                  >
                    {Object.keys(PROVIDERS).map(k => (
                      <option key={k} value={k}>{PROVIDERS[k as Provider].icon} {k}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={agent.model}
                    onChange={e => updateAgent(i, 'model', e.target.value)}
                    placeholder="model"
                    className="w-28 bg-white/10 border-0 rounded px-2 py-1 text-xs"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 px-4 py-2 bg-white/10 rounded-lg">Cancel</button>
          <button 
            onClick={() => { onSave({ provider, apiKey, model }); onClose() }}
            className="flex-1 px-4 py-2 bg-purple-600 rounded-lg font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [components, setComponents] = useState<UIComponent[]>([])
  const [aiThinking, setAiThinking] = useState('')
  const [isGenerating, setIsGenerating] = useState(true)
  const [view, setView] = useState<'canvas' | 'html'>('canvas')
  const [showSettings, setShowSettings] = useState(false)
  const [swarmAgents, setSwarmAgents] = useState<SwarmAgent[]>([
    { id: '1', name: 'Architect', role: 'header', icon: '🏗️', sections: ['Header', 'Hero'], provider: 'minimax', model: 'MiniMax-M2.7', status: 'waiting' },
    { id: '2', name: 'Designer', role: 'design', icon: '🎨', sections: ['Features', 'Stats'], provider: 'minimax', model: 'MiniMax-M2.7', status: 'waiting' },
    { id: '3', name: 'Frontend', role: 'content', icon: '💻', sections: ['Toolkit', 'How It Works'], provider: 'minimax', model: 'MiniMax-M2.7', status: 'waiting' },
    { id: '4', name: 'QA', role: 'footer', icon: '✅', sections: ['CTA', 'Footer'], provider: 'minimax', model: 'MiniMax-M2.7', status: 'waiting' }
  ])
  const [settings, setSettings] = useState({
    provider: 'minimax' as Provider,
    apiKey: 'sk-cp-f6PbhZS6uNSD1L-mByhEw3RzISEgKDmaQ-kkQGUx79uBrnAZDVWVnDwmLwHC19V1jT07oW7CcU2Dn_3Zr8c90a5xYqk9J1BBNXd0C9bVRbyr-PLbfd31kUE',
    model: 'MiniMax-M2.7'
  })
  
  const initRef = useRef(false)
  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      swarmBuild()
    }
  }, [])
  
  async function callAI(provider: Provider, apiKey: string, model: string, systemPrompt: string, userPrompt: string) {
    const p = PROVIDERS[provider]
    const actualModel = model || p.name.toLowerCase().replace(' ', '-')
    
    const response = await fetch(`${p.endpoint}/chat/completions`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: actualModel,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        stream: true,
        max_tokens: 2048
      })
    })
    
    const reader = response.body?.getReader()
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
            }
          } catch {}
        }
      }
    }
    
    const match = full.match(/\[[\s\S]*\]/)
    if (match) {
      return JSON.parse(match[0])
    }
    return []
  }
  
  async function swarmBuild() {
    setIsGenerating(true)
    setComponents([])
    
    const systemBase = `You are an expert UI generator. Create JSON components for the sections assigned to you.

COMPONENT TYPES:
- header: {type:"header", content:"Title", x:0, y:0, width:1200, height:60}
- text: {type:"text", content:"...", x:0, y:80, width:1200, height:40, style:{fontSize:"32",color:"#fff"}}
- button: {type:"button", content:"...", x:500, y:300, width:200, height:50, style:{background:"#8b5cf6"}}
- card: {type:"card", content:"Title\\nSubtitle", x:50, y:400, width:280, height:180, style:{background:"rgba(255,255,255,0.08)"}}

RULES:
- Dark theme #0a0a0f
- Accents: #8b5cf6, #ec4899, #06b6d4
- Output ONLY valid JSON array, no markdown`

    // Run all swarm agents in parallel
    const agentPromises = swarmAgents.map(async (agent) => {
      setAiThinking(prev => prev + `${agent.icon} ${agent.name}: Starting...\n`)
      
      const sectionsPrompt = agent.sections.map(s => {
        switch (s) {
          case 'Header': return 'HEADER: 1200x60px dark bar with "🎨 Pretext AI UI" logo'
          case 'Hero': return 'HERO: Gradient headline "Build UI with AI", subtitle, CTA button'
          case 'Features': return 'FEATURES: 4 cards - "⚡ Zero Reflow", "🎨 Canvas", "🤖 AI Controlled", "✨ Streaming"'
          case 'Stats': return 'STATS: 4 boxes - "50+ Components", "0ms Reflow", "100% Free", "Live Preview"'
          case 'Toolkit': return 'TOOLKIT: 3 cards - Components, Effects, AI Integration'
          case 'How It Works': return 'HOW IT WORKS: 3 steps - Describe, Generate, Preview'
          case 'CTA': return 'CTA: Large gradient button "Start Building Free"'
          case 'Footer': return 'FOOTER: GitHub link, copyright'
          default: return s
        }
      }).join('\n')
      
      try {
        const result = await callAI(
          agent.provider, 
          settings.apiKey, 
          agent.model, 
          systemBase,
          `Generate: ${sectionsPrompt}\n\nY positions: Header y:0, Hero y:80, Features y:300, Stats y:600, Toolkit y:900, HowItWorks y:1100, CTA y:1300, Footer y:1400`
        )
        
        setAiThinking(prev => prev + `${agent.icon} ${agent.name}: ✅ Done!\n`)
        return { ...agent, status: 'done' as const, result }
      } catch (err) {
        setAiThinking(prev => prev + `${agent.icon} ${agent.name}: ❌ Error\n`)
        return { ...agent, status: 'error' as const, result: [] }
      }
    })
    
    const results = await Promise.all(agentPromises)
    
    // Merge all results
    const allComponents = results.flatMap(r => r.result || [])
    setComponents(allComponents)
    setAiThinking(`✅ Swarm Complete! ${allComponents.length} components built`)
    setIsGenerating(false)
  }
  
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
        settings={settings}
        onSave={(s) => setSettings(s)}
        swarmAgents={swarmAgents}
        onSwarmChange={setSwarmAgents}
      />
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🎨 Pretext AI UI
          </h1>
          <div className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-purple-500 animate-pulse' : 'bg-green-500'}`} />
            <span className="text-gray-400 text-sm hidden md:inline">
              {isGenerating ? '🐝 Swarm Building...' : `${components.length} components`}
            </span>
            <div className="flex bg-white/5 rounded-lg p-1">
              <button onClick={() => setView('canvas')} className={`px-3 py-1 rounded text-sm ${view === 'canvas' ? 'bg-purple-600' : ''}`}>Canvas</button>
              <button onClick={() => setView('html')} className={`px-3 py-1 rounded text-sm ${view === 'html' ? 'bg-purple-600' : ''}`}>HTML</button>
            </div>
            <button onClick={() => setShowSettings(true)} className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm">
              ⚙️ Swarm
            </button>
            <button onClick={swarmBuild} disabled={isGenerating} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium disabled:opacity-50">
              🐝 New Swarm
            </button>
          </div>
        </div>
      </header>
      
      <main className="pt-16 h-screen">
        {isGenerating && (
          <div className="absolute inset-0 z-40 bg-[#0a0a0f]/90 flex items-start justify-center pt-20">
            <div className="max-w-2xl w-full px-4">
              <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                🐝 AI Swarm Building
              </h2>
              <div className="bg-black/50 rounded-lg p-4 max-h-48 overflow-auto">
                <pre className="text-xs text-purple-400 whitespace-pre-wrap font-mono">
                  {aiThinking || 'Initializing swarm...'}
                </pre>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {swarmAgents.map(agent => (
                  <div key={agent.id} className="bg-white/5 rounded-lg p-2 text-center">
                    <div className="text-2xl mb-1">{agent.icon}</div>
                    <div className="text-xs font-medium">{agent.name}</div>
                    <div className="text-xs text-gray-500">{PROVIDERS[agent.provider]?.icon} {agent.model}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
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
