#!/usr/bin/env node

/**
 * Generative UI CLI
 */

import { generateUI, renderSpec, listComponents } from './generative-ui.js'

const DEFAULT_SECTIONS = ['nav', 'hero', 'features', 'stats', 'pricing', 'faq', 'cta', 'footer']

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
  generative-ui "description"          Generate website
  generative-ui [options] "desc"       With options

Options:
  --sections <list>    Comma-separated sections (default: all)
  --brand <name>      Brand name/logo
  --style <style>     dark or light (default: dark)
  --output <format>    json, spec, or html (default: json)
  --list-components    List available components
  --help, -h          Show this help
  --version, -v       Show version

Examples:
  generative-ui "SaaS landing page"
  generative-ui --sections nav,hero,pricing "Developer tool"
  generative-ui --brand "Acme" "E-commerce site"
  generative-ui --output html "Portfolio"
`)
}

main().catch(console.error)
