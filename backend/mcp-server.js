#!/usr/bin/env node

/**
 * Generative UI MCP Server
 */

import { generateUI, renderSpec, listComponents } from './generative-ui.js'
import http from 'http'

const parseRequest = (body) => {
  try {
    return JSON.parse(body)
  } catch {
    return null
  }
}

const makeError = (id, code, message) => ({
  jsonrpc: '2.0',
  id,
  error: { code, message }
})

const TOOLS = [
  {
    name: 'generate_ui',
    description: 'Generate a complete website UI from a description',
    inputSchema: {
      type: 'object',
      properties: {
        description: { type: 'string', description: 'What to build' },
        sections: { type: 'array', items: { type: 'string' }, description: 'Sections: nav, hero, features, stats, pricing, faq, cta, footer' },
        brand: { type: 'string', description: 'Brand name' },
        style: { type: 'string', enum: ['dark', 'light'], default: 'dark' }
      },
      required: ['description']
    }
  },
  {
    name: 'render_spec',
    description: 'Render an A2UI JSON spec to HTML',
    inputSchema: {
      type: 'object',
      properties: { spec: { type: 'object' } },
      required: ['spec']
    }
  },
  {
    name: 'list_components',
    description: 'List all available UI components',
    inputSchema: { type: 'object', properties: {} }
  }
]

const IMPLEMENTATIONS = {
  async generate_ui(params) {
    return await generateUI({
      description: params.description,
      sections: params.sections,
      brand: params.brand,
      style: params.style || 'dark'
    })
  },
  
  async render_spec(params) {
    return { html: renderSpec(params.spec) }
  },
  
  async list_components() {
    return { components: listComponents() }
  }
}

function createServer(port = 3457) {
  const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    
    if (req.method === 'OPTIONS') {
      res.writeHead(200)
      res.end()
      return
    }
    
    if (req.method === 'GET' && req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ status: 'ok', tools: TOOLS.length }))
      return
    }
    
    if (req.method === 'GET' && req.url === '/tools') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ tools: TOOLS }))
      return
    }
    
    if (req.method === 'POST' && req.url === '/mcp') {
      let body = ''
      req.on('data', chunk => body += chunk)
      req.on('end', async () => {
        try {
          const request = parseRequest(body)
          if (!request) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(makeError(null, -32700, 'Parse error')))
            return
          }
          
          const { method, params, id } = request
          
          if (method === 'tools/list') {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ jsonrpc: '2.0', id, result: { tools: TOOLS } }))
            return
          }
          
          if (method === 'tools/call') {
            const { name, arguments: args } = params
            const impl = IMPLEMENTATIONS[name]
            
            if (!impl) {
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify(makeError(id, -32601, `Unknown tool: ${name}`)))
              return
            }
            
            try {
              const result = await impl(args || {})
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({
                jsonrpc: '2.0',
                id,
                result: { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
              }))
            } catch (error) {
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify(makeError(id, -32603, error.message)))
            }
            return
          }
          
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(makeError(id, -32601, `Unknown method: ${method}`)))
          
        } catch (error) {
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(makeError(null, -32603, error.message)))
        }
      })
      return
    }
    
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Not found' }))
  })
  
  return server
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = parseInt(process.env.MCP_PORT || '3457', 10)
  const server = createServer(port)
  
  console.log(`🎨 Generative UI MCP Server`)
  console.log(`📡 http://localhost:${port}`)
  console.log(`   GET  /health - Health check`)
  console.log(`   GET  /tools  - List tools`)
  console.log(`   POST /mcp    - MCP protocol`)
  console.log(`⚡ Ready!`)
  
  server.listen(port, () => {})
  
  process.on('SIGINT', () => {
    console.log('\n👋')
    server.close()
    process.exit(0)
  })
}

export { createServer, TOOLS, IMPLEMENTATIONS }
