/**
 * DemoStreamingText - Demo for StreamableText component
 */
import React, { useState } from 'react'
import { StreamableText } from '../../streaming'

export function DemoStreamingText() {
  const [content, setContent] = useState('')
  const [isActive, setIsActive] = useState(false)

  const sampleText = 'This text streams character by character with a beautiful cursor animation! Watch as each letter appears smoothly.'

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-400 mb-4">
        Character-by-character text streaming with cursor animation:
      </p>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setContent(sampleText); setIsActive(true); }}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm transition-colors"
        >
          Start Streaming
        </button>
        <button
          onClick={() => { setContent(''); setIsActive(false); }}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
        >
          Clear
        </button>
      </div>
      <div className="bg-black/50 rounded-lg p-6 min-h-32">
        {content ? (
          <StreamableText
            content={content}
            speed={20}
            autoStart={isActive}
            showCursor={true}
            cursorChar="▋"
          />
        ) : (
          <p className="text-gray-600 italic">Click "Start Streaming" to see it in action</p>
        )}
      </div>
    </div>
  )
}

export default DemoStreamingText
