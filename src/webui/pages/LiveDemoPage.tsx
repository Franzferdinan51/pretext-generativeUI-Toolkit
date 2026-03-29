// LIVE AI-GENERATED UI - Everything streams from AI
import React, { useState, useEffect, useRef } from 'react'
import { useLMStudio } from '../hooks/useLMStudioAgent'
import { StreamingText } from '../../streaming/StreamableText'
import { ParticleEmitter } from '../../effects/ParticleEmitter'

// Component registry for rendering AI-generated JSX
const componentRegistry: Record<string, React.ComponentType<any>> = {
  ParticleEmitter,
  AnimatedGrid: () => (
    <div className="w-full h-64 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 rounded-xl flex items-center justify-center">
      <div className="grid grid-cols-8 gap-2">
        {Array.from({ length: 64 }).map((_, i) => (
          <div
            key={i}
            className="w-8 h-8 bg-white/10 rounded animate-pulse"
            style={{ animationDelay: `${i * 50}ms` }}
          />
        ))}
      </div>
    </div>
  ),
  GradientMesh: () => (
    <div className="w-full h-64 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-xl" />
  ),
  GlowBorder: ({ children }: any) => (
    <div className="p-6 rounded-xl bg-white/5 border border-purple-500/50 shadow-lg shadow-purple-500/20">
      {children}
    </div>
  ),
  SmartMessage: ({ content }: any) => (
    <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
      <p className="text-gray-300">{content}</p>
    </div>
  ),
  StreamableText: ({ content }: any) => (
    <StreamingText content={content || 'Streaming text will appear here...'} speed={20} />
  ),
  DataChart: () => (
    <div className="w-full h-64 bg-white/5 rounded-xl p-4 flex items-end justify-around gap-4">
      {[65, 45, 80, 55, 90, 70, 85].map((h, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div
            className="w-12 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t"
            style={{ height: `${h}%` }}
          />
          <span className="text-xs text-gray-500">Day {i + 1}</span>
        </div>
      ))}
    </div>
  ),
}

