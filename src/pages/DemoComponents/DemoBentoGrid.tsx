/**
 * DemoBentoGrid - Demo for BentoGrid layout component
 */
import React from 'react'
import { BentoGrid } from '../../magicui'

export function DemoBentoGrid() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-400 mb-4">
        Bento grid layout for modern card arrangements:
      </p>
      <BentoGrid cols={4} gap={16}>
        <div 
          className="col-span-2 row-span-2 bg-gradient-to-br from-purple-600/40 to-pink-600/40 rounded-xl p-6 border border-purple-500/30"
          colSpan={2}
          rowSpan={2}
        >
          <h3 className="text-2xl font-bold mb-2">Large Card</h3>
          <p className="text-gray-400">Spans 2 columns and 2 rows</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="px-2 py-1 bg-purple-500/30 rounded text-xs">col-span-2</span>
            <span className="px-2 py-1 bg-pink-500/30 rounded text-xs">row-span-2</span>
          </div>
        </div>
        <div 
          className="bg-cyan-600/40 rounded-xl p-4 border border-cyan-500/30"
          colSpan={1}
        >
          <h4 className="font-bold text-cyan-400">Small Card 1</h4>
          <p className="text-xs text-gray-500 mt-1">Standard 1x1</p>
        </div>
        <div 
          className="bg-pink-600/40 rounded-xl p-4 border border-pink-500/30"
          colSpan={1}
        >
          <h4 className="font-bold text-pink-400">Small Card 2</h4>
          <p className="text-xs text-gray-500 mt-1">Standard 1x1</p>
        </div>
        <div 
          className="col-span-2 bg-orange-600/40 rounded-xl p-4 border border-orange-500/30"
          colSpan={2}
        >
          <h4 className="font-bold text-orange-400">Wide Card</h4>
          <p className="text-xs text-gray-500 mt-1">Spans 2 columns only</p>
        </div>
        <div 
          className="bg-green-600/40 rounded-xl p-4 border border-green-500/30"
          colSpan={1}
        >
          <h4 className="font-bold text-green-400">Card 5</h4>
        </div>
        <div 
          className="bg-blue-600/40 rounded-xl p-4 border border-blue-500/30"
          colSpan={1}
        >
          <h4 className="font-bold text-blue-400">Card 6</h4>
        </div>
        <div 
          className="bg-yellow-600/40 rounded-xl p-4 border border-yellow-500/30"
          colSpan={1}
        >
          <h4 className="font-bold text-yellow-400">Card 7</h4>
        </div>
        <div 
          className="bg-red-600/40 rounded-xl p-4 border border-red-500/30"
          colSpan={1}
        >
          <h4 className="font-bold text-red-400">Card 8</h4>
        </div>
      </BentoGrid>
    </div>
  )
}

export default DemoBentoGrid
