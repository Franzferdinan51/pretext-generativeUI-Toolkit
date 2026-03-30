#!/usr/bin/env node

/**
 * Pretext Canvas CLI
 * Generate UI components via Pretext + Canvas
 * 
 * Usage:
 *   pretext-canvas weather "72F sunny Dayton"
 *   pretext-canvas crypto "Bitcoin $67000"
 *   pretext-canvas plant "health check 85 score"
 *   pretext-canvas chart --type=line --data="1,2,3,4,5"
 *   pretext-canvas server --start
 */

import { createServer } from 'http'
import { readFileSync, writeFileSync } from 'fs'

const PRETEXT_SERVER = 'http://localhost:3458'
const OUTPUT_DIR = '/tmp'

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  purple: '\x1b[35m'
}

function log(color, ...args) {
  console.log(color + args.join(' ') + colors.reset)
}

function help() {
  console.log(`
${colors.purple}${colors.bright}Pretext Canvas CLI${colors.reset}
Generate UI components via Pretext + Canvas

${colors.cyan}USAGE:${colors.reset}
  pretext-canvas <command> [options]

${colors.cyan}COMMANDS:${colors.reset}
  ${colors.green}weather <description>${colors.reset}    Generate weather card
  ${colors.green}crypto <description>${colors.reset}    Generate crypto chart
  ${colors.green}plant <description>${colors.reset}      Generate plant health card
  ${colors.green}chart <type> [data]${colors.reset}      Generate custom chart
  ${colors.green}server <start|stop|status>${colors.reset}  Manage Pretext server
  ${colors.green}serve [file]${colors.reset}            Serve HTML file on LAN
  ${colors.green}generate <type> [opts]${colors.reset}  Generate any UI type

${colors.cyan}OPTIONS:${colors.reset}
  --output, -o <path>      Output file path (default: /tmp/)
  --theme, -t <theme>      Theme: dark|light|rpg|finance|plant
  --width, -w <px>         Canvas width (default: 500)
  --height, -h <px>        Canvas height (default: auto)
  --open, -x              Open in browser after generation
  --serve, -s             Start local server after generation
  --verbose, -v           Verbose output

${colors.cyan}EXAMPLES:${colors.reset}
  pretext-canvas weather "72F sunny Dayton Ohio"
  pretext-canvas crypto "Bitcoin $67000 24h up"
  pretext-canvas plant "health 85 score vpd 0.89"
  pretext-canvas chart line "10,20,15,30,25"
  pretext-canvas generate metric "99.9% uptime"
  pretext-canvas serve my-card.html

${colors.cyan}TYPICAL WORKFLOW:${colors.reset}
  1. Generate card:  pretext-canvas weather "72F" -o /tmp/weather
  2. Open browser:   pretext-canvas serve /tmp/weather.html
  3. Access via LAN:   http://<ip>:8080/weather.html
`)
}

// ============ GENERATORS ============

async function generateWeather(input) {
  const data = parseWeatherInput(input)
  
  const html = `<!DOCTYPE html>
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
    
    // Data
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
      
      // Background
      const bg = ctx.createLinearGradient(0, 0, 0, 900)
      bg.addColorStop(0, '#1a0a2e')
      bg.addColorStop(0.5, '#0f0a1a')
      bg.addColorStop(1, '#0a0a0f')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, 500, 900)
      
      // Aurora
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
      
      // Stars
      ctx.fillStyle = 'rgba(255,255,255,0.6)'
      for (let i = 0; i < 100; i++) {
        const x = (i * 137.5) % 500
        const y = (i * 97.3) % 900
        const r = 0.5 + (i % 3) * 0.5
        const twinkle = 0.5 + 0.5 * Math.sin(time * 2 + i)
        ctx.globalAlpha = twinkle * 0.8
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      
      // Title
      ctx.fillStyle = '#a78bfa'
      ctx.font = '24px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(d.location, 250, 70)
      
      // Icon (floating)
      const iconY = 130 + Math.sin(time * 1.5) * 8
      ctx.font = '80px serif'
      ctx.fillText(d.icon, 250, iconY + 70)
      
      // Temperature
      const tempGrad = ctx.createLinearGradient(0, 220, 0, 330)
      tempGrad.addColorStop(0, '#ffffff')
      tempGrad.addColorStop(0.4, '#c084fc')
      tempGrad.addColorStop(1, '#ec4899')
      ctx.fillStyle = tempGrad
      ctx.font = 'bold 120px Inter, sans-serif'
      ctx.fillText(d.temp + '°', 250, 330)
      
      // Description
      ctx.fillStyle = '#e5e5e5'
      ctx.font = 'bold 48px Inter, sans-serif'
      ctx.fillText(d.desc, 250, 365)
      ctx.fillStyle = '#6b7280'
      ctx.font = '18px Inter, sans-serif'
      ctx.fillText('Feels like ' + d.temp + '°F', 250, 395)
      
      // Metrics
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
      
      // Footer
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
</html>`
  
  return html
}

