/**
 * Example 04: Particle Effects
 * 
 * This example demonstrates the various particle emitter effects
 * available in the toolkit.
 */

import React from 'react'
import { ParticleEmitter } from '../../src/effects'

export function ParticleEffectsExample() {
  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Particle Effects Example</h1>
      
      <p className="text-gray-400 mb-6">
        Three types of particle effects for visual enhancement.
      </p>

      <div className="grid grid-cols-3 gap-6">
        {/* Energy Effect */}
        <div className="bg-black/50 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4 text-purple-400">Energy</h2>
          <div className="h-48 flex items-center justify-center bg-gradient-to-b from-purple-900/20 to-transparent rounded-lg">
            <ParticleEmitter type="energy" count={40} color="#8b5cf6" />
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Explosive outward particles. Great for emphasis.
          </p>
        </div>

        {/* Constellation Effect */}
        <div className="bg-black/50 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4 text-cyan-400">Constellation</h2>
          <div className="h-48 flex items-center justify-center bg-gradient-to-b from-cyan-900/20 to-transparent rounded-lg">
            <ParticleEmitter type="constellation" count={50} color="#06b6d4" />
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Connected nodes like stars. Perfect for tech themes.
          </p>
        </div>

        {/* Stars Effect */}
        <div className="bg-black/50 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4 text-pink-400">Stars</h2>
          <div className="h-48 flex items-center justify-center bg-gradient-to-b from-pink-900/20 to-transparent rounded-lg">
            <ParticleEmitter type="stars" count={60} color="#ec4899" />
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Twinkling star particles. Ideal for celebrations.
          </p>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-800 rounded-lg">
        <h3 className="font-semibold mb-2">Usage:</h3>
        <pre className="text-sm text-gray-400 mt-2">
{`<ParticleEmitter 
  type="energy" | "constellation" | "stars"
  count={40}
  color="#8b5cf6"
/>`}
        </pre>
      </div>
    </div>
  )
}

export default ParticleEffectsExample
