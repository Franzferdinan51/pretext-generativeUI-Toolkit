import React, { useState, useEffect } from 'react'
import { StreamableText } from '../../streaming/StreamableText'
import { ParticleEmitter } from '../../effects/ParticleEmitter'
import { AnimatedGrid } from '../../magicui/AnimatedGrid'
import { TextGradient } from '../../magicui/TextGradient'
import { OrbitingShapes } from '../../magicui/OrbitingShapes'
import { GlowBorder } from '../../effects/GlowBorder'
import { Shimmer } from '../../effects/Shimmer'
import { FadeIn } from '../../magicui/FadeIn'
import { WordRotate } from '../../magicui/WordRotate'
import { SmartMessage } from '../../components/SmartMessage'
import { PretextCanvas } from '../../pretext/PretextCanvas'

interface Demo {
  id: string
  name: string
  description: string
  component: React.ReactNode
  category: string
}

const demos: Demo[] = [
  {
    id: 'streaming',
    name: 'Streaming Text',
    description: 'Character-by-character streaming with pretext',
    category: 'Streaming',
    component: (
      <div className="p-6 bg-black/50 rounded-xl">
        <p className="text-sm text-gray-400 mb-4">Watch the text appear character by character:</p>
        <StreamableText 
          content="This is streaming text powered by pretext - it measures each character before rendering for perfect timing!"
          speed={15}
          showCursor={true}
        />
      </div>
    )
  },
  {
    id: 'particles',
    name: 'Particle System',
    description: 'Canvas-based particle physics',
    category: 'Effects',
    component: (
      <div className="p-6 bg-black/50 rounded-xl">
        <p className="text-sm text-gray-400 mb-4">Interactive particle effects:</p>
        <ParticleEmitter 
          count={80}
          colors={['#8b5cf6', '#a78bfa', '#c4b5fd', '#22d3ee']}
          minSize={2}
          maxSize={5}
          minSpeed={1}
          maxSpeed={4}
          gravity={0.05}
          width={350}
          height={200}
        />
      </div>
    )
  },
  {
    id: 'animated-grid',
    name: 'Animated Grid',
    description: 'Cyberpunk-style animated background',
    category: 'Effects',
    component: (
      <div className="p-6 bg-black/50 rounded-xl">
        <AnimatedGrid />
        <div className="absolute inset-0 flex items-center justify-center">
          <TextGradient>GRID</TextGradient>
        </div>
      </div>
    )
  },
  {
    id: 'gradient-text',
    name: 'Gradient Text',
    description: 'Animated gradient text effect',
    category: 'Effects',
    component: (
      <div className="p-6 bg-black/50 rounded-xl text-center">
        <TextGradient>Beautiful Gradient</TextGradient>
        <TextGradient className="text-4xl mt-4">Pretext Toolkit</TextGradient>
      </div>
    )
  },
  {
    id: 'orbiting-shapes',
    name: 'Orbiting Shapes',
    description: 'Shapes orbiting around center',
    category: 'Effects',
    component: (
      <div className="p-6 bg-black/50 rounded-xl">
        <OrbitingShapes />
      </div>
    )
  },
  {
    id: 'glow-border',
    name: 'Glow Border',
    description: 'Glowing border effect',
    category: 'Effects',
    component: (
      <div className="p-6 bg-black/50 rounded-xl">
        <GlowBorder>
          <div className="p-6 text-center">
            <p className="text-lg font-semibold">Glowing Content</p>
            <p className="text-sm text-gray-400">With animated border</p>
          </div>
        </GlowBorder>
      </div>
    )
  },
  {
    id: 'shimmer',
    name: 'Shimmer Effect',
    description: 'Loading shimmer animation',
    category: 'Effects',
    component: (
      <div className="p-6 bg-black/50 rounded-xl space-y-4">
        <Shimmer width={200} height={20} />
        <Shimmer width="100%" height={20} />
        <Shimmer width={150} height={40} />
      </div>
    )
  },
  {
    id: 'fade-in',
    name: 'Fade In',
    description: 'Smooth fade in animation',
    category: 'Effects',
    component: (
      <div className="p-6 bg-black/50 rounded-xl">
        <FadeIn delay={0}>
          <div className="p-3 bg-purple-500/20 rounded mb-2">First</div>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="p-3 bg-cyan-500/20 rounded mb-2">Second</div>
        </FadeIn>
        <FadeIn delay={400}>
          <div className="p-3 bg-pink-500/20 rounded">Third</div>
        </FadeIn>
      </div>
    )
  },
  {
    id: 'word-rotate',
    name: 'Word Rotate',
    description: 'Rotating word animation',
    category: 'Effects',
    component: (
      <div className="p-6 bg-black/50 rounded-xl text-center">
        <p className="text-gray-400 mb-4">Building with</p>
        <div className="text-3xl font-bold">
          <WordRotate words={['React', 'Pretext', 'Canvas', 'AI']} />
        </div>
      </div>
    )
  },
  {
    id: 'smart-message',
    name: 'Smart Message',
    description: 'Auto-detecting content type',
    category: 'AI',
    component: (
      <div className="p-6 bg-black/50 rounded-xl space-y-4">
        <SmartMessage content="This is a normal text message with automatic content detection." />
        <SmartMessage content="📊 Vote: Should we ship this feature? Yes / No / Maybe" />
        <SmartMessage content="```js\nconst x = 1;\nconsole.log(x);\n```" />
      </div>
    )
  },
  {
    id: 'pretext-canvas',
    name: 'Pretext Canvas',
    description: 'Canvas text rendering with pretext',
    category: 'Core',
    component: (
      <div className="p-6 bg-black/50 rounded-xl">
        <p className="text-sm text-gray-400 mb-4">Canvas-rendered text with pretext measurement:</p>
        <PretextCanvas 
          text="This text is measured and rendered character-by-character on canvas for maximum performance."
          maxWidth={350}
          lineHeight={24}
        />
      </div>
    )
  },
]