async function generateCrypto(input) {
  const data = parseCryptoInput(input)
  
  const html = `<!DOCTYPE html>
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
      
      // Background
      const bg = ctx.createLinearGradient(0, 0, 0, 900)
      bg.addColorStop(0, '#0a1428')
      bg.addColorStop(0.3, '#0a0a1a')
      bg.addColorStop(1, '#0a0a0f')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, 500, 900)
      
      // Glow
      ctx.save()
      ctx.filter = 'blur(100px)'
      ctx.fillStyle = d.positive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'
      ctx.beginPath()
      ctx.arc(350, 150, 150, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
      
      // Stars
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      for (let i = 0; i < 80; i++) {
        const x = (i * 123.7) % 500
        const y = (i * 89.1) % 900
        const twinkle = 0.3 + 0.3 * Math.sin(time + i)
        ctx.globalAlpha = twinkle
        ctx.beginPath()
        ctx.arc(x, y, 1, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      
      // Icon
      ctx.font = 'bold 48px sans-serif'
      ctx.fillStyle = d.color
      ctx.textAlign = 'center'
      ctx.fillText(d.symbol, 250, 60)
      
      // Name
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 28px Inter, sans-serif'
      ctx.fillText(d.name, 250, 100)
      
      // Price
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
      
      // Change
      ctx.fillStyle = d.positive ? '#22c55e' : '#ef4444'
      ctx.font = 'bold 20px Inter, sans-serif'
      const changeText = (d.positive ? '▲ ' : '▼ ') + d.change
      ctx.fillText(changeText, 250, 235)
      
      // Stats
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
      
      // Footer
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
</html>`
  
  return html
}

