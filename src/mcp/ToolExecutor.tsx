/**
 * MCP Tool Executor
 * Execute MCP tools from LM Studio
 */

import { useState, useCallback } from 'react'

export interface MCPTool {
  name: string
  description: string
  inputSchema: {
    type: 'object'
    properties: Record<string, ToolParam>
    required?: string[]
  }
}

export interface ToolParam {
  type: string
  description: string
  default?: any
}

export interface ToolResult {
  tool: string
  result: any
  timestamp: number
  error?: string
}

// Built-in tools that work with LM Studio
export const BUILT_IN_TOOLS: MCPTool[] = [
  {
    name: 'web_search',
    description: 'Search the web for information',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query' },
        num_results: { type: 'number', description: 'Number of results', default: 5 }
      },
      required: ['query']
    }
  },
  {
    name: 'fetch_website',
    description: 'Fetch content from a URL',
    inputSchema: {
      type: 'object',
      properties: {
        url: { type: 'string', description: 'URL to fetch' }
      },
      required: ['url']
    }
  },
  {
    name: 'run_code',
    description: 'Execute JavaScript code',
    inputSchema: {
      type: 'object',
      properties: {
        code: { type: 'string', description: 'JavaScript code to run' },
        language: { type: 'string', description: 'Language (js, python)', default: 'js' }
      },
      required: ['code']
    }
  },
  {
    name: 'calculate',
    description: 'Perform mathematical calculations',
    inputSchema: {
      type: 'object',
      properties: {
        expression: { type: 'string', description: 'Math expression' }
      },
      required: ['expression']
    }
  },
  {
    name: 'get_weather',
    description: 'Get weather for a location',
    inputSchema: {
      type: 'object',
      properties: {
        location: { type: 'string', description: 'City name' }
      },
      required: ['location']
    }
  },
  {
    name: 'get_crypto_price',
    description: 'Get cryptocurrency price',
    inputSchema: {
      type: 'object',
      properties: {
        symbol: { type: 'string', description: 'Crypto symbol (BTC, ETH, etc.)' }
      },
      required: ['symbol']
    }
  },
  {
    name: 'send_telegram',
    description: 'Send a Telegram message',
    inputSchema: {
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Message to send' },
        chat_id: { type: 'string', description: 'Telegram chat ID', default: '588090613' }
      },
      required: ['message']
    }
  },
  {
    name: 'generate_image',
    description: 'Generate an image',
    inputSchema: {
      type: 'object',
      properties: {
        prompt: { type: 'string', description: 'Image prompt' },
        model: { type: 'string', description: 'Model (flux, sd3)', default: 'flux' }
      },
      required: ['prompt']
    }
  },
  {
    name: 'text_to_speech',
    description: 'Convert text to speech',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'Text to speak' },
        voice: { type: 'string', description: 'Voice ID' }
      },
      required: ['text']
    }
  },
  {
    name: 'read_file',
    description: 'Read a file from disk',
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'File path' }
      },
      required: ['path']
    }
  },
  {
    name: 'write_file',
    description: 'Write content to a file',
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'File path' },
        content: { type: 'string', description: 'Content to write' }
      },
      required: ['path', 'content']
    }
  },
  {
    name: 'list_directory',
    description: 'List files in a directory',
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'Directory path' }
      },
      required: ['path']
    }
  },
  {
    name: 'execute_command',
    description: 'Execute a shell command',
    inputSchema: {
      type: 'object',
      properties: {
        command: { type: 'string', description: 'Command to execute' },
        cwd: { type: 'string', description: 'Working directory' }
      },
      required: ['command']
    }
  }
]

