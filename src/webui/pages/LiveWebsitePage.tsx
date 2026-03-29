// src/webui/pages/LiveWebsitePage.tsx - SUPER FANCY VERSION
import React, { useState } from 'react'

export default function LiveWebsitePage() {
  const [websiteCode, setWebsiteCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [generationProgress, setGenerationProgress] = useState(0)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    setGenerationProgress(0)
    
    // Simulate generation progress
    const interval = setInterval(() => {
      setGenerationProgress(prev => Math.min(prev + 10, 90))
    }, 300)
    
    // Simulate AI generation
    await new Promise(r => setTimeout(r, 3000))
    
    clearInterval(interval)
    setGenerationProgress(100)
    
    const generatedCode = `<!DOCTYPE html>
<html>
<head>
  <title>Generated Website</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .container {
      text-align: center;
      padding: 3rem;
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      border-radius: 2rem;
      max-width: 600px;
    }
    h1 { font-size: 3rem; margin-bottom: 1rem; }
    p { font-size: 1.25rem; opacity: 0.9; }
    .btn {
      margin-top: 2rem;
      padding: 1rem 2rem;
      background: white;
      color: #667eea;
      border: none;
      border-radius: 1rem;
      font-size: 1.1rem;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${prompt}</h1>
    <p>Generated with Pretext AI UI Toolkit</p>
    <button class="btn">Get Started</button>
  </div>
</body>
</html>`
    
    setWebsiteCode(generatedCode)
    setIsGenerating(false)
  }

  const templates = [
    { name: 'Landing Page', prompt: 'Modern SaaS Landing Page', emoji: '🚀' },
    { name: 'Portfolio', prompt: 'Creative Portfolio', emoji: '🎨' },
    { name: 'E-commerce', prompt: 'Product Showcase Store', emoji: '🛒' },
    { name: 'Blog', prompt: 'Minimalist Blog', emoji: '📝' },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          🌐 Live Website Generator
        </h1>
        <p className="text-gray-400">Generate websites in real-time with AI</p>
      </div>
      
      {/* Input Section */}
      <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
        <div className="space-y-4">
          <label className="block text-sm text-gray-400">Describe your website:</label>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="e.g., A modern landing page for a tech startup..."
            className="w-full h-32 bg-black/30 border border-white/20 rounded-xl p-4 focus:outline-none focus:border-green-500 resize-none"
          />
          
          {/* Templates */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-400">Quick templates:</span>
            {templates.map(t => (
              <button
                key={t.name}
                onClick={() => setPrompt(t.prompt)}
                className="px-3 py-1 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors flex items-center gap-1"
              >
                {t.emoji} {t.name}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-cyan-600 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⚙️</span> Generating... {generationProgress}%
              </span>
            ) : (
              '🚀 Generate Website'
            )}
          </button>
          
          {/* Progress Bar */}
          {isGenerating && (
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-cyan-500 transition-all duration-300"
                style={{ width: `${generationProgress}%` }}
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Generated Code */}
      {websiteCode && (
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
            <span className="font-medium">Generated Code</span>
            <button
              onClick={() => navigator.clipboard.writeText(websiteCode)}
              className="px-3 py-1 bg-white/10 rounded-lg text-sm hover:bg-white/20"
            >
              📋 Copy
            </button>
          </div>
          <pre className="p-4 text-sm overflow-auto max-h-64 bg-black/50">
            <code>{websiteCode}</code>
          </pre>
        </div>
      )}
      
      {/* Preview */}
      {websiteCode && (
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-white/5">
            <span className="font-medium">🔍 Live Preview</span>
          </div>
          <div className="bg-white rounded-xl m-4 overflow-hidden max-h-96">
            <div dangerouslySetInnerHTML={{ __html: websiteCode.replace(/<!DOCTYPE html>|<html>|<\/html>|<head>|<\/head>|<body>|<\/body>/gi, '').replace(/<style>[\s\S]*?<\/style>/gi, '').replace(/<script>[\s\S]*?<\/script>/gi, '') }} />
          </div>
        </div>
      )}
      
      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { emoji: '⚡', title: 'Real-time Generation', desc: 'Generate websites instantly with AI' },
          { emoji: '🎨', title: 'Beautiful Templates', desc: 'Pre-built templates to customize' },
          { emoji: '📱', title: 'Responsive Design', desc: 'Works on all devices' },
        ].map(feature => (
          <div key={feature.title} className="p-6 rounded-xl bg-white/5 border border-white/10 text-center hover:border-green-500/30 transition-colors">
            <div className="text-3xl mb-3">{feature.emoji}</div>
            <h3 className="font-bold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
