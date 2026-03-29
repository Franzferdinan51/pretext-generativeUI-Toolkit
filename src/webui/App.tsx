/**
 * Auto-Healing Generative UI Demo
 * 
 * This app demonstrates AI-powered generative UI with automatic error recovery.
 * The AI generates UI components, renders them on canvas, and automatically
 * heals any errors that occur.
 */

import React, { useState, useEffect, useCallback } from 'react'
import {
  useAutoHealingUI,
  UIErrorBoundary,
  CanvasRenderer,
  UIComponent,
  ErrorReport
} from '../ai/AutoHealingUI'

// ============================================================================
// TYPES
// ============================================================================

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

// ============================================================================
// STYLES
// ============================================================================

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0f',
    color: '#ffffff',
    fontFamily: 'Inter, system-ui, sans-serif'
  },
  header: {
    padding: '16px 24px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  main: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    height: 'calc(100vh - 65px)'
  },
  canvasArea: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  },
  canvas: {
    flex: 1,
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.1)',
    overflow: 'hidden'
  },
  sidebar: {
    borderLeft: '1px solid rgba(255,255,255,0.1)',
    display: 'flex',
    flexDirection: 'column' as const
  },
  chatArea: {
    flex: 1,
    overflow: 'auto',
    padding: '16px'
  },
  inputArea: {
    padding: '16px',
    borderTop: '1px solid rgba(255,255,255,0.1)'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#1a1a2e',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none'
  },
  thinkingArea: {
    padding: '12px 16px',
    backgroundColor: '#1a1a2e',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    fontFamily: 'monospace',
    fontSize: '12px',
    color: '#8b5cf6',
    maxHeight: '200px',
    overflow: 'auto'
  },
  errorBadge: {
    padding: '4px 8px',
    backgroundColor: 'rgba(239,68,68,0.2)',
    color: '#ef4444',
    borderRadius: '4px',
    fontSize: '12px'
  },
  successBadge: {
    padding: '4px 8px',
    backgroundColor: 'rgba(34,197,94,0.2)',
    color: '#22c55e',
    borderRadius: '4px',
    fontSize: '12px'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#8b5cf6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600
  },
  secondaryButton: {
    padding: '10px 20px',
    backgroundColor: '#2d2d5f',
    color: '#ffffff',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  message: {
    padding: '12px 16px',
    borderRadius: '12px',
    marginBottom: '8px',
    maxWidth: '85%'
  },
  userMessage: {
    backgroundColor: '#8b5cf6',
    marginLeft: 'auto'
  },
  assistantMessage: {
    backgroundColor: '#1e1e3f'
  }
}

// ============================================================================
// COMPONENT: ErrorDisplay
// ============================================================================

