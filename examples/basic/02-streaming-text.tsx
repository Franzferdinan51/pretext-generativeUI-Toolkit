/**
 * Example 02: Streaming Text
 * 
 * This example demonstrates character-by-character text streaming
 * with cursor animation.
 */

import React, { useState } from 'react'
import { StreamableText } from '../../src/streaming'

export function StreamingTextExample() {
  const [content, setContent] = useState('')
  const [isActive, setIsActive] = useState(false)

  const sampleTexts = [
    'This is the first sample text that streams character by character.',
    'Another example with different content to stream.',
    'Watch as each letter appears smoothly with a blinking cursor.',
  ]

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Streaming Text Example</h1>
      
      <div className="mb-6 flex gap-4">
        {sampleTexts.map((text, i) => (
          <button
            key={i}
            onClick={() => { setContent(text); setIsActive(true); }}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Sample {i + 1}
          </button>
        ))}
        <button
          onClick={() => { setContent(''); setIsActive(false); }}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="bg-black rounded-lg p-8 min-h-40">
        {content ? (
          <StreamableText
            content={content}
            speed={20}
            autoStart={isActive}
            showCursor={true}
            cursorChar="▋"
          />
        ) : (
          <p className="text-gray-600 italic">
            Click a sample button to see streaming in action
          </p>
        )}
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="p-4 bg-gray-800 rounded-lg">
          <h4 className="font-semibold mb-2">Speed Control</h4>
          <p className="text-sm text-gray-400">
            Adjust the speed prop to control how fast characters appear.
          </p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg">
          <h4 className="font-semibold mb-2">Cursor Options</h4>
          <p className="text-sm text-gray-400">
            Customize the cursor character and blink speed.
          </p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg">
          <h4 className="font-semibold mb-2">Callbacks</h4>
          <p className="text-sm text-gray-400">
            Use onComplete and onProgress for advanced control.
          </p>
        </div>
      </div>
    </div>
  )
}

export default StreamingTextExample
