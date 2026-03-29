// TRUE GENERATIVE UI - AI CONTROLS EVERYTHING
// Pretext for zero-reflow text, Canvas for rendering, AI as runtime engine

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { prepare, layout, prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

const LM_STUDIO_URL = '/api/lm-studio'
const LM_STUDIO_KEY = 'sk-lm-zO7bswIc:WkHEMTUfVNkq5WYNyFOW'

// ============ TYPES ============
interface Position { x: number; y: number }
interface UIStyle { background?: string; color?: string; fontSize?: string; borderRadius?: string; padding?: string }
interface UIComponent {
  id: string
  type: 'text' | 'button' | 'card' | 'input' | 'image' | 'container' | 'header' | 'list'
  content: string
  x: number; y: number; width: number; height: number
  style: UIStyle
  children?: UIComponent[]
  items?: string[]
  onClick?: string  // AI prompt to execute on click
  visible: boolean
}
interface AIGenerator {
  state: {
    components: UIComponent[]
    mousePos: Position
    focusedComponent: string | null
    history: UIComponent[][]
  }
  addComponent: (comp: UIComponent) => void
  updateComponent: (id: string, updates: Partial<UIComponent>) => void
  removeComponent: (id: string) => void
  setMousePos: (pos: Position) => void
  generateUI: (prompt: string) => Promise<void>
}

// ============ PRETEXT CANVAS ENGINE ============
function PretextCanvas({ 
  text, font = '16px Inter', x = 0, y = 0, maxWidth = 400, lineHeight = 24, color = '#fff' 
}: { 
  text: string; font?: string; x?: number; y?: number; maxWidth?: number; lineHeight?: number; color?: string 
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !text) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Pretext: measure WITHOUT touching DOM
    const prepared = prepare(text, font)
    const measured = layout(prepared, maxWidth, lineHeight)
    
    canvas.width = maxWidth
    canvas.height = measured.height + y + 20
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = font
    ctx.fillStyle = color
    
    for (const line of measured.lines) {
      ctx.fillText(line.text, x, y + line.y + lineHeight)
    }
  }, [text, font, maxWidth, lineHeight, color, x, y])
  
  return <canvas ref={canvasRef} className="block" />
}

// ============ STREAMING TEXT WITH PRETEXT ============
function StreamingPretextText({ 
  text, font = '18px Inter', maxWidth = 500, color = '#fff', onComplete 
}: { 
  text: string; font?: string; maxWidth?: number; color?: string; onComplete?: () => void 
}) {
  const [displayed, setDisplayed] = useState('')
  const [height, setHeight] = useState(50)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Pre-calculate final height with Pretext
  useEffect(() => {
    if (!text) return
    const prepared = prepare(text, font)
    const measured = layout(prepared, maxWidth, 28)
    setHeight(measured.height + 40)
  }, [text, font, maxWidth])
  
  // Stream character by character
  useEffect(() => {
    if (!text) { setDisplayed(''); return }
    setDisplayed('')
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        onComplete?.()
      }
    }, 15)
    return () => clearInterval(interval)
  }, [text, onComplete])
  
  // Render with Pretext (no DOM reflow!)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !displayed) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const prepared = prepare(displayed, font)
    const measured = layout(prepared, maxWidth, 28)
    
    canvas.width = maxWidth
    canvas.height = height
    
    ctx.clearRect(0, 0, maxWidth, height)
    ctx.font = font
    ctx.fillStyle = color
    
    for (const line of measured.lines) {
      ctx.fillText(line.text, 0, line.y + 28)
    }
  }, [displayed, font, maxWidth, height, color])
  
  return <canvas ref={canvasRef} className="block" />
}

