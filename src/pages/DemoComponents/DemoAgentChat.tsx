/**
 * DemoAgentChat - Demo for LM Studio Agent integration
 */
import React, { useState } from 'react'
import { useLMStudioAgent } from '../../agents'

export function DemoAgentChat() {
  const [input, setInput] = useState('')
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'testing'>('disconnected')
  
  const { 
    messages, 
    isLoading, 
    sendMessage, 
    healthCheck,
    clear 
  } = useLMStudioAgent({ 
    baseUrl: 'http://100.116.54.125:1234',
    model: 'qwen3.5-27b'
  })

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    const userInput = input
    setInput('')
    await sendMessage(userInput)
  }

  const handleHealthCheck = async () => {
    setConnectionStatus('testing')
    try {
      const isHealthy = await healthCheck()
      setConnectionStatus(isHealthy ? 'connected' : 'disconnected')
    } catch {
      setConnectionStatus('disconnected')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${
            connectionStatus === 'connected' ? 'bg-green-500' : 
            connectionStatus === 'testing' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
          }`} />
          <span className="text-sm text-gray-400">
            {connectionStatus === 'connected' ? 'Connected to LM Studio' : 
             connectionStatus === 'testing' ? 'Testing connection...' : 'Disconnected'}
          </span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleHealthCheck}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors"
          >
            Test Connection
          </button>
          <button 
            onClick={clear}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="bg-black/50 rounded-lg p-4 h-64 overflow-auto">
        {messages.length === 0 ? (
          <p className="text-gray-600 italic text-center py-8">
            Send a message to chat with the AI agent...
          </p>
        ) : (
          messages.map((msg, i) => (
            <div 
              key={i} 
              className={`mb-3 ${
                msg.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <span className={`inline-block px-3 py-2 rounded-lg ${
                msg.role === 'user' 
                  ? 'bg-purple-600/40 text-purple-300' 
                  : 'bg-cyan-600/40 text-cyan-300'
              }`}>
                <span className="text-xs opacity-60 mr-2">{msg.role}</span>
                {msg.content.slice(0, 200)}{msg.content.length > 200 ? '...' : ''}
              </span>
            </div>
          ))
        )}
        {isLoading && (
          <div className="text-center py-2">
            <span className="text-cyan-400 animate-pulse">Thinking...</span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:opacity-50 rounded-lg text-sm transition-colors"
        >
          Send
        </button>
      </div>
      
      <p className="text-xs text-gray-600">
        Note: Requires LM Studio running at http://100.116.54.125:1234
      </p>
    </div>
  )
}

export default DemoAgentChat
