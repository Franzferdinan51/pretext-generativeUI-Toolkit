/**
 * LM Studio Agent Controller
 * Control LM Studio directly from React
 */

import { useState, useCallback } from 'react'

export interface LMStudioConfig {
  baseUrl: string  // 'http://100.116.54.125:1234'
  model?: string   // 'qwen3.5-plus', 'glm-4.7-flash', etc.
  apiKey?: string  // Optional API key for authenticated endpoints
}

export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface UseLMStudioAgentReturn {
  messages: Message[]
  isLoading: boolean
  error: string | null
  sendMessage: (content: string) => Promise<string>
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
  const [currentModel, setCurrentModel] = useState(config.model || 'qwen3.5-plus')

  const baseUrl = config.baseUrl || 'http://100.116.54.125:1234'
  const apiKey = config.apiKey || 'lm-studio'

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
          stream: true
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      // Handle streaming response
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
        // Parse SSE lines
        const lines = chunk.split('\n')
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6)
            if (dataStr === '[DONE]') continue
            try {
              const data = JSON.parse(dataStr)
              if (data.choices?.[0]?.delta?.content) {
                fullResponse += data.choices[0].delta.content
              }
            } catch {
              // Skip malformed JSON
            }
          }
        }
      }

      // Add to messages
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
      const response = await fetch(`${baseUrl}/health`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      })
      return response.ok
    } catch {
      return false
    }
  }, [baseUrl, apiKey])

  // Clear messages
  const clear = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  // Set model
  const setModel = useCallback((model: string) => {
    setCurrentModel(model)
  }, [])

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    listModels,
    healthCheck,
    clear,
    setModel,
    currentModel
  }
}

// Default export with standard config
export function useLMStudioAgentDefault() {
  return useLMStudioAgent({
    baseUrl: 'http://100.116.54.125:1234',
    model: 'qwen3.5-plus'
  })
}
