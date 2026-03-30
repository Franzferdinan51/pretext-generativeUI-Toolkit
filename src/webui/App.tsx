// ============================================================
// PRETEXT AI UI - FULL-FEATURED WEBSITE GENERATOR
// ============================================================
import React, { useState, useEffect, useRef, Component, ReactNode } from 'react'
import { prepare, layout, prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

const MINIMAX_API_KEY = 'sk-cp-f6PbhZS6uNSD1L-mByhEw3RzISEgKDmaQ-kkQGUx79uBrnAZDVWVnDwmLwHC19V1jT07oW7CcU2Dn_3Zr8c90a5xYqk9J1BBNXd0C9bVRbyr-PLbfd31kUE'

// ============================================
// PRETEXT ENGINE
// ============================================
class PretextEngine {
  private cache = new Map<string, any>()
  measure(text: string, fontSize: number, maxWidth: number) {
    const key = `${text}:${fontSize}:${maxWidth}`
    if (!this.cache.has(key)) {
      const prepared = prepare(text, `${fontSize}px Inter`)
      const result = layout(prepared, maxWidth, fontSize * 1.4)
      this.cache.set(key, result)
    }
    return this.cache.get(key)
  }
  getLines(text: string, fontSize: number, maxWidth: number) {
    const key = `lines:${text}:${fontSize}:${maxWidth}`
    if (!this.cache.has(key)) {
      const prepared = prepareWithSegments(text, `${fontSize}px Inter`)
      const result = layoutWithLines(prepared, maxWidth, fontSize * 1.4)
      this.cache.set(key, result)
    }
    return this.cache.get(key)
  }
}
const pretextEngine = new PretextEngine()

// ============================================
// ERROR BOUNDARY
// ============================================
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: string }> {
  constructor(props: { children: ReactNode }) { super(props); this.state = { hasError: false, error: '' } }
  static getDerivedStateFromError(error: Error) { return { hasError: true, error: error.message } }
  render() {
    if (this.state.hasError) return <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center"><div><h1 className="text-2xl font-bold text-red-400">Error</h1><p className="text-gray-400">{this.state.error}</p></div></div>
    return this.props.children
  }
}

// ============================================
// COMPONENTS
// ============================================
const Nav = ({ logo, links }: { logo: string; links?: string[] }) => (
  <nav className="w-full h-[70px] flex items-center justify-between px-8 bg-black/90 backdrop-blur-xl border-b border-white/10">
    <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{logo}</span>
    <div className="flex gap-6">
      {links?.map((link, i) => <a key={i} href="#" className="text-gray-400 hover:text-white transition">{link}</a>)}
    </div>
  </nav>
)

