// Live Website Generator - AI generates websites in real-time
import { useState, useRef } from 'react'
import { WebsitePreview } from './WebsitePreview'

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

// Helper to extract partial JSON from streaming response
function extractPartialJSON(text: string): Partial<GeneratedWebsite> {
  try {
    // Try to find a JSON-like structure
    const startIdx = text.indexOf('{')
    if (startIdx === -1) return {}
    
    const jsonStr = text.slice(startIdx)
    
    // Try direct parse first
    try {
      return JSON.parse(jsonStr)
    } catch {}
    
    // Try to find complete objects
    const sectionsMatch = jsonStr.match(/"sections"\s*:\s*\[(.*?)\]/s)
    if (sectionsMatch) {
      const partial: Partial<GeneratedWebsite> = { sections: [] }
      const sectionContent = sectionsMatch[1]
      
      // Find individual section objects
      const sectionRegex = /\{[^}]+\}/g
      const matches = sectionContent.match(sectionRegex) || []
      
      for (const match of matches) {
        try {
          const section = JSON.parse(match)
          if (section.id && section.type) {
            partial.sections!.push(section)
          }
        } catch {}
      }
      
      return partial
    }
    
    return {}
  } catch {
    return {}
  }
}

// Helper to parse content strings
function parseContent(content: string): { headline?: string; subtext?: string; copyright?: string } {
  try {
    const parsed = JSON.parse(content)
    return parsed
  } catch {
    return { headline: content, subtext: '', copyright: '' }
  }
}

export function LiveWebsiteGenerator() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [website, setWebsite] = useState<GeneratedWebsite | null>(null)
  const [streamedContent, setStreamedContent] = useState('')
  const [error, setError] = useState<string | null>(null)
  
  async function generateWebsite(userPrompt: string) {
    if (!userPrompt.trim()) return
    
    setIsGenerating(true)
    setWebsite(null)
    setStreamedContent('')
    setError(null)
    
    try {
      // Send to LM Studio for website generation
      const response = await fetch('http://100.116.54.125:1234/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer lm-studio'
        },
        body: JSON.stringify({
          model: 'qwen3.5-27b',
          messages: [{
            role: 'user',
            content: `Generate a complete website structure for: ${userPrompt}
            
            Return ONLY valid JSON in this exact format (no markdown, no explanation):
            {
              "title": "Website Title",
              "description": "Brief description",
              "sections": [
                {"id": "nav1", "type": "nav", "content": "Navigation links JSON string"},
                {"id": "hero1", "type": "hero", "content": "JSON with headline and subtext"},
                {"id": "features1", "type": "features", "content": "JSON array of features"},
                {"id": "pricing1", "type": "pricing", "content": "JSON array of pricing tiers"},
                {"id": "cta1", "type": "cta", "content": "Call to action text"},
                {"id": "footer1", "type": "footer", "content": "Footer JSON with copyright"}
              ]
            }`
          }],
          stream: true
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }
      
      // Parse streaming JSON response
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let fullResponse = ''
      
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6))
            if (data.choices?.[0]?.delta?.content) {
              fullResponse += data.choices[0].delta.content
              setStreamedContent(fullResponse)
              
              // Try to parse partial JSON to show sections as they appear
              try {
                const partial = extractPartialJSON(fullResponse)
                if (partial.sections && partial.sections.length > 0) {
                  setWebsite(prev => prev ? { ...prev, sections: partial.sections! } : { title: '', description: '', sections: partial.sections! })
                }
                if (partial.title && !website?.title) {
                  setWebsite(prev => prev ? { ...prev, title: partial.title! } : { title: partial.title!, description: '', sections: [] })
                }
              } catch {}
            }
          }
        }
      }
      
      // Final parse
      try {
        const jsonMatch = fullResponse.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          const final = JSON.parse(jsonMatch[0])
          setWebsite(final)
        } else {
          throw new Error('No JSON found in response')
        }
      } catch (e) {
        console.error('Failed to parse website JSON:', e)
        setError('Failed to parse website structure. Please try again.')
      }
    } catch (e) {
      setError(`Error: ${e instanceof Error ? e.message : 'Unknown error'}`)
    }
    
    setIsGenerating(false)
  }
  
  return (
    <div className="live-website-generator flex flex-col h-full">
      {/* Prompt Input */}
      <div className="prompt-bar flex gap-3 mb-4">
        <input
          type="text"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Describe the website you want to generate..."
          className="input flex-1"
          onKeyDown={e => e.key === 'Enter' && !isGenerating && generateWebsite(prompt)}
        />
        <button 
          onClick={() => generateWebsite(prompt)} 
          disabled={isGenerating || !prompt.trim()}
          className="btn btn-primary"
        >
          {isGenerating ? '⏳ Generating...' : '🌐 Generate'}
        </button>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4 text-red-400">
          {error}
        </div>
      )}
      
      {/* Live Preview */}
      <div className="preview-area flex-1 overflow-auto bg-gray-900/50 rounded-xl border border-white/10">
        {website && website.sections.length > 0 ? (
          <WebsitePreview website={website} />
        ) : (
          <div className="placeholder h-full flex flex-col items-center justify-center p-8 text-gray-400">
            {streamedContent ? (
              <div className="w-full max-w-2xl">
                <p className="text-sm text-gray-500 mb-2">Streaming JSON...</p>
                <pre className="bg-black/50 p-4 rounded-lg text-xs overflow-auto max-h-60 text-purple-400">{streamedContent.slice(-500)}</pre>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-4">🌐</div>
                <p className="text-gray-400">Enter a prompt to generate a website...</p>
                <p className="text-sm text-gray-500 mt-2">Try: "AI startup landing page" or "E-commerce store"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
