/**
 * Example 01: Full AI Agent Chat
 * 
 * This example demonstrates a complete chat interface
 * with LM Studio agent integration.
 */

import React, { useState } from 'react'
import { useLMStudioAgent } from '../../src/agents'
import { LoadingDots } from '../../src/streaming'
import { SmartMessage } from '../../src/components'

export function AgentChatExample() {
  const [input, setInput] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  
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
    setIsConnected(false)
    try {
      const isHealthy = await healthCheck()
      setIsConnected(isHealthy)
    } catch {
      setIsConnected(false)
    }
  }

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">AI Agent Chat Example</h1>
      
      {/* Connection Status */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${
            isConnected ? 'bg-green-500' : 'bg-red-500'
          }`} />
          <span className="text-sm text-gray-400">
            {isConnected ? 'Connected to LM Studio' : 'Disconnected'}
          </span>
        </div>
        <button 
          onClick={handleHealthCheck}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
        >
          Test Connection
        </button>
      </div>

      {/* Chat Messages */}
      <div className="bg-black/50 rounded-lg p-6 h-96 overflow-auto mb-4">
        {messages.length === 0 ? (
          <p className="text-gray-600 italic text-center py-8">
            Send a message to chat with the AI agent...
          </p>
        ) : (
          messages.map((msg, i) => (
            <SmartMessage key={i} content={msg.content} />
          ))
        )}
        {isLoading && (
          <div className="flex items-center gap-2 py-4">
            <LoadingDots />
            <span className="text-gray-500 text-sm">Thinking...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:opacity-50 rounded-lg transition-colors"
        >
          Send
        </button>
        <button
          onClick={clear}
          className="px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  )
}

export default AgentChatExample
