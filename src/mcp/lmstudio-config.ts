/**
 * LM Studio MCP Configuration
 * Configuration for LM Studio MCP server connection
 */

export interface LMStudioMCPConfig {
  local: {
    url: string
    type: 'openai-compatible'
    apiKey?: string
  }
  mcpTools: MCPToolDefinition[]
  availableModels: ModelDefinition[]
}

export interface MCPToolDefinition {
  name: string
  description: string
  params: Record<string, ParamDefinition>
}

export interface ParamDefinition {
  type: string
  description: string
  required?: boolean
  default?: any
}

export interface ModelDefinition {
  id: string
  name: string
  type: 'text' | 'vision' | 'embedding'
  contextLength?: number
}

export const LM_STUDIO_MCP_CONFIG: LMStudioMCPConfig = {
  local: {
    url: 'http://100.116.54.125:1234',
    type: 'openai-compatible',
    apiKey: 'lm-studio'
  },
  mcpTools: [
    {
      name: 'lm_chat',
      description: 'Chat with LM Studio models',
      params: {
        model: { type: 'string', description: 'Model ID to use', required: true },
        message: { type: 'string', description: 'User message', required: true },
        temperature: { type: 'number', description: 'Sampling temperature', default: 0.7 },
        max_tokens: { type: 'number', description: 'Max tokens to generate', default: 2048 }
      }
    },
    {
      name: 'lm_embed',
      description: 'Generate text embeddings',
      params: {
        model: { type: 'string', description: 'Embedding model ID', required: true },
        text: { type: 'string', description: 'Text to embed', required: true }
      }
    },
    {
      name: 'lm_complete',
      description: 'Text completion (non-chat models)',
      params: {
        model: { type: 'string', description: 'Model ID', required: true },
        prompt: { type: 'string', description: 'Completion prompt', required: true },
        max_tokens: { type: 'number', description: 'Max tokens', default: 256 },
        temperature: { type: 'number', description: 'Temperature', default: 0.7 }
      }
    }
  ],
  availableModels: [
    // Vision models
    { id: 'qwen3-vl-8b-thinking', name: 'Qwen 3 VL 8B (Thinking)', type: 'vision', contextLength: 8192 },
    { id: 'qwen3-vl-4b-thinking', name: 'Qwen 3 VL 4B (Thinking)', type: 'vision', contextLength: 8192 },
    { id: 'qwen/qwen3-vl-8b', name: 'Qwen 3 VL 8B', type: 'vision', contextLength: 8192 },
    { id: 'qwen/qwen3-vl-4b', name: 'Qwen 3 VL 4B', type: 'vision', contextLength: 8192 },
    { id: 'jan-v2-vl-high', name: 'Jan v2 VL High', type: 'vision', contextLength: 4096 },
    { id: 'zai-org/glm-4.6v-flash', name: 'GLM 4.6V Flash', type: 'vision', contextLength: 8192 },
    // Text models
    { id: 'qwen3.5-plus', name: 'Qwen 3.5 Plus', type: 'text', contextLength: 32768 },
    { id: 'glm-4.7-flash', name: 'GLM 4.7 Flash', type: 'text', contextLength: 128000 },
    { id: 'jan-v3-4b-base-instruct', name: 'Jan v3 4B', type: 'text', contextLength: 4096 },
    { id: 'qwen3.5-27b', name: 'Qwen 3.5 27B', type: 'text', contextLength: 32768 },
    { id: 'unsloth/qwen3.5-35b-a3b', name: 'Qwen 3.5 35B MoE', type: 'text', contextLength: 32768 },
    { id: 'liquid/lfm2-24b-a2b', name: 'Liquid LFM2 24B', type: 'text', contextLength: 16384 },
    { id: 'nvidia/nemotron-3-nano', name: 'NVIDIA Nemotron 3 Nano', type: 'text', contextLength: 4096 },
    // Embedding models
    { id: 'text-embedding-nomic-embed-text-v1.5', name: 'Nomic Embed Text v1.5', type: 'embedding', contextLength: 8192 }
  ]
}

// Connection helper
export async function checkLMStudioConnection(url?: string): Promise<boolean> {
  try {
    const baseUrl = url || LM_STUDIO_MCP_CONFIG.local.url
    const response = await fetch(`${baseUrl}/health`, {
      headers: { 'Authorization': `Bearer ${LM_STUDIO_MCP_CONFIG.local.apiKey}` }
    })
    return response.ok
  } catch {
    return false
  }
}

// Get models from server
export async function fetchAvailableModels(url?: string): Promise<string[]> {
  try {
    const baseUrl = url || LM_STUDIO_MCP_CONFIG.local.url
    const response = await fetch(`${baseUrl}/v1/models`, {
      headers: { 'Authorization': `Bearer ${LM_STUDIO_MCP_CONFIG.local.apiKey}` }
    })
    const data = await response.json()
    return data.data?.map((m: any) => m.id) || []
  } catch {
    return []
  }
}
