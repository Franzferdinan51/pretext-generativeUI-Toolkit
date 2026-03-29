/**
 * Agent Builder Component
 * Build custom agents with LM Studio
 */

import { useState } from 'react'
import { useLMStudioAgent, type Message } from './LMStudioAgent'
import { BUILT_IN_TOOLS } from '../mcp/ToolExecutor'

interface AgentBuilderProps {
  baseUrl?: string
  onAgentStart?: (config: AgentConfig) => void
  className?: string
}

export interface AgentConfig {
  name: string
  description: string
  systemPrompt: string
  model: string
  tools: string[]
  temperature: number
  maxTokens: number
}

const DEFAULT_MODELS = [
  { id: 'qwen3.5-plus', name: 'Qwen 3.5 Plus' },
  { id: 'glm-4.7-flash', name: 'GLM 4.7 Flash' },
  { id: 'jan-v3-4b', name: 'Jan 3B' },
  { id: 'qwen3.5-27b', name: 'Qwen 3.5 27B' },
  { id: 'zai-org/glm-4.7-flash', name: 'GLM 4.7 Flash (Official)' },
  { id: 'unsloth/qwen3.5-35b-a3b', name: 'Qwen 3.5 35B MoE' },
]

export function AgentBuilder({
  baseUrl = 'http://100.116.54.125:1234',
  onAgentStart,
  className = ''
}: AgentBuilderProps) {
  const [agentConfig, setAgentConfig] = useState<AgentConfig>({
    name: 'My Agent',
    description: '',
    systemPrompt: 'You are a helpful AI assistant powered by LM Studio. You have access to various tools for web search, calculations, and more.',
    model: 'qwen3.5-plus',
    tools: [],
    temperature: 0.7,
    maxTokens: 2048
  })
  const [activeTab, setActiveTab] = useState<'config' | 'chat' | 'tools'>('config')

  const { messages, isLoading, sendMessage, setModel } = useLMStudioAgent({
    baseUrl,
    model: agentConfig.model
  })

  async function startAgent() {
    if (onAgentStart) {
      onAgentStart(agentConfig)
    }
    // Inject system prompt
    await sendMessage(`[SYSTEM] ${agentConfig.systemPrompt}\n\nRemember: You have access to these tools: ${agentConfig.tools.join(', ') || 'none'}`)
    setActiveTab('chat')
  }

  function updateConfig<K extends keyof AgentConfig>(key: K, value: AgentConfig[K]) {
    setAgentConfig(prev => ({ ...prev, [key]: value }))
    if (key === 'model') {
      setModel(value as string)
    }
  }

  function toggleTool(toolName: string) {
    setAgentConfig(prev => ({
      ...prev,
      tools: prev.tools.includes(toolName)
        ? prev.tools.filter(t => t !== toolName)
        : [...prev.tools, toolName]
    }))
  }

  return (
    <div className={`agent-builder ${className}`}>
      <h2 className="agent-builder-title">Agent Builder</h2>

      <div className="agent-builder-tabs">
        <button
          className={`tab ${activeTab === 'config' ? 'active' : ''}`}
          onClick={() => setActiveTab('config')}
        >
          Configuration
        </button>
        <button
          className={`tab ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          Chat ({messages.length})
        </button>
        <button
          className={`tab ${activeTab === 'tools' ? 'active' : ''}`}
          onClick={() => setActiveTab('tools')}
        >
          Tools ({agentConfig.tools.length})
        </button>
      </div>

      {activeTab === 'config' && (
        <div className="agent-config">
          <label className="config-field">
            <span>Name</span>
            <input
              type="text"
              value={agentConfig.name}
              onChange={e => updateConfig('name', e.target.value)}
              placeholder="My Agent"
            />
          </label>

          <label className="config-field">
            <span>Description</span>
            <input
              type="text"
              value={agentConfig.description}
              onChange={e => updateConfig('description', e.target.value)}
              placeholder="What this agent does"
            />
          </label>

          <label className="config-field">
            <span>System Prompt</span>
            <textarea
              value={agentConfig.systemPrompt}
              onChange={e => updateConfig('systemPrompt', e.target.value)}
              rows={4}
              placeholder="You are a helpful AI assistant..."
            />
          </label>

          <label className="config-field">
            <span>Model</span>
            <select
              value={agentConfig.model}
              onChange={e => updateConfig('model', e.target.value)}
            >
              {DEFAULT_MODELS.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </label>

          <label className="config-field">
            <span>Temperature: {agentConfig.temperature.toFixed(1)}</span>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={agentConfig.temperature}
              onChange={e => updateConfig('temperature', parseFloat(e.target.value))}
            />
          </label>

          <label className="config-field">
            <span>Max Tokens: {agentConfig.maxTokens}</span>
            <input
              type="range"
              min="256"
              max="8192"
              step="256"
              value={agentConfig.maxTokens}
              onChange={e => updateConfig('maxTokens', parseInt(e.target.value))}
            />
          </label>

          <button
            onClick={startAgent}
            disabled={isLoading}
            className="start-button"
          >
            {isLoading ? 'Starting...' : 'Start Agent'}
          </button>
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="agent-chat">
          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="no-messages">
                Click "Start Agent" to begin the conversation
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`message message-${msg.role}`}>
                  <div className="message-header">{msg.role}</div>
                  <div className="message-body">{msg.content}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'tools' && (
        <div className="tool-selector">
          <p className="tool-hint">Select tools to enable for this agent:</p>
          <div className="tool-list">
            {BUILT_IN_TOOLS.map(tool => (
              <label key={tool.name} className="tool-item">
                <input
                  type="checkbox"
                  checked={agentConfig.tools.includes(tool.name)}
                  onChange={() => toggleTool(tool.name)}
                />
                <div className="tool-info">
                  <span className="tool-name">{tool.name}</span>
                  <span className="tool-desc">{tool.description}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Standalone chat interface for builder
export function AgentBuilderChat({
  messages,
  isLoading,
  onSend,
  onClear
}: {
  messages: Message[]
  isLoading: boolean
  onSend: (msg: string) => void
  onClear: () => void
}) {
  const [input, setInput] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    onSend(input)
    setInput('')
  }

  return (
    <div className="builder-chat">
      <div className="builder-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message message-${msg.role}`}>
            <div className="message-role">{msg.role}</div>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
        {isLoading && <div className="loading">Thinking...</div>}
      </div>
      <form onSubmit={handleSubmit} className="builder-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>Send</button>
        <button type="button" onClick={onClear}>Clear</button>
      </form>
    </div>
  )
}
