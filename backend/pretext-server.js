#!/usr/bin/env node

/**
 * Pretext measurement server
 * Real Node-side text measurement via @napi-rs/canvas + @chenglou/pretext
 */

import { createCanvas, GlobalFonts } from '@napi-rs/canvas'
import { createServer } from 'http'
import {
  prepare,
  prepareWithSegments,
  layout,
  layoutWithLines,
  layoutNextLine,
  walkLineRanges,
  clearCache,
} from '@chenglou/pretext'

const PORT = 3458

if (typeof globalThis.OffscreenCanvas === 'undefined') {
  globalThis.OffscreenCanvas = class OffscreenCanvasPolyfill {
    constructor(width, height) {
      this._canvas = createCanvas(width, height)
      this.width = width
      this.height = height
    }
    getContext(type) {
      return this._canvas.getContext(type)
    }
  }
}

function tryRegisterSystemFonts() {
  const candidates = [
    '/System/Library/Fonts/Supplemental/Arial Unicode.ttf',
    '/System/Library/Fonts/Supplemental/Helvetica.ttc',
    '/System/Library/Fonts/Supplemental/Times New Roman.ttf',
    '/System/Library/Fonts/Supplemental/Arial.ttf',
    '/System/Library/Fonts/SFNS.ttf',
  ]
  for (const path of candidates) {
    try { GlobalFonts.registerFromPath(path, 'SystemUI') } catch {}
  }
}
tryRegisterSystemFonts()

function send(res, payload) {
  res.end(JSON.stringify(payload))
}

function bestFont(fontSize = 16, family = 'Inter') {
  return `${fontSize}px ${family}`
}

function findOptimalWidth(text, font, lineHeight, maxLines = 1, minWidth = 40, maxWidth = 1200) {
  const prepared = prepare(text, font)
  let lo = minWidth
  let hi = maxWidth
  let ans = maxWidth
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2)
    const result = layout(prepared, mid, lineHeight)
    if (result.lineCount <= maxLines) {
      ans = mid
      hi = mid - 1
    } else {
      lo = mid + 1
    }
  }
  return { width: ans, ...layout(prepared, ans, lineHeight) }
}

const server = createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json')
  if (req.method === 'OPTIONS') return res.end()

  if (req.method === 'GET') {
    if (req.url === '/health') return send(res, { status: 'ok', service: 'pretext-server', mode: 'node-canvas' })
    if (req.url === '/tools') {
      return send(res, {
        tools: ['measure_text', 'layout_lines', 'find_optimal_width', 'validate_text_fit', 'float_text', 'clear_cache'],
      })
    }
    return send(res, { error: 'Not found' })
  }

  if (req.method !== 'POST') return send(res, { error: 'Use POST' })

  let body = ''
  req.on('data', (c) => (body += c))
  req.on('end', () => {
    try {
      const data = JSON.parse(body || '{}')
      const action = data.action || data.tool
      const fontSize = data.fontSize ?? 16
      const family = data.family || 'Inter'
      const font = data.font || bestFont(fontSize, family)
      const maxWidth = data.maxWidth ?? 300
      const lineHeight = data.lineHeight ?? Math.round(fontSize * 1.5)

      switch (action) {
        case 'measure':
        case 'measure_text': {
          const prepared = prepare(data.text || '', font)
          return send(res, { success: true, font, maxWidth, lineHeight, ...layout(prepared, maxWidth, lineHeight) })
        }

        case 'lines':
        case 'layout_lines': {
          const prepared = prepareWithSegments(data.text || '', font)
          const result = layoutWithLines(prepared, maxWidth, lineHeight)
          return send(res, { success: true, font, maxWidth, lineHeight, ...result })
        }

        case 'shrinkwrap':
        case 'find_optimal_width': {
          if (data.maxLines) {
            return send(res, { success: true, font, ...findOptimalWidth(data.text || '', font, lineHeight, data.maxLines, data.minWidth ?? 40, data.maxWidth ?? 1200) })
          }
          const prepared = prepareWithSegments(data.text || '', font)
          let width = 0
          walkLineRanges(prepared, 10000, (line) => { if (line.width > width) width = line.width })
          return send(res, { success: true, font, width: Math.ceil(width) })
        }

        case 'validate':
        case 'validate_text_fit': {
          const prepared = prepare(data.text || '', font)
          const result = layout(prepared, maxWidth, lineHeight)
          const fits = result.lineCount <= (data.maxLines ?? 1) && result.height <= (data.maxHeight ?? Number.MAX_SAFE_INTEGER)
          return send(res, {
            success: true,
            fits,
            font,
            maxWidth,
            lineHeight,
            maxLines: data.maxLines ?? 1,
            maxHeight: data.maxHeight ?? null,
            ...result,
          })
        }

        case 'float':
        case 'float_text': {
          const prepared = prepareWithSegments(data.text || '', font)
          const obstacle = data.obstacle || { x: 0, y: 0, width: 120, height: 120 }
          const lines = []
          let cursor = { segmentIndex: 0, graphemeIndex: 0 }
          let y = 0
          while (true) {
            const inObs = y >= obstacle.y && y < obstacle.y + obstacle.height
            const width = inObs ? maxWidth - obstacle.width - 10 : maxWidth
            const line = layoutNextLine(prepared, cursor, width)
            if (!line) break
            lines.push({ text: line.text, x: inObs ? obstacle.width + 10 : 0, y, width: line.width })
            cursor = line.end
            y += lineHeight
          }
          return send(res, { success: true, lines, height: y, obstacle, font })
        }

        case 'clear':
        case 'clear_cache': {
          clearCache()
          return send(res, { success: true })
        }

        default:
          return send(res, { error: 'Unknown action', available: ['measure_text', 'layout_lines', 'find_optimal_width', 'validate_text_fit', 'float_text', 'clear_cache'] })
      }
    } catch (error) {
      return send(res, { success: false, error: error.message })
    }
  })
})

server.listen(PORT, () => {
  console.log(`⚡ Pretext Server running on http://localhost:${PORT}`)
  console.log('   Tools: measure_text, layout_lines, find_optimal_width, validate_text_fit, float_text, clear_cache')
})
