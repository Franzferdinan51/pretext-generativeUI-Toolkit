// src/webui/pages/HomePage.tsx - SUPER FANCY VERSION
import React, { useState, useEffect } from 'react'
import { StreamableText } from '../../streaming/StreamableText'
import { ParticleEmitter } from '../../effects/ParticleEmitter'
import { PretextCanvas } from '../../pretext/PretextCanvas'
import { SmartMessage } from '../../components/SmartMessage'
import { AnimatedGrid } from '../../magicui/AnimatedGrid'
import { TextGradient } from '../../magicui/TextGradient'
import { OrbitingShapes } from '../../magicui/OrbitingShapes'

const features = [
  { emoji: '📐', title: 'Pretext Canvas', desc: 'Character-level text measurement without DOM reflow', color: 'from-purple-500 to-pink-500' },
  { emoji: '🤖', title: 'AI Components', desc: 'SmartMessage auto-detects content type', color: 'from-pink-500 to-red-500' },
  { emoji: '⚡', title: 'Streaming', desc: 'Real-time streaming with pre-measured heights', color: 'from-red-500 to-orange-500' },
  { emoji: '✨', title: 'Visual Effects', desc: 'Particles, gradients, glows, morphing', color: 'from-orange-500 to-yellow-500' },
  { emoji: '🎨', title: 'UI Primitives', desc: 'Beautiful buttons, cards, inputs, dialogs', color: 'from-yellow-500 to-green-500' },
  { emoji: '🌐', title: 'Live Generation', desc: 'Generate websites in real-time with AI', color: 'from-green-500 to-cyan-500' },
]

const stats = [
  { value: '50+', label: 'Components' },
  { value: '0ms', label: 'DOM Reflow' },
  { value: '100%', label: 'Free & Open' },
  { value: 'LM Studio', label: 'Local AI' },
]

function FeatureCard({ feature, delay }: { feature: typeof features[0]; delay: number }) {
  return (
    <div 
      className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-transparent transition-all duration-500 hover:scale-105 hover:z-10"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
      <div className="relative">
        <div className="text-4xl mb-4">{feature.emoji}</div>
        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
        <p className="text-gray-400">{feature.desc}</p>
      </div>
    </div>
  )
}

function StatCard({ stat, delay }: { stat: typeof stats[0]; delay: number }) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 text-center hover:border-purple-500/30 transition-all">
      <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">{stat.value}</div>
      <div className="text-gray-400 text-sm">{stat.label}</div>
    </div>
  )
}

function LiveDemoShowcase() {
  const [active, setActive] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % demos.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])
  
  const demos = [
    { name: 'Pretext Canvas', component: <PretextDemo /> },
    { name: 'Particle Effects', component: <ParticleDemo /> },
    { name: 'Streaming Text', component: <StreamingDemo /> },
    { name: 'Smart Message', component: <SmartMessageDemo /> },
  ]
  
  return (
    <div>
      <div className="flex gap-2 mb-4 justify-center">
        {demos.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${i === active ? 'bg-purple-500 scale-125' : 'bg-white/20 hover:bg-white/40'}`}
          />
        ))}
      </div>
      <div className="bg-black/50 rounded-xl p-8 min-h-[300px] flex items-center justify-center relative overflow-hidden">
        {demos[active].component}
      </div>
      <p className="text-center text-gray-400 mt-4">{demos[active].name}</p>
    </div>
  )
}

// Demo components
function PretextDemo() {
  return (
    <div className="text-center">
      <PretextCanvas text="Hello from Pretext!" font="32px Inter" maxWidth={400} color="#8b5cf6" />
      <p className="text-gray-500 text-sm mt-4">Canvas-rendered text with zero DOM reflow</p>
    </div>
  )
}

function ParticleDemo() {
  return (
    <div className="relative w-full h-48">
      <ParticleEmitter type="energy" count={30} color="#8b5cf6" />
      <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-gray-500 text-sm">Interactive particle system</p>
    </div>
  )
}

function StreamingDemo() {
  const [text, setText] = useState('')
  
  useEffect(() => {
    const words = 'Streaming text with beautiful animations'.split(' ')
    let i = 0
    const interval = setInterval(() => {
      if (i < words.length) {
        setText(prev => prev + (prev ? ' ' : '') + words[i])
        i++
      } else {
        clearInterval(interval)
      }
    }, 150)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="text-center">
      <StreamableText content={text} speed={0} />
    </div>
  )
}

function SmartMessageDemo() {
  return (
    <SmartMessage content="This is a **vote** card with confidence: VOTE: YES (90%)" />
  )
}

export default function HomePage() {
  return (
    <div className="space-y-16 py-12">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="relative inline-block">
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 via-red-400 to-orange-400 bg-clip-text text-transparent animate-gradient">
            Pretext AI UI
          </h1>
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 blur-2xl rounded-3xl" />
        </div>
        
        <p className="text-2xl text-gray-400 max-w-2xl mx-auto">
          The world's most advanced AI-powered generative UI toolkit
        </p>
        
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl shadow-purple-500/30">
            🚀 Get Started
          </button>
          <button className="px-8 py-4 bg-white/10 rounded-2xl font-bold text-lg hover:bg-white/20 transition-colors border border-white/20">
            📖 Documentation
          </button>
        </div>
      </section>
      
      {/* Animated Grid Demo */}
      <section className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-3xl blur-xl opacity-30" />
        <div className="relative bg-gray-900/80 rounded-2xl p-8 border border-white/10 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <AnimatedGrid rows={6} cols={6} color="#8b5cf6" animate={true} />
          </div>
          <div className="relative text-center">
            <TextGradient className="text-5xl font-black">FEATURES</TextGradient>
            <p className="text-gray-400 mt-4">50+ components • Zero DOM reflow • Streaming AI</p>
          </div>
        </div>
      </section>
      
      {/* Feature Grid */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">🚀 Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} delay={i * 100} />
          ))}
        </div>
      </section>
      
      {/* Live Demo Preview */}
      <section className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-3xl blur-xl opacity-20" />
        <div className="relative bg-gray-900/80 rounded-2xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold mb-6 text-center">🎬 Live Demo</h2>
          <LiveDemoShowcase />
        </div>
      </section>
      
      {/* Orbiting Shapes */}
      <section className="relative">
        <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-center mb-6">🪐 Interactive Effects</h2>
          <div className="flex justify-center">
            <OrbitingShapes />
          </div>
        </div>
      </section>
      
      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} delay={i * 50} />
        ))}
      </section>
    </div>
  )
}
