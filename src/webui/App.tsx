import React, { useState, useCallback } from 'react'
import Playground from './pages/Playground'
import ComponentsPage from './pages/Components'
import PreviewPage from './pages/Preview'
import SettingsPage from './pages/Settings'

type Tab = 'playground' | 'components' | 'preview' | 'settings'

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('playground')

  const tabClass = useCallback((tab: Tab) => {
    return `tab ${activeTab === tab ? 'tab-active' : ''}`
  }, [activeTab])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white grid-pattern noise">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gradient">
                Pretext AI UI Toolkit
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Generative UI with pretext & LM Studio
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setActiveTab('playground')} className={tabClass('playground')}>
                🎮 Playground
              </button>
              <button onClick={() => setActiveTab('components')} className={tabClass('components')}>
                🧩 Components
              </button>
              <button onClick={() => setActiveTab('preview')} className={tabClass('preview')}>
                👁️ Preview
              </button>
              <button onClick={() => setActiveTab('settings')} className={tabClass('settings')}>
                ⚙️ Settings
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        {activeTab === 'playground' && <Playground />}
        {activeTab === 'components' && <ComponentsPage />}
        {activeTab === 'preview' && <PreviewPage />}
        {activeTab === 'settings' && <SettingsPage />}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          Built with ❤️ using Pretext, React & Tailwind CSS
        </div>
      </footer>
    </div>
  )
}
