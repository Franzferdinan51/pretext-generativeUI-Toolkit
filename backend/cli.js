#!/usr/bin/env node

/**
 * Generative UI CLI
 */

import { generateUI, renderSpec, listComponents } from './generative-ui.js'
import { writeFileSync, readFileSync } from 'fs'

const DEFAULT_SECTIONS = ['nav', 'hero', 'features', 'stats', 'pricing', 'faq', 'cta', 'footer']
const SCENE_TEMPLATES = ['weather', 'crypto', 'orbit', 'plant', 'osrs']

function buildSceneHtml(template, title = 'Pretext Scene') {
  const palette = {
    weather: { symbol: '☁️', color: '#a78bfa', bgTop: '#1a0a2e', bgBottom: '#0a0a0f' },
    crypto: { symbol: '₿', color: '#f7931a', bgTop: '#0a1428', bgBottom: '#0a0a0f' },
    orbit: { symbol: '✦', color: '#22c55e', bgTop: '#0a0a14', bgBottom: '#05050a' },
    plant: { symbol: '🌿', color: '#22c55e', bgTop: '#0a1a0a', bgBottom: '#0a0a0f' },
    osrs: { symbol: '⚔️', color: '#f97316', bgTop: '#1a0a0a', bgBottom: '#0a0a0f' },
  }[template] || { symbol: '✦', color: '#8b5cf6', bgTop: '#111827', bgBottom: '#020617' }

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>*{margin:0;padding:0;box-sizing:border-box}body{background:${palette.bgBottom};display:flex;justify-content:center;align-items:center;min-height:100vh}canvas{max-width:100vw;max-height:100vh}</style></head><body><canvas id="c"></canvas><script type="module">import { prepareWithSegments, layoutWithLines } from 'https://unpkg.com/@chenglou/pretext@0.0.3/dist/layout.js';const canvas=document.getElementById('c');const ctx=canvas.getContext('2d');const W=500,H=500;canvas.width=W;canvas.height=H;let t=0;function measure(text,font,maxWidth=340,lineHeight=26){const p=prepareWithSegments(text,font);return layoutWithLines(p,maxWidth,lineHeight).lines}function drawText(text,font,x,y,color,align='center'){ctx.font=font;ctx.fillStyle=color;for(const line of measure(text,font)){const dx=align==='center'?x-line.width/2:align==='right'?x-line.width:x;ctx.fillText(line.text,dx,y+line.y+parseInt(font,10))}}function frame(){t+=0.016;const bg=ctx.createLinearGradient(0,0,0,H);bg.addColorStop(0,'${palette.bgTop}');bg.addColorStop(1,'${palette.bgBottom}');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);ctx.save();ctx.filter='blur(80px)';ctx.fillStyle='${palette.color}22';ctx.beginPath();ctx.arc(250+Math.sin(t)*20,180+Math.cos(t*0.7)*20,100,0,Math.PI*2);ctx.fill();ctx.restore();ctx.font='bold 56px Inter';ctx.textAlign='center';ctx.fillStyle='${palette.color}';ctx.fillText('${palette.symbol}',250,95+Math.sin(t*2)*6);drawText(${JSON.stringify(title)},'bold 34px Inter',250,120,'#ffffff');drawText('template: ${template}','16px Inter',250,175,'${palette.color}');drawText('measure → animate → render','18px Inter',250,230,'#94a3b8');for(let i=0;i<4;i++){const a=t*(i%2?1:-1)+(i*1.57);drawText(['MEASURE','LAYOUT','MOTION','SCENE'][i],'13px Inter',250+Math.cos(a)*(80+i*18),250+Math.sin(a)*(80+i*18),'${palette.color}');}requestAnimationFrame(frame)}frame();</script></body></html>`
}

function verifyGeneratedHtml(path) {
  const html = readFileSync(path, 'utf8')
  const checks = {
    hasCanvas: html.includes('<canvas'),
    hasScript: html.includes('<script'),
    hasViewport: html.includes('viewport'),
    hasPretextOrCanvas: html.includes('prepareWithSegments') || html.includes('canvas.getContext'),
    notBlank: html.length > 500,
  }
  return { ok: Object.values(checks).every(Boolean), checks }
}

async function main() {
  const args = process.argv.slice(2)
  
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    printHelp()
    process.exit(0)
  }
  
  if (args[0] === '--version' || args[0] === '-v') {
    console.log('generative-ui v1.0.0')
    process.exit(0)
  }
  
  if (args[0] === '--list-components') {
    const components = listComponents()
    console.log(JSON.stringify(components, null, 2))
    process.exit(0)
  }

  if (args[0] === 'scene') {
    const template = args[1] || 'orbit'
    const title = args.slice(2).join(' ') || `Pretext ${template}`
    if (!SCENE_TEMPLATES.includes(template)) {
      console.error(`Unknown scene template: ${template}`)
      console.error(`Available: ${SCENE_TEMPLATES.join(', ')}`)
      process.exit(1)
    }
    const out = `/tmp/${template}-scene-${Date.now()}.html`
    writeFileSync(out, buildSceneHtml(template, title))
    const verification = verifyGeneratedHtml(out)
    console.log(JSON.stringify({ file: out, url: `http://100.68.208.113:8080/${out.split('/').pop()}`, verification }, null, 2))
    process.exit(0)
  }

  if (args[0] === 'verify-html') {
    const path = args[1]
    if (!path) {
      console.error('Usage: generative-ui verify-html /path/to/file.html')
      process.exit(1)
    }
    console.log(JSON.stringify(verifyGeneratedHtml(path), null, 2))
    process.exit(0)
  }

  if (args[0] === 'measure' || args[0] === 'fit') {
    const action = args[0] === 'measure' ? 'measure_text' : 'validate_text_fit'
    const text = args.slice(1).join(' ')
    if (!text) {
      console.error(`Usage: generative-ui ${args[0]} "some text"`)
      process.exit(1)
    }
    const response = await fetch('http://localhost:3458', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, text, maxWidth: 280, maxLines: 2, fontSize: 16 })
    })
    console.log(JSON.stringify(await response.json(), null, 2))
    process.exit(0)
  }
  
  let description = ''
  let sections = DEFAULT_SECTIONS
  let brand = null
  let style = 'dark'
  let outputFormat = 'json'
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--sections' && args[i + 1]) {
      sections = args[i + 1].split(',')
      i++
    } else if (args[i] === '--brand' && args[i + 1]) {
      brand = args[i + 1]
      i++
    } else if (args[i] === '--style' && args[i + 1]) {
      style = args[i + 1]
      i++
    } else if (args[i] === '--output' && args[i + 1]) {
      outputFormat = args[i + 1]
      i++
    } else if (!args[i].startsWith('--')) {
      description = args[i]
    }
  }
  
  if (!description) {
    console.error('Error: Description required')
    console.error('Usage: generative-ui "Your description here"')
    process.exit(1)
  }
  
  console.log('🎨 Generating UI...')
  console.log(`📝 Description: ${description}`)
  console.log(`📦 Sections: ${sections.join(', ')}`)
  if (brand) console.log(`🏷️  Brand: ${brand}`)
  console.log('')
  
  try {
    const startTime = Date.now()
    const result = await generateUI({ description, sections, brand, style })
    const elapsed = Date.now() - startTime
    
    console.log('✅ Generation complete!')
    console.log(`⏱️  Time: ${elapsed}ms`)
    console.log(`🧩 Components: ${result.components}`)
    console.log('')
    
    if (outputFormat === 'json') {
      console.log(JSON.stringify(result, null, 2))
    } else if (outputFormat === 'spec') {
      console.log(JSON.stringify(result.spec, null, 2))
    } else if (outputFormat === 'html') {
      console.log(result.html)
    } else {
      console.log(JSON.stringify(result.spec, null, 2))
    }
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Generation failed:', error.message)
    process.exit(1)
  }
}

function printHelp() {
  console.log(`
🎨 Generative UI CLI

Generate websites and UI components using AI.

Usage:
  generative-ui "description"              Generate website
  generative-ui [options] "desc"           With options
  generative-ui scene <template> [title]    Generate animated scene html
  generative-ui verify-html <file>          Verify generated html sanity
  generative-ui measure "text"             Measure text with Pretext server
  generative-ui fit "text"                 Validate text fit with Pretext server

Options:
  --sections <list>    Comma-separated sections (default: all)
  --brand <name>       Brand name/logo
  --style <style>      dark or light (default: dark)
  --output <format>    json, spec, or html (default: json)
  --list-components    List available components
  --help, -h           Show this help
  --version, -v        Show version

Scene templates:
  ${SCENE_TEMPLATES.join(', ')}

Examples:
  generative-ui "SaaS landing page"
  generative-ui --sections nav,hero,pricing "Developer tool"
  generative-ui --brand "Acme" "E-commerce site"
  generative-ui --output html "Portfolio"
  generative-ui scene orbit "Pretext Motion Demo"
  generative-ui verify-html /tmp/orbit-scene.html
`)
}

main().catch(console.error)
