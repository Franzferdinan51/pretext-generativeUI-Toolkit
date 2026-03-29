// src/webui/pages/AgentsPage.tsx - SUPER FANCY VERSION
import React, { useState } from 'react'
import { AgentBuilder, AgentBuilderChat } from '../../agents/AgentBuilder'
import { AgentChat } from '../../agents/AgentChat'
import { useLMStudio } from '../../agents/LMStudioAgent'
import { useMCPTools, executeMCPTool } from '../../mcp/ToolExecutor'
import { ToolResultsPanel } from '../../mcp/ToolResultsPanel'

const agentTypes = [
  { id: 'chat', name: 'Chat Agent', emoji: '💬', description: 'Conversational AI agent', color: 'from-purple-500 to-pink-500' },
  { id: 'lmstudio', name: 'LM Studio Agent', emoji: '🧠', description: 'Local AI with LM Studio', color: 'from-blue-500 to-cyan-500' },
  { id: 'builder', name: 'Builder Agent', emoji: '🔧', description: 'Build and create with AI', color: 'from-green-500 to-emerald-500' },
  { id: 'executor', name: 'Tool Executor', emoji: '⚡', description: 'Execute tasks and tools', color: 'from-orange-500 to-amber-500' },
]

const availableModels = [
  { id: 'qwen3.5-27b', name: 'Qwen 3.5 27B', description: 'Fast responses, good quality' },
  { id: 'qwen3.5-35b-a3b', name: 'Qwen 3.5 35B MoE', description: 'Balanced, mixture of experts' },
  { id: 'glm-4.7-flash', name: 'GLM 4.7 Flash', description: 'Very fast reasoning' },
  { id: 'jan-v3-4b', name: 'Jan 3B', description: 'Ultra fast, lower quality' },
]

const tools = [
  { id: 'web_search', name: 'Web Search', emoji: '🔍', description: 'Search the web for information' },
  { id: 'code_execute', name: 'Code Execution', emoji: '💻', description: 'Execute code snippets' },
  { id: 'file_read', name: 'File Reader', emoji: '📄', description: 'Read files from the system' },
  { id: 'image_gen', name: 'Image Generation', emoji: '🎨', description: 'Generate images with AI' },
]

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState('chat')
  const [selectedModel, setSelectedModel] = useState('qwen3.5-27b')
  const [activeTools, setActiveTools] = useState<string[]>(['web_search'])
  const [agentName, setAgentName] = useState('My AI Agent')
  const [agentDescription, setAgentDescription] = useState('')
  const [chatMessages, setChatMessages] = useState<{role: string; content: string}[]>([])
  const [toolResults, setToolResults] = useState<{tool: string; result: string}[]>([])

  const toggleTool = (toolId: string) => {
    setActiveTools(prev => 
      prev.includes(toolId) 
        ? prev.filter(t => t !== toolId)
        : [...prev, toolId]
    )
  }

  const renderAgentPanel = () => {
    switch (selectedAgent) {
      case 'chat':
        return <AgentChat />
      case 'lmstudio':
        return (
          <div className="p-8 text-center">
            <div className="text-4xl mb-4">🧠</div>
            <p className="text-gray-400">LM Studio Agent uses the configured model</p>
            <p className="text-sm text-purple-400 mt-2">Model: {selectedModel}</p>
          </div>
        )
      case 'builder':
        return <AgentBuilderChat name={agentName} />
      case 'executor':
        return (
          <div className="p-8 text-center">
            <div className="text-4xl mb-4">⚡</div>
            <p className="text-gray-400">Tool Executor ready</p>
            <p className="text-sm text-green-400 mt-2">{activeTools.length} tools active</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          🤖 AI Agents
        </h1>
        <p className="text-gray-400">Create and interact with AI agents powered by LM Studio</p>
      </div>
      
      {/* Agent Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agentTypes.map(agent => (
          <button
            key={agent.id}
            onClick={() => setSelectedAgent(agent.id)}
            className={`p-4 rounded-xl bg-white/5 border transition-all hover:scale-105 ${
              selectedAgent === agent.id 
                ? 'border-transparent bg-gradient-to-br ' + agent.color 
                : 'border-white/10 hover:border-white/30'
            }`}
          >
            <div className="text-3xl mb-2">{agent.emoji}</div>
            <h3 className="font-bold">{agent.name}</h3>
            <p className="text-sm opacity-80">{agent.description}</p>
          </button>
        ))}
      </div>
      
      {/* Agent Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Configuration */}
        <div className="space-y-6">
          {/* Model Selection */}
          <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-bold mb-4">🧠 Model Selection</h3>
            <div className="space-y-2">
              {availableModels.map(model => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={`w-full p-3 rounded-xl text-left transition-colors ${
                    selectedModel === model.id 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="font-medium">{model.name}</div>
                  <div className="text-sm opacity-70">{model.description}</div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Tools Selection (for executor) */}
          {selectedAgent === 'executor' && (
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold mb-4">⚡ Available Tools</h3>
              <div className="grid grid-cols-2 gap-2">
                {tools.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => toggleTool(tool.id)}
                    className={`p-3 rounded-xl text-left transition-colors ${
                      activeTools.includes(tool.id)
                        ? 'bg-green-600 text-white'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-lg mb-1">{tool.emoji}</div>
                    <div className="font-medium text-sm">{tool.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Agent Builder Options */}
          {selectedAgent === 'builder' && (
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6 space-y-4">
              <h3 className="text-lg font-bold">🔧 Agent Configuration</h3>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Agent Name</label>
                <input
                  type="text"
                  value={agentName}
                  onChange={e => setAgentName(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea
                  value={agentDescription}
                  onChange={e => setAgentDescription(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:border-purple-500 h-24 resize-none"
                  placeholder="Describe what this agent should do..."
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Right Panel - Agent Interface */}
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-white/5">
            <h3 className="font-bold">
              {agentTypes.find(a => a.id === selectedAgent)?.emoji} {' '}
              {agentTypes.find(a => a.id === selectedAgent)?.name}
            </h3>
            <p className="text-sm text-gray-400">
              Model: {selectedModel}
            </p>
          </div>
          <div className="h-[500px] overflow-auto">
            {renderAgentPanel()}
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Available Agents', value: agentTypes.length, emoji: '🤖' },
          { label: 'AI Models', value: availableModels.length, emoji: '🧠' },
          { label: 'Tools', value: tools.length, emoji: '⚡' },
          { label: 'Active Sessions', value: 0, emoji: '💬' },
        ].map(stat => (
          <div key={stat.label} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="text-2xl mb-2">{stat.emoji}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
