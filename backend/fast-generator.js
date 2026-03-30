#!/usr/bin/env node

/**
 * Fast Local UI Generator v2
 * Enhanced with more card types and smarter parsing
 */

const ICONS = {
  weather: { sunny: '☀️', cloudy: '☁️', rainy: '🌧️', stormy: '⛈️', snowy: '❄️', partly: '⛅', clear: '🌙', hot: '🔥', cold: '🥶', windy: '💨' },
  status: { success: '✅', warning: '⚠️', error: '❌', info: 'ℹ️', new: '✨', fire: '🔥', rocket: '🚀', star: '⭐', check: '✔️', lock: '🔒' },
  categories: { tech: '💻', ai: '🤖', crypto: '₿', music: '🎵', game: '🎮', food: '🍕', travel: '✈️', health: '💊', finance: '💰', shop: '🛒' },
  social: { user: '👤', users: '👥', heart: '❤️', comment: '💬', share: '🔗', like: '👍', fire: '🔥', trending: '📈' },
  items: { phone: '📱', laptop: '💻', watch: '⌚', camera: '📷', car: '🚗', home: '🏠', office: '🏢', code: '💻', data: '💾', cloud: '☁️' }
}

function generateUI(input) {
  input = input.toLowerCase()
  
  // Detect type and generate
  if (/\b(weather|temp|forecast|degrees|f\b|c\b)\b/.test(input)) return generateWeather(input)
  if (/\b(uptime|percent|%|users?|downloads?|sales|revenue|metric|stat|count|number)\b/.test(input)) return generateMetric(input)
  if (/\b(product|price|\$|buy|sell|shop|item|cart)\b/.test(input)) return generateProduct(input)
  if (/\b(pricing|plan|tier|subscription|cost|费用)\b/.test(input)) return generatePricing(input)
  if (/\b(feature|benefit|advantage|perk)\b/.test(input)) return generateFeature(input)
  if (/\b(cta|signup|sign up|register|get started|start now|join)\b/.test(input)) return generateCTA(input)
  if (/\b(testimonial|review|quote|feedback|star rating)\b/.test(input)) return generateTestimonial(input)
  if (/\b(notification|alert|warning|error|success|toast)\b/.test(input)) return generateNotification(input)
  if (/\b(progress|loading|percent|complete|done)\b/.test(input)) return generateProgress(input)
  if (/\b(countdown|timer|launch|event|starts? in)\b/.test(input)) return generateCountdown(input)
  if (/\b(avatar|profile|user|pic|photo)\b/.test(input)) return generateAvatar(input)
  if (/\b(badge|tag|label|new|hot|trending)\b/.test(input)) return generateBadge(input)
  if (/\b(chart|graph|bar|pie|visual)\b/.test(input)) return generateChart(input)
  if (/\b(team|company|about|org|staff)\b/.test(input)) return generateTeamMember(input)
  
  // Default to generic card
  return generateGeneric(input)
}

