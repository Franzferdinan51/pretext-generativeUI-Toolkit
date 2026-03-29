// src/webui/pages/ComponentsPage.tsx - SUPER FANCY VERSION
import React, { useState } from 'react'
import ComponentPreview from '../components/ComponentPreview'

interface ComponentInfo {
  name: string
  category: string
  description: string
  emoji: string
  defaultProps?: any
}

const components: ComponentInfo[] = [
  // AI Components
  { name: 'SmartMessage', category: 'AI', description: 'Auto-detects content type and renders appropriately', emoji: '🤖', defaultProps: { content: 'This is a smart message with automatic content detection!' } },
  { name: 'ContentDetector', category: 'AI', description: 'Detects content type from text', emoji: '🔍' },
  { name: 'AIGenerator', category: 'AI', description: 'AI-powered component generator', emoji: '✨' },
  
  // Streaming Components
  { name: 'StreamableText', category: 'Streaming', description: 'Character-by-character streaming text with pretext', emoji: '💫', defaultProps: { content: 'This text streams character by character!', speed: 20 } },
  { name: 'StreamingCursor', category: 'Streaming', description: 'Blinking cursor for streaming text', emoji: '▋' },
  { name: 'StreamingCard', category: 'Streaming', description: 'Card with streaming content', emoji: '📝' },
  { name: 'LoadingDots', category: 'Streaming', description: 'Animated loading dots', emoji: '⏳' },
  { name: 'LoadingSpinner', category: 'Streaming', description: 'Circular loading spinner', emoji: '🔄' },
  
  // Effects Components
  { name: 'ParticleEmitter', category: 'Effects', description: 'Canvas-based particle system with physics', emoji: '✨', defaultProps: { count: 50, colors: ['#8b5cf6', '#a78bfa', '#c4b5fd'] } },
  { name: 'AnimatedGrid', category: 'Effects', description: 'Animated background grid pattern', emoji: '🔮' },
  { name: 'OrbitingShapes', category: 'Effects', description: 'Shapes orbiting around a center', emoji: '🪐' },
  { name: 'TextGradient', category: 'Effects', description: 'Animated gradient text effect', emoji: '🌈', defaultProps: { text: 'Gradient Text' } },
  { name: 'GlowBorder', category: 'Effects', description: 'Glowing border effect', emoji: '💡' },
  { name: 'GradientMesh', category: 'Effects', description: 'Animated gradient mesh background', emoji: '🎨' },
  { name: 'Shimmer', category: 'Effects', description: 'Shimmer loading effect', emoji: '🌟' },
  { name: 'FadeIn', category: 'Effects', description: 'Fade in animation wrapper', emoji: '👻' },
  { name: 'WordRotate', category: 'Effects', description: 'Rotating word animation', emoji: '🔄' },
  
  // Core Components
  { name: 'PretextCanvas', category: 'Core', description: 'Canvas text rendering with pretext measurement', emoji: '📐', defaultProps: { text: 'Canvas rendered text' } },
  { name: 'PretextLayout', category: 'Core', description: 'Layout engine using pretext', emoji: '📊' },
  { name: 'PretextStream', category: 'Core', description: 'Streaming text with pretext measurement', emoji: '🌊' },
  
  // UI Components
  { name: 'VoteCard', category: 'UI', description: 'Voting card with options', emoji: '🗳️' },
  { name: 'DataChart', category: 'UI', description: 'Chart component for data visualization', emoji: '📈' },
  { name: 'DataTable', category: 'UI', description: 'Table for displaying data', emoji: '📋' },
  { name: 'ListCard', category: 'UI', description: 'Card with list content', emoji: '📝' },
  { name: 'SummaryCard', category: 'UI', description: 'Summary card component', emoji: '📌' },
  { name: 'CodeBlock', category: 'UI', description: 'Code block with syntax highlighting', emoji: '💻', defaultProps: { content: 'const hello = "world";' } },
  { name: 'QuestionBubble', category: 'UI', description: 'Question bubble component', emoji: '❓' },
  
  // Web Components
  { name: 'LiveWebsiteGenerator', category: 'Web', description: 'AI generates websites in real-time', emoji: '🌐' },
  { name: 'WebsitePreview', category: 'Web', description: 'Live website preview', emoji: '👁️' },
  
  // Magic UI Components
  { name: 'BentoGrid', category: 'Magic UI', description: 'Bento-style grid layout', emoji: '🍱' },
  { name: 'Badge', category: 'UI', description: 'Badge/Label component', emoji: '🏷️' },
  { name: 'Button', category: 'UI', description: 'Button component', emoji: '🔘' },
  { name: 'Card', category: 'UI', description: 'Card container', emoji: '🃏' },
  { name: 'Input', category: 'UI', description: 'Text input component', emoji: '✏️' },
  
  // Agent Components
  { name: 'AgentBuilder', category: 'Agents', description: 'Build AI agents', emoji: '🤖' },
  { name: 'AgentChat', category: 'Agents', description: 'Chat with AI agents', emoji: '💬' },
  { name: 'LMStudioAgent', category: 'Agents', description: 'LM Studio powered agent', emoji: '🧠' },
  { name: 'ToolExecutor', category: 'Agents', description: 'Execute agent tools', emoji: '⚡' },
  { name: 'ToolResultsPanel', category: 'Agents', description: 'Display tool results', emoji: '📊' },
]

const categories = ['All', 'AI', 'Streaming', 'Effects', 'Core', 'UI', 'Web', 'Magic UI', 'Agents']

export default function ComponentsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedComponent, setSelectedComponent] = useState<ComponentInfo | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredComponents = components.filter(c => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          🧩 Component Library
        </h1>
        <p className="text-gray-400">Explore all {components.length}+ components available in the toolkit</p>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <input
          type="text"
          placeholder="Search components..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-purple-500 w-64"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      {/* Component Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredComponents.map((comp, i) => (
          <button
            key={comp.name}
            onClick={() => setSelectedComponent(comp)}
            className={`p-4 rounded-xl bg-white/5 border text-left hover:border-purple-500/50 transition-all hover:scale-105 ${
              selectedComponent?.name === comp.name ? 'border-purple-500 bg-purple-500/10' : 'border-white/10'
            }`}
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{comp.emoji}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{comp.name}</h3>
                <p className="text-xs text-gray-400 line-clamp-2 mt-1">{comp.description}</p>
                <span className="inline-block mt-2 px-2 py-0.5 bg-white/10 rounded text-xs">{comp.category}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {/* Component Preview */}
      {selectedComponent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedComponent(null)}>
          <div 
            className="bg-gray-900 rounded-2xl border border-white/20 max-w-2xl w-full max-h-[80vh] overflow-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedComponent.emoji}</span>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedComponent.name}</h2>
                    <p className="text-gray-400">{selectedComponent.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedComponent(null)}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <ComponentPreview name={selectedComponent.name} props={selectedComponent.defaultProps || {}} />
            </div>
          </div>
        </div>
      )}
      
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { label: 'Total Components', value: components.length, emoji: '🧩' },
          { label: 'Categories', value: categories.length - 1, emoji: '📁' },
          { label: 'AI-Powered', value: 5, emoji: '🤖' },
          { label: 'Streaming', value: 4, emoji: '⚡' },
        ].map(stat => (
          <div key={stat.label} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="text-2xl mb-2">{stat.emoji}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
