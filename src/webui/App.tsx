// GENERATIVE UI - AI BUILDS THE WHOLE WEBSITE
// No chat - just AI generates the website live

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { prepare, layout } from '@chenglou/pretext'

const LM_STUDIO_URL = '/api/lm-studio'
const LM_STUDIO_KEY = 'sk-lm-zO7bswIc:WkHEMTUfVNkq5WYNyFOW'

// ============ TYPES ============
interface UIComponent {
  id: string
  type: 'text' | 'button' | 'card' | 'input' | 'container' | 'header' | 'list'
  content: string
  x: number; y: number; width: number; height: number
  style: Record<string, string>
  onClick?: string
  visible: boolean
}

// ============ PRETEXT CANVAS ENGINE ============
function PretextCanvas({ text, font = '16px Inter', maxWidth = 400, color = '#fff' }: { text: string; font?: string; maxWidth?: number; color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !text) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const prepared = prepare(text, font)
    const measured = layout(prepared, maxWidth, 24)
    
    canvas.width = maxWidth
    canvas.height = measured.height + 40
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = font
    ctx.fillStyle = color
    
    for (const line of measured.lines) {
      ctx.fillText(line.text, 0, line.y + 24)
    }
  }, [text, font, maxWidth, color])
  
  return <canvas ref={canvasRef} className="block" />
}

