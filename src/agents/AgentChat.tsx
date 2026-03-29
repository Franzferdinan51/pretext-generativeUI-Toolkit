/**
 * Agent Chat Component
 * Chat UI with LM Studio agent
 */

import { useState, useEffect, FormEvent } from 'react'
import { useLMStudioAgent, type Message } from './LMStudioAgent'

interface AgentChatProps {
  baseUrl?: string
  defaultModel?: string
  className?: string
  onMessage?: (message: Message) => void
}

export function AgentChat({
  baseUrl = 'http://100.116.54.125:1234',
  defaultModel = 'qwen3.5-plus',
  className = '',
  onMessage
}: AgentChatProps) {
  const { messages, isLoading, sendMessage, healthCheck, error, clear } = useLMStudioAgent({
    baseUrl,
    model: defaultModel
  })
  const [input, setInput] = useState('')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    healthCheck().then(setIsConnected)
  }, [healthCheck])

  useEffect(() => {
    if (onMessage && messages.length > 0) {
      onMessage(messages[messages.length - 1])
    }
  }, [messages, onMessage])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    const text = input
    setInput('')
    try {
      await sendMessage(text)
    } catch (err) {
      console.error('Send error:', err)
    }
  }

  return (
    <div className={`agent-chat ${className}`}>
      <div className="agent-status">
        <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`} />
        {isConnected ? 'LM Studio Connected' : 'Disconnected'}
        {error && <span className="status-error"> • {error}</span>}
      </div>

      <div className="agent-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message message-${msg.role}`}>
            <div className="message-role">{msg.role}</div>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message message-assistant loading">
            <span className="typing-indicator">
              <span></span><span></span><span></span>
            </span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="agent-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask the agent..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
        <button type="button" onClick={clear} className="clear-btn">
          Clear
        </button>
      </form>
    </div>
  )
}

// Compact version for inline use
export function AgentChatCompact({
  baseUrl = 'http://100.116.54.125:1234',
  defaultModel = 'qwen3.5-plus'
}: { baseUrl?: string; defaultModel?: string }) {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const { sendMessage, healthCheck } = useLMStudioAgent({
    baseUrl,
    model: defaultModel
  })
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    healthCheck().then(setConnected)
  }, [healthCheck])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!input.trim() || loading) return
    setLoading(true)
    try {
      const result = await sendMessage(input)
      setResponse(result)
      setInput('')
    } catch (err) {
      setResponse('Error: ' + (err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="agent-chat-compact">
      <div className="connection-status">
        <span className={`dot ${connected ? 'green' : 'red'}`} />
        {connected ? 'Connected' : 'Offline'}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>Go</button>
      </form>
      {response && <div className="response">{response}</div>}
    </div>
  )
}
