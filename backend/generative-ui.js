/**
 * Generative UI - Core API
 * Generate websites and UI components using AI
 */

const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY || 'sk-cp-f6PbhZS6uNSD1L-mByhEw3RzISEgKDmaQ-kkQGUx79uBrnAZDVWVnDwmLwHC19V1jT07oW7CcU2Dn_3Zr8c90a5xYqk9J1BBNXd0C9bVRbyr-PLbfd31kUE'
const MINIMAX_ENDPOINT = 'https://api.minimax.io/v1/chat/completions'
const DEFAULT_MODEL = 'MiniMax-M2.7'

// Component definitions
const COMPONENTS = {
  Nav: { description: 'Navigation bar with logo and links' },
  Hero: { description: 'Hero section with headline and CTAs' },
  Section: { description: 'Generic content section' },
  Grid: { description: 'Responsive grid layout' },
  Card: { description: 'Feature card with emoji, title, description' },
  Metric: { description: 'Stats metric with value and label' },
  Step: { description: 'How-to step with number, title, description' },
  CodeBlock: { description: 'Code example display' },
  Pricing: { description: 'Pricing tier card' },
  FAQ: { description: 'Q&A item' },
  CTA: { description: 'Call-to-action section' },
  Footer: { description: 'Footer with link categories' }
}

/**
 * Main generation function
 */
export async function generateUI(options = {}) {
  const {
    description = '',
    sections = ['nav', 'hero', 'features', 'stats', 'pricing', 'faq', 'cta', 'footer'],
    brand = null,
    style = 'dark',
    model = DEFAULT_MODEL
  } = options
  
  const startTime = Date.now()
  
  // Build the prompt
  const prompt = buildPrompt(description, brand, sections)
  
  // Call AI
  const response = await callAI(prompt, model)
  
  // Parse JSON
  const spec = parseResponse(response)
  
  // Render to HTML
  const html = renderSpecToHTML(spec)
  
  const elapsed = Date.now() - startTime
  
  return {
    spec,
    html,
    components: spec?.elements ? Object.keys(spec.elements).length : 0,
    sections,
    metadata: {
      model,
      generationTime: elapsed,
      description,
      brand,
      style
    }
  }
}

/**
 * Build generation prompt
 */
function buildPrompt(description, brand, sections) {
  const brandPart = brand ? `Brand: ${brand}` : ''
  
  return `Generate a complete website for: ${description}
${brandPart}

Style: ${style} mode, modern, professional (Stripe/Linear/Vercel aesthetic)
Colors: Purple/pink gradients on black (#0a0a0f)

Include these sections:
${sections.join(', ')}

For features: include 6 feature cards with emojis
For stats: 4 metrics with impressive numbers
For pricing: 3 tiers (Free, Pro, Enterprise)
For faq: 5 common questions with answers

Return ONLY valid JSON A2UI spec format:
{"version":"0.8","root":"app","elements":{"nav":{"type":"Nav","props":{...}},"hero":{"type":"Hero","props":{...}}}}

Make it sound like a real product, not generic copy.`
}

/**
 * Call MiniMax API
 */
