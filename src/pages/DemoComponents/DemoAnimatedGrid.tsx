/**
 * DemoAnimatedGrid - Demo for AnimatedGrid component
 */
import React from 'react'
import { AnimatedGrid } from '../../magicui'

export function DemoAnimatedGrid() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-400 mb-4">
        Animated grid patterns for backgrounds and visual effects:
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-black/50 rounded-lg p-4">
          <AnimatedGrid rows={4} cols={4} color="#8b5cf6" />
          <p className="text-xs text-center mt-2 text-gray-500">4x4 Purple Grid</p>
        </div>
        <div className="bg-black/50 rounded-lg p-4">
          <AnimatedGrid rows={5} cols={5} color="#06b6d4" animate={true} />
          <p className="text-xs text-center mt-2 text-gray-500">5x5 Cyan Animated</p>
        </div>
      </div>
    </div>
  )
}

export default DemoAnimatedGrid
