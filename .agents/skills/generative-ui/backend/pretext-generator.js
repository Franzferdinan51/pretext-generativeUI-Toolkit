#!/usr/bin/env node

/**
 * Pretext-Enhanced UI Generator v3
 * Uses Pretext Server for smart text measurement
 */

const PRETEXT_SERVER = 'http://localhost:3458'

const ICONS = {
  weather: { sunny: '☀️', cloudy: '☁️', rainy: '🌧️', stormy: '⛈️', snowy: '❄️', partly: '⛅', clear: '🌙' },
  status: { success: '✅', warning: '⚠️', error: '❌', info: 'ℹ️', new: '✨', fire: '🔥', rocket: '🚀', star: '⭐' },
  categories: { tech: '💻', ai: '🤖', crypto: '₿', music: '🎵', game: '🎮', food: '🍕', travel: '✈️', health: '💊', finance: '💰', shop: '🛒' },
}

// ============ PRETEXT API ============

async function measureText(text, fontSize = 16, maxWidth = 300) {
  try {
    const res = await fetch(PRETEXT_SERVER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'measure', text, fontSize, maxWidth })
    })
    const data = await res.json()
    return data
  } catch {
    return { height: 24, lineCount: 1 } // fallback
  }
}

async function getLines(text, fontSize = 16, maxWidth = 300) {
  try {
    const res = await fetch(PRETEXT_SERVER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'lines', text, fontSize, maxWidth })
    })
    const data = await res.json()
    return data.lines || []
  } catch {
    return [{ text, y: 0, width: maxWidth }]
  }
}

async function shrinkwrap(text, fontSize = 16) {
  try {
    const res = await fetch(PRETEXT_SERVER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'shrinkwrap', text, fontSize })
    })
    const data = await res.json()
    return data.width || 100
  } catch {
    return text.length * fontSize * 0.6
  }
}

async function renderWithPretext(text, fontSize = 18, maxWidth = 320, style = {}) {
  try {
    const res = await fetch(PRETEXT_SERVER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'render', text, fontSize, maxWidth, style })
    })
    const data = await res.json()
    return data.html || ''
  } catch {
    return `<div style="font-size:${fontSize}px">${text}</div>`
  }
}

// ============ GENERATORS ============

