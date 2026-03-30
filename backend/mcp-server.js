#!/usr/bin/env node

/**
 * Generative UI MCP Server
 */

import { generateUI, renderSpec, listComponents } from './generative-ui.js'
import http from 'http'
import { writeFileSync } from 'fs'

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
  },
  {
    name: 'generate_scene',
    description: 'Generate a Pretext Canvas scene HTML file from a named template',
    inputSchema: {
      type: 'object',
      properties: {
        template: { type: 'string', enum: ['weather', 'crypto', 'orbit'] },
        title: { type: 'string' },
        output: { type: 'string' }
      },
      required: ['template']
    }
  },
  {
    name: 'validate_text_fit',
    description: 'Validate whether text fits within a width/line constraint',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string' },
        fontSize: { type: 'number' },
        maxWidth: { type: 'number' },
        maxLines: { type: 'number' }
      },
      required: ['text', 'maxWidth']
    }
  },
  {
    name: 'measure_text',
    description: 'Measure text height and line count using Pretext',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string' },
        fontSize: { type: 'number' },
        maxWidth: { type: 'number' }
      },
      required: ['text']
    }
  },
  {
    name: 'layout_lines',
    description: 'Return exact laid out text lines using Pretext',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string' },
        fontSize: { type: 'number' },
        maxWidth: { type: 'number' },
        lineHeight: { type: 'number' }
      },
      required: ['text']
    }
  },
  {
    name: 'find_optimal_width',
    description: 'Find minimum width for a target max line count',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string' },
        fontSize: { type: 'number' },
        maxLines: { type: 'number' },
        minWidth: { type: 'number' },
        maxWidth: { type: 'number' }
      },
      required: ['text']
    }
  },
  {
    name: 'float_text',
    description: 'Flow text around an obstacle rectangle',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string' },
        fontSize: { type: 'number' },
        maxWidth: { type: 'number' },
        obstacle: { type: 'object' }
      },
      required: ['text']
    }
  }
]

async function callPretextServer(action, args) {
  const response = await fetch('http://localhost:3458', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...args })
  })
  return response.json()
}

function sceneHtml(template, title = 'Pretext Scene') {
  const palette = {
    weather: { symbol: '☁️', color: '#a78bfa', bgTop: '#1a0a2e', bgBottom: '#0a0a0f' },
    crypto: { symbol: '₿', color: '#f7931a', bgTop: '#0a1428', bgBottom: '#0a0a0f' },
    orbit: { symbol: '✦', color: '#22c55e', bgTop: '#0a0a14', bgBottom: '#05050a' },
  }[template] || { symbol: '✦', color: '#8b5cf6', bgTop: '#111827', bgBottom: '#020617' }

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>*{margin:0;padding:0;box-sizing:border-box}body{background:${palette.bgBottom};display:flex;justify-content:center;align-items:center;min-height:100vh}canvas{max-width:100vw;max-height:100vh}</style></head><body><canvas id="c"></canvas><script type="module">import { prepareWithSegments, layoutWithLines } from 'https://unpkg.com/@chenglou/pretext@0.0.3/dist/layout.js';const canvas=document.getElementById('c');const ctx=canvas.getContext('2d');canvas.width=500;canvas.height=500;let t=0;function lines(text,font,maxWidth,lineHeight=24){const p=prepareWithSegments(text,font);return layoutWithLines(p,maxWidth,lineHeight).lines}function drawText(text,font,x,y,color,align='center'){ctx.font=font;ctx.fillStyle=color;const ls=lines(text,font,340,28);for(const line of ls){const dx=align==='center'?x-line.width/2:align==='right'?x-line.width:x;ctx.fillText(line.text,dx,y+line.y+parseInt(font,10))}}function frame(){t+=0.016;const bg=ctx.createLinearGradient(0,0,0,500);bg.addColorStop(0,'${palette.bgTop}');bg.addColorStop(1,'${palette.bgBottom}');ctx.fillStyle=bg;ctx.fillRect(0,0,500,500);ctx.save();ctx.filter='blur(80px)';ctx.fillStyle='${palette.color}22';ctx.beginPath();ctx.arc(250+Math.sin(t)*20,180+Math.cos(t*0.7)*20,100,0,Math.PI*2);ctx.fill();ctx.restore();ctx.fillStyle='${palette.color}';ctx.font='bold 56px Inter';ctx.textAlign='center';ctx.fillText('${palette.symbol}',250,95+Math.sin(t*2)*6);drawText(${JSON.stringify(title)},'bold 34px Inter',250,120,'#ffffff');drawText('template: ${template}','16px Inter',250,175,'${palette.color}');drawText('Pretext measures. Canvas animates. AI composes.','18px Inter',250,230,'#94a3b8');for(let i=0;i<3;i++){const a=t*(i%2?1:-1)+(i*2.1);drawText(['MEASURE','LAYOUT','MOTION'][i],'14px Inter',250+Math.cos(a)*(80+i*24),250+Math.sin(a)*(80+i*24),'${palette.color}');}requestAnimationFrame(frame)}frame();</script></body></html>`
}

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
  },

  async generate_scene(params) {
    const filename = params.output || `/tmp/${params.template}-scene-${Date.now()}.html`
    const html = sceneHtml(params.template, params.title)
    writeFileSync(filename, html)
    return { file: filename, url: `http://100.68.208.113:8080/${filename.split('/').pop()}` }
  },

  async validate_text_fit(params) {
    return await callPretextServer('validate_text_fit', params)
  },

  async measure_text(params) {
    return await callPretextServer('measure_text', params)
  },

  async layout_lines(params) {
    return await callPretextServer('layout_lines', params)
  },

  async find_optimal_width(params) {
    return await callPretextServer('find_optimal_width', params)
  },

  async float_text(params) {
    return await callPretextServer('float_text', params)
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
