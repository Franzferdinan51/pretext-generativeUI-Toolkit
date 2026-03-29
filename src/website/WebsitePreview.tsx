// Website Preview - Renders generated website sections in real-time
import { useEffect, useRef } from 'react'

interface WebsiteSection {
  id: string
  type: 'header' | 'hero' | 'features' | 'pricing' | 'testimonials' | 'cta' | 'footer' | 'nav' | 'content' | 'grid' | 'form'
  content: string
  styles?: Record<string, string>
  children?: WebsiteSection[]
}

interface GeneratedWebsite {
  title: string
  description: string
  sections: WebsiteSection[]
  css?: string
}

// Helper to parse content strings
function parseContent(content: string): { headline?: string; subtext?: string; copyright?: string } {
  try {
    return JSON.parse(content)
  } catch {
    return { headline: content, subtext: '', copyright: '' }
  }
}

// Helper to parse features
function parseFeatures(content: string): Array<{ icon: string; title: string; description: string }> {
  try {
    const parsed = JSON.parse(content)
    if (Array.isArray(parsed)) return parsed
    if (Array.isArray(parsed.features)) return parsed.features
    return []
  } catch {
    // Try to extract from text
    return [
      { icon: '✨', title: 'Feature 1', description: content },
      { icon: '🚀', title: 'Feature 2', description: 'Another great feature' },
      { icon: '🔒', title: 'Feature 3', description: 'Secure and reliable' }
    ]
  }
}

// Helper to parse pricing
function parsePricing(content: string): Array<{ name: string; price: string; features: string[] }> {
  try {
    const parsed = JSON.parse(content)
    if (Array.isArray(parsed)) return parsed
    if (Array.isArray(parsed.tiers)) return parsed.tiers
    return []
  } catch {
    return [
      { name: 'Basic', price: '9', features: ['Feature 1', 'Feature 2', 'Feature 3'] },
      { name: 'Pro', price: '29', features: ['All Basic', 'Feature 4', 'Feature 5'] },
      { name: 'Enterprise', price: '99', features: ['All Pro', 'Feature 6', 'Priority Support'] }
    ]
  }
}

// Section Components
function Logo() {
  return (
    <div className="logo text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
      BrandName
    </div>
  )
}

function NavLinks({ content }: { content: string }) {
  let links = ['Features', 'Pricing', 'About', 'Contact']
  try {
    const parsed = JSON.parse(content)
    if (Array.isArray(parsed.links)) links = parsed.links
    else if (Array.isArray(parsed)) links = parsed
  } catch {}
  
  return (
    <div className="nav-links flex gap-6">
      {links.map((link, i) => (
        <a key={i} href="#" className="text-gray-600 hover:text-purple-500 transition-colors text-sm">
          {link}
        </a>
      ))}
    </div>
  )
}

function CTAButton({ text, primary, large }: { text: string; primary?: boolean; large?: boolean }) {
  return (
    <button className={`${primary ? 'btn-primary' : 'btn-secondary'} ${large ? 'px-8 py-3 text-lg' : ''}`}>
      {text}
    </button>
  )
}

