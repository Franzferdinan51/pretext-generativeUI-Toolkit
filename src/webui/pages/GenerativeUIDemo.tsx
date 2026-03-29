// GENERATIVE UI - AI controls everything
// Built with Pretext for zero-reflow text rendering

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

// ========== PRETEXT CANVAS ENGINE ==========
// This is the core: text rendering without DOM reflow

interface CanvasTextProps {
  text: string
  font?: string
  x?: number
  y?: number
  maxWidth?: number
  lineHeight?: number
  color?: string
}

function PretextCanvasEngine({ text, font = '16px Inter', x = 0, y = 0, maxWidth = 400, lineHeight = 24, color = '#fff' }: CanvasTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !text) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Pretext: measure text without touching DOM
    const prepared = prepareWithSegments(text, font)
    const measured = layoutWithLines(prepared, maxWidth, lineHeight)
    
    // Set canvas size to exact measurements
    canvas.width = maxWidth
    canvas.height = measured.height + y + 20
    
    // Clear and render
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = font
    ctx.fillStyle = color
    
    // Render each line at exact position
    for (const line of measured.lines) {
      ctx.fillText(line.text, x + line.x, y + line.y)
    }
  }, [text, font, maxWidth, lineHeight, color, x, y])
  
  return <canvas ref={canvasRef} className="block" />
}

// ========== STREAMING TEXT WITH PRETEXT ==========
// Text appears character-by-character, measured with Pretext

function StreamingPretextText({ text, font = '18px Inter', maxWidth = 500, color = '#fff' }: { text: string; font?: string; maxWidth?: number; color?: string }) {
  const [displayed, setDisplayed] = useState('')
  const [height, setHeight] = useState(50)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Pre-calculate final height
  useEffect(() => {
    if (!text) return
    const prepared = prepareWithSegments(text, font)
    const measured = layoutWithLines(prepared, maxWidth, 28)
    setHeight(measured.height + 40)
  }, [text, font, maxWidth])
  
  // Stream character by character
  useEffect(() => {
    if (!text) {
      setDisplayed('')
      return
    }
    setDisplayed('')
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 20)
    return () => clearInterval(interval)
  }, [text])
  
  // Render with Pretext
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !displayed) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const prepared = prepareWithSegments(displayed, font)
    const measured = layoutWithLines(prepared, maxWidth, 28)
    
    canvas.width = maxWidth
    canvas.height = height
    
    ctx.clearRect(0, 0, maxWidth, height)
    ctx.font = font
    ctx.fillStyle = color
    
    for (const line of measured.lines) {
      ctx.fillText(line.text, line.x, line.y)
    }
  }, [displayed, font, maxWidth, height, color])
  
  return <canvas ref={canvasRef} className="block" />
}

// ========== AI GENERATIVE UI ==========
// The main demo: AI generates UI components live

const LM_STUDIO_URL = '/api/lm-studio'
const LM_STUDIO_KEY = 'sk-lm-zO7bswIc:WkHEMTUfVNkq5WYNyFOW'

// Component types the AI can generate
interface UISection {
  id: string
  type: 'header' | 'text' | 'button' | 'card' | 'input' | 'list' | 'chart' | 'particle'
  content: string
  x: number
  y: number
  width: number
  style?: Record<string, string>
}

