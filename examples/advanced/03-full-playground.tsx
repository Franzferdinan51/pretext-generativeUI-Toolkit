/**
 * Example 03: Full Playground
 * 
 * Interactive playground with all components available for testing.
 */

import React, { useState } from 'react'
import { SmartMessage } from '../../src/components'
import { BentoGrid } from '../../src/magicui'
import { AnimatedGrid } from '../../src/magicui'
import { LoadingDots, LoadingSpinner, LoadingBars } from '../../src/streaming'
import { ParticleEmitter, GlowBorder, Shimmer } from '../../src/effects'
import { Button, Card, Badge, Input } from '../../src/shadcn'

export function FullPlayground() {
  const [activeTab, setActiveTab] = useState<'components' | 'effects' | 'layout'>('components')
  const [chatInput, setChatInput] = useState('')

  const sampleContent = `The proposal has passed with strong support.

Key findings:
1. 73% approval rating
2. Budget approved
3. Timeline: Q2-Q4 2026

\`\`\`js
const result = await council.vote({ proposal: 'budget-2026' });
console.log(result.status); // 'passed'
\`\`\`

In summary, this is a significant milestone for the project.`

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">🎮 Component Playground</h1>
      
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        {['components', 'effects', 'layout'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === tab 
                ? 'bg-purple-600' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Components Tab */}
      {activeTab === 'components' && (
        <div className="space-y-6">
          {/* SmartMessage */}
          <Card>
            <div className="p-4 border-b border-white/10">
              <h3 className="font-semibold">SmartMessage</h3>
              <p className="text-sm text-gray-500">Auto-detects content type</p>
            </div>
            <div className="p-4">
              <SmartMessage content={sampleContent} />
            </div>
          </Card>

          {/* UI Primitives */}
          <Card>
            <div className="p-4 border-b border-white/10">
              <h3 className="font-semibold">UI Primitives</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
              <Input 
                placeholder="Type something..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
            </div>
          </Card>

          {/* Loading States */}
          <Card>
            <div className="p-4 border-b border-white/10">
              <h3 className="font-semibold">Loading States</h3>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <LoadingDots />
                  <p className="text-xs mt-2 text-gray-500">Dots</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size={40} />
                  <p className="text-xs mt-2 text-gray-500">Spinner</p>
                </div>
                <div className="text-center">
                  <LoadingBars />
                  <p className="text-xs mt-2 text-gray-500">Bars</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Effects Tab */}
      {activeTab === 'effects' && (
        <div className="space-y-6">
          {/* Particle Effects */}
          <Card>
            <div className="p-4 border-b border-white/10">
              <h3 className="font-semibold">Particle Effects</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-black/50 rounded-lg p-4 h-40 flex items-center justify-center">
                  <ParticleEmitter type="energy" count={30} color="#8b5cf6" />
                </div>
                <div className="bg-black/50 rounded-lg p-4 h-40 flex items-center justify-center">
                  <ParticleEmitter type="constellation" count={40} color="#06b6d4" />
                </div>
                <div className="bg-black/50 rounded-lg p-4 h-40 flex items-center justify-center">
                  <ParticleEmitter type="stars" count={50} color="#ec4899" />
                </div>
              </div>
            </div>
          </Card>

          {/* Glow & Shimmer */}
          <Card>
            <div className="p-4 border-b border-white/10">
              <h3 className="font-semibold">Glow & Shimmer</h3>
            </div>
            <div className="p-4 space-y-4">
              <GlowBorder color="#8b5cf6" intensity={2}>
                <div className="p-6 text-center">
                  <p className="font-semibold">Glowing Border</p>
                </div>
              </GlowBorder>
              <div className="space-y-2">
                <Shimmer width={200} height={20} />
                <Shimmer width="100%" height={16} />
                <Shimmer width={150} height={16} />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Layout Tab */}
      {activeTab === 'layout' && (
        <div className="space-y-6">
          {/* Animated Grid */}
          <Card>
            <div className="p-4 border-b border-white/10">
              <h3 className="font-semibold">Animated Grid</h3>
            </div>
            <div className="p-4">
              <AnimatedGrid rows={4} cols={4} color="#8b5cf6" animate={true} />
            </div>
          </Card>

          {/* Bento Grid */}
          <Card>
            <div className="p-4 border-b border-white/10">
              <h3 className="font-semibold">Bento Grid</h3>
            </div>
            <div className="p-4">
              <BentoGrid cols={4} gap={16}>
                <div className="col-span-2 row-span-2 bg-gradient-to-br from-purple-600/40 to-pink-600/40 rounded-xl p-6" colSpan={2} rowSpan={2}>
                  <h3 className="text-2xl font-bold">Large Card</h3>
                  <p className="text-gray-400 mt-2">Spans 2 columns and 2 rows</p>
                </div>
                <div className="bg-cyan-600/40 rounded-xl p-4"><h4>Card 1</h4></div>
                <div className="bg-pink-600/40 rounded-xl p-4"><h4>Card 2</h4></div>
                <div className="col-span-2 bg-orange-600/40 rounded-xl p-4" colSpan={2}><h4>Wide Card</h4></div>
              </BentoGrid>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default FullPlayground