// ============ AI UI RENDERER ============
// Canvas-based renderer controlled by AI
function AIUIcanvas({ 
  components, mousePos, onInteract 
}: { 
  components: UIComponent[]
  mousePos: Position
  onInteract: (componentId: string, action: string) => void 
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  
  // Render all components to canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = 1200
    canvas.height = 800
    
    // Clear with background
    ctx.fillStyle = '#0a0a0f'
    ctx.fillRect(0, 0, 1200, 800)
    
    // Render each component
    for (const comp of components) {
      if (!comp.visible) continue
      
      const isHovered = hoveredId === comp.id
      const isMouseOver = mousePos.x >= comp.x && mousePos.x <= comp.x + comp.width &&
                          mousePos.y >= comp.y && mousePos.y <= comp.y + comp.height
      
      switch (comp.type) {
        case 'container':
          ctx.fillStyle = comp.style.background || 'rgba(255,255,255,0.05)'
          ctx.beginPath()
          ctx.roundRect(comp.x, comp.y, comp.width, comp.height, 12)
          ctx.fill()
          if (isHovered) {
            ctx.strokeStyle = '#8b5cf6'
            ctx.lineWidth = 2
            ctx.stroke()
          }
          break
          
        case 'header':
          ctx.fillStyle = 'rgba(0,0,0,0.5)'
          ctx.fillRect(comp.x, comp.y, comp.width, comp.height || 60)
          ctx.strokeStyle = 'rgba(255,255,255,0.1)'
          ctx.strokeRect(comp.x, comp.y, comp.width, comp.height || 60)
          break
          
        case 'text':
          const fontSize = parseInt(comp.style.fontSize || '16')
          ctx.font = `${fontSize}px Inter`
          ctx.fillStyle = comp.style.color || '#fff'
          
          // Use Pretext for precise text layout!
          const prepared = prepare(comp.content, `${fontSize}px Inter`)
          const measured = layout(prepared, comp.width, fontSize * 1.5)
          
          for (const line of measured.lines) {
            ctx.fillText(line.text, comp.x, comp.y + line.y + fontSize)
          }
          break
          
        case 'button':
          const btnBg = isHovered ? '#7c3aed' : '#8b5cf6'
          ctx.fillStyle = btnBg
          ctx.beginPath()
          ctx.roundRect(comp.x, comp.y, comp.width, comp.height || 44, 8)
          ctx.fill()
          
          if (isHovered) {
            ctx.shadowColor = '#8b5cf6'
            ctx.shadowBlur = 20
            ctx.fill()
            ctx.shadowBlur = 0
          }
          
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
          ctx.strokeStyle = isHovered ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.1)'
          ctx.lineWidth = isHovered ? 2 : 1
          ctx.stroke()
          
          // Card content
          ctx.font = 'bold 18px Inter'
          ctx.fillStyle = '#fff'
          ctx.fillText(comp.content.slice(0, 30), comp.x + 16, comp.y + 30)
          break
          
        case 'input':
          ctx.fillStyle = 'rgba(255,255,255,0.1)'
          ctx.beginPath()
          ctx.roundRect(comp.x, comp.y, comp.width, comp.height || 44, 8)
          ctx.fill()
          ctx.strokeStyle = isHovered ? '#8b5cf6' : 'rgba(255,255,255,0.2)'
          ctx.stroke()
          ctx.font = '14px Inter'
          ctx.fillStyle = 'rgba(255,255,255,0.5)'
          ctx.fillText(comp.content || 'Type here...', comp.x + 12, comp.y + comp.height / 2 + 5)
          break
      }
      
      // Draw mouse cursor indicator
      if (isMouseOver && comp.type === 'button') {
        canvas.style.cursor = 'pointer'
      } else {
        canvas.style.cursor = 'default'
      }
    }
  }, [components, mousePos, hoveredId])
  
  // Handle mouse events
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Find hovered component
    let found: string | null = null
    for (const comp of components) {
      if (!comp.visible) continue
      if (x >= comp.x && x <= comp.x + comp.width && y >= comp.y && y <= comp.y + comp.height) {
        found = comp.id
        break
      }
    }
    setHoveredId(found)
  }, [components])
  
  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    for (const comp of components) {
      if (!comp.visible) continue
      if (x >= comp.x && x <= comp.x + comp.width && y >= comp.y && y <= comp.y + comp.height) {
        onInteract(comp.id, comp.onClick || `clicked_${comp.type}`)
        break
      }
    }
  }, [components, onInteract])
  
  return (
    <canvas
      ref={canvasRef}
      className="w-full rounded-xl border border-white/10"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    />
  )
}

