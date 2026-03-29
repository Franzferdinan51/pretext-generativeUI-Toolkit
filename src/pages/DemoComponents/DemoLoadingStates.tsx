/**
 * DemoLoadingStates - Demo for all loading state components
 */
import React from 'react'
import { LoadingDots, LoadingSpinner, LoadingBars, LoadingPulse, LoadingOrb } from '../../streaming'

export function DemoLoadingStates() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-400 mb-4">
        Beautiful loading indicators for every use case:
      </p>
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-black/50 rounded-lg p-4 flex flex-col items-center justify-center h-24">
          <LoadingDots count={3} color="#8b5cf6" />
          <p className="text-xs mt-3 text-gray-500">LoadingDots</p>
        </div>
        <div className="bg-black/50 rounded-lg p-4 flex flex-col items-center justify-center h-24">
          <LoadingSpinner size={40} color="#06b6d4" />
          <p className="text-xs mt-3 text-gray-500">LoadingSpinner</p>
        </div>
        <div className="bg-black/50 rounded-lg p-4 flex flex-col items-center justify-center h-24">
          <LoadingBars count={5} color="#ec4899" />
          <p className="text-xs mt-3 text-gray-500">LoadingBars</p>
        </div>
        <div className="bg-black/50 rounded-lg p-4 flex flex-col items-center justify-center h-24">
          <LoadingPulse width={80} color="#22c55e" />
          <p className="text-xs mt-3 text-gray-500">LoadingPulse</p>
        </div>
        <div className="bg-black/50 rounded-lg p-4 flex flex-col items-center justify-center h-24">
          <LoadingOrb size={50} color="#f59e0b" />
          <p className="text-xs mt-3 text-gray-500">LoadingOrb</p>
        </div>
      </div>
    </div>
  )
}

export default DemoLoadingStates