function FeatureCard({ icon, title, description, delay }: { icon: string; title: string; description: string; delay: number }) {
  return (
    <div 
      className="feature-card p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="feature-icon text-3xl mb-4">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}

function PricingCard({ name, price, features, popular, delay }: { name: string; price: string; features: string[]; popular?: boolean; delay: number }) {
  return (
    <div 
      className={`pricing-card p-6 rounded-2xl border-2 transition-all hover:-translate-y-1 ${popular ? 'border-purple-500 bg-purple-500/10 scale-105' : 'border-white/10 bg-white/5'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {popular && <span className="badge badge-purple mb-4 inline-block">Most Popular</span>}
      <h3 className="font-semibold text-xl mb-2">{name}</h3>
      <div className="price mb-4">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-gray-400">/month</span>
      </div>
      <ul className="features space-y-2 mb-6">
        {features.map((f, i) => (
          <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
            <span className="text-green-400">✓</span> {f}
          </li>
        ))}
      </ul>
      <button className={`w-full py-2 rounded-lg font-medium transition-all ${popular ? 'bg-purple-500 hover:bg-purple-600 text-white' : 'bg-white/10 hover:bg-white/20'}`}>
        {popular ? 'Start Trial' : 'Get Started'}
      </button>
    </div>
  )
}

function HeroGraphic() {
  return (
    <div className="hero-graphic relative w-64 h-64">
      <div className="floating-shape absolute w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-xl" style={{ top: '10%', left: '20%', animation: 'float 6s ease-in-out infinite' }} />
      <div className="floating-shape absolute w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-lg" style={{ top: '50%', right: '10%', animation: 'float 8s ease-in-out infinite 1s' }} />
      <div className="floating-shape absolute w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/30 to-orange-500/30 blur-lg" style={{ bottom: '10%', left: '30%', animation: 'float 7s ease-in-out infinite 2s' }} />
    </div>
  )
}

function FooterLinks({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-semibold mb-3">{title}</h4>
      <ul className="space-y-2">
        {links.map((link, i) => (
          <li key={i}>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SectionRenderer({ section, index }: { section: WebsiteSection; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  
  // Animate in when visible
  useEffect(() => {
    if (ref.current) {
      ref.current.classList.add('animate-in')
    }
  }, [])
  
  const sectionStyles = section.styles || {}
  
  switch (section.type) {
    case 'nav':
      return (
        <nav ref={ref} className="nav-section sticky top-0 z-50 border-b border-white/10" style={sectionStyles}>
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Logo />
            <NavLinks content={section.content} />
            <CTAButton text="Get Started" />
          </div>
        </nav>
      )
      
    case 'hero':
      const heroContent = parseContent(section.content)
      return (
        <section ref={ref} className="hero-section py-24 px-6" style={sectionStyles}>
          <div className="container mx-auto flex items-center gap-12">
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent leading-tight">
                {heroContent.headline || section.content}
              </h1>
              <p className="text-xl text-gray-400 mb-8">{heroContent.subtext || 'Build something amazing with AI'}</p>
              <div className="flex gap-4">
                <CTAButton text="Start Free" primary />
                <CTAButton text="Learn More" />
              </div>
            </div>
            <HeroGraphic />
          </div>
        </section>
      )
      
    case 'features':
      const features = parseFeatures(section.content)
      return (
        <section ref={ref} className="features-section py-20 px-6 bg-black/30" style={sectionStyles}>
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            <div className="grid grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <FeatureCard key={i} {...feature} delay={i * 100} />
              ))}
            </div>
          </div>
        </section>
      )
      
    case 'pricing':
      const tiers = parsePricing(section.content)
      return (
        <section ref={ref} className="pricing-section py-20 px-6" style={sectionStyles}>
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Pricing</h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Choose the plan that fits your needs</p>
            <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
              {tiers.map((tier, i) => (
                <PricingCard key={i} {...tier} popular={i === 1} delay={i * 100} />
              ))}
            </div>
          </div>
        </section>
      )
      
    case 'cta':
      return (
        <section ref={ref} className="cta-section py-24 px-6 text-center bg-gradient-to-r from-purple-600 to-pink-600" style={sectionStyles}>
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6">{section.content}</h2>
            <CTAButton text="Get Started Now" primary large />
          </div>
        </section>
      )
      
    case 'footer':
      const footerContent = parseContent(section.content)
      return (
        <footer ref={ref} className="footer-section py-16 px-6 border-t border-white/10" style={sectionStyles}>
          <div className="container mx-auto">
            <div className="grid grid-cols-4 gap-12 mb-12">
              <FooterLinks title="Product" links={['Features', 'Pricing', 'Docs', 'API']} />
              <FooterLinks title="Company" links={['About', 'Blog', 'Careers', 'Press']} />
              <FooterLinks title="Resources" links={['Help', 'Community', 'Status', 'Contact']} />
              <FooterLinks title="Legal" links={['Privacy', 'Terms', 'Security']} />
            </div>
            <div className="text-center text-gray-500 text-sm border-t border-white/10 pt-8">
              © 2026 {footerContent.copyright || 'BrandName'}. All rights reserved.
            </div>
          </div>
        </footer>
      )
      
    default:
      return (
        <section ref={ref} className="content-section py-16 px-6" style={sectionStyles}>
          <div className="container mx-auto">
            <p className="text-gray-300">{section.content}</p>
          </div>
        </section>
      )
  }
}

export function WebsitePreview({ website }: { website: GeneratedWebsite }) {
  return (
    <div className="generated-website bg-gray-950 text-white min-h-full">
      {/* Default styles */}
      <style>{`
        .generated-website {
          font-family: Inter, system-ui, -apple-system, sans-serif;
        }
        .animate-in {
          animation: fadeSlideIn 0.6s ease forwards;
        }
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
      
      {/* Title */}
      {website.title && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-3 px-6 text-center">
          <h1 className="text-lg font-semibold">{website.title}</h1>
          {website.description && <p className="text-sm text-white/70">{website.description}</p>}
        </div>
      )}
      
      {/* Sections */}
      {website.sections.map((section, i) => (
        <SectionRenderer key={section.id || i} section={section} index={i} />
      ))}
    </div>
  )
}
