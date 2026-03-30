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
  
  // Build the prompt - CRITICAL: Force JSON only
  const prompt = buildPrompt(description, brand, sections, style)
  
  // Call AI with STRICT instructions
  const response = await callAI(prompt, model)
  
  // Parse JSON - try harder
  let spec = parseResponse(response)
  
  // If parse failed, try fallback generation
  if (!spec) {
    spec = generateFallbackSpec(description, brand, sections)
  }
  
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
 * Build STRICT prompt - JSON ONLY
 */
function buildPrompt(description, brand, sections, style) {
  const brandPart = brand ? `Brand: ${brand}` : 'Brand: YourBrand'
  
  return `CRITICAL: You must return ONLY valid JSON. No text before or after. No markdown. No explanations.

Generate a complete website for: ${description}
${brandPart}

STYLE: ${style} mode, modern, professional (Stripe/Linear/Vercel aesthetic)
Colors: Purple/pink gradients on black (#0a0a0f)

Return EXACTLY this JSON structure (replace ... with real content):

{"version":"0.8","root":"app","elements":{}}

The elements object must contain ALL of these sections:
${sections.includes('nav') ? `"nav":{"type":"Nav","props":{"logo":"[BRAND LOGO]","links":["[Link1]","[Link2]","[Link3]","[Link4]"}}` : ''}
${sections.includes('hero') ? `"hero":{"type":"Hero","props":{"badge":"[BADGE TEXT]","title":"[HEADLINE]","subtitle":"[SUBTITLE]","desc":"[DESCRIPTION]","pBtn":"[PRIMARY CTA]","sBtn":"[SECONDARY CTA]"}}` : ''}
${sections.includes('features') ? `"featSection":{"type":"Section","props":{"title":"[FEATURES TITLE]","sub":"[FEATURES SUBTITLE]"},"children":["featGrid"]},"featGrid":{"type":"Grid","props":{"cols":3},"children":["f1","f2","f3","f4","f5","f6"]},"f1":{"type":"Card","props":{"emoji":"[EMOJI]","title":"[FEATURE 1 TITLE]","desc":"[FEATURE 1 DESC]"}},"f2":{"type":"Card","props":{"emoji":"[EMOJI]","title":"[FEATURE 2 TITLE]","desc":"[FEATURE 2 DESC]"}},"f3":{"type":"Card","props":{"emoji":"[EMOJI]","title":"[FEATURE 3 TITLE]","desc":"[FEATURE 3 DESC]"}},"f4":{"type":"Card","props":{"emoji":"[EMOJI]","title":"[FEATURE 4 TITLE]","desc":"[FEATURE 4 DESC]"}},"f5":{"type":"Card","props":{"emoji":"[EMOJI]","title":"[FEATURE 5 TITLE]","desc":"[FEATURE 5 DESC]"}},"f6":{"type":"Card","props":{"emoji":"[EMOJI]","title":"[FEATURE 6 TITLE]","desc":"[FEATURE 6 DESC]"}}` : ''}
${sections.includes('stats') ? `"statsSection":{"type":"Section","props":{"title":"[STATS TITLE]"},"children":["statsGrid"]},"statsGrid":{"type":"Grid","props":{"cols":4},"children":["m1","m2","m3","m4"]},"m1":{"type":"Metric","props":{"val":"[NUMBER]","label":"[LABEL 1]"}},"m2":{"type":"Metric","props":{"val":"[NUMBER]","label":"[LABEL 2]"}},"m3":{"type":"Metric","props":{"val":"[NUMBER]","label":"[LABEL 3]"}},"m4":{"type":"Metric","props":{"val":"[NUMBER]","label":"[LABEL 4]"}}` : ''}
${sections.includes('pricing') ? `"pricingSection":{"type":"Section","props":{"title":"[PRICING TITLE]","sub":"[PRICING SUBTITLE]"},"children":["pricingGrid"]},"pricingGrid":{"type":"Grid","props":{"cols":3},"children":["p1","p2","p3"]},"p1":{"type":"Pricing","props":{"tier":"[TIER 1]","price":"[PRICE]","features":["[FEAT1]","[FEAT2]","[FEAT3]"]}},"p2":{"type":"Pricing","props":{"tier":"[TIER 2]","price":"[PRICE]","period":"[PERIOD]","features":["[FEAT1]","[FEAT2]","[FEAT3]","[FEAT4]"],"highlight":true,"btn":"[CTA]"}},"p3":{"type":"Pricing","props":{"tier":"[TIER 3]","price":"[PRICE]","features":["[FEAT1]","[FEAT2]","[FEAT3]","[FEAT4]","[FEAT5]"]}}` : ''}
${sections.includes('faq') ? `"faqSection":{"type":"Section","props":{"title":"[FAQ TITLE]","sub":"[FAQ SUBTITLE]"},"children":["faqGrid"]},"faqGrid":{"type":"Grid","props":{"cols":2},"children":["faq1","faq2","faq3","faq4","faq5"]},"faq1":{"type":"FAQ","props":{"q":"[QUESTION 1]","a":"[ANSWER 1]"}},"faq2":{"type":"FAQ","props":{"q":"[QUESTION 2]","a":"[ANSWER 2]"}},"faq3":{"type":"FAQ","props":{"q":"[QUESTION 3]","a":"[ANSWER 3]"}},"faq4":{"type":"FAQ","props":{"q":"[QUESTION 4]","a":"[ANSWER 4]"}},"faq5":{"type":"FAQ","props":{"q":"[QUESTION 5]","a":"[ANSWER 5]"}}` : ''}
${sections.includes('cta') ? `"cta":{"type":"CTA","props":{"title":"[CTA TITLE]","sub":"[CTA SUBTITLE]","btn":"[BUTTON TEXT]"}}` : ''}
${sections.includes('footer') ? `"footer":{"type":"Footer","props":{"links":{"Product":["[LINK1]","[LINK2]"],"Resources":["[LINK3]","[LINK4]"],"Company":["[LINK5]","[LINK6]"],"Legal":["[LINK7]","[LINK8]"]},"copy":"[COPYRIGHT]"}}` : ''}
}

IMPORTANT: Replace all [BRACKET CONTENT] with REAL, SPECIFIC content. No placeholders. No generic text. Make it sound like a real product.

Return ONLY the JSON. Start with {. End with }.`
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
        { role: 'system', content: 'You are a JSON-only generator. Return ONLY valid JSON. No text, no markdown, no explanations.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 2500,
      temperature: 0.3,
      repeat_penalty: 1.2
    })
  })
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  
  const data = await response.json()
  return data.choices?.[0]?.message?.content || ''
}

