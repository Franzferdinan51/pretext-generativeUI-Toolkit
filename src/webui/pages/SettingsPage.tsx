// src/webui/pages/SettingsPage.tsx - SUPER FANCY VERSION
import React, { useState, useEffect } from 'react'
import { useLMStudio } from '../hooks/useLMStudioAgent'

const defaultModels = [
  { id: 'qwen3.5-27b', name: 'Qwen 3.5 27B', description: 'Fast responses, good quality', recommended: true },
  { id: 'qwen3.5-35b-a3b', name: 'Qwen 3.5 35B MoE', description: 'Balanced, mixture of experts', recommended: false },
  { id: 'unsloth/qwen3.5-35b-a3b', name: 'Qwen 3.5 35B (Unsloth)', description: 'Optimized for speed', recommended: false },
  { id: 'zai-org/glm-4.7-flash', name: 'GLM 4.7 Flash', description: 'Very fast reasoning', recommended: false },
  { id: 'jan-v3-4b-base-instruct', name: 'Jan 3B', description: 'Ultra fast, lower quality', recommended: false },
  { id: 'liquid/lfm2-24b-a2b', name: 'Liquid AI 24B', description: 'Liquid architecture', recommended: false },
  { id: 'nvidia/nemotron-3-nano', name: 'Nemotron Nano', description: 'Compact tasks', recommended: false },
  { id: 'qwen3-vl-8b-thinking', name: 'Qwen VL 8B (Thinking)', description: 'Vision + reasoning', recommended: false },
]

export default function SettingsPage() {
  const { config, healthCheck, listModels, currentModel, setModel, setConfig } = useLMStudio()
  
  const [lmStudioUrl, setLmStudioUrl] = useState(config.baseUrl)
  const [selectedModel, setSelectedModel] = useState(currentModel)
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [availableModels, setAvailableModels] = useState<string[]>([])
  const [isChecking, setIsChecking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [connectionTime, setConnectionTime] = useState<number | null>(null)

  async function testConnection() {
    setIsChecking(true)
    setError(null)
    setIsConnected(null)
    
    const startTime = Date.now()
    
    try {
      setConfig({ baseUrl: lmStudioUrl })
      const connected = await healthCheck()
      setIsConnected(connected)
      
      if (connected) {
        setConnectionTime(Date.now() - startTime)
        const models = await listModels()
        setAvailableModels(models)
      } else {
        setError('Could not connect to LM Studio')
      }
    } catch (err: any) {
      setIsConnected(false)
      setError(err.message || 'Connection failed')
    } finally {
      setIsChecking(false)
    }
  }

  function saveSettings() {
    setConfig({ 
      baseUrl: lmStudioUrl,
      model: selectedModel 
    })
    setModel(selectedModel)
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          ⚙️ Settings
        </h1>
        <p className="text-gray-400">Configure your Pretext AI UI Toolkit</p>
      </div>
      
      {/* Connection Status */}
      <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
        <h2 className="text-xl font-bold mb-4">🧠 LM Studio Connection</h2>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className={`w-4 h-4 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : isConnected === false ? 'bg-red-500' : 'bg-gray-500'}`} />
            <span className="font-medium">
              {isConnected === null ? 'Not tested' : isConnected ? 'Connected!' : 'Disconnected'}
            </span>
            {connectionTime && (
              <span className="text-sm text-gray-400">({connectionTime}ms)</span>
            )}
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">LM Studio URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={lmStudioUrl}
                onChange={e => setLmStudioUrl(e.target.value)}
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:border-purple-500"
                placeholder="http://localhost:1234"
              />
              <button
                onClick={testConnection}
                disabled={isChecking}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium hover:scale-105 transition-transform disabled:opacity-50"
              >
                {isChecking ? 'Testing...' : 'Test'}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400">
              {error}
            </div>
          )}
          
          {availableModels.length > 0 && (
            <div>
              <label className="block text-sm text-gray-400 mb-2">Available Models</label>
              <div className="flex flex-wrap gap-2">
                {availableModels.slice(0, 10).map(model => (
                  <span key={model} className="px-3 py-1 bg-white/10 rounded-lg text-sm">{model}</span>
                ))}
                {availableModels.length > 10 && (
                  <span className="px-3 py-1 bg-white/5 rounded-lg text-sm text-gray-400">
                    +{availableModels.length - 10} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Model Selection */}
      <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
        <h2 className="text-xl font-bold mb-4">🤖 Model Selection</h2>
        
        <div className="space-y-2">
          {defaultModels.map(model => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`w-full p-4 rounded-xl text-left transition-colors flex items-center justify-between ${
                selectedModel === model.id 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div>
                <div className="font-medium flex items-center gap-2">
                  {model.name}
                  {model.recommended && (
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">Recommended</span>
                  )}
                </div>
                <div className={`text-sm ${selectedModel === model.id ? 'text-white/70' : 'text-gray-400'}`}>
                  {model.description}
                </div>
              </div>
              {selectedModel === model.id && (
                <span className="text-2xl">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Save Button */}
      <button
        onClick={saveSettings}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform"
      >
        💾 Save Settings
      </button>
      
      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { emoji: '🔧', title: 'Configuration', desc: 'All settings are saved to localStorage' },
          { emoji: '🔒', title: 'Privacy', desc: 'Your data stays on your machine' },
          { emoji: '🚀', title: 'Performance', desc: 'Optimized for local AI inference' },
        ].map(info => (
          <div key={info.title} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl mb-2">{info.emoji}</div>
            <h3 className="font-bold">{info.title}</h3>
            <p className="text-sm text-gray-400">{info.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
