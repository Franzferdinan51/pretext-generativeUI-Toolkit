// src/webui/App.tsx - EXTRA FANCY VERSION
import React, { useState } from 'react'
import { ParticleEmitter } from '../effects/ParticleEmitter'
import { AnimatedGrid } from '../magicui/AnimatedGrid'
import { GradientMesh } from '../effects/GradientMesh'
import HomePage from './pages/HomePage'
import PlaygroundPage from './pages/PlaygroundPage'
import ComponentsPage from './pages/ComponentsPage'
import LiveWebsitePage from './pages/LiveWebsitePage'
import AgentsPage from './pages/AgentsPage'
import EffectsPage from './pages/EffectsPage'
import SettingsPage from './pages/Settings'
import LiveDemoPage from './pages/LiveDemoPage'
import GenerativeUIDemo from './pages/GenerativeUIDemo'

type TabId = 'gen-ui' | 'live-demo' | 'home' | 'playground' | 'components' | 'live-website' | 'agents' | 'effects' | 'settings'

const tabs = [
  { id: 'gen-ui' as TabId, emoji: '🚀', label: 'Gen UI' },
  { id: 'live-demo' as TabId, emoji: '🎨', label: 'Live Demo' },
  { id: 'home' as TabId, emoji: '🏠', label: 'Home' },
  { id: 'playground' as TabId, emoji: '🎮', label: 'Playground' },
  { id: 'components' as TabId, emoji: '🧩', label: 'Components' },
  { id: 'live-website' as TabId, emoji: '🌐', label: 'Live Website' },
  { id: 'agents' as TabId, emoji: '🤖', label: 'Agents' },
  { id: 'effects' as TabId, emoji: '✨', label: 'Effects' },
  { id: 'settings' as TabId, emoji: '⚙️', label: 'Settings' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('gen-ui')
  const [particlesEnabled, setParticlesEnabled] = useState(true)
  
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* BACKGROUND EFFECTS - Always visible */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particlesEnabled && (
          <>
            <GradientMesh />
            <ParticleEmitter type="stars" count={80} color="#8b5cf6" />
            <ParticleEmitter type="constellation" count={40} color="#06b6d4" />
          </>
        )}
      </div>
      
      {/* HEADER */}
      <header className="relative z-10 border-b border-white/10 bg-black/30 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center text-xl animate-pulse-glow">
                  🎨
                </div>
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-50 blur animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Pretext AI UI
                </h1>
                <p className="text-xs text-gray-500">Generative UI Toolkit</p>
              </div>
            </div>
            
            {/* Tab Navigation */}
            <nav className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{tab.emoji}</span>
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
            
            {/* Particles Toggle */}
            <button
              onClick={() => setParticlesEnabled(!particlesEnabled)}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              title="Toggle particles"
            >
              {particlesEnabled ? '✨' : '💫'}
            </button>
          </div>
        </div>
      </header>
      
      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto p-6">
        {activeTab === 'gen-ui' && <GenerativeUIDemo />}
        {activeTab === 'live-demo' && <LiveDemoPage />}
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'playground' && <PlaygroundPage />}
        {activeTab === 'components' && <ComponentsPage />}
        {activeTab === 'live-website' && <LiveWebsitePage />}
        {activeTab === 'agents' && <AgentsPage />}
        {activeTab === 'effects' && <EffectsPage />}
        {activeTab === 'settings' && <SettingsPage />}
      </main>
      
      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 py-4 text-center text-sm text-gray-500">
        Built with ❤️ using Pretext + React + AI • v1.0.0
      </footer>
    </div>
  )
}