/**
 * Parse JSON from AI response - with fallbacks
 */
function parseResponse(text) {
  if (!text) return null
  
  // Clean up common issues
  let cleaned = text.trim()
  
  // Remove markdown code blocks
  cleaned = cleaned.replace(/```json\s*/gi, '')
  cleaned = cleaned.replace(/```\s*/g, '')
  cleaned = cleaned.replace(/^json\s*/gi, '')
  
  // Find JSON object
  const match = cleaned.match(/\{[\s\S]*\}/)
  if (!match) {
    console.log('[parseResponse] No JSON found in:', cleaned.substring(0, 100))
    return null
  }
  
  try {
    return JSON.parse(match[0])
  } catch (e) {
    // Try to fix common JSON issues
    const fixed = match[0]
      .replace(/,\s*}/g, '}')  // trailing commas
      .replace(/,\s*]/g, ']')  // trailing comma in arrays
      .replace(/'/g, '"')       // single quotes to double
    
    try {
      return JSON.parse(fixed)
    } catch (e2) {
      console.log('[parseResponse] JSON parse failed after fix')
      return null
    }
  }
}

/**
 * Fallback spec generator - when AI fails
 */
function generateFallbackSpec(description, brand, sections) {
  const brandName = brand || 'YourBrand'
  
  const elements = {}
  
  if (sections.includes('nav')) {
    elements.nav = { type: 'Nav', props: { logo: `⚡ ${brandName}`, links: ['Features', 'Pricing', 'Docs', 'GitHub'] }}
  }
  
  if (sections.includes('hero')) {
    elements.hero = { type: 'Hero', props: { badge: '🚀 New', title: description || 'Build Amazing UIs', subtitle: 'With AI-powered generation', desc: 'Create stunning user interfaces in seconds using natural language.', pBtn: 'Get Started', sBtn: 'Learn More' }}
  }
  
  if (sections.includes('features')) {
    elements.featSection = { type: 'Section', props: { title: 'Features', sub: 'Everything you need' }, children: ['featGrid'] }
    elements.featGrid = { type: 'Grid', props: { cols: 3 }, children: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'] }
    elements.f1 = { type: 'Card', props: { emoji: '⚡', title: 'Fast', desc: 'Generate UIs in seconds' }}
    elements.f2 = { type: 'Card', props: { emoji: '🔒', title: 'Secure', desc: 'Safe and reliable' }}
    elements.f3 = { type: 'Card', props: { emoji: '🌍', title: 'Universal', desc: 'Works everywhere' }}
    elements.f4 = { type: 'Card', props: { emoji: '📱', title: 'Responsive', desc: 'All screen sizes' }}
    elements.f5 = { type: 'Card', props: { emoji: '🎨', title: 'Beautiful', desc: 'Modern design' }}
    elements.f6 = { type: 'Card', props: { emoji: '💎', title: 'Premium', desc: 'High quality' }}
  }
  
  if (sections.includes('stats')) {
    elements.statsSection = { type: 'Section', props: { title: 'By The Numbers' }, children: ['statsGrid'] }
    elements.statsGrid = { type: 'Grid', props: { cols: 4 }, children: ['m1', 'm2', 'm3', 'm4'] }
    elements.m1 = { type: 'Metric', props: { val: '10K+', label: 'Users' }}
    elements.m2 = { type: 'Metric', props: { val: '99.9%', label: 'Uptime' }}
    elements.m3 = { type: 'Metric', props: { val: '4.9/5', label: 'Rating' }}
    elements.m4 = { type: 'Metric', props: { val: '24/7', label: 'Support' }}
  }
  
  if (sections.includes('pricing')) {
    elements.pricingSection = { type: 'Section', props: { title: 'Pricing', sub: 'Simple plans' }, children: ['pricingGrid'] }
    elements.pricingGrid = { type: 'Grid', props: { cols: 3 }, children: ['p1', 'p2', 'p3'] }
    elements.p1 = { type: 'Pricing', props: { tier: 'Free', price: '$0', features: ['Basic features', 'Community support'] }}
    elements.p2 = { type: 'Pricing', props: { tier: 'Pro', price: '$29', period: 'mo', features: ['All features', 'Priority support', 'Advanced options'], highlight: true, btn: 'Start Trial' }}
    elements.p3 = { type: 'Pricing', props: { tier: 'Enterprise', price: 'Custom', features: ['Everything', 'Dedicated support', 'Custom solutions'] }}
  }
  
  if (sections.includes('faq')) {
    elements.faqSection = { type: 'Section', props: { title: 'FAQ' }, children: ['faqGrid'] }
    elements.faqGrid = { type: 'Grid', props: { cols: 2 }, children: ['faq1', 'faq2', 'faq3', 'faq4', 'faq5'] }
    elements.faq1 = { type: 'FAQ', props: { q: 'How does it work?', a: 'Simply describe what you want and our AI generates it.' }}
    elements.faq2 = { type: 'FAQ', props: { q: 'Is it free?', a: 'We offer a free tier with basic features.' }}
    elements.faq3 = { type: 'FAQ', props: { q: 'What can I build?', a: 'Landing pages, dashboards, portfolios, and more.' }}
    elements.faq4 = { type: 'FAQ', props: { q: 'Is it secure?', a: 'Yes, we use industry-standard security.' }}
    elements.faq5 = { type: 'FAQ', props: { q: 'Need help?', a: 'Our support team is available 24/7.' }}
  }
  
  if (sections.includes('cta')) {
    elements.cta = { type: 'CTA', props: { title: 'Ready to Start?', sub: 'Join thousands of happy users.', btn: 'Get Started Free' }}
  }
  
  if (sections.includes('footer')) {
    elements.footer = { type: 'Footer', props: { links: { Product: ['Features', 'Pricing'], Resources: ['Docs', 'API'], Company: ['About', 'Contact'], Legal: ['Privacy', 'Terms']}, copy: `© ${new Date().getFullYear()} ${brandName}` }}
  }
  
  return { version: '0.8', root: 'app', elements }
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
