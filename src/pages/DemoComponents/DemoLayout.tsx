/**
 * DemoLayout - Demo for layout components
 */
import React from 'react'
import { AdaptiveLayout, MasonryLayout } from '../../layout'

export function DemoLayout() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-400 mb-4">
        Advanced layout components:
      </p>

      {/* Adaptive Layout */}
      <div>
        <h4 className="text-sm font-semibold text-gray-500 mb-3">AdaptiveLayout</h4>
        <AdaptiveLayout
          items={[
            { id: '1', content: 'Desktop: 3 cols', cols: { desktop: 3, tablet: 2, mobile: 1 } },
            { id: '2', content: 'Responsive', cols: { desktop: 3, tablet: 2, mobile: 1 } },
            { id: '3', content: 'Breakpoints', cols: { desktop: 3, tablet: 2, mobile: 1 } },
            { id: '4', content: 'Auto-adjust', cols: { desktop: 3, tablet: 2, mobile: 1 } },
            { id: '5', content: 'Resize window', cols: { desktop: 3, tablet: 2, mobile: 1 } },
            { id: '6', content: 'See changes', cols: { desktop: 3, tablet: 2, mobile: 1 } },
          ]}
          renderItem={(item) => (
            <div className="bg-purple-600/30 border border-purple-500/40 rounded-lg p-4 text-center">
              <span className="text-purple-300 text-sm">{item.content}</span>
            </div>
          )}
        />
      </div>

      {/* Masonry Layout */}
      <div>
        <h4 className="text-sm font-semibold text-gray-500 mb-3">MasonryLayout</h4>
        <MasonryLayout columns={3} gap={16}>
          <div className="bg-cyan-600/30 border border-cyan-500/40 rounded-lg p-4 h-32">
            <span className="text-cyan-300 text-sm">Item 1 - Tall</span>
          </div>
          <div className="bg-pink-600/30 border border-pink-500/40 rounded-lg p-4 h-24">
            <span className="text-pink-300 text-sm">Item 2 - Short</span>
          </div>
          <div className="bg-orange-600/30 border border-orange-500/40 rounded-lg p-4 h-40">
            <span className="text-orange-300 text-sm">Item 3 - Very Tall</span>
          </div>
          <div className="bg-green-600/30 border border-green-500/40 rounded-lg p-4 h-28">
            <span className="text-green-300 text-sm">Item 4 - Medium</span>
          </div>
          <div className="bg-blue-600/30 border border-blue-500/40 rounded-lg p-4 h-36">
            <span className="text-blue-300 text-sm">Item 5 - Another Tall</span>
          </div>
          <div className="bg-yellow-600/30 border border-yellow-500/40 rounded-lg p-4 h-20">
            <span className="text-yellow-300 text-sm">Item 6 - Short</span>
          </div>
        </MasonryLayout>
      </div>
    </div>
  )
}

export default DemoLayout