function ErrorDisplay({ errors }: { errors: ErrorReport[] }) {
  if (errors.length === 0) return null
  
  return (
    <div className="space-y-2 mb-4">
      {errors.map((error, i) => (
        <div key={i} style={{
          ...styles.errorBadge,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>⚠️</span>
          <span>[{error.type}] {error.message}</span>
        </div>
      ))}
    </div>
  )
}

// ============================================================================
// COMPONENT: ChatMessage
// ============================================================================

function ChatMessageComponent({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'
  
  return (
    <div style={{
      ...styles.message,
      ...(isUser ? styles.userMessage : styles.assistantMessage),
      alignSelf: isUser ? 'flex-end' : 'flex-start'
    }}>
      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      <span className="text-xs opacity-60 mt-1 block">
        {new Date(message.timestamp).toLocaleTimeString()}
      </span>
    </div>
  )
}

// ============================================================================
// MAIN APP
// ============================================================================

export function AutoHealingApp() {
  const [input, setInput] = useState('')
  const [chat, setChat] = useState<ChatMessage[]>([])
  
  const ui = useAutoHealingUI({
    lmStudioUrl: 'http://100.116.54.125:1234',
    lmStudioKey: 'sk-lm-zO7bswIc:WkHEMTUfVNkq5WYNyFOW',
    model: 'qwen3.5-27b',
    autoHeal: true,
    maxRetries: 3,
    onThinking: (thinking) => {
      // Update last assistant message with thinking
      setChat(prev => {
        if (prev.length === 0) return prev
        const last = prev[prev.length - 1]
        if (last.role === 'assistant') {
          return [...prev.slice(0, -1), { ...last, content: thinking }]
        }
        return prev
      })
    },
    onComponentUpdate: (components) => {
      console.log('Components updated:', components.length)
    }
  })

  // Generate initial UI
  useEffect(() => {
    if (!ui.isGenerating && ui.components.length === 0) {
      ui.generateUI('Create a modern landing page hero section with a gradient background, a bold headline "AI-Powered UI", a subtitle, and a call-to-action button')
    }
  }, [])

  // Handle submit
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || ui.isGenerating) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    }
    setChat(prev => [...prev, userMessage])
    setInput('')

    // Generate UI based on user request
    await ui.generateUI(input)
  }, [input, ui])

  // Handle component click
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Find clicked component
    for (const comp of [...ui.components].reverse()) {
      if (!comp.visible) continue
      if (x >= comp.x && x <= comp.x + comp.width &&
          y >= comp.y && y <= comp.y + comp.height) {
        
        if (comp.type === 'button' && comp.onClick) {
          // Trigger action
          const actionMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'assistant',
            content: `Button clicked: ${comp.content}\n\nThis would trigger action: ${comp.onClick}`,
            timestamp: Date.now()
          }
          setChat(prev => [...prev, actionMsg])
        } else {
          const infoMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'assistant',
            content: `Clicked: ${comp.type} - "${comp.content}" at (${Math.round(x)}, ${Math.round(y)})`,
            timestamp: Date.now()
          }
          setChat(prev => [...prev, infoMsg])
        }
        break
      }
    }
  }, [ui.components])

  return (
    <UIErrorBoundary
      onError={(error) => ui.reportError(error)}
      fallback={
        <div style={styles.container}>
          <div style={styles.header}>
            <h1 className="text-xl font-bold">⚠️ Error Boundary Active</h1>
          </div>
          <div style={{ padding: '24px' }}>
            <p className="text-gray-400">Something went wrong. The AI is healing...</p>
          </div>
        </div>
      }
    >
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Auto-Healing Generative UI
            </h1>
            {ui.isHealing && (
              <span style={styles.successBadge}>
                🩹 Healing...
              </span>
            )}
            {ui.isGenerating && (
              <span style={styles.successBadge}>
                ⚡ Generating...
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              style={styles.secondaryButton}
              onClick={() => ui.clearComponents()}
            >
              Clear
            </button>
            <button
              style={styles.secondaryButton}
              onClick={() => ui.forceHeal()}
              disabled={ui.errors.length === 0}
            >
              Force Heal
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={styles.main}>
          {/* Canvas Area */}
          <div style={styles.canvasArea}>
            <ErrorDisplay errors={ui.errors} />
            
            <div style={styles.canvas}>
              <CanvasRenderer
                components={ui.components}
                width={800}
                height={500}
                onClick={handleCanvasClick}
              />
            </div>

            {/* Component Debug */}
            {ui.components.length > 0 && (
              <details className="bg-black/30 rounded-lg p-4">
                <summary className="text-sm text-gray-400 cursor-pointer">
                  Component Debug ({ui.components.length})
                </summary>
                <pre className="text-xs text-gray-500 mt-2 overflow-auto max-h-48">
                  {JSON.stringify(ui.components, null, 2)}
                </pre>
              </details>
            )}
          </div>

          {/* Sidebar */}
          <div style={styles.sidebar}>
            {/* Thinking Area */}
            {ui.aiThinking && (
              <div style={styles.thinkingArea}>
                <div className="text-purple-400 mb-2 text-xs uppercase tracking-wider">
                  AI Thinking
                </div>
                <pre className="whitespace-pre-wrap text-xs">
                  {ui.aiThinking}
                </pre>
              </div>
            )}

            {/* Chat Area */}
            <div style={styles.chatArea} className="flex flex-col gap-2">
              <div className="text-sm text-gray-500 mb-2">
                Chat ({chat.length})
              </div>
              {chat.map(msg => (
                <ChatMessageComponent key={msg.id} message={msg} />
              ))}
              {chat.length === 0 && (
                <p className="text-gray-600 text-sm italic">
                  Ask the AI to generate or modify the UI...
                </p>
              )}
            </div>

            {/* Input Area */}
            <div style={styles.inputArea}>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe what UI you want..."
                  style={styles.input}
                  disabled={ui.isGenerating}
                />
                <button
                  type="submit"
                  style={styles.button}
                  disabled={ui.isGenerating || !input.trim()}
                >
                  {ui.isGenerating ? '...' : 'Send'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </UIErrorBoundary>
  )
}

export default AutoHealingApp
