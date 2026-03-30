#!/usr/bin/env node

/**
 * Generative UI MCP Server
 * Provides tools for AI agents to generate UIs
 */

const { generateUI, renderSpec, listComponents } = require('./generative-ui.js')
const http = require('http')

// MCP protocol helpers
const parseRequest = (body) => {
  try {
    return JSON.parse(body)
  } catch {
    return null
  }
}

const makeResponse = (id, result, error = null) => ({
  jsonrpc: '2.0',
  id,
  result,
  error
})

const makeError = (id, code, message) => ({
  jsonrpc: '2.0',
  id,
  error: { code, message }
})

// Tool definitions for MCP
const TOOLS = [
  {
    name: 'generate_ui',
    description: 'Generate a complete website UI from a description. Returns A2UI JSON spec and rendered HTML.',
    inputSchema: {
      type: 'object',
      properties: {
        description: {
          type: 'string',
          description: 'What to build (e.g., "SaaS landing page", "E-commerce site")'
        },
        sections: {
          type: 'array',
          items: { type: 'string' },
          description: 'Sections to include: nav, hero, features, stats, pricing, faq, cta, footer',
          default: ['nav', 'hero', 'features', 'pricing', 'faq', 'cta', 'footer']
        },
        brand: {
          type: 'string',
          description: 'Brand name for the website'
        },
        style: {
          type: 'string',
          enum: ['dark', 'light'],
          default: 'dark'
        }
      },
      required: ['description']
    }
  },
  {
    name: 'render_spec',
    description: 'Render an A2UI JSON spec to HTML',
    inputSchema: {
      type: 'object',
      properties: {
        spec: {
          type: 'object',
          description: 'A2UI JSON spec object'
        }
      },
      required: ['spec']
    }
  },
  {
    name: 'list_components',
    description: 'List all available UI components',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'preview',
    description: 'Generate a preview URL for a website spec',
    inputSchema: {
      type: 'object',
      properties: {
        spec: {
          type: 'object',
          description: 'A2UI JSON spec'
        },
        port: {
          type: 'number',
          default: 3456,
          description: 'Port for preview server'
        }
      },
      required: ['spec']
    }
  }
]

// Tool implementations
const IMPLEMENTATIONS = {
  async generate_ui(params) {
    const result = await generateUI({
      description: params.description,
      sections: params.sections,
      brand: params.brand,
      style: params.style || 'dark'
    })
    return result
  },
  
  async render_spec(params) {
    return {
      html: renderSpec(params.spec)
    }
  },
  
  async list_components() {
    return {
      components: listComponents()
    }
  },
  
  async preview(params) {
    const html = renderSpec(params.spec)
    const port = params.port || 3456
    
    return {
      message: `Preview available at http://localhost:${port}`,
      html: html.substring(0, 500) + '...',
      note: 'Full HTML generated, use render_spec to get complete output'
    }
  }
}

// HTTP server for MCP
function createServer(port = 3457) {
  const server = http.createServer(async (req, res) => {
    // CORS headers
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
          
          // Handle MCP protocol methods
          if (method === 'tools/list') {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
              jsonrpc: '2.0',
              id,
              result: { tools: TOOLS }
            }))
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
                result: {
                  content: [
                    {
                      type: 'text',
                      text: JSON.stringify(result, null, 2)
                    }
                  ]
                }
              }))
            } catch (error) {
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify(makeError(id, -32603, error.message)))
            }
            return
          }
          
          // Unknown method
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(makeError(id, -32601, `Unknown method: ${method}`)))
          
        } catch (error) {
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(makeError(null, -32603, error.message)))
        }
      })
      return
    }
    
    // 404
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Not found' }))
  })
  
  return server
}

// CLI entry
if (require.main === module) {
  const port = parseInt(process.env.MCP_PORT || '3457', 10)
  const server = createServer(port)
  
  server.listen(port, () => {
    console.log(`🎨 Generative UI MCP Server`)
    console.log(`📡 Running on http://localhost:${port}`)
    console.log(`🔧 Endpoints:`)
    console.log(`   GET  /health     - Health check`)
    console.log(`   GET  /tools      - List tools`)
    console.log(`   POST /mcp        - MCP protocol`)
    console.log('')
    console.log(`⚡ Ready for agents!`)
  })
  
  process.on('SIGINT', () => {
    console.log('\n👋 Shutting down...')
    server.close()
    process.exit(0)
  })
}

module.exports = { createServer, TOOLS, IMPLEMENTATIONS }