// Parse simple JSX from streamed code
function parseAndRenderCode(code: string): React.ReactNode {
  // Try to extract JSX from code
  if (code.includes('<ParticleEmitter') || code.includes('<AnimatedGrid') || code.includes('<GradientMesh')) {
    return (
      <div className="space-y-6">
        {code.includes('<ParticleEmitter') && (
          <div className="p-4 bg-white/5 rounded-xl">
            <h3 className="text-sm font-medium text-purple-400 mb-2">ParticleEmitter</h3>
            <ParticleEmitter type="stars" count={50} color="#8b5cf6" />
          </div>
        )}
        {code.includes('<AnimatedGrid') && (
          <div className="p-4 bg-white/5 rounded-xl">
            <h3 className="text-sm font-medium text-cyan-400 mb-2">AnimatedGrid</h3>
            <div className="w-full h-48 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 rounded-xl flex items-center justify-center overflow-hidden">
              <div className="grid grid-cols-12 gap-1">
                {Array.from({ length: 144 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-white/10 rounded-sm animate-pulse"
                    style={{ animationDelay: `${i * 20}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        {code.includes('<GradientMesh') && (
          <div className="p-4 bg-white/5 rounded-xl">
            <h3 className="text-sm font-medium text-pink-400 mb-2">GradientMesh</h3>
            <div className="w-full h-48 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-xl" />
          </div>
        )}
        {code.includes('<DataChart') && (
          <div className="p-4 bg-white/5 rounded-xl">
            <h3 className="text-sm font-medium text-green-400 mb-2">DataChart</h3>
            <div className="w-full h-48 bg-white/5 rounded-xl p-4 flex items-end justify-around gap-4">
              {[65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div
                    className="w-12 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-xs text-gray-500">Day {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Default: show the full code */}
        {!code.includes('<ParticleEmitter') && !code.includes('<AnimatedGrid') && !code.includes('<GradientMesh') && !code.includes('<DataChart') && (
          <div className="p-4 bg-white/5 rounded-xl">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Generated Code</h3>
            <pre className="text-xs text-gray-300 overflow-auto max-h-64">{code}</pre>
          </div>
        )}
      </div>
    )
  }
  
  // If no specific components, show the raw code
  return (
    <div className="p-4 bg-white/5 rounded-xl">
      <pre className="text-xs text-gray-300 overflow-auto max-h-96 whitespace-pre-wrap font-mono">
        {code}
      </pre>
    </div>
  )
}

export default function LiveDemoPage() {
  const [prompt, setPrompt] = useState('')
  const [generatedUI, setGeneratedUI] = useState<React.ReactNode>(null)
  const [streamedCode, setStreamedCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [customPrompt, setCustomPrompt] = useState('')
  
  const { sendStreamingMessage } = useLMStudio()
  const previewRef = useRef<HTMLDivElement>(null)

  const presets = [
    'Generate a particle effects showcase with energy, constellation and stars',
    'Build a voting card with YES/NO options and confidence bars',
    'Create an animated gradient hero section with CTA buttons',
    'Show a data visualization dashboard with charts',
    'Generate a component library browser with search',
  ]

  async function handleGenerate(userPrompt: string) {
    setPrompt(userPrompt)
    setIsGenerating(true)
    setGeneratedUI(null)
    setStreamedCode('')
    setShowPreview(false)

    const systemPrompt = `You are a React component generator. When given a request, generate a complete React component using ONLY these available imports from the toolkit:
- ParticleEmitter from '../../effects/ParticleEmitter' (props: type?, count?, color?)
- AnimatedGrid from '../../magicui/AnimatedGrid' (no props needed)
- GradientMesh from '../../effects/GradientMesh' (no props needed)
- GlowBorder from '../../effects/GlowBorder' (props: children)
- SmartMessage from '../../components/SmartMessage' (props: content)
- StreamableText from '../../streaming/StreamableText' (props: content, speed?)
- DataChart from '../../components/DataChart' (no props needed)

Return ONLY valid JSX code (no markdown, no explanation, no backticks). The component should be complete and renderable.
Example response: <div className="p-4"><h1 className="text-2xl">Hello</h1><ParticleEmitter type="stars" count={50} color="#8b5cf6" /></div>`

    try {
      await sendStreamingMessage(
        `${systemPrompt}\n\nGenerate: ${userPrompt}`,
        (chunk) => {
          setStreamedCode(prev => prev + chunk)
        }
      )
      setShowPreview(true)
    } catch (err) {
      console.error(err)
      setStreamedCode(`// Error: ${err}`)
    } finally {
      setIsGenerating(false)
    }
  }

  // Update preview when code changes
  useEffect(() => {
    if (streamedCode) {
      setGeneratedUI(parseAndRenderCode(streamedCode))
    }
  }, [streamedCode])

  // Auto-scroll preview
  useEffect(() => {
    if (showPreview && previewRef.current) {
      previewRef.current.scrollTop = previewRef.current.scrollHeight
    }
  }, [generatedUI, showPreview])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <div className="border-b border-white/10 p-4 bg-black/30">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          🎨 Live AI UI Generator
        </h1>
        <p className="text-gray-400 text-sm">Type a prompt or click below to generate UI in real-time</p>
      </div>

      {/* Preset Prompt Buttons */}
      <div className="p-4 flex flex-wrap gap-2">
        {presets.map((p, i) => (
          <button
            key={i}
            onClick={() => handleGenerate(p)}
            disabled={isGenerating}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple-500/50"
          >
            {p.slice(0, 45)}...
          </button>
        ))}
      </div>

      {/* Custom Prompt Input */}
      <div className="px-4 pb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={customPrompt}
            onChange={e => setCustomPrompt(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && customPrompt.trim() && handleGenerate(customPrompt)}
            placeholder="Or type your own prompt..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500/50"
            disabled={isGenerating}
          />
          <button
            onClick={() => customPrompt.trim() && handleGenerate(customPrompt)}
            disabled={isGenerating || !customPrompt.trim()}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? 'Generating...' : 'Generate 🚀'}
          </button>
        </div>
      </div>

      {/* Split View: Code + Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 h-[calc(100vh-340px)]">
        {/* Code Stream Panel */}
        <div className="bg-black/50 rounded-xl border border-white/10 overflow-hidden flex flex-col">
          <div className="p-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <span className="text-sm font-medium">📝 Streaming Code</span>
            {isGenerating && (
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
                <span className="text-purple-400 text-xs animate-pulse">Generating...</span>
              </div>
            )}
          </div>
          <div className="flex-1 overflow-auto p-4">
            <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap">
              {streamedCode || '// AI will generate code here...\n// Click a preset or type your own prompt'}
            </pre>
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="bg-black/50 rounded-xl border border-white/10 overflow-hidden flex flex-col">
          <div className="p-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <span className="text-sm font-medium">✨ Live Preview</span>
            {prompt && (
              <span className="text-xs text-gray-500 truncate max-w-xs">
                {prompt.slice(0, 50)}...
              </span>
            )}
          </div>
          <div 
            ref={previewRef}
            className="flex-1 overflow-auto p-4 bg-gradient-to-br from-gray-900 to-black"
          >
            {generatedUI ? (
              <div className="animate-fade-in">
                {generatedUI}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎨</div>
                  <p className="text-lg font-medium">Generated UI will appear here</p>
                  <p className="text-sm mt-2">Click a prompt above or type your own</p>
                  <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-purple-600/20 text-purple-400 px-3 py-2 rounded-lg">ParticleEmitter</div>
                    <div className="bg-cyan-600/20 text-cyan-400 px-3 py-2 rounded-lg">AnimatedGrid</div>
                    <div className="bg-pink-600/20 text-pink-400 px-3 py-2 rounded-lg">GradientMesh</div>
                    <div className="bg-green-600/20 text-green-400 px-3 py-2 rounded-lg">DataChart</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Current Prompt Display */}
      {prompt && (
        <div className="fixed bottom-20 left-4 right-4 bg-black/80 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-center">
          <span className="text-sm text-gray-400">Current prompt: </span>
          <span className="text-sm text-white">{prompt}</span>
        </div>
      )}
    </div>
  )
}
