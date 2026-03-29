/**
 * useCanvas - Hook for canvas rendering
 */

import { useRef, useEffect, useCallback, useState } from 'react'

export interface CanvasState {
  width: number
  height: number
  context: CanvasRenderingContext2D | null
}

export interface UseCanvasOptions {
  width?: number
  height?: number
  devicePixelRatio?: number
  willReadFrequently?: boolean
}

/**
 * Hook for canvas 2D context management
 */
export function useCanvas(options: UseCanvasOptions = {}) {
  const { width = 300, height = 150, devicePixelRatio = window.devicePixelRatio || 1, willReadFrequently = false } = options
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [state, setState] = useState<CanvasState>({
    width,
    height,
    context: null
  })
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d', { willReadFrequently })
    if (!ctx) return
    
    // Set canvas size accounting for device pixel ratio
    canvas.width = width * devicePixelRatio
    canvas.height = height * devicePixelRatio
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    
    // Scale context for retina displays
    ctx.scale(devicePixelRatio, devicePixelRatio)
    
    setState({ width, height, context: ctx })
  }, [width, height, devicePixelRatio, willReadFrequently])
  
  return { canvasRef, ...state }
}

/**
 * Hook for particle animation on canvas
 */
export interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
  decay?: number
  gravity?: number
  friction?: number
}

export interface UseParticleOptions {
  count?: number
  colors?: string[]
  minSize?: number
  maxSize?: number
  minLife?: number
  maxLife?: number
  minSpeed?: number
  maxSpeed?: number
  gravity?: number
  friction?: number
  decay?: number
}

function createParticle(options: UseParticleOptions, width: number, height: number): Particle {
  const {
    colors = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'],
    minSize = 2,
    maxSize = 6,
    minLife = 50,
    maxLife = 150,
    minSpeed = 0.5,
    maxSpeed = 3,
    gravity = 0.1,
    friction = 0.99,
    decay = 0.98
  } = options
  
  const angle = Math.random() * Math.PI * 2
  const speed = minSpeed + Math.random() * (maxSpeed - minSpeed)
  
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: minLife + Math.random() * (maxLife - minLife),
    maxLife: minLife + Math.random() * (maxLife - minLife),
    size: minSize + Math.random() * (maxSize - minSize),
    color: colors[Math.floor(Math.random() * colors.length)],
    gravity,
    friction,
    decay
  }
}

export function useParticleEmitter(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  options: UseParticleOptions = {}
) {
  const { count = 50 } = options
  
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number | null>(null)
  
  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const width = canvas.width
    const height = canvas.height
    
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(options, width, height)
    )
  }, [count, options, canvasRef])
  
  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const width = canvas.width
    const height = canvas.height
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      
      particlesRef.current.forEach((particle, index) => {
        // Update physics
        particle.vy += particle.gravity || 0.1
        particle.vx *= particle.friction || 0.99
        particle.vy *= particle.friction || 0.99
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life--
        
        // Check if particle is dead
        if (particle.life <= 0) {
          particlesRef.current[index] = createParticle(options, width, height)
          return
        }
        
        // Draw particle
        const alpha = particle.life / particle.maxLife
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = alpha * (particle.decay || 0.98)
        ctx.fill()
        ctx.globalAlpha = 1
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [canvasRef, options])
  
  return particlesRef
}

/**
 * Hook for canvas text rendering
 */
export function useCanvasText() {
  const drawText = useCallback((
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    options: {
      font?: string
      color?: string
      align?: CanvasTextAlign
      baseline?: CanvasTextBaseline
      maxWidth?: number
    } = {}
  ) => {
    const {
      font = '16px Inter, sans-serif',
      color = '#ffffff',
      align = 'left',
      baseline = 'top',
      maxWidth
    } = options
    
    ctx.font = font
    ctx.fillStyle = color
    ctx.textAlign = align
    ctx.textBaseline = baseline
    
    if (maxWidth !== undefined) {
      ctx.fillText(text, x, y, maxWidth)
    } else {
      ctx.fillText(text, x, y)
    }
  }, [])
  
  const measureText = useCallback((
    ctx: CanvasRenderingContext2D,
    text: string,
    font?: string
  ) => {
    if (font) ctx.font = font
    return ctx.measureText(text)
  }, [])
  
  const drawWrappedText = useCallback((
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    options: {
      font?: string
      color?: string
      align?: CanvasTextAlign
    } = {}
  ) => {
    const { font = '16px Inter', color = '#ffffff', align = 'left' } = options
    
    ctx.font = font
    ctx.fillStyle = color
    ctx.textAlign = align
    ctx.textBaseline = 'top'
    
    const paragraphs = text.split('\n')
    let currentY = y
    
    for (const paragraph of paragraphs) {
      if (paragraph.trim() === '') {
        currentY += lineHeight * 0.5
        continue
      }
      
      const words = paragraph.split(' ')
      let currentLine = ''
      
      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word
        const metrics = ctx.measureText(testLine)
        
        if (metrics.width > maxWidth && currentLine) {
          ctx.fillText(currentLine, x, currentY)
          currentLine = word
          currentY += lineHeight
        } else {
          currentLine = testLine
        }
      }
      
      if (currentLine) {
        ctx.fillText(currentLine, x, currentY)
        currentY += lineHeight
      }
    }
  }, [])
  
  return { drawText, measureText, drawWrappedText }
}

export default useCanvas