const Hero = ({ badge, title, subtitle, description, primaryBtn, secondaryBtn }: { badge?: string; title: string; subtitle?: string; description?: string; primaryBtn?: string; secondaryBtn?: string }) => (
  <section className="py-24 px-8 text-center bg-gradient-to-b from-purple-900/20 to-transparent">
    {badge && <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-purple-500/20 text-purple-300 mb-6">{badge}</span>}
    <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">{title}</h1>
    {subtitle && <p className="text-2xl text-gray-300 mb-4">{subtitle}</p>}
    {description && <p className="text-gray-400 max-w-2xl mx-auto mb-8">{description}</p>}
    <div className="flex gap-4 justify-center">
      {primaryBtn && <button className="px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-xl shadow-purple-500/30">{primaryBtn}</button>}
      {secondaryBtn && <button className="px-8 py-4 rounded-2xl font-bold text-lg bg-white/10 hover:bg-white/20 border border-white/20">{secondaryBtn}</button>}
    </div>
  </section>
)

const Section = ({ title, subtitle, children }: { title?: string; subtitle?: string; children: ReactNode }) => (
  <section className="py-20 px-8">
    <div className="max-w-6xl mx-auto">
      {title && <h2 className="text-4xl font-black text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{title}</h2>}
      {subtitle && <p className="text-gray-400 text-center mb-12">{subtitle}</p>}
      {children}
    </div>
  </section>
)

const Grid = ({ cols = 3, children }: { cols?: number; children: ReactNode }) => (
  <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>{children}</div>
)

const Card = ({ emoji, title, description, highlight }: { emoji?: string; title: string; description?: string; highlight?: boolean }) => (
  <div className={`p-8 rounded-3xl ${highlight ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30' : 'bg-white/5 border border-white/10'} hover:bg-white/10 transition-all`}>
    {emoji && <div className="text-4xl mb-4">{emoji}</div>}
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    {description && <p className="text-gray-400">{description}</p>}
  </div>
)

const Metric = ({ value, label, trend }: { value: string; label: string; trend?: string }) => (
  <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10">
    <div className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">{value}</div>
    <div className="text-gray-400 text-sm uppercase tracking-wider">{label}</div>
    {trend && <div className="text-green-400 text-sm mt-2">{trend}</div>}
  </div>
)

const Testimonial = ({ quote, author, role, avatar }: { quote: string; author: string; role?: string; avatar?: string }) => (
  <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
    <p className="text-lg text-gray-300 mb-6 italic">"{quote}"</p>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">{avatar || author[0]}</div>
      <div>
        <div className="font-bold">{author}</div>
        {role && <div className="text-gray-500 text-sm">{role}</div>}
      </div>
    </div>
  </div>
)

const PricingCard = ({ tier, price, period, description, features, highlighted, buttonText }: { tier: string; price: string; period?: string; description?: string; features?: string[]; highlighted?: boolean; buttonText?: string }) => (
  <div className={`p-8 rounded-3xl ${highlighted ? 'bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-2 border-purple-500/50' : 'bg-white/5 border border-white/10'}`}>
    <div className="text-sm font-bold text-purple-400 mb-2">{tier}</div>
    <div className="flex items-baseline gap-1 mb-4">
      <span className="text-5xl font-black">{price}</span>
      {period && <span className="text-gray-500">/{period}</span>}
    </div>
    {description && <p className="text-gray-400 mb-6">{description}</p>}
    <ul className="space-y-3 mb-8">
      {features?.map((f, i) => <li key={i} className="flex items-center gap-2 text-gray-300"><span className="text-green-400">✓</span> {f}</li>)}
    </ul>
    <button className={`w-full py-4 rounded-2xl font-bold ${highlighted ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-white/10'} hover:opacity-90`}>{buttonText || 'Get Started'}</button>
  </div>
)

const FAQ = ({ question, answer }: { question: string; answer?: string }) => (
  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
    <h4 className="text-lg font-bold mb-2">{question}</h4>
    {answer && <p className="text-gray-400">{answer}</p>}
  </div>
)

const CTA = ({ title, subtitle, buttonText }: { title: string; subtitle?: string; buttonText?: string }) => (
  <section className="py-24 px-8 text-center bg-gradient-to-br from-purple-900/30 to-pink-900/30">
    <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{title}</h2>
    {subtitle && <p className="text-gray-400 mb-8">{subtitle}</p>}
    <button className="px-12 py-5 rounded-2xl font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-xl shadow-purple-500/30">{buttonText || 'Get Started Free'}</button>
  </section>
)

const Footer = ({ links, copyright }: { links?: Record<string, string[]>; copyright?: string }) => (
  <footer className="py-16 px-8 border-t border-white/10">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-4 gap-8 mb-12">
        {links && Object.entries(links).map(([category, items]) => (
          <div key={category}>
            <h4 className="font-bold mb-4 text-purple-400">{category}</h4>
            <ul className="space-y-2">
              {items.map((item, i) => <li key={i}><a href="#" className="text-gray-500 hover:text-white transition">{item}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="text-center text-gray-500 text-sm border-t border-white/5 pt-8">
        {copyright || '© 2026 Pretext AI UI. All rights reserved.'}
      </div>
    </div>
  </footer>
)

const Button = ({ text, primary }: { text: string; primary?: boolean }) => (
  <button className={`px-6 py-3 rounded-xl font-bold ${primary ? 'bg-purple-600 hover:bg-purple-500' : 'bg-white/10 hover:bg-white/20'}`}>
    {text}
  </button>
)

// ============================================
// RENDERER
// ============================================
function renderComponent(comp: any): ReactNode {
  switch (comp.type) {
    case 'Nav': return <Nav key={comp.id} {...comp.props} />
    case 'Hero': return <Hero key={comp.id} {...comp.props} />
    case 'Section': return <Section key={comp.id} {...comp.props}>{comp.children?.map((c: any) => renderComponent(c))}</Section>
    case 'Grid': return <Grid key={comp.id} {...comp.props}>{comp.children?.map((c: any) => renderComponent(c))}</Grid>
    case 'Card': return <Card key={comp.id} {...comp.props} />
    case 'Metric': return <Metric key={comp.id} {...comp.props} />
    case 'Testimonial': return <Testimonial key={comp.id} {...comp.props} />
    case 'PricingCard': return <PricingCard key={comp.id} {...comp.props} />
    case 'FAQ': return <FAQ key={comp.id} {...comp.props} />
    case 'CTA': return <CTA key={comp.id} {...comp.props} />
    case 'Footer': return <Footer key={comp.id} {...comp.props} />
    case 'Button': return <Button key={comp.id} {...comp.props} />
    default: return null
  }
}

// ============================================
// AGENTS - Full Featured Website
// ============================================
const AGENTS = {
  nav: { name: 'Nav', system: `You create NAVIGATION + HERO section.

Create FULL website header with navigation and an epic hero section. Include realistic nav links like Features, Pricing, About, Contact.

Example structure:
{"nav":{"type":"Nav","props":{"logo":"🚀 BrandName","links":["Features","Pricing","About","Contact"]}},"hero":{"type":"Hero","props":{"badge":"🚀 Launching Now","title":"Build Amazing Products","subtitle":"The best solution for your needs","description":"Detailed description of what makes your product great and why users should care. Be persuasive.","primaryBtn":"Get Started Free","secondaryBtn":"Watch Demo"}}}` },

  features: { name: 'Features', system: `You create FEATURES section with 6 detailed feature cards.

Each card should have emoji, catchy title, and useful description. Focus on real benefits.

Example:
{"feat-section":{"type":"Section","props":{"title":"Powerful Features","subtitle":"Everything you need"},"feat-grid":{"type":"Grid","props":{"cols":3}},"feat1":{"type":"Card","props":{"emoji":"⚡","title":"Lightning Fast","description":"Complete in seconds, not minutes. Our optimized pipeline delivers results 10x faster than competitors."}},"feat2":{"type":"Card","props":{"emoji":"🛡️","title":"Secure by Default","description":"Enterprise-grade security built in. Your data is encrypted, protected, and compliant."}},"feat3":{"type":"Card","props":{"emoji":"🤖","title":"AI-Powered","description":"Smart automation handles the boring stuff so you can focus on what matters."}},"feat4":{"type":"Card","props":{"emoji":"📊","title":"Real-time Analytics","description":"Track everything that matters with beautiful dashboards and instant insights."}},"feat5":{"type":"Card","props":{"emoji":"🔄","title":"Always Synced","description":"Your data stays in sync across all devices. No more version conflicts."}},"feat6":{"type":"Card","props":{"emoji":"💡","title":"Easy to Use","description":"Intuitive interface that anyone can learn in minutes, not hours."}}}}` },

  stats: { name: 'Stats', system: `You create STATS section showing impressive numbers.

Example:
{"stats-section":{"type":"Section","props":{"title":"Trusted Worldwide"}},"stats-grid":{"type":"Grid","props":{"cols":4}},"stat1":{"type":"Metric","props":{"value":"100K+","label":"Active Users","trend":"+15% this month"}},"stat2":{"type":"Metric","props":{"value":"99.99%","label":"Uptime","trend":"Guaranteed"}},"stat3":{"type":"Metric","props":{"value":"50M+","label":"Tasks Completed","trend":"+5M this week"}},"stat4":{"type":"Metric","props":{"value":"4.9/5","label":"User Rating","trend":"Based on 10K reviews"}}}` },

  testimonials: { name: 'Testimonials', system: `You create TESTIMONIALS section with 3 customer quotes.

Make them realistic and persuasive.

Example:
{"test-section":{"type":"Section","props":{"title":"Loved by Teams"}},"test-grid":{"type":"Grid","props":{"cols":3}},"test1":{"type":"Testimonial","props":{"quote":"This product completely transformed how we work. Our productivity increased 10x in the first month.","author":"Sarah Chen","role":"CTO at TechCorp","avatar":"👩‍💼"}},"test2":{"type":"Testimonial","props":{"quote":"Best investment we made this year. The ROI was immediate and the support is incredible.","author":"Marcus Johnson","role":"Founder at StartupXYZ","avatar":"👨‍💼"}},"test3":{"type":"Testimonial","props":{"quote":"Finally, a tool that actually delivers on its promises. Highly recommended!","author":"Emily Rodriguez","role":"VP Engineering at Scale","avatar":"👩‍💻"}}}` },

  pricing: { name: 'Pricing', system: `You create PRICING section with 3 tiers.

Make prices and features realistic.

Example:
{"pricing-section":{"type":"Section","props":{"title":"Simple Pricing","subtitle":"Start free, upgrade when you need more"}},"pricing-grid":{"type":"Grid","props":{"cols":3}},"price1":{"type":"PricingCard","props":{"tier":"Starter","price":"$0","period":"forever","description":"Perfect for individuals","features":["5 projects","Basic analytics","Email support","1GB storage"],"buttonText":"Get Started"}},"price2":{"type":"PricingCard","props":{"tier":"Pro","price":"$29","period":"month","description":"For growing teams","features":["Unlimited projects","Advanced analytics","Priority support","100GB storage","Custom integrations","Team collaboration"],"highlighted":true,"buttonText":"Start Free Trial"}},"price3":{"type":"PricingCard","props":{"tier":"Enterprise","price":"$99","period":"month","description":"For large organizations","features":["Everything in Pro","Unlimited storage","Dedicated support","SLA guarantee","Custom contracts","On-premise option"],"buttonText":"Contact Sales"}}}` },

  faq: { name: 'FAQ', system: `You create FAQ section with 5 common questions and answers.

Example:
{"faq-section":{"type":"Section","props":{"title":"Common Questions"}},"faq1":{"type":"FAQ","props":{"question":"How does the free trial work?","answer":"You get full access to all features for 14 days. No credit card required."}},"faq2":{"type":"FAQ","props":{"question":"Can I cancel anytime?","answer":"Yes, you can cancel your subscription at any time with no penalties."}},"faq3":{"type":"FAQ","props":{"question":"What payment methods do you accept?","answer":"We accept all major credit cards, PayPal, and wire transfers for annual plans."}},"faq4":{"type":"FAQ","props":{"question":"Is my data secure?","answer":"Absolutely. We use bank-level encryption and are SOC2 compliant."}},"faq5":{"type":"FAQ","props":{"question":"Do you offer refunds?","answer":"Yes, we offer a 30-day money-back guarantee on all paid plans."}}}` },

  cta: { name: 'CTA', system: `You create final CALL-TO-ACTION section.

Example:
{"final-cta":{"type":"CTA","props":{"title":"Ready to Get Started?","subtitle":"Join thousands of happy customers. Start your free trial today.","buttonText":"Start Free Trial Now"}}}` },

  footer: { name: 'Footer', system: `You create FOOTER section with links.

Example:
{"footer":{"type":"Footer","props":{"links":{"Product":["Features","Pricing","Integrations","Changelog","Roadmap"],"Company":["About","Blog","Careers","Press Kit","Contact"],"Resources":["Documentation","API Reference","Community","Status","Support"],"Legal":["Privacy Policy","Terms of Service","Cookie Policy","GDPR"]},"copyright":"© 2026 Pretext AI UI. Built with ❤️ for the community."}}}` },
}

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [components, setComponents] = useState<any[]>([])
  const [logs, setLogs] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(true)
  const [phase, setPhase] = useState('Starting...')
  const [progress, setProgress] = useState(0)
  const [genTime, setGenTime] = useState(0)
  
  const startRef = useRef(0)
  
  async function callAPI(system: string) {
    const res = await fetch('https://api.minimax.io/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MINIMAX_API_KEY}` },
      body: JSON.stringify({ model: 'MiniMax-M2.7', messages: [{ role: 'system', content: system }, { role: 'user', content: 'Return valid JSON only.' }], max_tokens: 2048 })
    })
    const data = await res.json()
    return data.choices?.[0]?.message?.content || ''
  }
  
  function parseJSON(text: string): any {
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) return null
    try { return JSON.parse(match[0]) } catch { return null }
  }
  
  function elementsToComponents(elements: Record<string, any>): any[] {
    return Object.entries(elements).map(([id, elem]: [string, any]) => ({
      id, type: elem.type, props: elem.props || {}, children: elem.children?.map((childId: string) => {
        const child = elements[childId]
        return child ? { id: childId, type: child.type, props: child.props } : null
      }).filter(Boolean)
    })).filter((c: any) => c.type)
  }
  
  async function runSwarm() {
    setIsGenerating(true)
    setLogs([])
    setPhase('Generating website...')
    startRef.current = Date.now()
    const allElements: Record<string, any> = {}
    
    const agentKeys = Object.keys(AGENTS)
    for (let i = 0; i < agentKeys.length; i++) {
      const key = agentKeys[i]
      const agent = AGENTS[key as keyof typeof AGENTS]
      setPhase(`${agent.name}...`)
      setProgress(Math.round(((i + 1) / agentKeys.length) * 100))
      
      try {
        const text = await callAPI(agent.system)
        const parsed = parseJSON(text)
        if (parsed?.elements) {
          Object.assign(allElements, parsed.elements)
          setLogs(prev => [...prev.slice(-8), `✅ ${agent.name}: Added ${Object.keys(parsed.elements).length} elements`])
        } else {
          setLogs(prev => [...prev.slice(-8), `⚠️ ${agent.name}: Parse failed`])
        }
      } catch (err) {
        setLogs(prev => [...prev.slice(-8), `❌ ${agent.name}: ${err}`])
      }
    }
    
    const comps = elementsToComponents(allElements)
    setComponents(comps)
    setGenTime(((Date.now() - startRef.current) / 1000).toFixed(1))
    setPhase('Complete!')
    setIsGenerating(false)
    setLogs(prev => [...prev.slice(-8), `✅ Generated in ${genTime}s`])
  }
  
  useEffect(() => { runSwarm() }, [])
  
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#0a0a0f] text-white">
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📐</span>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Pretext AI UI</h1>
            </div>
            <div className="flex items-center gap-4">
              {!isGenerating && <span className="text-sm text-green-400">⚡ {genTime}s</span>}
              <button onClick={runSwarm} disabled={isGenerating} className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-sm disabled:opacity-50">
                {isGenerating ? '⏳' : '🔄'}
              </button>
            </div>
          </div>
        </header>
        
        <main className="pt-20">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">🐝 AI Building Your Website</h2>
              <p className="text-gray-400 mb-4">{phase}</p>
              <div className="w-80 h-3 bg-white/10 rounded-full"><div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all" style={{ width: `${progress}%` }} /></div>
              <div className="mt-8 bg-black/40 rounded-xl p-4 max-w-lg"><pre className="text-xs text-gray-500">{logs.join('\n') || 'Starting...'}</pre></div>
            </div>
          ) : (
            <div>
              {components.map(comp => renderComponent(comp))}
            </div>
          )}
        </main>
      </div>
    </ErrorBoundary>
  )
}