// ============ CANVAS RENDERER ============
function CanvasRenderer({ components, onInteract }: { components: UIComponent[]; onInteract?: (id: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = 1200
    canvas.height = 800
    
    ctx.fillStyle = '#0a0a0f'
    ctx.fillRect(0, 0, 1200, 800)
    
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
          const prep = prepare(comp.content, `${fontSize}px Inter`)
          const meas = layout(prep, comp.width, fontSize * 1.5)
          for (const line of meas.lines) {
            ctx.fillText(line.text, comp.x, comp.y + line.y + fontSize)
          }
          break
          
        case 'button':
          ctx.fillStyle = isHovered ? '#7c3aed' : '#8b5cf6'
          ctx.beginPath()
          ctx.roundRect(comp.x, comp.y, comp.width, comp.height || 44, 8)
          ctx.fill()
          if (isHovered) {
            ctx.shadowColor = '#8b5cf6'
            ctx.shadowBlur = 20
            ctx.fill()
            ctx.shadowBlur = 0
          }
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
          ctx.lineWidth = isHovered ? 2 : 1
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

// ============ HTML PREVIEW ============
function HTMLPreview({ components }: { components: UIComponent[] }) {
  const visible = components.filter(c => c.visible)
  
  const header = visible.find(c => c.type === 'header')
  const texts = visible.filter(c => c.type === 'text')
  const cards = visible.filter(c => c.type === 'card')
  const buttons = visible.filter(c => c.type === 'button')
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Generated Website</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background: #0a0a0f; color: white; font-family: Inter, system-ui, sans-serif; }
    .gradient-text { background: linear-gradient(to right, #8b5cf6, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .gradient-bg { background: linear-gradient(135deg, #8b5cf6, #ec4899); }
  </style>
</head>
<body class="min-h-screen">
  
  ${header ? `<header class="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur border-b border-white/10 p-4 z-50">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-xl font-bold gradient-text">${header.content}</h1>
    </div>
  </header>` : ''}
  
  ${texts.length > 0 ? `<section class="pt-32 pb-16 px-4 text-center">
    ${texts.map(t => `<h2 class="text-${parseInt(t.style.fontSize || '24') / 4}xl font-black mb-4" style="color: ${t.style.color || '#fff'}">${t.content}</h2>`).join('')}
  </section>` : ''}
  
  ${cards.length > 0 ? `<section class="py-16 px-4">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-${Math.min(cards.length, 3)} gap-6">
      ${cards.map(c => `<div class="p-6 rounded-xl border border-white/10" style="background: ${c.style.background || 'rgba(255,255,255,0.05)'}">
        <h3 class="text-lg font-bold mb-2">${c.content}</h3>
        <p class="text-gray-400">Generated by AI</p>
      </div>`).join('')}
    </div>
  </section>` : ''}
  
  ${buttons.length > 0 ? `<section class="py-12 text-center">
    <div class="flex flex-wrap justify-center gap-4">
      ${buttons.map(b => `<button class="px-6 py-3 rounded-lg font-bold gradient-bg hover:opacity-90 transition">${b.content}</button>`).join('')}
    </div>
  </section>` : ''}
  
</body>
</html>`
  
  return <iframe className="w-full h-full border-0" srcDoc={html} title="Preview" sandbox="allow-scripts" />
}

// ============ MAIN APP ============
export default function App() {
  const [components, setComponents] = useState<UIComponent[]>([])
  const [aiThinking, setAiThinking] = useState('')
  const [isGenerating, setIsGenerating] = useState(true)
  const [view, setView] = useState<'canvas' | 'html'>('canvas')
  const [errors, setErrors] = useState<string[]>([])
  
  // Generate website on mount
  useEffect(() => {
    generateWebsite('Generate a DEMO PAGE for Pretext AI UI Toolkit with: header, hero section with gradient headline, features section with 4 cards, demo section, pricing section with 3 tiers, CTA, and footer')
  }, [])
  
  async function generateWebsite(prompt: string) {
    setIsGenerating(true)
    setAiThinking('')
    setComponents([])
    setErrors([])
    
    const systemPrompt = `You are a UI generator. Create a DEMO PAGE showcasing AI UI toolkit capabilities.

## MUST GENERATE (every time):
1. HEADER: "🎨 Pretext AI UI Toolkit" logo on left, nav links on right (Home, Docs, GitHub, Demo)
2. HERO: Large gradient headline "Build UI with AI", subtitle "Zero DOM Reflow • Streaming • Canvas Rendering • Pretext", big CTA button "Try Demo"
3. FEATURES SECTION: Title "Why Pretext AI UI?", 4 feature CARDS:
   - Card 1: "⚡ Zero Reflow" + "Text measured without DOM touches"
   - Card 2: "🎨 Canvas Rendering" + "Everything drawn, not DOM elements"  
   - Card 3: "🤖 AI Controlled" + "AI generates UI in real-time"
   - Card 4: "✨ Streaming" + "Components appear as AI thinks"
4. TOOLKIT SECTION: Title "The Toolkit", 3 LINK/CARD components linking to features:
   - Card 1: "📦 Components" + "50+ Pre-built components ready to use" + link to components
   - Card 2: "🎨 Effects" + "Particles, gradients, glows, animations" + link to effects
   - Card 3: "🤖 AI Integration" + "LM Studio, OpenAI, Claude ready" + link to AI
5. HOW IT WORKS SECTION: Title "How It Works", 3 STEP cards:
   - Step 1: "Describe" + "Type what you want"
   - Step 2: "AI Generates" + "Watch components appear"
   - Step 3: "Preview" + "See your UI instantly"
6. STATS SECTION: 4 stat boxes showing numbers like "50+ Components", "0ms Reflow", "100% Free", "Live Preview"
7. CTA SECTION: Centered gradient button "Start Building Free"
8. FOOTER: GitHub: github.com/Franzferdinan51/pretext-generativeUI-Toolkit, links, copyright "Built with Pretext AI UI"

## COMPONENT TYPES:
- header: {type:"header", height:60, background:"rgba(0,0,0,0.8)"}
- text: {type:"text", content:"...", fontSize:"32" for headlines, "18" for body}
- button: {type:"button", content:"...", width:180, height:50, style:{background:"#8b5cf6"}}
- card: {type:"card", content:"Title", width:280, height:180, style:{background:"rgba(255,255,255,0.05)"}}

## RULES:
- Canvas: 1200x800px (scrollable)
- Dark theme: #0a0a0f background
- Purple accent: #8b5cf6, Pink: #ec4899, Cyan: #06b6d4
- Header y:0, Hero y:80, Features y:280, Toolkit y:520, HowItWorks y:750, Stats y:980, CTA y:1100, Footer y:1200
- Cards in a row with gap: x positions 50, 350, 650 for 3 cards
- Use gradient text for headlines: style:{background:"linear-gradient(135deg,#8b5cf6,#ec4899)"}

## OUTPUT FORMAT:
Output ONLY valid JSON array, NO markdown, NO explanation:
[{"id":"1","type":"header","content":"🎨 Pretext AI UI","x":0,"y":0,"width":1200,"height":60,"style":{"background":"rgba(0,0,0,0.8)"},"visible":true},...]

Generate a complete demo page now with ALL sections listed above!`

    try {
      const response = await fetch(`${LM_STUDIO_URL}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LM_STUDIO_KEY}`
        },
        body: JSON.stringify({
          model: 'qwen3.5-9b', // Fast initial generation
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
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
        const lines = chunk.split('\n')
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6)
            if (dataStr === '[DONE]') continue
            try {
              const data = JSON.parse(dataStr)
              if (data.choices?.[0]?.delta?.content) {
                const token = data.choices[0].delta.content
                full += token
                setAiThinking(full.slice(-200))
                
                const match = full.match(/\[[\s\S]*\]/)
                if (match) {
                  try {
                    const parsed = JSON.parse(match[0])
                    setComponents(parsed)
                  } catch {
                    setErrors(['Parse error - AI output was malformed'])
                  }
                }
              }
            } catch {}
          }
        }
      }
      
    } catch (err) {
      setErrors([`Error: ${err}`])
    }
    
    // Step 2: Enhance with 27B for quality
    setAiThinking(prev => prev + '\n\n🎯 Quality 27B: Enhancing UI...\n')
    try {
      const enhancePrompt = `Enhance this UI JSON - add more visual polish, better spacing, more components, and make it more impressive. Return ONLY the enhanced JSON array, no explanation:
${JSON.stringify(components)}

Output ONLY valid JSON array:`

      const response2 = await fetch(`${LM_STUDIO_URL}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LM_STUDIO_KEY}`
        },
        body: JSON.stringify({
          model: 'qwen3.5-27b',
          messages: [
            { role: 'system', content: 'You enhance UI JSON. Output ONLY valid JSON array.' },
            { role: 'user', content: enhancePrompt }
          ],
          stream: true,
          max_tokens: 2048
        })
      })
      
      const reader2 = response2.body?.getReader()
      const decoder2 = new TextDecoder()
      let full2 = ''
      
      while (true) {
        const { done, value } = await reader2.read()
        if (done) break
        
        const chunk2 = decoder2.decode(value, { stream: true })
        const lines2 = chunk2.split('\n')
        
        for (const line2 of lines2) {
          if (line2.startsWith('data: ')) {
            const dataStr2 = line2.slice(6)
            if (dataStr2 === '[DONE]') continue
            try {
              const data2 = JSON.parse(dataStr2)
              if (data2.choices?.[0]?.delta?.content) {
                const token2 = data2.choices[0].delta.content
                full2 += token2
                setAiThinking(prev => prev.slice(0, -50) + '🎯 Enhanced!')
                
                const match2 = full2.match(/\[[\s\S]*\]/)
                if (match2) {
                  try {
                    const parsed2 = JSON.parse(match2[0])
                    setComponents(parsed2)
                  } catch {}
                }
              }
            } catch {}
          }
        }
      }
      setAiThinking(prev => prev + '\n\n✅ Done!')
    } catch (err2) {
      setAiThinking(prev => prev + `\n⚠️ Enhancement skipped: ${err2}`)
    } finally {
      setIsGenerating(false)
    }
  }
  
  // Handle component click
  function handleClick(id: string) {
    const comp = components.find(c => c.id === id)
    if (comp?.onClick) {
      generateWebsite(comp.onClick)
    }
  }
  
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🎨 Pretext AI UI
          </h1>
          <div className="flex items-center gap-3">
            {/* Status */}
            <div className="flex items-center gap-2 text-sm">
              <span className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-purple-500 animate-pulse' : 'bg-green-500'}`} />
              <span className="text-gray-400">
                {isGenerating ? 'Generating...' : `${components.length} components`}
              </span>
            </div>
            
            {/* View Toggle */}
            <div className="flex bg-white/5 rounded-lg p-1">
              <button
                onClick={() => setView('canvas')}
                className={`px-3 py-1 rounded text-sm ${view === 'canvas' ? 'bg-purple-600' : ''}`}
              >
                Canvas
              </button>
              <button
                onClick={() => setView('html')}
                className={`px-3 py-1 rounded text-sm ${view === 'html' ? 'bg-purple-600' : ''}`}
              >
                HTML
              </button>
            </div>
            
            {/* Regenerate */}
            <button
              onClick={() => generateWebsite('Generate a beautiful AI toolkit website with header "🎨 Pretext AI", hero section, feature cards, pricing, and footer')}
              disabled={isGenerating}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium disabled:opacity-50"
            >
              🔄 New
            </button>
            
            {/* Download */}
            {components.length > 0 && (
              <button
                onClick={() => {
                  const html = `<!DOCTYPE html><html><body>${components.map(c => `<div>${c.content}</div>`).join('')}</body></html>`
                  const blob = new Blob([html], { type: 'text/html' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = 'website.html'
                  a.click()
                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium"
              >
                📥 Download
              </button>
            )}
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="pt-16 h-screen">
        {/* Loading State */}
        {isGenerating && (
          <div className="absolute inset-0 z-40 bg-[#0a0a0f]/90 flex items-center justify-center">
            <div className="text-center max-w-2xl">
              <div className="text-4xl mb-4 animate-pulse">🤖</div>
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Building Your Website
              </h2>
              <p className="text-gray-400 mb-4">Watch the AI generate components in real-time</p>
              <div className="bg-black/50 rounded-lg p-4 max-h-32 overflow-auto text-left">
                <pre className="text-xs text-purple-400 whitespace-pre-wrap font-mono">
                  {aiThinking || 'Initializing...'}
                </pre>
              </div>
            </div>
          </div>
        )}
        
        {/* Errors */}
        {errors.length > 0 && (
          <div className="absolute top-20 left-4 right-4 z-50 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
            {errors.map((e, i) => <p key={i} className="text-red-400 text-sm">{e}</p>)}
          </div>
        )}
        
        {/* Preview */}
        <div className="h-full">
          {view === 'canvas' ? (
            <CanvasRenderer components={components} onInteract={handleClick} />
          ) : (
            <HTMLPreview components={components} />
          )}
        </div>
      </main>
    </div>
  )
}