async function callAI(prompt, model = DEFAULT_MODEL) {
  const response = await fetch(MINIMAX_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${MINIMAX_API_KEY}`
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens: 2000,
      temperature: 0.7
    })
  })
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  
  const data = await response.json()
  return data.choices?.[0]?.message?.content || ''
}

/**
 * Parse JSON from AI response
 */
function parseResponse(text) {
  const match = text.match(/\{[\s\S]*\}/)
  if (!match) return null
  
  try {
    return JSON.parse(match[0])
  } catch {
    return null
  }
}

/**
 * Render A2UI spec to HTML
 */
export function renderSpec(spec) {
  if (!spec?.elements) {
    return '<div class="error">Failed to generate UI</div>'
  }
  
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated UI</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background: #0a0a0f; font-family: Inter, system-ui, sans-serif; }
    .gradient-text { background: linear-gradient(to right, #a855f7, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .gradient-bg { background: linear-gradient(to right, #a855f7, #ec4899); }
  </style>
</head>
<body class="text-white min-h-screen">
`
  
  for (const [id, element] of Object.entries(spec.elements)) {
    html += renderElement(element) + '\n'
  }
  
  html += '</body>\n</html>'
  
  return html
}

/**
 * Render single A2UI element to HTML
 */
function renderElement(element) {
  const { type, props = {}, children } = element
  
  switch (type) {
    case 'Nav':
      return `<nav class="w-full h-[70px] flex items-center justify-between px-8 bg-black/90 border-b border-white/10">
  <span class="text-xl font-bold gradient-text">${props.logo || 'Brand'}</span>
  <div class="flex gap-6">
    ${(props.links || []).map(l => `<a href="#" class="text-gray-400 hover:text-white text-sm">${l}</a>`).join('')}
  </div>
  <button class="px-5 py-2 rounded-xl gradient-bg font-bold text-sm">Get Started</button>
</nav>`
    
    case 'Hero':
      return `<section class="py-32 px-8 text-center bg-gradient-to-b from-purple-900/20 via-black to-[#0a0a0f]">
  ${props.badge ? `<span class="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 mb-6">${props.badge}</span>` : ''}
  <h1 class="text-5xl md:text-6xl font-black mb-6 gradient-text leading-tight">${props.title || ''}</h1>
  ${props.subtitle ? `<p class="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">${props.subtitle}</p>` : ''}
  ${props.desc ? `<p class="text-gray-500 max-w-xl mx-auto mb-10 text-sm">${props.desc}</p>` : ''}
  <div class="flex gap-4 justify-center">
    ${props.pBtn ? `<button class="px-8 py-4 rounded-xl font-bold gradient-bg">${props.pBtn}</button>` : ''}
    ${props.sBtn ? `<button class="px-8 py-4 rounded-xl font-bold bg-white/10 border border-white/10">${props.sBtn}</button>` : ''}
  </div>
</section>`
    
    case 'Section':
      return `<section class="py-20 px-8">
  <div class="max-w-6xl mx-auto">
    ${props.title ? `<h2 class="text-3xl font-black text-center mb-3 gradient-text">${props.title}</h2>` : ''}
    ${props.sub ? `<p class="text-gray-500 text-center mb-12 text-sm">${props.sub}</p>` : ''}
  </div>
</section>`
    
    case 'Grid':
      const cols = props.cols || 3
      return `<div class="grid gap-6" style="grid-template-columns: repeat(${cols}, minmax(0, 1fr))"></div>`
    
    case 'Card':
      return `<div class="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] transition-all">
  <div class="text-2xl mb-3">${props.emoji || ''}</div>
  <h3 class="text-lg font-semibold mb-2">${props.title || ''}</h3>
  <p class="text-gray-500 text-sm leading-relaxed">${props.desc || ''}</p>
</div>`
    
    case 'Metric':
      return `<div class="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
  <div class="text-4xl font-black gradient-text mb-1">${props.val || ''}</div>
  <div class="text-gray-500 uppercase text-xs tracking-wider">${props.label || ''}</div>
  ${props.trend ? `<div class="text-green-400/80 text-xs mt-2">${props.trend}</div>` : ''}
</div>`
    
    case 'Pricing':
      const highlight = props.highlight ? 'gradient-bg border-2 border-purple-500/50' : 'bg-white/[0.03] border border-white/[0.08]'
      return `<div class="p-6 rounded-2xl ${highlight} relative">
  ${props.highlight ? '<div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 gradient-bg rounded-full text-xs font-bold">POPULAR</div>' : ''}
  <div class="text-sm font-bold text-purple-400 mb-1">${props.tier || ''}</div>
  <div class="flex items-baseline gap-1 mb-4">
    <span class="text-4xl font-black">${props.price || ''}</span>
    ${props.period ? `<span class="text-gray-500 text-sm">/${props.period}</span>` : ''}
  </div>
  <ul class="space-y-2.5 mb-6">
    ${(props.features || []).map(f => `<li class="flex items-center gap-2 text-gray-400 text-sm"><span class="text-green-400/80">✓</span> ${f}</li>`).join('')}
  </ul>
  <button class="w-full py-3 rounded-xl font-semibold text-sm ${props.highlight ? 'bg-black/20 hover:bg-black/30' : 'bg-white/10 hover:bg-white/15'}">${props.btn || 'Get Started'}</button>
</div>`
    
    case 'FAQ':
      return `<div class="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
  <h4 class="font-semibold mb-2 text-sm">${props.q || ''}</h4>
  ${props.a ? `<p class="text-gray-500 text-sm leading-relaxed">${props.a}</p>` : ''}
</div>`
    
    case 'CTA':
      return `<section class="py-24 px-8 text-center bg-gradient-to-br from-purple-900/20 to-pink-900/20">
  <h2 class="text-4xl font-black mb-4 gradient-text">${props.title || ''}</h2>
  ${props.sub ? `<p class="text-gray-400 mb-8 max-w-lg mx-auto text-sm">${props.sub}</p>` : ''}
  <button class="px-10 py-4 rounded-xl font-bold gradient-bg shadow-lg">${props.btn || 'Get Started'}</button>
</section>`
    
    case 'Footer':
      return `<footer class="py-12 px-8 border-t border-white/10 bg-black/50">
  <div class="max-w-6xl mx-auto">
    <div class="grid grid-cols-4 gap-8 mb-8">
      ${Object.entries(props.links || {}).map(([cat, items]) => `
        <div>
          <h4 class="font-semibold mb-3 text-purple-400 text-sm">${cat}</h4>
          <ul class="space-y-2">
            ${(items || []).map(item => `<li><a href="#" class="text-gray-500 hover:text-white text-sm">${item}</a></li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
    <div class="text-center text-gray-600 text-xs border-t border-white/5 pt-8">
      ${props.copy || '© 2026'}
    </div>
  </div>
</footer>`
    
    default:
      return `<!-- ${type} -->`
  }
}

/**
 * List available components
 */
export function listComponents() {
  return Object.entries(COMPONENTS).map(([name, info]) => ({
    name,
    ...info
  }))
}
