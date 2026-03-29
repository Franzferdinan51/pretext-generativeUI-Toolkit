// TRUE LIVE AI WEBSITE GENERATION - The AI builds the whole site in real-time
import React, { useState, useRef } from 'react'

const LM_STUDIO_URL = '/api/lm-studio'

const templates = [
  {
    name: '🚀 SaaS Landing Page',
    prompt: 'Generate a modern SaaS landing page with: header with logo, hero with headline and CTA, features grid (3 columns), pricing section (3 tiers), testimonials, and footer. Use purple/pink gradient theme.'
  },
  {
    name: '🛒 E-commerce Store',
    prompt: 'Generate an e-commerce store homepage with: nav with cart icon, hero with product showcase, featured products grid (4 items), categories section, newsletter signup, and footer.'
  },
  {
    name: '📱 App Landing Page',
    prompt: 'Generate a mobile app landing page with: app name header, hero with phone mockup, app features list, download buttons (App Store/Play Store), screenshots carousel, and footer.'
  },
  {
    name: '💼 Portfolio Site',
    prompt: 'Generate a personal portfolio website with: intro hero with photo, about section, skills grid, projects showcase (3 cards), experience timeline, contact form, and footer.'
  },
  {
    name: '📰 Blog Homepage',
    prompt: 'Generate a blog homepage with: logo and nav, featured post hero, recent posts grid (6 items), categories sidebar, newsletter signup, and footer.'
  },
]

async function generateWebsite(
  prompt: string,
  onToken: (token: string) => void,
  onSection: (section: string) => void,
  onProgress: (progress: number) => void,
  onComplete: (html: string) => void,
  onError: (err: string) => void
) {
  const systemPrompt = `You are an expert web developer. Generate a COMPLETE, beautiful, responsive website as a single HTML file.

Requirements:
- Use Tailwind CSS via CDN (https://cdn.tailwindcss.com)
- Include all CSS inline in <style> tags
- Make it visually stunning with gradients, animations, hover effects
- Include a dark mode theme (dark background #0a0a0f)
- Responsive design (mobile-first)
- Include: header/nav, hero section, features/content, pricing (if SaaS), testimonials, footer
- Use emoji for visual appeal
- No JavaScript libraries needed - vanilla JS is fine

Generate a complete HTML file now. Start with <!DOCTYPE html> and end with </html>.`

  try {
    const response = await fetch(`${LM_STUDIO_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-lm-zO7bswIc:WkHEMTUfVNkq5WYNyFOW'
      },
      body: JSON.stringify({
        model: 'qwen3.5-27b',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        stream: true,
        max_tokens: 4096,
        temperature: 0.7
      })
    })

    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const reader = response.body?.getReader()
    const decoder = new TextDecoder()
    let fullHTML = ''
    const estLength = 8000

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n')

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const dataStr = line.slice(6)
        if (dataStr === '[DONE]') continue
        try {
          const data = JSON.parse(dataStr)
          const token = data.choices?.[0]?.delta?.content
          if (token) {
            fullHTML += token
            onToken(fullHTML)
            onProgress(Math.min((fullHTML.length / estLength) * 100, 95))

            // Detect current section
            if (fullHTML.includes('<header') || fullHTML.includes('<nav')) {
              onSection('📦 Header/Nav')
            } else if (fullHTML.includes('hero') || fullHTML.includes('Hero')) {
              onSection('🎯 Hero Section')
            } else if (fullHTML.includes('feature') || fullHTML.includes('Feature')) {
              onSection('✨ Features')
            } else if (fullHTML.includes('pricing') || fullHTML.includes('Pricing')) {
              onSection('💰 Pricing')
            } else if (fullHTML.includes('testimonial') || fullHTML.includes('Testimonial')) {
              onSection('💬 Testimonials')
            } else if (fullHTML.includes('<footer')) {
              onSection('📋 Footer')
            }
          }
        } catch {
          // skip malformed lines
        }
      }
    }

    onProgress(100)
    onSection('✅ Complete!')

    // Final render — strip markdown code fences if present
    let final = fullHTML
    if (final.includes('```html')) {
      final = final.replace(/```html\n?/g, '').replace(/```\n?$/g, '')
    }
    if (!final.includes('<!DOCTYPE')) {
      // try to find doctype anyway
      const idx = final.indexOf('<!DOCTYPE')
      if (idx !== -1) final = final.slice(idx)
    }
    onComplete(final)
  } catch (err: unknown) {
    onError(err instanceof Error ? err.message : String(err))
  }
}

