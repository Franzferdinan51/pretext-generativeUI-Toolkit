// src/webui/pages/EffectsPage.tsx - SHOW ALL EFFECTS!
import React, { useState } from 'react'
import { ParticleEmitter } from '../../effects/ParticleEmitter'
import { AnimatedGrid } from '../../magicui/AnimatedGrid'
import { GradientMesh } from '../../effects/GradientMesh'
import { GlowBorder } from '../../effects/GlowBorder'
import { Shimmer } from '../../effects/Shimmer'
import { FadeIn } from '../../magicui/FadeIn'
import { WordRotate } from '../../magicui/WordRotate'
import { TextGradient } from '../../magicui/TextGradient'
import { OrbitingShapes } from '../../magicui/OrbitingShapes'
import { LoadingDots, LoadingSpinner, LoadingBars, LoadingPulse, LoadingOrb } from '../../streaming/LoadingStates'

function EffectCard({ title, emoji, children, description }: { title: string; emoji: string; children: React.ReactNode; description?: string }) {
  const [hovered, setHovered] = useState(false)
  
  return (
    <div 
      className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="text-sm text-gray-400 mb-2">{emoji} {title}</div>
      {description && <p className="text-xs text-gray-500 mb-3">{description}</p>}
      <div className="h-40 flex items-center justify-center relative bg-black/30 rounded-xl overflow-hidden">
        {children}
        {hovered && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl animate-pulse pointer-events-none" />
        )}
      </div>
    </div>
  )
}

