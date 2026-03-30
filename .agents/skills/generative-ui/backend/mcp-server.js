#!/usr/bin/env node

/**
 * Pretext Canvas MCP Server
 * Provides tools for generating UI via Pretext + Canvas
 * 
 * Tools:
 *   generate_weather - Create animated weather card
 *   generate_crypto - Create crypto price chart
 *   generate_metric - Create metric/stat card
 *   generate_plant - Create plant health dashboard
 *   serve_file - Serve HTML on LAN
 *   get_template - Get template for custom generation
 */

import { readFileSync, writeFileSync } from 'fs'
import { createServer } from 'http'

const PORT = 3457
const OUTPUT_DIR = '/tmp'

// ============ TEMPLATES ============

const templates = {
  weather: (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weather - ${data.temp}°</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0a0a0f; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    canvas { max-width: 100vw; max-height: 100vh; }
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <script type="module">
    import { prepareWithSegments, layoutWithLines } from 'https://unpkg.com/@chenglou/pretext@0.0.3/dist/layout.js'
    const canvas = document.getElementById('c')
    const ctx = canvas.getContext('2d')
    canvas.width = 500
    canvas.height = 900
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    const d = ${JSON.stringify(data)}
    let time = 0
    function roundRect(x, y, w, h, r) {
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      ctx.lineTo(x + w - r, y)
      ctx.quadraticCurveTo(x + w, y, x + w, y + r)
      ctx.lineTo(x + w, y + h - r)
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
      ctx.lineTo(x + r, y + h)
      ctx.quadraticCurveTo(x, y + h, x, y + h - r)
      ctx.lineTo(x, y + r)
      ctx.quadraticCurveTo(x, y, x + r, y)
      ctx.closePath()
    }
    function draw() {
      time += 0.016
      const bg = ctx.createLinearGradient(0, 0, 0, 900)
      bg.addColorStop(0, '#1a0a2e')
      bg.addColorStop(0.5, '#0f0a1a')
      bg.addColorStop(1, '#0a0a0f')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, 500, 900)
      ctx.save()
      ctx.filter = 'blur(80px)'
      ctx.fillStyle = \`rgba(139, 92, 246, \${0.15 + Math.sin(time) * 0.03})\`
      ctx.beginPath()
      ctx.arc(100, 200, 100, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = \`rgba(236, 72, 153, \${0.12 + Math.cos(time) * 0.02})\`
      ctx.beginPath()
      ctx.arc(400, 180, 80, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
      ctx.fillStyle = '#a78bfa'
      ctx.font = '24px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(d.location, 250, 70)
      const iconY = 130 + Math.sin(time * 1.5) * 8
      ctx.font = '80px serif'
      ctx.fillText(d.icon, 250, iconY + 70)
      const tempGrad = ctx.createLinearGradient(0, 220, 0, 330)
      tempGrad.addColorStop(0, '#ffffff')
      tempGrad.addColorStop(0.4, '#c084fc')
      tempGrad.addColorStop(1, '#ec4899')
      ctx.fillStyle = tempGrad
      ctx.font = 'bold 120px Inter, sans-serif'
      ctx.fillText(d.temp + '°', 250, 330)
      ctx.fillStyle = '#e5e5e5'
      ctx.font = 'bold 48px Inter, sans-serif'
      ctx.fillText(d.desc, 250, 365)
      ctx.fillStyle = '#6b7280'
      ctx.font = '18px Inter, sans-serif'
      ctx.fillText('Feels like ' + d.temp + '°F', 250, 395)
      const metricsY = 440
      const metrics = [
        { icon: '💧', value: d.humidity + '%', label: 'Humidity' },
        { icon: '💨', value: d.wind, label: 'Wind' },
        { icon: '🌡️', value: d.pressure, label: 'Pressure' }
      ]
      for (let i = 0; i < 3; i++) {
        const mx = 85 + i * 120
        const my = metricsY + Math.sin(time * 2 + i) * 3
        ctx.fillStyle = 'rgba(255,255,255,0.05)'
        roundRect(mx - 50, my, 100, 90, 16)
        ctx.fill()
        ctx.strokeStyle = \`rgba(168, 85, 247, \${0.2 + Math.sin(time + i) * 0.1})\`
        ctx.lineWidth = 1.5
        roundRect(mx - 50, my, 100, 90, 16)
        ctx.stroke()
        ctx.font = '24px serif'
        ctx.textAlign = 'center'
        ctx.fillText(metrics[i].icon, mx, my + 30)
        ctx.fillStyle = '#c084fc'
        ctx.font = 'bold 28px Inter, sans-serif'
        ctx.fillText(metrics[i].value, mx, my + 60)
        ctx.fillStyle = '#6b7280'
        ctx.font = '14px Inter, sans-serif'
        ctx.fillText(metrics[i].label, mx, my + 80)
      }
      ctx.fillStyle = '#4b5563'
      ctx.font = '14px Inter, sans-serif'
      ctx.fillText('Pretext Canvas • DuckBot Weather', 250, 870)
      ctx.fillStyle = '#8b5cf6'
      ctx.fillText('🦆', 250, 890)
      requestAnimationFrame(draw)
    }
    draw()
  </script>
</body>
</html>`,

  crypto: (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} Chart</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0a0a0f; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    canvas { max-width: 100vw; max-height: 100vh; }
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <script type="module">
    import { prepareWithSegments, layoutWithLines } from 'https://unpkg.com/@chenglou/pretext@0.0.3/dist/layout.js'
    const canvas = document.getElementById('c')
    const ctx = canvas.getContext('2d')
    canvas.width = 500
    canvas.height = 900
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    const d = ${JSON.stringify(data)}
    let time = 0
    function roundRect(x, y, w, h, r) {
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      ctx.lineTo(x + w - r, y)
      ctx.quadraticCurveTo(x + w, y, x + w, y + r)
      ctx.lineTo(x + w, y + h - r)
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
      ctx.lineTo(x + r, y + h)
      ctx.quadraticCurveTo(x, y + h, x, y + h - r)
      ctx.lineTo(x, y + r)
      ctx.quadraticCurveTo(x, y, x + r, y)
      ctx.closePath()
    }
    function draw() {
      time += 0.016
      const bg = ctx.createLinearGradient(0, 0, 0, 900)
      bg.addColorStop(0, '#0a1428')
      bg.addColorStop(0.3, '#0a0a1a')
      bg.addColorStop(1, '#0a0a0f')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, 500, 900)
      ctx.save()
      ctx.filter = 'blur(100px)'
      ctx.fillStyle = d.positive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'
      ctx.beginPath()
      ctx.arc(350, 150, 150, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 48px sans-serif'
      ctx.fillStyle = d.color
      ctx.textAlign = 'center'
      ctx.fillText(d.symbol, 250, 60)
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 28px Inter, sans-serif'
      ctx.fillText(d.name, 250, 100)
      const priceGrad = ctx.createLinearGradient(0, 130, 0, 200)
      if (d.positive) {
        priceGrad.addColorStop(0, '#ffffff')
        priceGrad.addColorStop(1, '#22c55e')
      } else {
        priceGrad.addColorStop(0, '#ffffff')
        priceGrad.addColorStop(1, '#ef4444')
      }
      ctx.fillStyle = priceGrad
      ctx.font = 'bold 64px Inter, sans-serif'
      ctx.fillText(d.price, 250, 200)
      ctx.fillStyle = d.positive ? '#22c55e' : '#ef4444'
      ctx.font = 'bold 20px Inter, sans-serif'
      ctx.fillText((d.positive ? '▲ ' : '▼ ') + d.change, 250, 235)
      const stats = [
        { label: '24h High', value: d.high24h, color: '#22c55e' },
        { label: '24h Low', value: d.low24h, color: '#ef4444' },
        { label: 'Volume', value: d.volume, color: '#ffffff' },
        { label: 'Market Cap', value: d.marketCap, color: '#ffffff' }
      ]
      for (let i = 0; i < 4; i++) {
        const sx = 50 + (i % 2) * 200
        const sy = 280 + Math.floor(i / 2) * 70
        ctx.fillStyle = 'rgba(255,255,255,0.05)'
        roundRect(sx, sy, 190, 55, 12)
        ctx.fill()
        ctx.fillStyle = 'rgba(255,255,255,0.4)'
        ctx.font = '11px Inter, sans-serif'
        ctx.textAlign = 'left'
        ctx.fillText(stats[i].label, sx + 15, sy + 20)
        ctx.fillStyle = stats[i].color
        ctx.font = 'bold 18px Inter, sans-serif'
        ctx.fillText(stats[i].value, sx + 15, sy + 45)
      }
      ctx.fillStyle = '#4b5563'
      ctx.font = '12px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('Pretext Canvas • DuckBot Crypto', 250, 870)
      ctx.fillStyle = d.color
      ctx.fillText('🦆', 250, 890)
      requestAnimationFrame(draw)
    }
    draw()
  </script>
</body>
</html>`,

  metric: (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.value}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0a0a0f; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    canvas { max-width: 100vw; max-height: 100vh; }
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <script type="module">
    import { prepareWithSegments, layoutWithLines } from 'https://unpkg.com/@chenglou/pretext@0.0.3/dist/layout.js'
    const canvas = document.getElementById('c')
    const ctx = canvas.getContext('2d')
    canvas.width = 400
    canvas.height = 300
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    const d = ${JSON.stringify(data)}
    let time = 0
    function roundRect(x, y, w, h, r) {
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      ctx.lineTo(x + w - r, y)
      ctx.quadraticCurveTo(x + w, y, x + w, y + r)
      ctx.lineTo(x + w, y + h - r)
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
      ctx.lineTo(x + r, y + h)
      ctx.quadraticCurveTo(x, y + h, x, y + h - r)
      ctx.lineTo(x, y + r)
      ctx.quadraticCurveTo(x, y, x + r, y)
      ctx.closePath()
    }
    function draw() {
      time += 0.016
      const bg = ctx.createLinearGradient(0, 0, 0, 300)
      bg.addColorStop(0, '#1a0a2e')
      bg.addColorStop(1, '#0a0a0f')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, 400, 300)
      ctx.save()
      ctx.filter = 'blur(60px)'
      ctx.fillStyle = 'rgba(168, 85, 247, 0.2)'
      ctx.beginPath()
      ctx.arc(200, 120, 100, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
      ctx.font = '64px serif'
      ctx.textAlign = 'center'
      ctx.fillText(d.icon, 200, 90)
      const valGrad = ctx.createLinearGradient(0, 100, 0, 180)
      valGrad.addColorStop(0, '#ffffff')
      valGrad.addColorStop(1, '#c084fc')
      ctx.fillStyle = valGrad
      ctx.font = 'bold 72px Inter, sans-serif'
      ctx.fillText(d.value, 200, 170)
      ctx.fillStyle = '#a78bfa'
      ctx.font = '14px Inter, sans-serif'
      ctx.fillText(d.label.toUpperCase(), 200, 210)
      if (d.trend) {
        ctx.fillStyle = d.trend.positive ? '#22c55e' : '#ef4444'
        ctx.font = 'bold 18px Inter, sans-serif'
        ctx.fillText((d.trend.positive ? '↑' : '↓') + ' ' + d.trend.value, 200, 250)
      }
      requestAnimationFrame(draw)
    }
    draw()
  </script>
</body>
</html>`
}

// ============ MCP HANDLERS ============

const handlers = {
  generate_weather: async (args) => {
    const { temp = '72', location = 'Local Area', desc = 'Sunny', humidity = '45', wind = '8 mph', icon = '☀️' } = args
    
    const icons = { sunny: '☀️', cloudy: '☁️', rainy: '🌧️', stormy: '⛈️', snowy: '❄️', partly: '⛅', clear: '🌙' }
    const iconChar = icons[desc.toLowerCase()] || icon || '☀️'
    
    const data = { temp, location, desc, humidity, wind, pressure: '30.1', icon: iconChar }
    const html = templates.weather(data)
    const filename = `weather-${Date.now()}.html`
    const path = `${OUTPUT_DIR}/${filename}`
    
    writeFileSync(path, html)
    
    return {
      success: true,
      path,
      url: `http://100.68.208.113:8080/${filename}`,
      data
    }
  },

  generate_crypto: async (args) => {
    const { name = 'Bitcoin', symbol = '₿', price = '$67,000', change = '+2.5%', positive = true, color = '#f7931a' } = args
    
    const data = {
      name,
      symbol,
      price,
      change,
      positive: positive !== false,
      color,
      high24h: price,
      low24h: '$65,000',
      volume: '$28.4B',
      marketCap: '$1.33T'
    }
    
    const html = templates.crypto(data)
    const filename = `crypto-${Date.now()}.html`
    const path = `${OUTPUT_DIR}/${filename}`
    
    writeFileSync(path, html)
    
    return {
      success: true,
      path,
      url: `http://100.68.208.113:8080/${filename}`,
      data
    }
  },

  generate_metric: async (args) => {
    const { value = '99.9%', label = 'Uptime', icon = '📊', trend_value, trend_positive = true } = args
    
    const data = {
      value,
      label,
      icon,
      trend: trend_value ? { value: trend_value, positive: trend_positive !== false } : null
    }
    
    const html = templates.metric(data)
    const filename = `metric-${Date.now()}.html`
    const path = `${OUTPUT_DIR}/${filename}`
    
    writeFileSync(path, html)
    
    return {
      success: true,
      path,
      url: `http://100.68.208.113:8080/${filename}`,
      data
    }
  },

  serve_file: async (args) => {
    const { filename } = args
    if (!filename) {
      return { success: false, error: 'filename required' }
    }
    
    return {
      success: true,
      url: `http://100.68.208.113:8080/${filename}`,
      local: `http://localhost:8080/${filename}`
    }
  },

  get_template: async (args) => {
    const { type = 'weather' } = args
    const template = templates[type]
    
    if (!template) {
      return { success: false, error: `Unknown template: ${type}`, available: Object.keys(templates) }
    }
    
    return {
      success: true,
      type,
      available: Object.keys(templates),
      description: {
        weather: 'Animated weather card with temperature, conditions, humidity, wind',
        crypto: 'Crypto chart with price, change, 24h stats',
        metric: 'Metric/stat card with value, label, trend'
      }
    }
  },

  list_generated: async () => {
    // This would normally read the directory
    return {
      success: true,
      output_dir: OUTPUT_DIR,
      available_types: ['weather', 'crypto', 'metric'],
      note: 'Files are saved to /tmp/*.html and served on port 8080'
    }
  }
}

// ============ MCP PROTOCOL ============

const server = createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json')
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }
  
  if (req.method === 'GET') {
    if (req.url === '/health') {
      res.end(JSON.stringify({ status: 'ok', service: 'pretext-canvas-mcp' }))
      return
    }
    if (req.url === '/tools') {
      res.end(JSON.stringify({
        tools: Object.keys(handlers),
        descriptions: {
          generate_weather: 'Generate animated weather card',
          generate_crypto: 'Generate crypto price chart',
          generate_metric: 'Generate metric/stat card',
          serve_file: 'Get URL for generated file',
          get_template: 'Get template info',
          list_generated: 'List available types'
        }
      }))
      return
    }
  }
  
  if (req.method === 'POST') {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', async () => {
      try {
        const { tool, args = {} } = JSON.parse(body)
        const handler = handlers[tool]
        
        if (!handler) {
          res.end(JSON.stringify({ success: false, error: 'Unknown tool', available: Object.keys(handlers) }))
          return
        }
        
        const result = await handler(args)
        res.end(JSON.stringify(result))
      } catch (e) {
        res.end(JSON.stringify({ success: false, error: e.message }))
      }
    })
    return
  }
  
  res.end(JSON.stringify({ error: 'Not found', hint: 'POST with {tool, args}' }))
})

server.listen(PORT, () => {
  console.log(`⚡ Pretext Canvas MCP Server running on port ${PORT}`)
  console.log(`   GET  /health - Check status`)
  console.log(`   GET  /tools  - List tools`)
  console.log(`   POST / - Call tool: {tool, args}`)
  console.log('')
  console.log('Available tools:')
  Object.keys(handlers).forEach(tool => {
    console.log(`   - ${tool}`)
  })
})

process.on('SIGINT', () => {
  console.log('\n👋 Pretext Canvas MCP stopped')
  server.close()
  process.exit(0)
})
