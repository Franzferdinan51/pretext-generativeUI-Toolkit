/**
 * DemoShowcase - Comprehensive demo of all toolkit features
 * 
 * This page showcases every component and feature in the Pretext Generative UI Toolkit
 * with live examples and explanations.
 */
import React from 'react'
import {
  Section,
  DemoPretextCanvas,
  DemoSmartMessage,
  DemoParticleEmitter,
  DemoAnimatedGrid,
  DemoStreamingText,
  DemoLoadingStates,
  DemoBentoGrid,
  DemoDataViz,
  DemoAgentChat,
  DemoMagicUIEffects,
  DemoUIPrimitives,
  DemoEffects,
  DemoLayout,
} from './DemoComponents'

export function DemoShowcase() {
  return (
    <div className="space-y-4">
      {/* Hero Header */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          Pretext AI UI Toolkit
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          A comprehensive AI-powered generative UI toolkit with character-level
          canvas rendering, streaming components, and beautiful effects.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <a 
            href="https://github.com/chenglou/pretext"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm transition-colors"
          >
            📦 Pretext Core
          </a>
          <a 
            href="#"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
          >
            📚 Documentation
          </a>
        </div>
      </section>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-black/50 rounded-lg p-4 text-center border border-white/10">
          <div className="text-3xl font-bold text-purple-400">25+</div>
          <div className="text-xs text-gray-500 mt-1">Components</div>
        </div>
        <div className="bg-black/50 rounded-lg p-4 text-center border border-white/10">
          <div className="text-3xl font-bold text-cyan-400">9</div>
          <div className="text-xs text-gray-500 mt-1">Categories</div>
        </div>
        <div className="bg-black/50 rounded-lg p-4 text-center border border-white/10">
          <div className="text-3xl font-bold text-pink-400">100%</div>
          <div className="text-xs text-gray-500 mt-1">TypeScript</div>
        </div>
        <div className="bg-black/50 rounded-lg p-4 text-center border border-white/10">
          <div className="text-3xl font-bold text-orange-400">0ms</div>
          <div className="text-xs text-gray-500 mt-1">DOM Reflow</div>
        </div>
      </div>

      {/* Section 1: Pretext Core */}
      <Section title="📐 Pretext Core - Character-Level Control">
        <p className="text-sm text-gray-400 mb-6">
          Pretext provides zero-DOM-reflow text measurement. AI generates layout → Pretext measures →
          Canvas renders. No CSS constraints, exact pixel control.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-purple-400 mb-3">Canvas Rendering</h4>
            <DemoPretextCanvas
              text="Hello from Pretext! This text is rendered character-by-character with exact positioning on canvas."
              font="18px Inter"
              maxWidth={280}
              lineHeight={28}
              color="#8b5cf6"
            />
          </div>
          <div className="bg-black/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-cyan-400 mb-3">Streaming Text</h4>
            <DemoPretextCanvas
              text="Streaming text with pretext pre-measurement. Zero DOM reflow!"
              font="16px Inter"
              maxWidth={280}
              lineHeight={24}
              color="#06b6d4"
            />
          </div>
        </div>
        <div className="mt-4 p-4 bg-black/30 rounded-lg">
          <code className="text-xs text-gray-400">
            {`const prepared = prepareWithSegments(text, '15px Inter')\nconst { lines } = layoutWithLines(prepared, width, 22)\nctx.fillText(line.text, line.x, line.y)`}
          </code>
        </div>
      </Section>

      {/* Section 2: AI Components */}
      <Section title="🤖 AI-Powered Components">
        <p className="text-sm text-gray-400 mb-6">
          Smart components that automatically detect and render content appropriately.
        </p>
        <DemoSmartMessage />
      </Section>

      {/* Section 3: Streaming */}
      <Section title="⚡ Streaming Components">
        <p className="text-sm text-gray-400 mb-6">
          Character-by-character streaming with cursor animation and various loading states.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <DemoStreamingText />
          <DemoLoadingStates />
        </div>
      </Section>

      {/* Section 4: Visual Effects */}
      <Section title="✨ Visual Effects">
        <p className="text-sm text-gray-400 mb-6">
          Beautiful particle effects and animations for enhanced UI.
        </p>
        <DemoParticleEmitter />
      </Section>

      {/* Section 5: UI Primitives */}
      <Section title="🎨 UI Primitives">
        <p className="text-sm text-gray-400 mb-6">
          Basic building blocks for modern UI: buttons, cards, badges, inputs.
        </p>
        <DemoUIPrimitives />
      </Section>

      {/* Section 6: MagicUI Effects */}
      <Section title="🔮 MagicUI Effects">
        <p className="text-sm text-gray-400 mb-6">
          Text effects and animations from MagicUI: gradients, word rotation, fade-ins.
        </p>
        <DemoMagicUIEffects />
      </Section>

      {/* Section 7: Grid & Layout */}
      <Section title="📐 Grid & Layout Components">
        <p className="text-sm text-gray-400 mb-6">
          Advanced grid layouts: animated grids, bento grid, masonry, adaptive.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <DemoAnimatedGrid />
          <DemoBentoGrid />
        </div>
      </Section>

      {/* Section 8: Data Visualization */}
      <Section title="📊 Data Visualization">
        <p className="text-sm text-gray-400 mb-6">
          Charts, tables, and voting components for data display.
        </p>
        <DemoDataViz />
      </Section>

      {/* Section 9: Effects */}
      <Section title="🌟 Additional Effects">
        <p className="text-sm text-gray-400 mb-6">
          Gradient meshes, glow borders, shimmer effects, and more.
        </p>
        <DemoEffects />
      </Section>

      {/* Section 10: Agent Control */}
      <Section title="🛠️ Agent & Layout">
        <p className="text-sm text-gray-400 mb-6">
          Agent integration and advanced layout components.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <DemoLayout />
        </div>
      </Section>

      {/* Footer */}
      <footer className="text-center py-12 border-t border-white/10">
        <p className="text-gray-500 mb-2">
          Built with ❤️ using Pretext, React, and AI
        </p>
        <p className="text-sm text-gray-600">
          Pretext Generative UI Toolkit • {new Date().getFullYear()}
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <a 
            href="https://github.com/chenglou/pretext"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <span className="text-gray-700">•</span>
          <a href="#" className="text-gray-500 hover:text-white transition-colors">
            Documentation
          </a>
          <span className="text-gray-700">•</span>
          <a href="#" className="text-gray-500 hover:text-white transition-colors">
            Examples
          </a>
        </div>
      </footer>
    </div>
  )
}

export default DemoShowcase