export default function EffectsPage() {
  const [particleCount, setParticleCount] = useState(50)
  const [particleColor, setParticleColor] = useState('#8b5cf6')
  const [particleType, setParticleType] = useState('stars')
  
  const particleTypes = [
    { id: 'stars', emoji: '⭐', name: 'Stars' },
    { id: 'constellation', emoji: '✨', name: 'Constellations' },
    { id: 'energy', emoji: '⚡', name: 'Energy' },
  ]

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          ✨ Visual Effects
        </h1>
        <p className="text-gray-400">All the visual effects available in the toolkit</p>
      </div>
      
      {/* Particle Systems */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">🌟 Particle Systems</h2>
          <div className="flex items-center gap-4">
            <select
              value={particleType}
              onChange={e => setParticleType(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-1"
            >
              {particleTypes.map(t => (
                <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>
              ))}
            </select>
            <input
              type="range"
              min="10"
              max="100"
              value={particleCount}
              onChange={e => setParticleCount(Number(e.target.value))}
              className="w-32"
            />
            <span className="text-sm text-gray-400">{particleCount} particles</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <EffectCard title="Stars" emoji="⭐" description="Flickering star particles">
            <ParticleEmitter type="stars" count={50} color="#8b5cf6" />
          </EffectCard>
          <EffectCard title="Constellations" emoji="✨" description="Connected star patterns">
            <ParticleEmitter type="constellation" count={40} color="#06b6d4" />
          </EffectCard>
          <EffectCard title="Energy" emoji="⚡" description="Flowing energy particles">
            <ParticleEmitter type="energy" count={50} color="#ec4899" />
          </EffectCard>
        </div>
        
        {/* Interactive Particle Demo */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg font-bold mb-4">🎮 Interactive Particle Demo</h3>
          <div className="flex flex-wrap gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-400">Particle Type:</label>
              <div className="flex gap-2 mt-1">
                {particleTypes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setParticleType(t.id)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      particleType === t.id ? 'bg-purple-600' : 'bg-white/10'
                    }`}
                  >
                    {t.emoji} {t.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400">Color:</label>
              <div className="flex gap-2 mt-1">
                {['#8b5cf6', '#ec4899', '#06b6d4', '#22c55e', '#f59e0b'].map(c => (
                  <button
                    key={c}
                    onClick={() => setParticleColor(c)}
                    className={`w-8 h-8 rounded-lg border-2 ${
                      particleColor === c ? 'border-white' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="h-48 bg-black/50 rounded-xl overflow-hidden">
            <ParticleEmitter type={particleType as any} count={particleCount} color={particleColor} />
          </div>
        </div>
      </section>
      
      {/* Grid Effects */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">🔮 Animated Grids</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EffectCard title="Purple Grid" emoji="💜" description="Cyberpunk-style animated grid">
            <div className="absolute inset-0 opacity-50">
              <AnimatedGrid rows={6} cols={6} color="#8b5cf6" animate={true} />
            </div>
            <TextGradient className="relative z-10">GRID</TextGradient>
          </EffectCard>
          <EffectCard title="Cyan Grid" emoji="💎" description="Neon cyan grid pattern">
            <div className="absolute inset-0 opacity-50">
              <AnimatedGrid rows={5} cols={7} color="#06b6d4" animate={true} />
            </div>
            <TextGradient className="relative z-10">CYBER</TextGradient>
          </EffectCard>
        </div>
      </section>
      
      {/* Glow Effects */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">💡 Glow Effects</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <EffectCard title="Purple Glow" emoji="🟣" description="High intensity purple glow">
            <GlowBorder color="#8b5cf6" intensity="high">
              <div className="p-6 text-center font-bold">GLOW</div>
            </GlowBorder>
          </EffectCard>
          <EffectCard title="Pink Glow" emoji="🩷" description="Medium intensity pink glow">
            <GlowBorder color="#ec4899" intensity="medium">
              <div className="p-6 text-center font-bold">GLOW</div>
            </GlowBorder>
          </EffectCard>
          <EffectCard title="Cyan Glow" emoji="🔵" description="Low intensity cyan glow">
            <GlowBorder color="#06b6d4" intensity="low">
              <div className="p-6 text-center font-bold">GLOW</div>
            </GlowBorder>
          </EffectCard>
          <EffectCard title="Rainbow Mesh" emoji="🌈" description="Animated gradient mesh">
            <div className="w-full h-full">
              <GradientMesh />
            </div>
          </EffectCard>
        </div>
      </section>
      
      {/* Loading States */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">⏳ Loading States</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <EffectCard title="Loading Dots" emoji="💬">
            <LoadingDots count={3} size={12} color="#8b5cf6" />
          </EffectCard>
          <EffectCard title="Spinner" emoji="🔄">
            <LoadingSpinner size={40} color="#ec4899" />
          </EffectCard>
          <EffectCard title="Loading Bars" emoji="📊">
            <LoadingBars count={5} height={20} color="#06b6d4" />
          </EffectCard>
          <EffectCard title="Pulse" emoji="💓">
            <LoadingPulse width={100} height={20} color="#22c55e" />
          </EffectCard>
          <EffectCard title="Orb" emoji="🪐">
            <LoadingOrb size={50} color="#f59e0b" />
          </EffectCard>
        </div>
      </section>
      
      {/* Text Effects */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">🎨 Text Effects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <EffectCard title="Text Gradient" emoji="🌈">
            <TextGradient className="text-3xl font-black">GRADIENT</TextGradient>
          </EffectCard>
          <EffectCard title="Word Rotate" emoji="🔄">
            <WordRotate 
              words={['Hello', 'World', 'Pretext', 'AI UI']} 
              className="text-2xl font-bold"
            />
          </EffectCard>
          <EffectCard title="Fade In" emoji="👻">
            <FadeIn direction="up" duration={1000}>
              <div className="text-xl font-bold text-purple-400">Fade In!</div>
            </FadeIn>
          </EffectCard>
        </div>
      </section>
      
      {/* Shapes */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">🪐 Orbiting Shapes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EffectCard title="Orbiting Orbs" emoji="🟣" description="Multiple shapes orbiting a center">
            <OrbitingShapes />
          </EffectCard>
          <EffectCard title="Shimmer Effect" emoji="✨" description="Shimmer loading animation">
            <Shimmer width={200} height={40} speed={2}>
              <div className="flex items-center justify-center h-full text-black font-bold">
                Loading...
              </div>
            </Shimmer>
          </EffectCard>
        </div>
      </section>
      
      {/* Combined Effects */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">🎬 Combined Effects</h2>
        <div className="bg-white/5 rounded-2xl border border-white/10 p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <GradientMesh />
          </div>
          <div className="absolute inset-0 opacity-30">
            <ParticleEmitter type="stars" count={40} color="#8b5cf6" />
          </div>
          <div className="relative z-10 text-center space-y-6">
            <TextGradient className="text-5xl font-black">EFFECTS COMBINED</TextGradient>
            <p className="text-gray-400">Multiple effects layered together for maximum visual impact!</p>
            <div className="flex justify-center gap-4">
              <LoadingDots />
              <LoadingSpinner size={30} />
              <LoadingOrb size={40} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Usage Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">💡 Usage Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { emoji: '🎯', tip: 'Use ParticleEmitter with count: 50-100 for best performance' },
            { emoji: '⚡', tip: 'Combine GradientMesh with ParticleEmitter for backgrounds' },
            { emoji: '🎨', tip: 'GlowBorder works great on cards and buttons' },
            { emoji: '📱', tip: 'All effects are responsive and mobile-friendly' },
            { emoji: '♿', tip: 'Particle systems can be disabled for accessibility' },
            { emoji: '🚀', tip: 'Use FadeIn to smoothly reveal content' },
          ].map(item => (
            <div key={item.tip} className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-2xl mr-3">{item.emoji}</span>
              <span className="text-gray-300">{item.tip}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