// ============ WEATHER ============
function generateWeather(input) {
  const temp = extractNumber(input, 'temp') || 72
  const icon = extractWeatherIcon(input)
  const location = extractLocation(input)
  const humidity = extractNumber(input, 'humid') || 45
  const wind = extractNumber(input, 'wind') || 5
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><script src="https://cdn.tailwindcss.com"></script><style>body{background:#0a0a0f;font-family:Inter,system-ui,sans-serif}.gradient-text{background:linear-gradient(to right,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}</style></head><body class="min-h-screen flex items-center justify-center p-4"><div class="w-72 rounded-3xl bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/40 p-8 text-center shadow-2xl shadow-purple-500/20"><div class="text-8xl mb-4">${icon}</div><div class="text-6xl font-black gradient-text mb-2">${temp}°F</div><div class="text-lg text-gray-300 mb-1">${location}</div><div class="text-xl capitalize text-gray-400 mb-6">${getWeatherDesc(input)}</div><div class="flex justify-center gap-6 text-sm"><div class="text-gray-400"><span class="mr-1">💧</span>${humidity}%</div><div class="text-gray-400"><span class="mr-1">💨</span>${wind} mph</div></div></div></body></html>`
}

// ============ METRIC/STAT ============
function generateMetric(input) {
  const value = extractValue(input)
  const label = extractLabel(input)
  const trend = extractTrend(input)
  const icon = extractIcon(input) || '📊'
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{background:#0a0a0f;font-family:Inter,system-ui,sans-serif}.gradient-text{background:linear-gradient(to right,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}</style></head><body class="min-h-screen flex items-center justify-center p-4"><div class="w-64 rounded-2xl bg-white/5 border border-white/10 p-8 text-center hover:bg-white/10 transition-all"><div class="text-5xl mb-4">${icon}</div><div class="text-5xl font-black gradient-text mb-2">${value}</div><div class="text-gray-400 uppercase text-xs tracking-widest mb-3">${label}</div>${trend ? `<div class="inline-flex items-center gap-1 px-3 py-1 rounded-full ${trend.positive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'} text-sm font-semibold">${trend.icon} ${trend.text}</div>` : ''}</div></body></html>`
}

// ============ PRODUCT ============
function generateProduct(input) {
  const name = extractProductName(input)
  const price = extractPrice(input)
  const emoji = extractProductEmoji(input)
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{background:#0a0a0f;font-family:Inter,system-ui,sans-serif}.gradient-text{background:linear-gradient(to right,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}</style></head><body class="min-h-screen flex items-center justify-center p-4"><div class="w-72 rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-all"><div class="h-48 bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center text-8xl">${emoji}</div><div class="p-6"><h3 class="text-xl font-bold mb-2">${name}</h3><p class="text-gray-400 text-sm mb-4">High-quality product</p><div class="flex items-center justify-between"><span class="text-3xl font-black gradient-text">${price}</span><button class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-sm hover:opacity-90">Buy</button></div></div></div></body></html>`
}

// ============ PRICING ============
function generatePricing(input) {
  const tier = extractTier(input)
  const price = extractPrice(input) || '$29'
  const period = extractPeriod(input) || 'mo'
  const features = extractFeatures(input, 4)
  const highlight = /pro|popular|best|recommended/i.test(input)
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{background:#0a0a0f;font-family:Inter,system-ui,sans-serif}.gradient-text{background:linear-gradient(to right,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}</style></head><body class="min-h-screen flex items-center justify-center p-4"><div class="w-72 rounded-2xl ${highlight ? 'bg-gradient-to-b from-purple-600/30 to-pink-600/30 border-2 border-purple-500/50' : 'bg-white/5 border border-white/10'} p-8 relative ${highlight ? 'scale-105' : ''}"><div class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold">${highlight ? '⭐ POPULAR' : tier}</div><div class="text-sm font-bold text-purple-400 mb-2">${tier}</div><div class="flex items-baseline gap-1 mb-6"><span class="text-5xl font-black">${price}</span><span class="text-gray-500">/${period}</span></div><ul class="space-y-3 mb-8">${features.map(f => `<li class="flex items-center gap-3 text-gray-300"><span class="text-green-400">✓</span>${f}</li>`).join('')}</ul><button class="w-full py-4 rounded-xl font-bold ${highlight ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-white/10 hover:bg-white/20'}">Get Started</button></div></body></html>`
}

// ============ FEATURE ============
function generateFeature(input) {
  const title = extractFeatureTitle(input)
  const emoji = extractIcon(input) || '✨'
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{background:#0a0a0f;font-family:Inter,system-ui,sans-serif}</style></head><body class="min-h-screen flex items-center justify-center p-4"><div class="w-72 rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 hover:scale-105 transition-all cursor-pointer"><div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-3xl mb-5">${emoji}</div><h3 class="text-xl font-bold mb-3">${title}</h3><p class="text-gray-400 text-sm leading-relaxed">Powerful feature that helps you get things done faster and better.</p></div></body></html>`
}

// ============ CTA ============
function generateCTA(input) {
  const title = extractCTATitle(input)
  const button = extractButtonText(input)
  const emoji = /signup|register/i.test(input) ? '🎯' : /start|begin/i.test(input) ? '🚀' : /join/i.test(input) ? '👋' : '⚡'
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{background:#0a0a0f;font-family:Inter,system-ui,sans-serif}.gradient-text{background:linear-gradient(to right,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}</style></head><body class="min-h-screen flex items-center justify-center p-4"><div class="w-full max-w-lg rounded-3xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 p-10 text-center"><div class="text-6xl mb-6">${emoji}</div><h2 class="text-4xl font-black mb-4 gradient-text">${title}</h2><p class="text-gray-400 mb-8 max-w-md mx-auto">Take the next step and join thousands of users already benefiting from this.</p><button class="px-10 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-lg hover:opacity-90 shadow-xl shadow-purple-500/30">${button}</button></div></body></html>`
}

// ============ TESTIMONIAL ============
function generateTestimonial(input) {
  const quote = extractQuote(input)
  const author = extractAuthor(input)
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{background:#0a0a0f;font-family:Inter,system-ui,sans-serif}</style></head><body class="min-h-screen flex items-center justify-center p-4"><div class="w-80 rounded-2xl bg-white/5 border border-white/10 p-8"><div class="text-5xl text-purple-400 mb-4">"</div><p class="text-lg text-gray-200 mb-6 leading-relaxed">${quote}</p><div class="flex items-center gap-4"><div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold">${author.charAt(0)}</div><div><div class="font-bold">${author}</div><div class="text-sm text-gray-400">Verified User</div></div></div><div class="mt-4 flex gap-1">${'⭐⭐⭐⭐⭐'.split('').map(s => `<span class="text-yellow-400">${s}</span>`).join('')}</div></div></body></html>`
}

// ============ NOTIFICATION ============
function generateNotification(input) {
  const type = /error|failed|wrong/i.test(input) ? 'error' : /warning|warn/i.test(input) ? 'warning' : /success|done|saved/i.test(input) ? 'success' : 'info'
  const icons = { error: '❌', warning: '⚠️', success: '✅', info: 'ℹ️' }
  const colors = { error: 'red', warning: 'yellow', success: 'green', info: 'blue' }
  const title = extractNotificationTitle(input, type)
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{background:#0a0a0f;font-family:Inter,system-ui,sans-serif}</style></head><body class="min-h-screen flex items-center justify-center p-4"><div class="w-80 rounded-xl bg-${colors[type]}-500/10 border border-${colors[type]}-500/30 p-5 flex items-start gap-4"><div class="text-2xl">${icons[type]}</div><div class="flex-1"><div class="font-bold mb-1 capitalize">${title}</div><p class="text-sm text-gray-400">${getNotificationDesc(input, type)}</p></div></div></body></html>`
}

// ============ PROGRESS ============
function generateProgress(input) {
  const percent = extractPercent(input) || 75
  const label = extractProgressLabel(input) || 'Complete'
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{background:#0a0a0f;font-family:Inter,system-ui,sans-serif}</style></head><body class="min-h-screen flex items-center justify-center p-4"><div class="w-72"><div class="flex justify-between mb-2"><span class="text-sm text-gray-400">${label}</span><span class="text-sm font-bold gradient-text">${percent}%</span></div><div class="h-3 bg-white/10 rounded-full overflow-hidden"><div class="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all" style="width:${percent}%"></div></div></div></body></html>`
}

// ============ COUNTDOWN ============
function generateCountdown(input) {
  const event = extractEventName(input) || 'Launch'
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{background:#0a0a0f;font-family:Inter,system-ui,sans-serif}.gradient-text{background:linear-gradient(to right,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}</style></head><body class="min-h-screen flex items-center justify-center p-4"><div class="text-center"><div class="text-5xl mb-2">🚀</div><h3 class="text-2xl font-bold mb-6">${event}</h3><div class="flex gap-4 justify-center"><div class="bg-white/5 rounded-xl p-4 min-w-16"><div class="text-3xl font-black gradient-text">02</div><div class="text-xs text-gray-500 uppercase">Days</div></div><div class="bg-white/5 rounded-xl p-4 min-w-16"><div class="text-3xl font-black gradient-text">14</div><div class="text-xs text-gray-500 uppercase">Hours</div></div><div class="bg-white/5 rounded-xl p-4 min-w-16"><div class="text-3xl font-black gradient-text">37</div><div class="text-xs text-gray-500 uppercase">Mins</div></div></div></div></body></html>`
}

// ============ AVATAR ============
function generateAvatar(input) {
  const name = extractName(input) || 'User'
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{background:#0a0a0f;font-family:Inter,system-ui,sans-serif}.gradient-text{background:linear-gradient(to right,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}</style></head><body class="min-h-screen flex items-center justify-center p-4"><div class="text-center"><div class="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl font-black mx-auto mb-4">${name.charAt(0)}</div><div class="text-xl font-bold">${name}</div><div class="text-gray-400 text-sm">Product Designer</div><div class="mt-4 flex justify-center gap-2"><button class="px-4 py-2 rounded-lg bg-white/10 text-sm font-semibold hover:bg-white/20">Follow</button><button class="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-sm font-semibold">Message</button></div></div></body></html>`
}

// ============ BADGE ============
function generateBadge(input) {
  const text = extractBadgeText(input) || 'NEW'
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{background:#0a0a0f;font-family:Inter,system-ui,sans-serif}</style></head><body class="min-h-screen flex items-center justify-center p-4"><div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-sm font-bold animate-pulse">${text}</div></body></html>`
}

// ============ CHART ============
function generateChart(input) {
  const data = extractChartData(input)
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{background:#0a0a0f;font-family:Inter,system-ui,sans-serif}</style></head><body class="min-h-screen flex items-center justify-center p-4"><div class="w-80 bg-white/5 border border-white/10 rounded-2xl p-6"><div class="text-lg font-bold mb-6">Analytics</div><div class="flex items-end gap-3 h-40">${data.map((h, i) => `<div class="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t transition-all hover:opacity-80" style="height:${h}%"></div>`).join('')}</div><div class="flex justify-between mt-3 text-xs text-gray-500"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div></body></html>`
}

// ============ TEAM MEMBER ============
function generateTeamMember(input) {
  const name = extractName(input) || 'Team Member'
  const role = extractRole(input) || 'Designer'
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{background:#0a0a0f;font-family:Inter,system-ui,sans-serif}</style></head><body class="min-h-screen flex items-center justify-center p-4"><div class="w-64 rounded-2xl bg-white/5 border border-white/10 p-6 text-center hover:bg-white/10 transition-all"><div class="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold mx-auto mb-4">${name.charAt(0)}</div><h3 class="text-lg font-bold">${name}</h3><p class="text-gray-400 text-sm mb-4">${role}</p><div class="flex justify-center gap-3"><a href="#" class="text-gray-400 hover:text-white">𝕏</a><a href="#" class="text-gray-400 hover:text-white">in</a><a href="#" class="text-gray-400 hover:text-white">gh</a></div></div></body></html>`
}

// ============ GENERIC ============
function generateGeneric(input) {
  const title = input.split(' ').slice(0, 5).join(' ') || 'Card'
  const emoji = extractIcon(input) || '📝'
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script><style>body{background:#0a0a0f;font-family:Inter,system-ui,sans-serif}</style></head><body class="min-h-screen flex items-center justify-center p-4"><div class="w-72 rounded-2xl bg-white/5 border border-white/10 p-8 text-center"><div class="text-5xl mb-4">${emoji}</div><h3 class="text-xl font-bold capitalize">${title}</h3></div></body></html>`
}

// ============ HELPERS ============
function extractNumber(input, type) {
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
  if (/(\+?\d+%|\bup\b|\bgrow\b|\bincrease\b)/i.test(input)) return { positive: true, text: extractPercent(input) + '%', icon: '↑' }
  if (/(\-\d+%|\bdown\b|\bdrop\b|\bdecrease\b)/i.test(input)) return { positive: false, text: extractPercent(input) + '%', icon: '↓' }
  return null
}

function extractPercent(input) {
  const match = input.match(/(\d+)%/)
  return match ? match[1] : null
}

function extractIcon(input) {
  const icons = [...Object.values(ICONS.weather), ...Object.values(ICONS.status), ...Object.values(ICONS.categories)]
  for (const icon of icons) {
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
  if (input.includes('cleveland')) return 'Cleveland'
  return 'Local Area'
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
  if (input.includes('watch')) return '⌚'
  if (input.includes('headphone')) return '🎧'
  if (input.includes('camera')) return '📷'
  if (input.includes('car')) return '🚗'
  if (input.includes('food') || input.includes('pizza')) return '🍕'
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
  if (/week/i.test(input)) return 'wk'
  return 'mo'
}

function extractFeatures(input, count) {
  const defaults = ['Unlimited Features', 'Priority Support', 'Advanced Analytics', 'API Access', 'Custom Integrations', '24/7 Support']
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

function extractQuote(input) {
  return 'This product has completely transformed how I work. Absolutely love it!'
}

function extractAuthor(input) {
  return 'Satisfied Customer'
}

function extractNotificationTitle(input, type) {
  const titles = { error: 'Something went wrong', warning: 'Watch out!', success: 'Success!', info: 'Heads up!' }
  return titles[type]
}

function getNotificationDesc(input, type) {
  const descs = { error: 'An error occurred. Please try again.', warning: 'This action may have side effects.', success: 'Your changes have been saved.', info: 'Here is something you should know.' }
  return descs[type]
}

function extractProgressLabel(input) {
  if (input.includes('loading')) return 'Loading...'
  if (input.includes('upload')) return 'Uploading...'
  if (input.includes('install')) return 'Installing...'
  return 'Complete'
}

function extractEventName(input) {
  return input.split(' ').filter(w => !/countdown|timer|launch|event|starts/i.test(w)).slice(0, 3).join(' ') || 'Launch'
}

function extractName(input) {
  const words = input.split(' ').filter(w => w.length > 1 && !/avatar|profile|user|testimonial|review/i.test(w))
  return words.slice(0, 2).join(' ') || 'User'
}

function extractRole(input) {
  if (input.includes('dev') || input.includes('engineer')) return 'Software Engineer'
  if (input.includes('design')) return 'Product Designer'
  if (input.includes('manage')) return 'Product Manager'
  if (input.includes('market')) return 'Marketing Lead'
  return 'Team Member'
}

function extractBadgeText(input) {
  if (/new/i.test(input)) return '✨ NEW'
  if (/hot|trending/i.test(input)) return '🔥 HOT'
  if (/sale|discount/i.test(input)) return '💰 SALE'
  if (/beta/i.test(input)) return 'BETA'
  return 'NEW'
}

function extractChartData(input) {
  return [65, 80, 45, 90, 75, 60, 85]
}

// Parse and generate
const input = process.argv.slice(2).join(' ')
console.log(generateUI(input))
