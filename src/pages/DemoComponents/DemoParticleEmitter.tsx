/**
 * DemoParticleEmitter - Demo for ParticleEmitter effects
 */
import React from 'react'
import { ParticleEmitter } from '../../effects'

export function DemoParticleEmitter() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-400 mb-4">
        Particle effects for visual enhancement:
      </p>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-black/50 rounded-lg p-4 flex items-center justify-center h-40">
          <ParticleEmitter type="energy" count={30} color="#8b5cf6" />
        </div>
        <div className="bg-black/50 rounded-lg p-4 flex items-center justify-center h-40">
          <ParticleEmitter type="constellation" count={40} color="#06b6d4" />
        </div>
        <div className="bg-black/50 rounded-lg p-4 flex items-center justify-center h-40">
          <ParticleEmitter type="stars" count={50} color="#ec4899" />
        </div>
      </div>
      <div className="flex justify-center gap-8 mt-4">
        <span className="text-xs text-purple-400">Energy</span>
        <span className="text-xs text-cyan-400">Constellation</span>
        <span className="text-xs text-pink-400">Stars</span>
      </div>
    </div>
  )
}

export default DemoParticleEmitter