// Tool execution functions
const TOOL_HANDLERS: Record<string, (args: Record<string, any>) => Promise<any>> = {
  web_search: async ({ query, num_results = 5 }) => {
    try {
      const response = await fetch(
        `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=${num_results}`,
        { headers: { 'Accept': 'application/json' } }
      )
      const data = await response.json()
      return data.web?.results?.map((r: any) => ({
        title: r.title,
        url: r.url,
        snippet: r.description
      })) || []
    } catch (err) {
      return { error: 'Web search failed', details: String(err) }
    }
  },

  fetch_website: async ({ url }) => {
    try {
      const response = await fetch(url)
      const text = await response.text()
      return text.slice(0, 2000)
    } catch (err) {
      return { error: 'Fetch failed', details: String(err) }
    }
  },

  run_code: async ({ code, language = 'js' }) => {
    if (language !== 'js') {
      return { error: `Language ${language} not supported in browser` }
    }
    try {
      const fn = new Function(code)
      return String(fn())
    } catch (err) {
      return { error: String(err) }
    }
  },

  calculate: async ({ expression }) => {
    try {
      // Simple math evaluator (for demo - in production use math.js)
      const result = Function(`"use strict"; return (${expression})`)()
      return String(result)
    } catch (err) {
      return { error: 'Calculation failed', details: String(err) }
    }
  },

  get_weather: async ({ location }) => {
    try {
      const response = await fetch(`https://wttr.in/${encodeURIComponent(location)}?format=j1`)
      const data = await response.json()
      return {
        location,
        temp: data.current_condition?.[0]?.temp_F + '°F' || 'N/A',
        condition: data.current_condition?.[0]?.weatherDesc?.[0]?.value || 'Unknown'
      }
    } catch (err) {
      return { error: 'Weather lookup failed', details: String(err) }
    }
  },

  get_crypto_price: async ({ symbol }) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${symbol.toLowerCase()}&vs_currencies=usd`
      )
      const data = await response.json()
      return data[symbol.toLowerCase()]?.usd
        ? `$${data[symbol.toLowerCase()].usd}`
        : 'Not found'
    } catch (err) {
      return { error: 'Crypto price lookup failed', details: String(err) }
    }
  },

  send_telegram: async ({ message, chat_id = '588090613' }) => {
    // This would call the Telegram API through OpenClaw gateway
    return `Message queued for ${chat_id}: ${message.slice(0, 100)}...`
  },

  generate_image: async ({ prompt }) => {
    // Would call ComfyUI or similar
    return { status: 'queued', prompt, message: 'Image generation would be triggered here' }
  },

  text_to_speech: async ({ text }) => {
    // Would call TTS API
    return { status: 'queued', text: text.slice(0, 100), message: 'TTS would be triggered here' }
  },

  read_file: async ({ path }) => {
    return { status: 'requires_backend', path, message: 'File operations require backend support' }
  },

  write_file: async ({ path, content }) => {
    return { status: 'requires_backend', path, size: content.length, message: 'File operations require backend support' }
  },

  list_directory: async ({ path }) => {
    return { status: 'requires_backend', path, message: 'Directory listing requires backend support' }
  },

  execute_command: async ({ command }) => {
    return { status: 'requires_backend', command, message: 'Command execution requires backend support' }
  }
}

// Hook for using MCP tools
export function useMCPTools() {
  const [results, setResults] = useState<Map<string, ToolResult>>(new Map())
  const [loading, setLoading] = useState<Set<string>>(new Set())

  const executeTool = useCallback(async (toolName: string, args: Record<string, any>): Promise<any> => {
    const handler = TOOL_HANDLERS[toolName]
    if (!handler) {
      throw new Error(`Unknown tool: ${toolName}`)
    }

    setLoading(prev => new Set(prev).add(toolName))
    try {
      const result = await handler(args)
      const toolResult: ToolResult = {
        tool: toolName,
        result,
        timestamp: Date.now()
      }
      setResults(prev => new Map(prev).set(toolName, toolResult))
      return result
    } catch (err: any) {
      const errorResult: ToolResult = {
        tool: toolName,
        result: null,
        timestamp: Date.now(),
        error: err.message
      }
      setResults(prev => new Map(prev).set(toolName, errorResult))
      throw err
    } finally {
      setLoading(prev => {
        const next = new Set(prev)
        next.delete(toolName)
        return next
      })
    }
  }, [])

  const clearResults = useCallback(() => {
    setResults(new Map())
  }, [])

  return {
    tools: BUILT_IN_TOOLS,
    results,
    loading,
    executeTool,
    clearResults
  }
}

// Standalone executor function
export async function executeMCPTool(toolName: string, args: Record<string, any>): Promise<any> {
  const handler = TOOL_HANDLERS[toolName]
  if (!handler) {
    throw new Error(`Unknown tool: ${toolName}`)
  }
  return handler(args)
}

// Get tool by name
export function getToolByName(name: string): MCPTool | undefined {
  return BUILT_IN_TOOLS.find(t => t.name === name)
}