// ============ AI THINKING DISPLAY ============
function AIThinking({ text, color = '#c084fc' }: { text: string; color?: string }) {
  return (
    <div className="bg-black/50 rounded-xl border border-white/10 p-4 h-40 overflow-auto">
      <pre className="text-xs font-mono whitespace-pre-wrap" style={{ color }}>
        {text || '🤖 AI thinking...'}
      </pre>
    </div>
  )
}

// ============ MAIN APP ============
export default function App() {
  const [isGenerating, setIsGenerating] = useState(true)
  const [aiThinking, setAiThinking] = useState('')
  const [components, setComponents] = useState<UIComponent[]>([])
  const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 })
  const [history, setHistory] = useState<UIComponent[][]>([[]])
  
  // Generate initial UI on mount
  useEffect(() => {
    generateInitialUI()
  }, [])
  
  async function generateInitialUI() {
    setIsGenerating(true)
    setAiThinking('')
    setComponents([])
    
    const systemPrompt = `You are a UI generator using Pretext and Canvas. Generate UI by outputting JSON.

Available components:
- header: {id, type:"header", x, y, width, height:60, style:{background}}
- text: {id, type:"text", content:"...", x, y, width, style:{color, fontSize}}
- button: {id, type:"button", content:"...", x, y, width:150, height:44, onClick:"prompt for AI", style:{}}
- card: {id, type:"card", content:"...", x, y, width:300, height:150, style:{background}, children}
- input: {id, type:"input", content:"placeholder", x, y, width, height:44}

Rules:
- All positions in pixels from top-left (0,0)
- IDs must be unique
- Generate a complete UI with 5-15 components
- Include buttons that ON CLICK send prompts to AI (set onClick field with what AI should do)
- Make it look like a modern AI UI toolkit landing page
- Include: header with logo, hero text, feature cards, CTA buttons
- Use dark theme colors: background #0a0a0f, accents #8b5cf6, #ec4899, #06b6d4

Output ONLY valid JSON array, no markdown:
[{"id":"1","type":"header",...}, {...}]`

    try {
      const response = await fetch(`${LM_STUDIO_URL}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LM_STUDIO_KEY}`
        },
        body: JSON.stringify({
          model: 'qwen3.5-27b',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: 'Generate a beautiful AI UI toolkit landing page with Pretext canvas rendering' }
          ],
          stream: true,
          max_tokens: 2048
        })
      })
      
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullResponse = ''
      
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
                fullResponse += token
                setAiThinking(prev => prev + token)
                
                // Try to parse JSON
                const jsonMatch = fullResponse.match(/\[.*\]/s)
                if (jsonMatch) {
                  try {
                    const parsed = JSON.parse(jsonMatch[0])
                    setComponents(parsed)
                    setHistory(h => [...h, parsed])
                  } catch {}
                }
              }
            } catch {}
          }
        }
      }
      
      // Final parse
      const jsonMatch = fullResponse.match(/\[.*\]/s)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        setComponents(parsed)
        setHistory(h => [...h, parsed])
      }
      
    } catch (err) {
      console.error(err)
      setAiThinking('❌ Error connecting to AI')
    } finally {
      setIsGenerating(false)
    }
  }
  
  // Handle AI interaction
  async function handleInteraction(componentId: string, action: string) {
    const comp = components.find(c => c.id === componentId)
    setAiThinking(prev => prev + `\n\n[User ${action} on ${comp?.content || componentId}]`)
    
    const systemPrompt = `You are controlling a Canvas UI. The user just interacted with a component.
Current UI has these components: ${JSON.stringify(components.map(c => ({id: c.id, type: c.type, content: c.content})))}

The user ${action}.
Generate a JSON array of components to UPDATE the UI based on this interaction. 
You can: add new components, update existing ones (change content, position, style), or remove components.
Keep IDs consistent for components you want to update.

Output ONLY valid JSON array:`

    try {
      const response = await fetch(`${LM_STUDIO_URL}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LM_STUDIO_KEY}`
        },
        body: JSON.stringify({
          model: 'qwen3.5-27b',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: action }
          ],
          stream: true,
          max_tokens: 2048
        })
      })
      
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullResponse = ''
      
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
                fullResponse += token
                setAiThinking(prev => prev + token)
                
                const jsonMatch = fullResponse.match(/\[.*\]/s)
                if (jsonMatch) {
                  try {
                    const parsed = JSON.parse(jsonMatch[0])
                    setComponents(parsed)
                  } catch {}
                }
              }
            } catch {}
          }
        }
      }
      
      const jsonMatch = fullResponse.match(/\[.*\]/s)
      if (jsonMatch) {
        setComponents(JSON.parse(jsonMatch[0]))
      }
      
    } catch (err) {
      console.error(err)
    }
  }
  
  // Track mouse position
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget?.getBoundingClientRect()
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
  }, [])
  
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white" onMouseMove={handleMouseMove}>
      {/* Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-b border-white/10 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🎨 Generative UI with Pretext
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">
              Mouse: ({Math.round(mousePos.x)}, {Math.round(mousePos.y)})
            </span>
            <button 
              onClick={() => { setComponents([]); generateInitialUI() }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm"
            >
              🔄 Regenerate
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="pt-20 p-4">
        {/* Loading State */}
        {isGenerating && (
          <div className="fixed inset-0 z-40 bg-[#0a0a0f] flex items-center justify-center">
            <div className="text-center max-w-2xl">
              <h2 className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                🤖 AI Building Your UI
              </h2>
              <p className="text-gray-400 mb-6">Generating components with Pretext...</p>
              <AIThinking text={aiThinking} />
              <div className="mt-4 animate-pulse text-purple-400">
                {components.length} components generated
              </div>
            </div>
          </div>
        )}
        
        {/* AI UI Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-100px)]">
          {/* Left: AI Thinking */}
          <div className="space-y-4">
            <div className="bg-black/30 rounded-xl border border-white/10 p-4">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-purple-500 animate-pulse' : 'bg-green-500'}`} />
                AI Brain
              </h3>
              <AIThinking text={aiThinking} />
            </div>
            
            {/* Component List */}
            <div className="bg-black/30 rounded-xl border border-white/10 p-4">
              <h3 className="text-sm font-medium mb-2">📋 Components ({components.length})</h3>
              <div className="space-y-2 max-h-60 overflow-auto">
                {components.map(comp => (
                  <div key={comp.id} className="text-xs bg-white/5 p-2 rounded flex items-center gap-2">
                    <span className="bg-purple-600 px-2 py-0.5 rounded text-white">{comp.type}</span>
                    <span className="truncate flex-1">{comp.content?.slice(0, 20) || comp.id}</span>
                    <span className="text-gray-600">({comp.x},{comp.y})</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Streaming Text Demo */}
            <div className="bg-black/30 rounded-xl border border-white/10 p-4">
              <h3 className="text-sm font-medium mb-2">✨ Streaming with Pretext</h3>
              <div className="bg-black/30 p-4 rounded">
                <StreamingPretextText 
                  text="This text streams character by character, measured precisely with Pretext for zero DOM reflow!"
                  font="16px Inter"
                  maxWidth={300}
                  color="#c084fc"
                />
              </div>
            </div>
          </div>
          
          {/* Right: Canvas Preview */}
          <div className="lg:col-span-2">
            <div className="bg-black/30 rounded-xl border border-white/10 p-4 h-full">
              <h3 className="text-sm font-medium mb-2">🎨 Canvas Preview (AI Controlled)</h3>
              <AIUIcanvas 
                components={components}
                mousePos={mousePos}
                onInteract={handleInteraction}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
