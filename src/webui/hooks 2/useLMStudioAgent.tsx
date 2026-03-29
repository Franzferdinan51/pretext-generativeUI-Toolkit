import { useState, useCallback, useEffect, useRef } from 'react'

export interface LMStudioConfig {
  baseUrl: string
  model?: string
  apiKey?: string
}

export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface UseLMStudioAgentReturn {
  messages: Message[]
  isLoading: boolean
  error: string | null
  streamingContent: string
  sendMessage: (content: string) => Promise<string>
  sendStreamingMessage: (content: string, onChunk: (chunk: string) => void) => Promise<string>
  listModels: () => Promise<string[]>
  healthCheck: () => Promise<boolean>
  clear: () => void
  setModel: (model: string) => void
  currentModel: string
}

export function useLMStudioAgent(config: LMStudioConfig): UseLMStudioAgentReturn {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [streamingContent, setStreamingContent] = useState('')
  const [currentModel, setCurrentModel] = useState(config.model || 'qwen3.5-27b')

  // Use proxy in dev, direct URL in prod
  const baseUrl = config.baseUrl || '/api/lm-studio'
  const apiKey = config.apiKey || 'sk-lm-zO7bswIc:WkHEMTUfVNkq5WYNyFOW'

  // Send message and get streaming response
  const sendMessage = useCallback(async (content: string): Promise<string> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${baseUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: currentModel,
          messages: [
            ...messages,
            { role: 'user' as const, content }
          ],
          stream: false
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      const fullResponse = data.choices?.[0]?.message?.content || ''

      setMessages(prev => [
        ...prev,
        { role: 'user', content },
        { role: 'assistant', content: fullResponse }
      ])

      return fullResponse
    } catch (err: any) {
      const errorMsg = err.message || 'Unknown error'
      setError(errorMsg)
      throw new Error(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }, [messages, baseUrl, apiKey, currentModel])

  // Send streaming message with callback
  const sendStreamingMessage = useCallback(async (
    content: string,
    onChunk: (chunk: string) => void
  ): Promise<string> => {
    setIsLoading(true)
    setError(null)
    setStreamingContent('')

    try {
      const response = await fetch(`${baseUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: currentModel,
          messages: [
            ...messages,
            { role: 'user' as const, content }
          ],
          stream: true
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No response body')
      }

      const decoder = new TextDecoder()
      let fullResponse = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6)
            if (dataStr === '[DONE]') continue
            try {
              const data = JSON.parse(dataStr)
              if (data.choices?.[0]?.delta?.content) {
                const token = data.choices[0].delta.content
                fullResponse += token
                setStreamingContent(fullResponse)
                onChunk(token)
              }
            } catch {
              // Skip malformed JSON
            }
          }
        }
      }

      setMessages(prev => [
        ...prev,
        { role: 'user', content },
        { role: 'assistant', content: fullResponse }
      ])

      return fullResponse
    } catch (err: any) {
      const errorMsg = err.message || 'Unknown error'
      setError(errorMsg)
      throw new Error(errorMsg)
    } finally {
      setIsLoading(false)
      setStreamingContent('')
    }
  }, [messages, baseUrl, apiKey, currentModel])

  // List available models
  const listModels = useCallback(async (): Promise<string[]> => {
    try {
      const response = await fetch(`${baseUrl}/v1/models`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      })
      const data = await response.json()
      return data.data?.map((m: any) => m.id) || []
    } catch {
      return []
    }
  }, [baseUrl, apiKey])

  // Check if connected
  const healthCheck = useCallback(async (): Promise<boolean> => {
    try {
      // Try the health endpoint
      const response = await fetch(`${baseUrl}/health`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      })
      if (response.ok) return true

      // Fallback: try models endpoint
      const modelsResponse = await fetch(`${baseUrl}/v1/models`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      })
      return modelsResponse.ok
    } catch {
      return false
    }
  }, [baseUrl, apiKey])

  // Clear messages
  const clear = useCallback(() => {
    setMessages([])
    setError(null)
    setStreamingContent('')
  }, [])

  // Set model
  const setModel = useCallback((model: string) => {
    setCurrentModel(model)
  }, [])

  return {
    messages,
    isLoading,
    error,
    streamingContent,
    sendMessage,
    sendStreamingMessage,
    listModels,
    healthCheck,
    clear,
    setModel,
    currentModel
  }
}

// Default config
const defaultConfig: LMStudioConfig = {
  baseUrl: '/api/lm-studio',
  apiKey: 'sk-lm-zO7bswIc:WkHEMTUfVNkq5WYNyFOW',
  model: 'qwen3.5-27b'
}

let globalConfig = { ...defaultConfig }
let globalAgentInstance: ReturnType<typeof useLMStudioAgent> | null = null
let globalAgentState = {
  messages: [] as Message[],
  isLoading: false,
  error: null as string | null,
  streamingContent: '',
  currentModel: defaultConfig.model!
}

export function setGlobalLMStudioConfig(config: Partial<LMStudioConfig>) {
  globalConfig = { ...globalConfig, ...config }
  globalAgentInstance = null // Reset instance
}

export function getGlobalLMStudioConfig() {
  return { ...globalConfig }
}

// Context for sharing agent across components
import { createContext, useContext, useMemo } from 'react'

interface LMStudioContextType extends UseLMStudioAgentReturn {
  config: LMStudioConfig
  setConfig: (config: Partial<LMStudioConfig>) => void
}

const LMStudioContext = createContext<LMStudioContextType | null>(null)

export function LMStudioProvider({ children, config }: { children: React.ReactNode, config?: Partial<LMStudioConfig> }) {
  const finalConfig = useMemo(() => ({ ...globalConfig, ...config }), [config])
  const agent = useLMStudioAgent(finalConfig)

  const value = useMemo(() => ({
    ...agent,
    config: finalConfig,
    setConfig: (c: Partial<LMStudioConfig>) => {
      globalConfig = { ...globalConfig, ...c }
    }
  }), [agent, finalConfig])

  return (
    <LMStudioContext.Provider value={value}>
      {children}
    </LMStudioContext.Provider>
  )
}

export function useLMStudio() {
  const context = useContext(LMStudioContext)
  if (!context) {
    // Return a no-op if not in provider
    const agent = useLMStudioAgent(globalConfig)
    return { ...agent, config: globalConfig, setConfig: setGlobalLMStudioConfig }
  }
  return context
}
