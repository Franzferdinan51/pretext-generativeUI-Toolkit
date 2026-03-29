/**
 * Basic Example 1: Pretext Canvas
 */

import React from 'react'
import { PretextCanvas } from '../src/pretext'

export default function CanvasExample() {
  return (
    <div style={{ padding: '40px' }}>
      <h2 style={{ color: '#fff', marginBottom: '20px' }}>Pretext Canvas Example</h2>
      
      <PretextCanvas 
        text="This is Pretext rendering on a canvas! No DOM reflow, smooth and fast."
        font="18px Inter, system-ui, sans-serif"
        maxWidth={400}
        lineHeight={26}
        color="#e5e7eb"
      />
      
      <div style={{ marginTop: '30px' }}>
        <PretextCanvas 
          text="Multi-line text works great with Pretext. Each character is positioned precisely, enabling smooth streaming and animations."
          font="14px Inter"
          maxWidth={300}
          lineHeight={20}
          color="#9ca3af"
        />
      </div>
    </div>
  )
}