async function generateWeather(input) {
  const temp = extractNumber(input) || 72
  const icon = extractWeatherIcon(input)
  const location = extractLocation(input)
  const humidity = extractHumidity(input) || 45
  const wind = extractWind(input) || 8
  
  // Pretext for the description
  const descLines = await getLines(`${temp}°F - ${location}`, 20, 250)
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><script src="https://cdn.tailwindcss.com"></script><style>body{background:#0a0a0f;font-family:Inter,system-ui,sans-serif}.gradient-text{background:linear-gradient(to right,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}</style></head><body class="min-h-screen flex items-center justify-center p-4"><div class="w-80 rounded-3xl bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/40 p-10 text-center shadow-2xl shadow-purple-500/20"><div class="text-9xl mb-4">${icon}</div><div class="text-7xl font-black gradient-text mb-2">${temp}°F</div><div class="text-lg text-gray-300 mb-1">${location}</div><div class="text-xl text-gray-400 mb-6 capitalize">${getWeatherDesc(input)}</div><div class="flex justify-center gap-8 text-sm"><div class="text-gray-400"><span class="mr-1">💧</span>${humidity}%</div><div class="text-gray-400"><span class="mr-1">💨</span>${wind} mph</div></div></div></body></html>`
}

async function generateMetric(input) {
  const value = extractValue(input)
  const label = extractLabel(input)
  const trend = extractTrend(input)
  const icon = extractIcon(input) || '📊'
  
  // Pretext to measure the value for perfect fit
  const { width } = await measureText(value, 48, 200)
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{background:#0a0a0f;font-family:Inter,system-ui,sans-serif}.gradient-text{background:linear-gradient(to right,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}</style></head><body class="min-h-screen flex items-center justify-center p-4"><div class="w-72 rounded-2xl bg-white/5 border border-white/10 p-10 text-center hover:bg-white/10 transition-all"><div class="text-6xl mb-5">${icon}</div><div class="text-6xl font-black gradient-text mb-3">${value}</div><div class="text-gray-400 uppercase text-xs tracking-widest mb-4">${label}</div>${trend ? `<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full ${trend.positive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'} text-sm font-bold">${trend.icon} ${trend.text}</div>` : ''}</div></body></html>`
}

async function generateProduct(input) {
  const name = extractProductName(input)
  const price = extractPrice(input)
  const emoji = extractProductEmoji(input)
  
  // Pretext for title
  const titleWidth = await shrinkwrap(name, 24, 240)
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{background:#0a0a0f;font-family:Inter,system-ui,sans-serif}.gradient-text{background:linear-gradient(to right,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}</style></head><body class="min-h-screen flex items-center justify-center p-4"><div class="w-80 rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-all"><div class="h-48 bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center text-9xl">${emoji}</div><div class="p-8"><h3 class="text-2xl font-bold mb-3">${name}</h3><p class="text-gray-400 text-sm mb-6">High quality product with premium features</p><div class="flex items-center justify-between"><span class="text-4xl font-black gradient-text">${price}</span><button class="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-sm">Buy Now</button></div></div></div></body></html>`
}

async function generatePricing(input) {
  const tier = extractTier(input)
  const price = extractPrice(input) || '$29'
  const period = extractPeriod(input) || 'mo'
  const features = extractFeatures(input, 4)
  const highlight = /pro|popular|best/i.test(input)
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{background:#0a0a0f;font-family:Inter,system-ui,sans-serif}.gradient-text{background:linear-gradient(to right,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}</style></head><body class="min-h-screen flex items-center justify-center p-4"><div class="w-80 rounded-2xl ${highlight ? 'bg-gradient-to-b from-purple-600/30 to-pink-600/30 border-2 border-purple-500/50 scale-105' : 'bg-white/5 border border-white/10'} p-10 relative"><div class="absolute -top-5 left-1/2 -translate-x-1/2 px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold">${highlight ? '⭐ POPULAR' : tier}</div><div class="text-sm font-bold text-purple-400 mb-3">${tier}</div><div class="flex items-baseline gap-1 mb-8"><span class="text-6xl font-black">${price}</span><span class="text-gray-500">/${period}</span></div><ul class="space-y-4 mb-10">${features.map(f => `<li class="flex items-center gap-3 text-gray-300"><span class="text-green-400">✓</span>${f}</li>`).join('')}</ul><button class="w-full py-5 rounded-xl font-bold ${highlight ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-white/10 hover:bg-white/20'}">Get Started</button></div></body></html>`
}

async function generateFeature(input) {
  const title = extractFeatureTitle(input)
  const emoji = extractIcon(input) || '✨'
  
  // Pretext for title wrapping
  const titleLines = await getLines(title, 22, 260)
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{background:#0a0a0f;font-family:Inter,system-ui,sans-serif}</style></head><body class="min-h-screen flex items-center justify-center p-4"><div class="w-80 rounded-2xl bg-white/5 border border-white/10 p-10 hover:bg-white/10 hover:scale-105 transition-all cursor-pointer"><div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-4xl mb-6">${emoji}</div><h3 class="text-2xl font-bold mb-4">${title}</h3><p class="text-gray-400 text-sm leading-relaxed">Powerful feature that helps you achieve more with less effort.</p></div></body></html>`
}

async function generateCTA(input) {
  const title = extractCTATitle(input)
  const button = extractButtonText(input)
  const emoji = extractCTAIcon(input)
  
  // Pretext for headline
  const titleLines = await getLines(title, 42, 450)
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{background:#0a0a0f;font-family:Inter,system-ui,sans-serif}.gradient-text{background:linear-gradient(to right,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}</style></head><body class="min-h-screen flex items-center justify-center p-4"><div class="w-full max-w-xl rounded-3xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 p-14 text-center"><div class="text-7xl mb-8">${emoji}</div><h2 class="text-5xl font-black mb-6 gradient-text">${title}</h2><p class="text-gray-400 mb-10 max-w-lg mx-auto text-lg">Take the next step and join thousands of users already benefiting.</p><button class="px-14 py-5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-xl hover:opacity-90 shadow-xl shadow-purple-500/30">${button}</button></div></body></html>`
}

function generateGeneric(input) {
  const title = input.split(' ').slice(0, 5).join(' ') || 'Card'
  const emoji = extractIcon(input) || '📝'
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{background:#0a0a0f;font-family:Inter,system-ui,sans-serif}</style></head><body class="min-h-screen flex items-center justify-center p-4"><div class="w-80 rounded-2xl bg-white/5 border border-white/10 p-10 text-center"><div class="text-6xl mb-5">${emoji}</div><h3 class="text-2xl font-bold capitalize">${title}</h3></div></body></html>`
}

// ============ HELPERS ============

function extractNumber(input) {
  const match = input.match(/(\d+)/)
  return match ? match[1] : null
}

function extractValue(input) {
  const match = input.match(/(\d+\.?\d*[KMB+]?)/i)
  return match ? match[1].toUpperCase() : '100'
}

function extractLabel(input) {
  const labels = { 'users': 'Active Users', 'downloads': 'Downloads', 'sales': 'Sales', 'revenue': 'Revenue', 'uptime': 'Uptime', 'percent': 'Completion' }
  for (const [key, val] of Object.entries(labels)) {
    if (input.includes(key)) return val
  }
  return 'Metric'
}

function extractTrend(input) {
  const posMatch = input.match(/(\+?\d+%)/)
  if (/\+|^up\b|\bgrow\b/i.test(input) || posMatch) {
    return { positive: true, text: posMatch ? posMatch[1] : '+5%', icon: '↑' }
  }
  const negMatch = input.match(/(\-\d+%)/)
  if (/\-|^down\b/i.test(input) || negMatch) {
    return { positive: false, text: negMatch ? negMatch[1] : '-5%', icon: '↓' }
  }
  return null
}

function extractIcon(input) {
  const allIcons = [...Object.values(ICONS.weather), ...Object.values(ICONS.status), ...Object.values(ICONS.categories)]
  for (const icon of allIcons) {
    if (input.includes(icon)) return icon
  }
  return null
}

function extractWeatherIcon(input) {
  for (const [key, icon] of Object.entries(ICONS.weather)) {
    if (input.includes(key)) return icon
  }
  return '☀️'
}

function getWeatherDesc(input) {
  if (input.includes('sunny') || input.includes('clear')) return 'Sunny'
  if (input.includes('cloud')) return 'Cloudy'
  if (input.includes('rain')) return 'Rainy'
  if (input.includes('snow')) return 'Snowy'
  if (input.includes('storm')) return 'Stormy'
  if (input.includes('partly')) return 'Partly Cloudy'
  return 'Clear'
}

function extractLocation(input) {
  if (input.includes('huber')) return 'Huber Heights'
  if (input.includes('dayton')) return 'Dayton'
  if (input.includes('columbus')) return 'Columbus'
  if (input.includes('cincinnati')) return 'Cincinnati'
  return 'Local Area'
}

function extractHumidity(input) {
  const match = input.match(/humid(?:idity)?\s*(\d+)/i)
  return match ? match[1] : null
}

function extractWind(input) {
  const match = input.match(/(\d+)\s*mph/i)
  return match ? match[1] : null
}

function extractProductName(input) {
  const words = input.split(' ').filter(w => !w.includes('$') && !w.includes('price') && !w.includes('product') && w.length > 2)
  return words.slice(0, 3).join(' ') || 'Product'
}

function extractPrice(input) {
  const match = input.match(/\$?(\d+)/)
  return match ? '$' + match[1] : '$99'
}

function extractProductEmoji(input) {
  if (input.includes('shoe') || input.includes('sneaker')) return '👟'
  if (input.includes('phone') || input.includes('mobile')) return '📱'
  if (input.includes('laptop') || input.includes('computer')) return '💻'
  if (input.includes('headphone')) return '🎧'
  if (input.includes('watch')) return '⌚'
  if (input.includes('camera')) return '📷'
  if (input.includes('car')) return '🚗'
  return '📦'
}

function extractTier(input) {
  if (/enterprise/i.test(input)) return 'Enterprise'
  if (/pro|professional/i.test(input)) return 'Pro'
  if (/team|business/i.test(input)) return 'Team'
  return 'Starter'
}

function extractPeriod(input) {
  if (/year|annual/i.test(input)) return 'yr'
  if (/month|monthly/i.test(input)) return 'mo'
  return 'mo'
}

function extractFeatures(input, count) {
  const defaults = ['Unlimited Features', 'Priority Support', 'Advanced Analytics', 'API Access']
  return defaults.slice(0, count)
}

function extractFeatureTitle(input) {
  return input.split(' ').filter(w => w.length > 2 && !/feature|benefit|advantage/i.test(w)).slice(0, 4).join(' ') || 'Feature'
}

function extractCTATitle(input) {
  if (input.includes('signup') || input.includes('register')) return 'Ready to Sign Up?'
  if (input.includes('start') || input.includes('begin')) return 'Ready to Start?'
  if (input.includes('join')) return 'Ready to Join?'
  return 'Take Action'
}

function extractButtonText(input) {
  if (input.includes('signup') || input.includes('register')) return 'Sign Up Free'
  if (input.includes('start') || input.includes('begin')) return 'Start Now'
  if (input.includes('join')) return 'Join Now'
  return 'Get Started'
}

function extractCTAIcon(input) {
  if (input.includes('signup') || input.includes('register')) return '🎯'
  if (input.includes('start') || input.includes('begin')) return '🚀'
  if (input.includes('join')) return '👋'
  return '⚡'
}

// ============ MAIN ============

async function generateUI(input) {
  input = input.toLowerCase()
  
  if (/\b(weather|temp|forecast|degrees)\b/.test(input)) return await generateWeather(input)
  if (/\b(uptime|percent|%|users?|downloads?|sales)\b/.test(input)) return await generateMetric(input)
  if (/\b(product|price|\$|buy|sell)\b/.test(input)) return await generateProduct(input)
  if (/\b(pricing|plan|tier|subscription)\b/.test(input)) return await generatePricing(input)
  if (/\b(feature|benefit|advantage)\b/.test(input)) return await generateFeature(input)
  if (/\b(cta|signup|sign up|register|get started)\b/.test(input)) return await generateCTA(input)
  
  return generateGeneric(input)
}

const input = process.argv.slice(2).join(' ')
const html = await generateUI(input)
console.log(html)
