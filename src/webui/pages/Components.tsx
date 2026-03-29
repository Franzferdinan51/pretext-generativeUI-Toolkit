import React, { useState, useMemo } from 'react'
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
  { name: 'ModeSelector', category: 'AI', description: 'Select between different AI modes', emoji: '🎛️' },
  { name: 'CouncilorSelector', category: 'AI', description: 'Select council members', emoji: '👥' },
  { name: 'LayoutOptimizer', category: 'AI', description: 'Optimize layout based on content', emoji: '📐' },
  
  // Streaming Components
  { name: 'StreamableText', category: 'Streaming', description: 'Character-by-character streaming text with pretext', emoji: '💫', defaultProps: { content: 'This text streams character by character like an AI response!', speed: 20 } },
  { name: 'StreamingCursor', category: 'Streaming', description: 'Blinking cursor for streaming text', emoji: '▋' },
  { name: 'StreamingCard', category: 'Streaming', description: 'Card with streaming content', emoji: '📝' },
  { name: 'LoadingStates', category: 'Streaming', description: 'Various loading animations', emoji: '⏳' },
  
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
  { name: 'useTextMeasurement', category: 'Core', description: 'Hook for text measurement', emoji: '📏' },
  { name: 'useStreamingText', category: 'Core', description: 'Hook for streaming text', emoji: '📜' },
  
  // UI Components
  { name: 'VoteCard', category: 'UI', description: 'Voting card with options', emoji: '🗳️' },
  { name: 'DataChart', category: 'UI', description: 'Chart component for data visualization', emoji: '📈' },
  { name: 'DataTable', category: 'UI', description: 'Table for displaying data', emoji: '📋' },
  { name: 'ListCard', category: 'UI', description: 'Card with list content', emoji: '📝' },
  { name: 'SummaryCard', category: 'UI', description: 'Summary card component', emoji: '📌' },
  { name: 'CodeBlock', category: 'UI', description: 'Code block with syntax highlighting', emoji: '💻', defaultProps: { content: 'const hello = "world";' } },
  { name: 'QuestionBubble', category: 'UI', description: 'Question bubble component', emoji: '❓' },
  { name: 'LiveWebsiteGenerator', category: 'Web', description: 'AI generates websites in real-time as you type', emoji: '🌐' },
  
  // Magic UI Components
  { name: 'BentoGrid', category: 'Magic UI', description: 'Bento-style grid layout', emoji: '🍱' },
  { name: 'Badge', category: 'UI', description: 'Badge/Label component', emoji: '🏷️' },
  { name: 'Button', category: 'UI', description: 'Button component', emoji: '🔘' },
  { name: 'Card', category: 'UI', description: 'Card container', emoji: '🃏' },
  { name: 'Input', category: 'UI', description: 'Text input component', emoji: '✏️' },
]

const categories = ['All', ...Array.from(new Set(components.map(c => c.category)))]

const categoryColors: Record<string, string> = {
  'AI': 'badge-purple',
  'Streaming': 'badge-cyan',
  'Effects': 'badge-pink',
  'Core': 'badge-green',
  'UI': 'badge-yellow',
  'Magic UI': 'badge-purple',
  'Web': 'badge-orange',
}

export default function ComponentsPage() {
  const [filter, setFilter] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedComponent, setSelectedComponent] = useState<ComponentInfo | null>(null)
  
  const filteredComponents = useMemo(() => {
    return components.filter(c => {
      const matchesFilter = c.name.toLowerCase().includes(filter.toLowerCase()) ||
        c.description.toLowerCase().includes(filter.toLowerCase())
      const matchesCategory = category === 'All' || c.category === category
      return matchesFilter && matchesCategory
    })
  }, [filter, category])
  
  const groupedComponents = useMemo(() => {
    const groups: Record<string, ComponentInfo[]> = {}
    filteredComponents.forEach(c => {
      if (!groups[c.category]) groups[c.category] = []
      groups[c.category].push(c)
    })
    return groups
  }, [filteredComponents])

  return (
    <div className="flex gap-4 h-[calc(100vh-220px)]">
      {/* Left: Component List */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Search & Filter */}
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              placeholder="Search components..."
              className="input pl-10"
            />
          </div>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="input w-48"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        {/* Component Grid */}
        <div className="flex-1 overflow-auto">
          {Object.entries(groupedComponents).map(([cat, comps]) => (
            <div key={cat} className="mb-6">
              <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                <span className={`badge ${categoryColors[cat] || 'badge-purple'}`}>{cat}</span>
                <span className="text-gray-600">({comps.length})</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {comps.map(comp => (
                  <div
                    key={comp.name}
                    onClick={() => setSelectedComponent(comp)}
                    className={`card p-4 cursor-pointer hover:border-purple-500/50 transition-all ${
                      selectedComponent?.name === comp.name ? 'border-purple-500 bg-purple-500/10' : ''
                    }`}
                  >
                    <div className="text-2xl mb-2">{comp.emoji}</div>
                    <h4 className="font-semibold text-sm">{comp.name}</h4>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{comp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {filteredComponents.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">🔍</div>
              <p>No components found matching your search</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Right: Component Preview */}
      <div className="w-[500px] bg-gray-900/50 rounded-xl border border-white/10 overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b border-white/10 bg-black/30">
          <h3 className="font-medium">Component Preview</h3>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          {selectedComponent ? (
            <ComponentPreview 
              type={selectedComponent.name} 
              props={selectedComponent.defaultProps || {}} 
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <div className="text-4xl mb-4">👆</div>
              <p>Select a component to preview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
