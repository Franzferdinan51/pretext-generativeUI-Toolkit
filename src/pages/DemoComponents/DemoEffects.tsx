/**
 * DemoEffects - Demo for visual effects components
 */
import React from 'react'
import { GradientMesh, GlowBorder, Shimmer, Skeleton } from '../../effects'

export function DemoEffects() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-400 mb-4">
        Visual effects for enhanced UI:
      </p>

      <div className="grid grid-cols-2 gap-4">
        {/* Gradient Mesh */}
        <div className="bg-black/50 rounded-lg p-4">
          <h4 className="text-sm text-gray-500 mb-3">GradientMesh</h4>
          <div className="relative h-40 rounded-lg overflow-hidden">
            <GradientMesh />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/80 text-lg font-semibold">Animated Mesh</span>
            </div>
          </div>
        </div>

        {/* Glow Border */}
        <div className="bg-black/50 rounded-lg p-4">
          <h4 className="text-sm text-gray-500 mb-3">GlowBorder</h4>
          <GlowBorder color="#8b5cf6" intensity={2}>
            <div className="p-6 text-center">
              <p className="text-white font-semibold">Glowing Border</p>
              <p className="text-gray-400 text-sm mt-1">Animated glow effect</p>
            </div>
          </GlowBorder>
        </div>

        {/* Shimmer */}
        <div className="bg-black/50 rounded-lg p-4">
          <h4 className="text-sm text-gray-500 mb-3">Shimmer</h4>
          <div className="space-y-2">
            <Shimmer width={200} height={20} />
            <Shimmer width="100%" height={20} />
            <Shimmer width={150} height={20} />
          </div>
        </div>

        {/* Skeleton */}
        <div className="bg-black/50 rounded-lg p-4">
          <h4 className="text-sm text-gray-500 mb-3">Skeleton</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton variant="circular" width={40} height={40} />
              <div className="flex-1 space-y-2">
                <Skeleton variant="rectangular" width="60%" height={12} />
                <Skeleton variant="rectangular" width="40%" height={12} />
              </div>
            </div>
            <Skeleton variant="rectangular" width="100%" height={60} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemoEffects
