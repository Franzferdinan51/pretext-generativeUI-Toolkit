// GENERATIVE UI - AI BUILDS THE WHOLE WEBSITE
// Multi-Provider: LM Studio, MiniMax, OpenAI, Anthropic, Kimi, Gemini, Groq, DeepSeek

import React, { useState, useEffect, useRef, useCallback } from 'react'

// Provider configurations
const PROVIDERS = {
  lmstudio: {
    name: 'LM Studio (Local)',
    endpoint: 'http://100.116.54.125:1234/v1',
    icon: '🖥️',
    defaultModel: 'qwen3.5-27b',
    color: '#10b981'
  },
  minimax: {
    name: 'MiniMax',
    endpoint: 'https://api.minimax.io/v1',
    icon: '🚀',
    defaultModel: 'MiniMax-M2.7',
    color: '#f59e0b'
  },
  openai: {
    name: 'OpenAI',
    endpoint: 'https://api.openai.com/v1',
    icon: '🤖',
    defaultModel: 'gpt-4o',
    color: '#10a54a'
  },
  anthropic: {
    name: 'Anthropic (Claude)',
    endpoint: 'https://api.anthropic.com/v1',
    icon: '🧠',
    defaultModel: 'claude-3-sonnet',
    color: '#d946ef'
  },
  moonshot: {
    name: 'Moonshot (Kimi)',
    endpoint: 'https://api.moonshot.cn/v1',
    icon: '🌙',
    defaultModel: 'moonshot-v1-128k',
    color: '#6366f1'
  },
  google: {
    name: 'Google (Gemini)',
    endpoint: 'https://generativelanguage.googleapis.com/v1',
    icon: '🔵',
    defaultModel: 'gemini-pro',
    color: '#4285f4'
  },
  groq: {
    name: 'Groq',
    endpoint: 'https://api.groq.com/openai/v1',
    icon: '⚡',
    defaultModel: 'llama3-70b-8192',
    color: '#f97316'
  },
  deepseek: {
    name: 'DeepSeek',
    endpoint: 'https://api.deepseek.com/v1',
    icon: '🔮',
    defaultModel: 'deepseek-chat',
    color: '#06b6d4'
  },
  ollama: {
    name: 'Ollama (Local)',
    endpoint: 'http://localhost:11434/v1',
    icon: '🦙',
    defaultModel: 'llama3:70b',
    color: '#84cc16'
  },
  together: {
    name: 'Together AI',
    endpoint: 'https://api.together.xyz/v1',
    icon: '☁️',
    defaultModel: 'meta-llama/Llama-3-70b',
    color: '#8b5cf6'
  }
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

function CanvasRenderer({ components, onInteract }: { components: UIComponent[]; onInteract?: (id: string) => void }) {
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
          ctx.fillText(comp.content.slice(0, 25), comp.x + 16, comp.y + 35)
          break
      }
    }
  }, [components, hoveredId])
  
  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    for (const comp of components) {
      if (!comp.visible) continue
      if (x >= comp.x && x <= comp.x + comp.width && y >= comp.y && y <= comp.y + comp.height) {
        onInteract?.(comp.id)
        break
      }
    }
  }, [components, onInteract])
  
  const handleMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
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
  }, [components])
  
  return <canvas ref={canvasRef} className="w-full rounded-xl" onClick={handleClick} onMouseMove={handleMove} />
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
        <p class="text-gray-400">Generated by AI</p>
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

function SettingsModal({ isOpen, onClose, settings, onSave }: { 
  isOpen: boolean; 
  onClose: () => void; 
  settings: { provider: Provider; apiKey: string; model: string };
  onSave: (s: any) => void;
}) {
  const [provider, setProvider] = useState(settings.provider)
  const [apiKey, setApiKey] = useState(settings.apiKey)
  const [model, setModel] = useState(settings.model)
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#1a1a2e] rounded-2xl p-6 max-w-lg w-full border border-white/10" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">⚙️ AI Provider Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Provider</label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {Object.entries(PROVIDERS).map(([key, p]) => (
                <button
                  key={key}
                  onClick={() => { setProvider(key as Provider); setModel(p.defaultModel) }}
                  className={`p-2 rounded-lg text-left text-sm flex items-center gap-2 ${provider === key ? 'bg-purple-600 ring-2 ring-purple-400' : 'bg-white/5 hover:bg-white/10'}`}
                >
                  <span>{p.icon}</span>
                  <span className="truncate">{p.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder={provider === 'lmstudio' ? 'sk-lm-...' : 'API Key'}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Model</label>
            <input
              type="text"
              value={model}
              onChange={e => setModel(e.target.value)}
              placeholder={PROVIDERS[provider].defaultModel}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm"
            />
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
  const [settings, setSettings] = useState({
    provider: 'lmstudio' as Provider,
    apiKey: 'sk-lm-zO7bswIc:WkHEMTUfVNkq5WYNyFOW',
    model: 'qwen3.5-27b'
  })
  
  const initRef = useRef(false)
  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      generateWebsite()
    }
  }, [])
  
  async function generateWebsite() {
    setIsGenerating(true)
    setAiThinking(`${PROVIDERS[settings.provider].icon} ${PROVIDERS[settings.provider].name} generating...\n`)
    setComponents([])
    
    const provider = PROVIDERS[settings.provider]
    
    const systemPrompt = `You are a UI generator. Create a DEMO PAGE showcasing AI UI toolkit.

MUST GENERATE:
1. HEADER: "🎨 Pretext AI UI Toolkit"
2. HERO: "Build UI with AI" + subtitle + CTA button
3. FEATURES: 4 cards (Zero Reflow, Canvas, AI Controlled, Streaming)
4. TOOLKIT: 3 cards (Components, Effects, AI Integration)
5. HOW IT WORKS: 3 steps (Describe, Generate, Preview)
6. STATS: 4 boxes (50+ Components, 0ms Reflow, 100% Free, Live Preview)
7. CTA: Button
8. FOOTER: GitHub link

RULES:
- Canvas 1200x1400px, dark theme #0a0a0f
- Types: header(60px), text, button(180x50), card(280x180)
- Accents: #8b5cf6, #ec4899, #06b6d4

JSON array only:`

    try {
      const response = await fetch(`${provider.endpoint}/chat/completions`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(settings.provider === 'anthropic' ? { 'x-api-key': settings.apiKey, 'anthropic-version': '2023-06-01' } : { 'Authorization': `Bearer ${settings.apiKey}` })
        },
        body: JSON.stringify({
          model: settings.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: 'Generate demo page' }
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
                setAiThinking(`${provider.icon} ${provider.name}:\n${full.slice(-80)}\n\n✅ Done!`)
                
                const match = full.match(/\[[\s\S]*\]/)
                if (match) {
                  try {
                    const parsed = JSON.parse(match[0])
                    setComponents(parsed)
                  } catch {}
                }
              }
            } catch {}
          }
        }
      }
    } catch (err) {
      setAiThinking(`❌ Error: ${err}`)
    }
    
    setIsGenerating(false)
  }
  
  function handleClick(id: string) {
    const comp = components.find(c => c.id === id)
    if (comp?.onClick) generateWebsite()
  }
  
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
        settings={settings}
        onSave={(s) => { setSettings(s); generateWebsite() }}
      />
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🎨 Pretext AI UI
          </h1>
          <div className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-purple-500 animate-pulse' : 'bg-green-500'}`} />
            <span className="text-gray-400 text-sm hidden md:inline">
              {isGenerating ? 'Generating...' : `${components.length} components`}
            </span>
            <span className="text-xs px-2 py-1 rounded bg-white/10">
              {PROVIDERS[settings.provider].icon} {settings.model}
            </span>
            <div className="flex bg-white/5 rounded-lg p-1">
              <button onClick={() => setView('canvas')} className={`px-3 py-1 rounded text-sm ${view === 'canvas' ? 'bg-purple-600' : ''}`}>Canvas</button>
              <button onClick={() => setView('html')} className={`px-3 py-1 rounded text-sm ${view === 'html' ? 'bg-purple-600' : ''}`}>HTML</button>
            </div>
            <button onClick={() => setShowSettings(true)} className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm">
              ⚙️
            </button>
            <button onClick={generateWebsite} disabled={isGenerating} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium disabled:opacity-50">
              🔄 New
            </button>
          </div>
        </div>
      </header>
      
      <main className="pt-16 h-screen">
        {isGenerating && (
          <div className="absolute inset-0 z-40 bg-[#0a0a0f]/90 flex items-center justify-center">
            <div className="text-center max-w-2xl">
              <div className="text-4xl mb-4 animate-pulse">{PROVIDERS[settings.provider].icon}</div>
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Building Your Website
              </h2>
              <p className="text-gray-400 mb-4">{PROVIDERS[settings.provider].name}</p>
              <div className="bg-black/50 rounded-lg p-4 max-h-32 overflow-auto text-left">
                <pre className="text-xs text-purple-400 whitespace-pre-wrap font-mono">
                  {aiThinking || 'Initializing...'}
                </pre>
              </div>
            </div>
          </div>
        )}
        
        <div className="h-full overflow-auto">
          {view === 'canvas' ? (
            <div className="p-4 flex justify-center">
              <CanvasRenderer components={components} onInteract={handleClick} />
            </div>
          ) : (
            <HTMLPreview components={components} />
          )}
        </div>
      </main>
    </div>
  )
}
