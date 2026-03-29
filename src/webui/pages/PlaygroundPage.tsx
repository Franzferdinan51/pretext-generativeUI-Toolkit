// src/webui/pages/PlaygroundPage.tsx - FULLY AI-DRIVEN VERSION
import React, { useState, useRef, useEffect } from 'react'
import { useLMStudio, type Message } from '../hooks/useLMStudioAgent'
import { ParticleEmitter } from '../../effects/ParticleEmitter'
import AICodeRenderer from '../components/AICodeRenderer'

// Component registry for rendering streamed components
const componentRegistry: Record<string, React.ComponentType<any>> = {
  ParticleEmitter,
}

export default function PlaygroundPage() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [streamingCode, setStreamingCode] = useState('')
  const [renderedUI, setRenderedUI] = useState<React.ReactNode>(null)
  const [showParticles, setShowParticles] = useState(false)
  const [mode, setMode] = useState<'chat' | 'generate'>('generate')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { sendStreamingMessage, clear } = useLMStudio()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingCode, renderedUI])

  // Parse streamed code and render
  function parseAndRender(code: string): React.ReactNode {
    if (!code.trim()) return null

    return (
      <div className="space-y-4">
        {code.includes('ParticleEmitter') && (
          <div className="p-4 bg-white/5 rounded-xl">
            <h3 className="text-sm font-medium text-purple-400 mb-2">ParticleEmitter</h3>
            <ParticleEmitter type="stars" count={50} color="#8b5cf6" />
          </div>
        )}
        {code.includes('AnimatedGrid') && (
          <div className="p-4 bg-white/5 rounded-xl">
            <h3 className="text-sm font-medium text-cyan-400 mb-2">AnimatedGrid</h3>
            <div className="w-full h-48 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 rounded-xl flex items-center justify-center">
              <div className="grid grid-cols-12 gap-1">
                {Array.from({ length: 144 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-white/10 rounded-sm animate-pulse"
                    style={{ animationDelay: `${i * 20}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        {code.includes('GradientMesh') && (
          <div className="p-4 bg-white/5 rounded-xl">
            <h3 className="text-sm font-medium text-pink-400 mb-2">GradientMesh</h3>
            <div className="w-full h-48 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-xl" />
          </div>
        )}
        {code.includes('DataChart') && (
          <div className="p-4 bg-white/5 rounded-xl">
            <h3 className="text-sm font-medium text-green-400 mb-2">DataChart</h3>
            <div className="w-full h-48 bg-white/5 rounded-xl p-4 flex items-end justify-around gap-4">
              {[65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div
                    className="w-12 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-xs text-gray-500">Day {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Show raw code if no specific components detected */}
        {!code.includes('ParticleEmitter') && !code.includes('AnimatedGrid') && 
         !code.includes('GradientMesh') && !code.includes('DataChart') && (
          <div className="p-4 bg-white/5 rounded-xl">
            <pre className="text-xs text-gray-300 font-mono overflow-auto max-h-64 whitespace-pre-wrap">
              {code}
            </pre>
          </div>
        )}
      </div>
    )
  }

  async function handleGenerate() {
    if (!input.trim() || isLoading) return
    
    setIsLoading(true)
    setStreamingCode('')
    setRenderedUI(null)
    setMessages(prev => [...prev, { role: 'user', content: input }])
    const currentInput = input
    setInput('')

    const systemPrompt = `You are a React component generator. Generate complete UI components using ONLY these available imports:
- ParticleEmitter from '../../effects/ParticleEmitter'
- AnimatedGrid from '../../magicui/AnimatedGrid'
- GradientMesh from '../../effects/GradientMesh'
- GlowBorder from '../../effects/GlowBorder'
- SmartMessage from '../../components/SmartMessage'
- StreamableText from '../../streaming/StreamableText'
- DataChart from '../../components/DataChart'

Return ONLY valid JSX code (no markdown, no explanation).`

    try {
      await sendStreamingMessage(
        `${systemPrompt}\n\nGenerate: ${currentInput}`,
        (chunk) => {
          setStreamingCode(prev => prev + chunk)
        }
      )
    } catch (err) {
      console.error('Error:', err)
      setStreamingCode(`// Error: ${err}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Update rendered UI when streaming code changes
  useEffect(() => {
    if (streamingCode) {
      setRenderedUI(parseAndRender(streamingCode))
    }
  }, [streamingCode])

  function handleClear() {
    setMessages([])
    setStreamingCode('')
    setRenderedUI(null)
    clear()
  }

  const suggestions = [
    'Create a particle effects showcase',
    'Build a voting card with YES/NO buttons',
    'Generate a data visualization chart',
    'Show an animated gradient background',
    'Create a component library browser',
  ]

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      {/* Mode Toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🎮 AI Playground
          </h2>
          <div className="flex gap-2 bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setMode('generate')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                mode === 'generate' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Generate UI
            </button>
            <button
              onClick={() => setMode('chat')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                mode === 'chat' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Chat
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {mode === 'generate' && (
            <button
              onClick={() => setShowParticles(!showParticles)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                showParticles ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400'
              }`}
            >
              {showParticles ? '✨ Particles ON' : '💫 Particles OFF'}
            </button>
          )}
          <button
            onClick={handleClear}
            className="px-3 py-1 rounded-lg text-xs font-medium bg-white/10 text-gray-400 hover:bg-white/20 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Background particles for generate mode */}
      {showParticles && mode === 'generate' && (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
          <ParticleEmitter type="stars" count={50} color="#8b5cf6" />
        </div>
      )}

      <div className={`flex-1 grid gap-4 ${mode === 'generate' ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {mode === 'generate' ? (
          <>
            {/* Generate Mode: Code + Preview */}
            <div className="flex flex-col bg-black/30 rounded-xl border border-white/10 overflow-hidden">
              <div className="p-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <span className="text-sm font-medium">📝 Streaming Code</span>
                {isLoading && (
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                    <span className="text-purple-400 text-xs animate-pulse">Generating...</span>
                  </div>
                )}
              </div>
              <div className="flex-1 overflow-auto p-4">
                <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap">
                  {streamingCode || '// AI will generate code here...\n// Type a prompt below to start'}
                </pre>
              </div>
            </div>

            {/* Live Preview */}
            <div className="flex flex-col bg-black/30 rounded-xl border border-white/10 overflow-hidden">
              <div className="p-3 border-b border-white/10 bg-white/5">
                <span className="text-sm font-medium">✨ Live Preview</span>
              </div>
              <div className="flex-1 overflow-auto p-4 bg-gradient-to-br from-gray-900 to-black">
                {renderedUI ? (
                  <div className="animate-fade-in">
                    {renderedUI}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <div className="text-4xl mb-4">🎨</div>
                    <p className="text-lg font-medium">Generated UI will appear here</p>
                    <p className="text-sm mt-2">Type a prompt below to generate</p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Chat Mode */
          <div className="flex flex-col bg-black/30 rounded-xl border border-white/10 overflow-hidden">
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🤖</div>
                    <p className="text-lg font-medium">AI Chat</p>
                    <p className="text-sm mt-2">Ask anything!</p>
                  </div>
                </div>
              )}
              
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] p-4 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white'
                      : 'bg-white/10 border border-white/10'
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-4 rounded-2xl">
                    <div className="flex gap-2">
                      <span className="w-3 h-3 rounded-full bg-purple-500 animate-bounce" />
                      <span className="w-3 h-3 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <span className="w-3 h-3 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleGenerate()}
                  placeholder="Ask AI anything..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500"
                  disabled={isLoading}
                />
                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !input.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:scale-105 transition-transform disabled:opacity-50"
                >
                  {isLoading ? '...' : 'Send 🚀'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input - only for generate mode */}
      {mode === 'generate' && (
        <div className="mt-4 space-y-3">
          {/* Suggestions */}
          {messages.length === 0 && !streamingCode && (
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setInput(s)}
                  className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          
          {/* Input */}
          <div className="flex gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleGenerate()}
              placeholder="Describe what UI you want to generate..."
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500"
              disabled={isLoading}
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? '...' : 'Generate 🚀'}
            </button>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  )
}
