/**
 * Basic Example 3: Streaming Text
 */

import React from 'react'
import { StreamableText } from '../src/streaming'
import { StreamingCard } from '../src/components'

const councilor = { name: 'AI Assistant', color: '#8b5cf6', avatar: '🤖' }

export default function StreamingExample() {
  const longText = `This is a longer AI-generated response that streams character by character. 
  Notice how the layout doesn't jump around as text appears - Pretext has pre-measured 
  the final height to prevent any layout shift. This creates a smooth, premium feel 
  for AI chat interfaces.`
  
  return (
    <div style={{ padding: '40px', maxWidth: '600px' }}>
      <h2 style={{ color: '#fff', marginBottom: '20px' }}>Streaming Examples</h2>
      
      {/* Streamable text */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#9ca3af', marginBottom: '12px' }}>Streamable Text</h3>
        <StreamableText 
          content={longText}
          speed={15}
          font="15px Inter, system-ui, sans-serif"
          maxWidth={500}
          lineHeight={24}
        />
      </div>
      
      {/* Streaming card */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#9ca3af', marginBottom: '12px' }}>Streaming Card</h3>
        <StreamingCard 
          content={longText}
          speed={20}
          councilor={councilor}
        />
      </div>
    </div>
  )
}