const categories = ['All', ...Array.from(new Set(demos.map(d => d.category)))]

export default function PreviewPage() {
  const [category, setCategory] = useState('All')
  const [autoPlay, setAutoPlay] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const filteredDemos = category === 'All' 
    ? demos 
    : demos.filter(d => d.category === category)
  
  // Auto-play cycling
  useEffect(() => {
    if (!autoPlay) return
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % filteredDemos.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [autoPlay, filteredDemos.length])
  
  return (
    <div className="h-[calc(100vh-220px)] flex flex-col">
      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setCurrentIndex(0); }}
              className={`tab ${category === cat ? 'tab-active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
            <input
              type="checkbox"
              checked={autoPlay}
              onChange={e => setAutoPlay(e.target.checked)}
              className="w-4 h-4 rounded border-gray-600 bg-gray-800"
            />
            Auto-play
          </label>
          <span className="text-sm text-gray-500">
            {currentIndex + 1} / {filteredDemos.length}
          </span>
        </div>
      </div>
      
      {/* Preview Grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-2 gap-4">
          {filteredDemos.map((demo, index) => (
            <div 
              key={demo.id}
              onClick={() => setCurrentIndex(index)}
              className={`card p-4 cursor-pointer transition-all ${
                currentIndex === index ? 'border-purple-500 ring-1 ring-purple-500/50' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold">{demo.name}</h4>
                  <p className="text-xs text-gray-400">{demo.description}</p>
                </div>
                <span className="badge badge-purple text-xs">{demo.category}</span>
              </div>
              <div className="relative min-h-[150px]">
                {currentIndex === index && (
                  <div className="absolute inset-0 z-10">
                    {demo.component}
                  </div>
                )}
                {currentIndex !== index && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 rounded-lg">
                    <span className="text-gray-500 text-sm">Click to preview</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Full Preview */}
      {filteredDemos[currentIndex] && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8" onClick={() => setCurrentIndex(-1)}>
          <div className="max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <div className="bg-gray-900 rounded-xl border border-white/10 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-black/30">
                <div>
                  <h4 className="font-semibold">{filteredDemos[currentIndex].name}</h4>
                  <p className="text-xs text-gray-400">{filteredDemos[currentIndex].description}</p>
                </div>
                <button onClick={() => setCurrentIndex(-1)} className="btn btn-ghost">
                  ✕ Close
                </button>
              </div>
              <div className="p-8">
                {filteredDemos[currentIndex].component}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
