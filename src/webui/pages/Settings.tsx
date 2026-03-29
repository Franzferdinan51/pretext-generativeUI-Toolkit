import React, { useState, useEffect, useCallback } from 'react'
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
      // Update config with new URL
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
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold gradient-text">Settings</h2>
        <p className="text-gray-400 mt-1">Configure your LM Studio connection and model preferences</p>
      </div>
      
      {/* Connection Status Card */}
      <div className="card p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          🔌 Connection Status
        </h3>
        
        <div className={`p-4 rounded-lg mb-4 ${
          isConnected === true 
            ? 'bg-green-500/10 border border-green-500/30' 
            : isConnected === false 
            ? 'bg-red-500/10 border border-red-500/30'
            : 'bg-gray-500/10 border border-gray-500/30'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${
              isConnected === true 
                ? 'bg-green-500 animate-pulse' 
                : isConnected === false 
                ? 'bg-red-500' 
                : 'bg-gray-500'
            }`} />
            <span className={`
              ${isConnected === true ? 'text-green-400' : ''}
              ${isConnected === false ? 'text-red-400' : ''}
              ${isConnected === null ? 'text-gray-400' : ''}
            `}>
              {isConnected === null && 'Not tested'}
              {isConnected === true && `✅ Connected (${connectionTime}ms)`}
              {isConnected === false && '❌ Not connected'}
            </span>
          </div>
          {error && (
            <p className="text-sm text-red-400 mt-2 ml-6">{error}</p>
          )}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={testConnection}
            disabled={isChecking}
            className="btn btn-primary flex-1"
          >
            {isChecking ? (
              <>
                <span className="loading-dots"><span></span><span></span><span></span></span>
                Checking...
              </>
            ) : (
              '🔄 Test Connection'
            )}
          </button>
        </div>
        
        {availableModels.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-2">Available models on server:</p>
            <div className="flex flex-wrap gap-2">
              {availableModels.map(model => (
                <span key={model} className="badge badge-cyan text-xs">
                  {model.split('/').pop()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* LM Studio URL */}
      <div className="card p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          🌐 LM Studio URL
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Server URL</label>
            <input
              type="text"
              value={lmStudioUrl}
              onChange={e => setLmStudioUrl(e.target.value)}
              placeholder="http://100.116.54.125:1234"
              className="input"
            />
            <p className="text-xs text-gray-500 mt-2">
              The URL of your LM Studio server. Default: http://100.116.54.125:1234
            </p>
          </div>
        </div>
      </div>
      
      {/* Model Selection */}
      <div className="card p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          🤖 Model Selection
        </h3>
        
        <div className="space-y-3">
          {defaultModels.map(model => (
            <div
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedModel === model.id
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{model.name}</span>
                    {model.recommended && (
                      <span className="badge badge-green text-xs">Recommended</span>
                    )}
                    {availableModels.includes(model.id) && (
                      <span className="badge badge-cyan text-xs">Available</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{model.description}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 ${
                  selectedModel === model.id
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-gray-500'
                }`}>
                  {selectedModel === model.id && (
                    <div className="w-full h-full rounded-full bg-white scale-50" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Save Button */}
      <div className="flex gap-4">
        <button
          onClick={saveSettings}
          className="btn btn-primary flex-1 py-3"
        >
          💾 Save Settings
        </button>
        <button
          onClick={() => {
            setLmStudioUrl('http://100.116.54.125:1234')
            setSelectedModel('qwen3.5-27b')
          }}
          className="btn btn-secondary"
        >
          Reset to Default
        </button>
      </div>
      
      {/* Info */}
      <div className="card p-6 bg-blue-500/5 border-blue-500/20">
        <h4 className="font-medium text-blue-400 mb-2">💡 About LM Studio</h4>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>• LM Studio runs AI models locally on your Windows PC</li>
          <li>• Make sure LM Studio is running and the API server is enabled</li>
          <li>• Default port is 1234 (http://localhost:1234)</li>
          <li>• For remote access, use your PC's local IP address</li>
          <li>• Streaming responses are supported for real-time text generation</li>
        </ul>
      </div>
    </div>
  )
}
