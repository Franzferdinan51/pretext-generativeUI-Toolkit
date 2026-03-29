import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useLMStudio, type Message } from '../hooks/useLMStudioAgent'
import { SmartMessage } from '../../components/SmartMessage'
import { StreamableText, StreamingCursor } from '../../streaming/StreamableText'
import { ParticleEmitter } from '../../effects/ParticleEmitter'
import ComponentPreview from '../components/ComponentPreview'

export default function Playground() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [previewComponent, setPreviewComponent] = useState<{ type: string; props: any } | null>(null)
  const [showParticles, setShowParticles] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { sendStreamingMessage, clear, healthCheck, isLoading: agentLoading } = useLMStudio()

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  const detectComponent = useCallback((text: string): { type: string; props: any } | null => {
    const lower = text.toLowerCase()
    
    if (lower.includes('particle')) {
      return { type: 'ParticleEmitter', props: { count: 50, colors: ['#8b5cf6', '#a78bfa', '#c4b5fd'] } }
    }
    if (lower.includes('grid') || lower.includes('pattern')) {
      return { type: 'AnimatedGrid', props: {} }
    }
    if (lower.includes('streaming') || lower.includes('typing') || lower.includes('stream')) {
      return { type: 'StreamableText', props: { content: text, speed: 15 } }
    }
    if (lower.includes('card') || lower.includes('vote') || lower.includes('list')) {
      return { type: 'SmartMessage', props: { content: text } }
    }
    if (lower.includes('bento')) {
      return { type: 'BentoGrid', props: {} }
    }
    if (lower.includes('gradient') || lower.includes('text')) {
      return { type: 'TextGradient', props: { text: text.slice(0, 100) } }
    }
    if (lower.includes('orbit') || lower.includes('shape')) {
      return { type: 'OrbitingShapes', props: {} }
    }
    
    return null
  }, [])

  async function handleSend() {
    if (!input.trim() || isLoading) return
    
    const userMsg: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    const currentInput = input
    setInput('')
    setIsLoading(true)
    setStreamingText('')
    
    try {
      await sendStreamingMessage(currentInput, (chunk) => {
        setStreamingText(prev => prev + chunk)
      })
      
      // After streaming completes, detect component
      const component = detectComponent(currentInput + ' ' + streamingText)
      if (component) {
        setPreviewComponent(component)
        setShowParticles(true)
        setTimeout(() => setShowParticles(false), 3000)
      }
    } catch (err) {
      console.error(err)
      const errorMsg: Message = { role: 'assistant', content: `Error: ${err}` }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
      setStreamingText('')
    }
  }

  function handleClear() {
    setMessages([])
    setPreviewComponent(null)
    clear()
  }

  return (
    <div className="relative">
      {/* Background particles */}
      {showParticles && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <ParticleEmitter 
            count={100} 
            colors={['#8b5cf6', '#22d3ee', '#ec4899', '#a78bfa']}
            width={window.innerWidth}
            height={window.innerHeight}
          />
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4 h-[calc(100vh-220px)]">
        {/* Chat Panel */}
        <div className="flex flex-col bg-gray-900/50 rounded-xl border border-white/10 overflow-hidden">
          {/* Chat Header */}
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-black/30">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-medium">AI Chat</span>
            </div>
            <button 
              onClick={handleClear}
              className="btn btn-ghost text-xs"
            >
              Clear
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <div className="text-4xl mb-4">🤖</div>
                <p className="text-lg font-medium mb-2">Welcome to the Playground</p>
                <p className="text-sm text-center max-w-xs">
                  Ask AI to generate UI components, create streaming text, or build interactive elements
                </p>
                <div className="mt-6 space-y-2 text-sm text-left">
                  <p className="text-gray-400">💡 Try asking:</p>
                  <p className="text-gray-500">"Show me particle effects"</p>
                  <p className="text-gray-500">"Create a streaming text demo"</p>
                  <p className="text-gray-500">"Display a gradient text"</p>
                </div>
              </div>
            )}
            
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'message-user' : 'message-assistant'} p-3`}>
                  {msg.role === 'assistant' ? (
                    <SmartMessage content={msg.content} />
                  ) : (
                    <p className="text-white">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            
            {/* Streaming indicator */}
            {isLoading && streamingText && (
              <div className="flex justify-start animate-fade-in">
                <div className="max-w-[85%] message-assistant p-3">
                  <SmartMessage content={streamingText} />
                </div>
              </div>
            )}
            
            {/* Loading dots */}
            {isLoading && !streamingText && (
              <div className="flex justify-start animate-fade-in">
                <div className="message-assistant p-4">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-black/30">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Ask AI to generate UI..."
                className="input flex-1"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()}
                className="btn btn-primary px-6"
              >
                {isLoading ? (
                  <span className="loading-dots"><span></span><span></span><span></span></span>
                ) : (
                  'Send'
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
        
        {/* Live Preview Panel */}
        <div className="bg-gray-900/50 rounded-xl border border-white/10 overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-white/10 bg-black/30">
            <h3 className="font-medium flex items-center gap-2">
              👁️ Live Preview
            </h3>
          </div>
          
          <div className="flex-1 overflow-auto p-4">
            {previewComponent ? (
              <ComponentPreview type={previewComponent.type} props={previewComponent.props} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <div className="text-4xl mb-4">✨</div>
                <p className="text-lg font-medium mb-2">Preview Area</p>
                <p className="text-sm text-center max-w-xs">
                  AI-generated components will appear here based on your chat
                </p>
                <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-purple-600/20 text-purple-400 px-3 py-2 rounded-lg text-center">
                    ParticleEmitter
                  </div>
                  <div className="bg-cyan-600/20 text-cyan-400 px-3 py-2 rounded-lg text-center">
                    StreamableText
                  </div>
                  <div className="bg-pink-600/20 text-pink-400 px-3 py-2 rounded-lg text-center">
                    AnimatedGrid
                  </div>
                  <div className="bg-green-600/20 text-green-400 px-3 py-2 rounded-lg text-center">
                    SmartMessage
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
