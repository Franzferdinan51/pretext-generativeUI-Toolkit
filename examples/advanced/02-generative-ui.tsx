/**
 * Example 02: Generative UI Playground
 * 
 * This example demonstrates AI-controlled generative UI
 * using Pretext for layout generation.
 */

import React, { useState } from 'react'
import { PretextCanvas } from '../../src/pages/DemoComponents/DemoPretextCanvas'
import { BentoGrid } from '../../src/magicui'
import { AnimatedGrid } from '../../src/magicui'
import { ParticleEmitter } from '../../src/effects'
import { GlowBorder } from '../../src/effects'

export function GenerativeUIExample() {
  const [layoutMode, setLayoutMode] = useState<'grid' | 'bento' | 'particle'>('grid')
  const [textContent, setTextContent] = useState('Pretext AI UI Toolkit')
  const [primaryColor, setPrimaryColor] = useState('#8b5cf6')

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Generative UI Playground</h1>
      
      {/* Controls */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Text Content</label>
            <input
              type="text"
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Color</label>
            <div className="flex gap-2">
              {['#8b5cf6', '#06b6d4', '#ec4899', '#22c55e'].map((color) => (
                <button
                  key={color}
                  onClick={() => setPrimaryColor(color)}
                  className="w-8 h-8 rounded border-2"
                  style={{ 
                    backgroundColor: color,
                    borderColor: primaryColor === color ? '#fff' : 'transparent'
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Layout Mode</label>
            <div className="flex gap-2">
              {(['grid', 'bento', 'particle'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setLayoutMode(mode)}
                  className={`px-3 py-2 rounded text-sm ${
                    layoutMode === mode 
                      ? 'bg-purple-600' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-black rounded-lg p-8 min-h-96 mb-6">
        {layoutMode === 'grid' && (
          <AnimatedGrid rows={5} cols={5} color={primaryColor} animate={true} />
        )}
        
        {layoutMode === 'bento' && (
          <GlowBorder color={primaryColor} intensity={2}>
            <BentoGrid cols={3} gap={16}>
              <div className="col-span-2 bg-gradient-to-br from-purple-600/40 to-pink-600/40 rounded-xl p-6" colSpan={2}>
                <h3 className="text-2xl font-bold">{textContent}</h3>
              </div>
              <div className="bg-cyan-600/40 rounded-xl p-4">
                <h4>Quick Info</h4>
              </div>
              <div className="bg-pink-600/40 rounded-xl p-4">
                <h4>Feature 1</h4>
              </div>
              <div className="bg-orange-600/40 rounded-xl p-4">
                <h4>Feature 2</h4>
              </div>
            </BentoGrid>
          </GlowBorder>
        )}
        
        {layoutMode === 'particle' && (
          <div className="flex items-center justify-center h-80">
            <ParticleEmitter 
              type={primaryColor === '#8b5cf6' ? 'energy' : primaryColor === '#06b6d4' ? 'constellation' : 'stars'} 
              count={50} 
              color={primaryColor} 
            />
          </div>
        )}
      </div>

      {/* Pretext Canvas Demo */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="font-semibold mb-4">Pretext Canvas (Character-Level Rendering)</h3>
        <div className="bg-black rounded-lg p-4">
          <PretextCanvas
            text={textContent}
            font="24px Inter"
            maxWidth={400}
            lineHeight={32}
            color={primaryColor}
          />
        </div>
      </div>
    </div>
  )
}

export default GenerativeUIExample
