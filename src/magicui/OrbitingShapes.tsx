/**
 * OrbitingShapes - Orbiting shapes animation
 */

import React, { useEffect, useRef } from 'react'

export interface OrbitingShapesProps {
  count?: number
  size?: number
  colors?: string[]
  orbitRadius?: number
  shapeSize?: number
  speed?: number
  shape?: 'circle' | 'square' | 'triangle'
  className?: string
  style?: React.CSSProperties
}

export const OrbitingShapes: React.FC<OrbitingShapesProps> = ({
  count = 5,
  size = 200,
  colors = ['#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b', '#10b981'],
  orbitRadius = 80,
  shapeSize = 10,
  speed = 20,
  shape = 'circle',
  className,
  style
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let animationId: number
    
    const animate = () => {
      ctx.clearRect(0, 0, size, size)
      
      const centerX = size / 2
      const centerY = size / 2
      const time = Date.now() / 1000
      
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (time * speed / 10)
        const x = centerX + Math.cos(angle) * orbitRadius
        const y = centerY + Math.sin(angle) * orbitRadius
        
        ctx.fillStyle = colors[i % colors.length]
        ctx.globalAlpha = 0.8
        
        ctx.beginPath()
        if (shape === 'circle') {
          ctx.arc(x, y, shapeSize, 0, Math.PI * 2)
        } else if (shape === 'square') {
          ctx.rect(x - shapeSize / 2, y - shapeSize / 2, shapeSize, shapeSize)
        } else if (shape === 'triangle') {
          ctx.moveTo(x, y - shapeSize)
          ctx.lineTo(x + shapeSize, y + shapeSize / 2)
          ctx.lineTo(x - shapeSize, y + shapeSize / 2)
          ctx.closePath()
        }
        ctx.fill()
      }
      
      // Draw center orb
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 30)
      gradient.addColorStop(0, colors[0])
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.globalAlpha = 0.5
      ctx.beginPath()
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2)
      ctx.fill()
      
      animationId = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => cancelAnimationFrame(animationId)
  }, [count, size, colors, orbitRadius, shapeSize, speed, shape])
  
  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={className}
      style={{
        display: 'block',
        ...style
      }}
    />
  )
}

export default OrbitingShapes