export default function GenerativeUIDemo() {
  const [aiThinking, setAiThinking] = useState('')
  const [components, setComponents] = useState<UISection[]>([])
  const [userInput, setUserInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Track mouse position (sent to AI)
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }, [])
  
  // Generate UI based on prompt
  async function generateUI(prompt: string) {
    setIsGenerating(true)
    setAiThinking('')
    setComponents([])
    
    const systemPrompt = `You are a UI generator. When given a request, generate a UI by outputting JSON array of components.
    
Available component types:
- header: navigation header
- text: paragraph text
- button: clickable button
- card: container card
- input: text input
- list: list of items
- particle: particle effect

Output ONLY valid JSON like:
[{"id":"1","type":"header","content":"My App","x":0,"y":0,"width":800,"style":{"background":"purple"}},
{"id":"2","type":"text","content":"Welcome!","x":50,"y":80,"width":400,"style":{"color":"white"}}]

No markdown, no explanation, just the JSON array.`

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
            { role: 'user', content: prompt }
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
                setAiThinking(fullResponse)
                
                // Try to parse partial JSON
                try {
                  const jsonMatch = fullResponse.match(/\[.*\]/s)
                  if (jsonMatch) {
                    const parsed = JSON.parse(jsonMatch[0])
                    setComponents(parsed)
                  }
                } catch {}
              }
            } catch {}
          }
        }
      }
      
      // Final parse
      const jsonMatch = fullResponse.match(/\[.*\]/s)
      if (jsonMatch) {
        setComponents(JSON.parse(jsonMatch[0]))
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }
  
  // Render components on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = 900
    canvas.height = 600
    
    // Clear
    ctx.fillStyle = '#0a0a0f'
    ctx.fillRect(0, 0, 900, 600)
    
    // Render each component
    for (const comp of components) {
      switch (comp.type) {
        case 'header':
          ctx.fillStyle = comp.style?.background || '#8b5cf6'
          ctx.fillRect(comp.x, comp.y, comp.width, 60)
          ctx.fillStyle = '#fff'
          ctx.font = 'bold 20px Inter'
          ctx.fillText(comp.content, comp.x + 20, comp.y + 38)
          break
          
        case 'text':
          const prepared = prepareWithSegments(comp.content, '16px Inter')
          const measured = layoutWithLines(prepared, comp.width, 24)
          ctx.fillStyle = comp.style?.color || '#fff'
          for (const line of measured.lines) {
            ctx.fillText(line.text, comp.x + line.x, comp.y + line.y)
          }
          break
          
        case 'button':
          ctx.fillStyle = '#8b5cf6'
          ctx.beginPath()
          ctx.roundRect(comp.x, comp.y, 150, 44, 8)
          ctx.fill()
          ctx.fillStyle = '#fff'
          ctx.font = 'bold 14px Inter'
          ctx.fillText(comp.content, comp.x + 20, comp.y + 28)
          break
          
        case 'card':
          ctx.fillStyle = 'rgba(255,255,255,0.1)'
          ctx.beginPath()
          ctx.roundRect(comp.x, comp.y, comp.width, 150, 12)
          ctx.fill()
          ctx.strokeStyle = 'rgba(255,255,255,0.2)'
          ctx.stroke()
          ctx.fillStyle = '#fff'
          ctx.font = 'bold 16px Inter'
          ctx.fillText(comp.content, comp.x + 20, comp.y + 30)
          break
      }
    }
    
    // Draw mouse position indicator
    ctx.fillStyle = 'rgba(139, 92, 246, 0.5)'
    ctx.beginPath()
    ctx.arc(mousePos.x - 50, mousePos.y - 100, 5, 0, Math.PI * 2)
    ctx.fill()
  }, [components, mousePos])
  
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white" onMouseMove={handleMouseMove}>
      {/* Header */}
      <div className="border-b border-white/10 p-4 bg-black/30">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400">
          🎨 Generative UI with Pretext
        </h1>
        <p className="text-gray-400 text-sm">AI generates UI components → Pretext measures → Canvas renders</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        {/* Left: Controls + AI Thinking */}
        <div className="space-y-4">
          {/* Prompt buttons */}
          <div className="flex flex-wrap gap-2">
            <button onClick={() => generateUI('Generate a landing page with header, hero text, and a CTA button')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm">
              🚀 Landing Page
            </button>
            <button onClick={() => generateUI('Generate a dashboard with cards showing stats')}
              className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg text-sm">
              📊 Dashboard
            </button>
            <button onClick={() => generateUI('Generate an e-commerce product card')}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm">
              🛒 Product Card
            </button>
          </div>
          
          {/* AI Thinking */}
          <div className="bg-black/50 rounded-xl border border-white/10 p-4">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-purple-500 animate-pulse' : 'bg-green-500'}`} />
              AI Thinking
            </h3>
            <div className="h-40 overflow-auto">
              <pre className="text-xs text-gray-400 whitespace-pre-wrap">
                {aiThinking || '// AI will generate UI components here...'}
              </pre>
            </div>
          </div>
          
          {/* Streaming Text Demo */}
          <div className="bg-black/50 rounded-xl border border-white/10 p-4">
            <h3 className="text-sm font-medium mb-2">✨ Streaming Text (Pretext)</h3>
            <div className="bg-black/30 p-4 rounded-lg">
              <StreamingPretextText 
                text="This text is streaming character by character, measured precisely with Pretext for zero DOM reflow!"
                font="18px Inter"
                maxWidth={400}
                color="#c084fc"
              />
            </div>
          </div>
          
          {/* Mouse position (for AI) */}
          <div className="text-xs text-gray-500">
            Mouse: ({mousePos.x}, {mousePos.y}) - sent to AI on click
          </div>
        </div>
        
        {/* Right: Canvas Preview */}
        <div className="space-y-4">
          <div className="bg-black/50 rounded-xl border border-white/10 overflow-hidden">
            <div className="p-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <span className="text-sm font-medium">🎨 Canvas Preview</span>
              <span className="text-xs text-gray-500">{components.length} components</span>
            </div>
            <div className="p-4 bg-[#0a0a0f]">
              <canvas 
                ref={canvasRef}
                className="w-full rounded-lg border border-white/10"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  console.log('Clicked at:', e.clientX - rect.left, e.clientY - rect.top)
                }}
              />
            </div>
          </div>
          
          {/* Component list */}
          {components.length > 0 && (
            <div className="bg-black/50 rounded-xl border border-white/10 p-4">
              <h3 className="text-sm font-medium mb-2">📋 Generated Components</h3>
              <div className="space-y-2 max-h-40 overflow-auto">
                {components.map((c, i) => (
                  <div key={c.id} className="text-xs bg-white/5 p-2 rounded flex items-center gap-2">
                    <span className="bg-purple-600 px-2 py-0.5 rounded">{c.type}</span>
                    <span className="text-gray-400 truncate flex-1">{c.content}</span>
                    <span className="text-gray-600">({c.x}, {c.y})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
