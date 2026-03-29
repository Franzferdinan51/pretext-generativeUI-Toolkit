/**
 * AnimatedGrid - Animated grid pattern
 */

import React from 'react'

export interface AnimatedGridProps {
  rows?: number
  cols?: number
  gap?: number
  color?: string
  animate?: boolean
  className?: string
  style?: React.CSSProperties
}

export const AnimatedGrid: React.FC<AnimatedGridProps> = ({
  rows = 5,
  cols = 5,
  gap = 20,
  color = '#8b5cf6',
  animate = true,
  className,
  style
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: `${gap}px`,
        ...style
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <div
          key={i}
          className={animate ? `grid-item-${i % 4}` : ''}
          style={{
            aspectRatio: '1',
            borderRadius: '8px',
            background: color,
            opacity: 0.1 + (i % 5) * 0.15,
            animation: animate ? `gridFade 2s ease-in-out infinite` : 'none',
            animationDelay: `${(i % 4) * 0.5}s`
          }}
        />
      ))}
      
      <style>{`
        @keyframes gridFade {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}

export default AnimatedGrid