export default function TrueLiveWebsiteGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [streamedHTML, setStreamedHTML] = useState('')
  const [currentSection, setCurrentSection] = useState('')
  const [progress, setProgress] = useState(0)
  const [iframeDoc, setIframeDoc] = useState('')
  const iframeRef = useRef<HTMLIFrameElement>(null)

  function startGeneration(prompt: string) {
    if (isGenerating) return
    setIsGenerating(true)
    setStreamedHTML('')
    setCurrentSection('🤔 Thinking...')
    setProgress(0)
    setIframeDoc('')

    generateWebsite(
      prompt,
      (token) => {
        setStreamedHTML(token)
        // Live iframe preview
        let preview = token
        if (preview.includes('```html')) {
          preview = preview.replace(/```html\n?/g, '').replace(/```\n?$/g, '')
        }
        if (preview.includes('<!DOCTYPE')) {
          setIframeDoc(preview)
        }
      },
      (section) => setCurrentSection(section),
      (p) => setProgress(p),
      (html) => {
        setIframeDoc(html)
        setIsGenerating(false)
      },
      (err) => {
        setCurrentSection('❌ Error: ' + err)
        setIsGenerating(false)
      }
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      {/* Header */}
      <div className="border-b border-white/10 p-6 bg-black/30 shrink-0">
        <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          🌐 True Live Website Generator
        </h1>
        <p className="text-gray-400 mt-2">
          Watch AI build an entire website in real-time!
        </p>
      </div>

      {/* Template Buttons */}
      <div className="p-6 border-b border-white/10 shrink-0">
        <p className="text-sm text-gray-500 mb-3">Choose a template:</p>
        <div className="flex flex-wrap gap-3">
          {templates.map((t, i) => (
            <button
              key={i}
              onClick={() => startGeneration(t.prompt)}
              disabled={isGenerating}
              className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all disabled:opacity-50 cursor-pointer"
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 min-h-0">
        {/* Code Stream */}
        <div className="bg-black/50 rounded-xl border border-white/10 overflow-hidden flex flex-col min-h-0">
          <div className="p-3 border-b border-white/10 bg-white/5 flex items-center justify-between shrink-0">
            <span className="text-sm font-medium">🤖 AI Building...</span>
            <span className={`text-xs ${isGenerating ? 'text-purple-400 animate-pulse' : 'text-gray-500'}`}>
              {currentSection}
            </span>
          </div>

          {/* Progress Bar */}
          {isGenerating && (
            <div className="px-3 py-2 shrink-0">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex-1 overflow-auto p-4 min-h-0">
            <pre className="text-xs text-gray-400 font-mono whitespace-pre-wrap break-all">
              {streamedHTML || '// Click a template above to watch AI build a website...'}
            </pre>
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-black/50 rounded-xl border border-white/10 overflow-hidden flex flex-col min-h-0">
          <div className="p-3 border-b border-white/10 bg-white/5 shrink-0">
            <span className="text-sm font-medium">👁️ Live Preview</span>
          </div>
          <div className="flex-1 bg-white min-h-0">
            {iframeDoc ? (
              <iframe
                ref={iframeRef}
                className="w-full h-full border-0"
                srcDoc={iframeDoc}
                title="Preview"
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌐</div>
                  <p>Preview will appear here</p>
                  <p className="text-sm mt-2">Watch AI build in real-time!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
