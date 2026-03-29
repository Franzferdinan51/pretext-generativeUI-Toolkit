/**
 * Example 01: Basic Pretext Canvas Usage
 * 
 * This example demonstrates how to use the PretextCanvas component
 * for character-level text rendering on HTML canvas.
 */

import React from 'react'
import { PretextCanvas } from '../../src/pages/DemoComponents/DemoPretextCanvas'

export function PretextCanvasExample() {
  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Pretext Canvas Example</h1>
      
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Static Text</h2>
          <div className="bg-black rounded-lg p-4">
            <PretextCanvas
              text="Hello from Pretext! This text is rendered character-by-character with exact positioning."
              font="18px Inter"
              maxWidth={300}
              lineHeight={28}
              color="#8b5cf6"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Multi-line Text</h2>
          <div className="bg-black rounded-lg p-4">
            <PretextCanvas
              text="This is a longer text that will wrap to multiple lines. Pretext handles the line breaking automatically!"
              font="16px Inter"
              maxWidth={280}
              lineHeight={24}
              color="#06b6d4"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-800 rounded-lg">
        <h3 className="font-semibold mb-2">Key Benefits:</h3>
        <ul className="list-disc list-inside text-gray-400">
          <li>Zero DOM reflow - text measurement is cached</li>
          <li>Exact pixel control - no CSS rounding</li>
          <li>Perfect for AI streaming - pre-measure before render</li>
        </ul>
      </div>
    </div>
  )
}

export default PretextCanvasExample
