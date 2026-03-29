/**
 * DemoPretextCanvas - Demo for Pretext character-level text rendering
 */
import React, { useRef, useEffect } from 'react'
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

interface PretextCanvasProps {
  text: string
  font?: string
  maxWidth?: number
  lineHeight?: number
  color?: string
  backgroundColor?: string
}

export function PretextCanvas({
  text,
  font = '18px Inter',
  maxWidth = 300,
  lineHeight = 28,
  color = '#8b5cf6',
  backgroundColor = 'transparent'
}: PretextCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !text) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Prepare text with pretext
    const prepared = prepareWithSegments(text, font)
    const { lines, width } = layoutWithLines(prepared, maxWidth, lineHeight)

    // Set canvas size
    canvas.width = maxWidth
    canvas.height = lines.length > 0 ? (lines[lines.length - 1].y + lineHeight) : lineHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw text line by line
    ctx.fillStyle = color
    ctx.font = font

    for (const line of lines) {
      ctx.fillText(line.text, line.x, line.y)
    }
  }, [text, font, maxWidth, lineHeight, color])

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="rounded-lg"
        style={{ backgroundColor }}
      />
      <div className="absolute top-2 right-2 text-xs text-gray-500">
        Pretext Canvas
      </div>
    </div>
  )
}

export default PretextCanvas