async function generateMetric(input) {
  const data = parseMetricInput(input)
  
  return `<!DOCTYPE html>
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
      
      // Glow
      ctx.save()
      ctx.filter = 'blur(60px)'
      ctx.fillStyle = 'rgba(168, 85, 247, 0.2)'
      ctx.beginPath()
      ctx.arc(200, 120, 100, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
      
      // Icon
      ctx.font = '64px serif'
      ctx.textAlign = 'center'
      ctx.fillText(d.icon, 200, 90)
      
      // Value
      const valGrad = ctx.createLinearGradient(0, 100, 0, 180)
      valGrad.addColorStop(0, '#ffffff')
      valGrad.addColorStop(1, '#c084fc')
      ctx.fillStyle = valGrad
      ctx.font = 'bold 72px Inter, sans-serif'
      ctx.fillText(d.value, 200, 170)
      
      // Label
      ctx.fillStyle = '#a78bfa'
      ctx.font = '14px Inter, sans-serif'
      ctx.fillText(d.label.toUpperCase(), 200, 210)
      
      // Trend
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

// ============ PARSERS ============

function parseWeatherInput(input) {
  const temp = input.match(/(\d+)/)?.[1] || '72'
  const isSunny = /sunny|clear|partly/i.test(input)
  const isCloudy = /cloud|overcast/i.test(input)
  const isRainy = /rain|storm/i.test(input)
  const icon = isSunny ? '☀️' : isRainy ? '🌧️' : isCloudy ? '☁️' : '⛅'
  const desc = isSunny ? 'Sunny' : isRainy ? 'Rainy' : isCloudy ? 'Overcast' : 'Partly Cloudy'
  
  const location = extractLocation(input) || 'Local Area'
  const humidity = input.match(/humid(?:idity)?\s*(\d+)/i)?.[1] || '45'
  const wind = input.match(/(\d+)\s*mph/i)?.[1] || '8'
  
  return { temp, icon, desc, location, humidity, wind, pressure: '30.1' }
}

function parseCryptoInput(input) {
  const name = input.match(/(\w+)/)?.[1] || 'Bitcoin'
  const symbol = name === 'Bitcoin' ? '₿' : name === 'Ethereum' ? 'Ξ' : '🪙'
  const price = input.match(/\$?([\d,]+)/)?.[1] || '0'
  const change = input.match(/([+-]?\d+\.?\d*)%/)?.[1] || '+0'
  const positive = !change.startsWith('-')
  const color = name === 'Bitcoin' ? '#f7931a' : name === 'Ethereum' ? '#627eea' : '#8b5cf6'
  
  return {
    name,
    symbol,
    price: '$' + price,
    change: change + '%',
    positive,
    color,
    high24h: '$' + price,
    low24h: '$' + Math.round(parseInt(price.replace(/,/g,'')) * 0.97).toLocaleString(),
    volume: '$28.4B',
    marketCap: '$1.33T'
  }
}

function parseMetricInput(input) {
  const value = input.match(/(\d+\.?\d*%)/)?.[1] || input.match(/(\d+\.?\d*[KMB]?)/i)?.[1] || '0'
  const label = extractLabel(input) || 'Metric'
  const icon = extractIcon(input) || '📊'
  
  let trend = null
  if (/up|increase|positive|\+/i.test(input)) {
    trend = { positive: true, value: '+5%' }
  } else if (/down|decrease|negative|-/i.test(input)) {
    trend = { positive: false, value: '-3%' }
  }
  
  return { value, label, icon, trend }
}

function extractLocation(input) {
  const locations = ['Huber Heights', 'Dayton', 'Columbus', 'Cincinnati', 'Ohio']
  for (const loc of locations) {
    if (input.includes(loc.toLowerCase())) return loc
  }
  return null
}

function extractLabel(input) {
  const labels = { 'users': 'Active Users', 'downloads': 'Downloads', 'sales': 'Sales', 'revenue': 'Revenue', 'uptime': 'Uptime', 'percent': 'Completion' }
  for (const [key, val] of Object.entries(labels)) {
    if (input.includes(key)) return val
  }
  return input.split(' ').slice(0, 2).join(' ')
}

function extractIcon(input) {
  const icons = { 'users': '👥', 'downloads': '📥', 'sales': '💰', 'revenue': '💵', 'uptime': '⚡', 'heart': '❤️', 'star': '⭐', 'fire': '🔥' }
  for (const [key, icon] of Object.entries(icons)) {
    if (input.includes(key)) return icon
  }
  return '📊'
}

// ============ MAIN ============

async function main() {
  const args = process.argv.slice(2)
  const command = args[0] || 'help'
  
  if (command === 'help' || command === '--help' || command === '-h') {
    help()
    return
  }
  
  if (command === 'server') {
    const action = args[1] || 'status'
    if (action === 'start') {
      log(colors.green, 'Starting Pretext server...')
      const { exec } = await import('child_process')
      exec('cd ~/.openclaw/workspace/skills/generative-ui && node backend/pretext-server.js &', () => {})
      log(colors.green, '✓ Pretext server started on port 3458')
    } else if (action === 'stop') {
      const { exec } = await import('child_process')
      exec('pkill -f pretext-server', () => {})
      log(colors.yellow, '✓ Pretext server stopped')
    } else {
      const { execSync } = await import('child_process')
      try {
        const result = execSync('curl -s http://localhost:3458/health 2>/dev/null | python3 -c "import sys,json; print(json.load(sys.stdin).get(\\"status\\",\\"unknown\\"))" 2>/dev/null || echo "stopped"')
        log(colors.cyan, 'Pretext server:', result.toString().trim())
      } catch {
        log(colors.yellow, 'Pretext server: stopped')
      }
    }
    return
  }
  
  if (command === 'serve') {
    const file = args[1] || '/tmp'
    const { exec } = await import('child_process')
    log(colors.green, `Serving ${file} on port 8080...`)
    exec(`cd ${file} && python3 -m http.server 8080 &`, () => {})
    log(colors.green, '✓ Serving at http://localhost:8080')
    log(colors.cyan, 'Access via LAN: http://100.68.208.113:8080')
    return
  }
  
  // Generate commands
  let html = ''
  let filename = ''
  
  if (command === 'weather') {
    const input = args.slice(1).join(' ')
    html = await generateWeather(input)
    filename = 'weather-' + Date.now() + '.html'
    log(colors.cyan, 'Generating weather card...')
  } else if (command === 'crypto') {
    const input = args.slice(1).join(' ')
    html = await generateCrypto(input)
    filename = 'crypto-' + Date.now() + '.html'
    log(colors.cyan, 'Generating crypto chart...')
  } else if (command === 'metric') {
    const input = args.slice(1).join(' ')
    html = await generateMetric(input)
    filename = 'metric-' + Date.now() + '.html'
    log(colors.cyan, 'Generating metric card...')
  } else if (command === 'generate') {
    const type = args[1] || 'weather'
    const input = args.slice(2).join(' ')
    if (type === 'weather') html = await generateWeather(input || '72F Sunny')
    else if (type === 'crypto') html = await generateCrypto(input || 'Bitcoin')
    else if (type === 'metric') html = await generateMetric(input || '100 users')
    else {
      log(colors.red, `Unknown type: ${type}`)
      log(colors.yellow, 'Available: weather, crypto, metric')
      return
    }
    filename = type + '-' + Date.now() + '.html'
    log(colors.cyan, `Generating ${type}...`)
  } else {
    log(colors.red, `Unknown command: ${command}`)
    help()
    return
  }
  
  // Output
  const outputPath = args.includes('--output') || args.includes('-o')
    ? args[args.indexOf('--output') + 1 || args.indexOf('-o') + 1]
    : `${OUTPUT_DIR}/${filename}`
  
  writeFileSync(outputPath, html)
  log(colors.green, `✓ Generated: ${outputPath}`)
  
  if (args.includes('--open') || args.includes('-x')) {
    const { exec } = await import('child_process')
    exec(`open ${outputPath}`)
    log(colors.cyan, '✓ Opened in browser')
  }
  
  if (args.includes('--serve') || args.includes('-s')) {
    const { exec } = await import('child_process')
    exec(`python3 -m http.server 8080 --directory ${OUTPUT_DIR} &`)
    log(colors.cyan, '✓ Serving at http://localhost:8080')
  }
}

main().catch(console.error)
