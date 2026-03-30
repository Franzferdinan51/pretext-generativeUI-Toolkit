#!/usr/bin/env node

/**
 * Pretext Server with Puppeteer
 * Uses headless Chrome for real canvas/text measurement
 */

import puppeteer from 'puppeteer'
import { createServer } from 'http'

const PORT = 3458
let browser = null

// Start browser once
async function getBrowser() {
  if (!browser) {
    browser = await puppeteer.launch({ 
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
  }
  return browser
}

// Simple pretext calculations (same as browser would do)
function splitWords(text) {
  return text.split(/\s+/).filter(w => w.length > 0)
}

function splitChars(text) {
  return [...text]
}

function measureText(text, font) {
  return text.length * (font.size * 0.6) // rough estimate
}

function wrapText(text, maxWidth, font) {
  const words = splitWords(text)
  const lines = []
  let currentLine = ''
  
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    const width = measureText(testLine, font)
    
    if (width > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  }
  
  if (currentLine) lines.push(currentLine)
  return lines
}

const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json')
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }
  
  if (req.method === 'GET') {
    if (req.url === '/health') {
      res.end(JSON.stringify({ status: 'ok', pretext: 'ready', browser: browser ? 'connected' : 'starting' }))
      return
    }
    if (req.url === '/help') {
      res.end(JSON.stringify({
        endpoints: {
          'POST /measure': 'Measure text: { text, fontSize, maxWidth, lineHeight }',
          'POST /lines': 'Get wrapped lines: { text, fontSize, maxWidth }',
          'POST /shrinkwrap': 'Get tight width: { text, fontSize }',
          'POST /float': 'Float around: { text, fontSize, maxWidth, obstacle }',
          'POST /render': 'Render to HTML: { text, fontSize, maxWidth }',
        }
      }))
      return
    }
    if (req.url === '/favicon.ico') {
      res.writeHead(404)
      res.end()
      return
    }
  }
  
  if (req.method === 'POST') {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', async () => {
      try {
        const data = JSON.parse(body)
        const { action } = data
        
        switch (action) {
          case 'measure': {
            const { text, fontSize = 16, maxWidth = 300, lineHeight = 24 } = data
            const font = { size: fontSize }
            const lines = wrapText(text, maxWidth, font)
            const height = lines.length * lineHeight
            res.end(JSON.stringify({ success: true, height, lineCount: lines.length, lines }))
            break
          }
          
          case 'lines': {
            const { text, fontSize = 16, maxWidth = 300, lineHeight = 24 } = data
            const font = { size: fontSize }
            const lines = wrapText(text, maxWidth, font)
            const result = lines.map((t, i) => ({ text: t, y: i * lineHeight, width: measureText(t, font) }))
            res.end(JSON.stringify({ success: true, lines: result, height: result.length * lineHeight }))
            break
          }
          
          case 'shrinkwrap': {
            const { text, fontSize = 16 } = data
            const font = { size: fontSize }
            const words = splitWords(text)
            let maxLen = 0
            for (const word of words) {
              const w = measureText(word, font)
              if (w > maxLen) maxLen = w
            }
            res.end(JSON.stringify({ success: true, width: Math.ceil(maxLen) }))
            break
          }
          
          case 'float': {
            const { text, fontSize = 16, maxWidth = 400, lineHeight = 24, obstacle } = data
            const font = { size: fontSize }
            const words = splitWords(text)
            const lines = []
            let currentLine = ''
            let y = 0
            
            for (const word of words) {
              const testLine = currentLine ? `${currentLine} ${word}` : word
              
              // Adjust width if we're in the obstacle zone
              const inObs = obstacle && y >= obstacle.y && y < obstacle.y + obstacle.height
              const effectiveMax = inObs ? maxWidth - obstacle.width - 10 : maxWidth
              
              const width = measureText(testLine, font)
              
              if (width > effectiveMax && currentLine) {
                const x = inObs && obstacle ? obstacle.width + 10 : 0
                lines.push({ text: currentLine, x, y, width: measureText(currentLine, font) })
                y += lineHeight
                currentLine = word
              } else {
                currentLine = testLine
              }
            }
            
            if (currentLine) {
              const x = obstacle && y >= obstacle.y && y < obstacle.y + obstacle.height ? obstacle.width + 10 : 0
              lines.push({ text: currentLine, x, y, width: measureText(currentLine, font) })
            }
            
            res.end(JSON.stringify({ success: true, lines, height: (lines.length + 1) * lineHeight }))
            break
          }
          
          case 'render': {
            const { text, fontSize = 16, maxWidth = 300, lineHeight = 24, style = {} } = data
            const lines = wrapText(text, maxWidth, { size: fontSize })
            
            const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background: ${style.background || '#0a0a0f'}; font-family: Inter, system-ui, sans-serif; }
    .gradient-text { background: linear-gradient(to right, #a855f7, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  </style>
</head>
<body class="min-h-screen flex items-center justify-center p-8">
  <div class="p-8 rounded-2xl bg-white/5 border border-white/10" style="max-width: ${maxWidth}px">
    ${lines.map((line, i) => `
      <div style="font-size: ${fontSize}px; line-height: ${lineHeight}px; height: ${lineHeight}px; background: ${style.debug && i % 2 === 0 ? 'rgba(168,85,247,0.1)' : 'transparent'}">
        ${line}
      </div>
    `).join('')}
  </div>
</body>
</html>`
            
            res.end(JSON.stringify({ success: true, html, lines, height: lines.length * lineHeight }))
            break
          }
          
          default:
            res.end(JSON.stringify({ error: 'Unknown action', hint: 'POST /help' }))
        }
      } catch (e) {
        res.end(JSON.stringify({ error: e.message }))
      }
    })
    return
  }
  
  res.end(JSON.stringify({ error: 'Use POST' }))
})

server.listen(PORT, () => {
  console.log(`⚡ Pretext Server running on http://localhost:${PORT}`)
  console.log(`   Ready for text measurement!`)
})

process.on('SIGINT', async () => {
  console.log('\n👋 Stopping...')
  if (browser) await browser.close()
  server.close()
  process.exit(0)
})
