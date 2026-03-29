/**
 * TextGradient - Gradient text effect
 */

import React from 'react'

export interface TextGradientProps {
  children?: React.ReactNode
  from?: string
  to?: string
  direction?: string
  animate?: boolean
  className?: string
  style?: React.CSSProperties
}

export const TextGradient: React.FC<TextGradientProps> = ({
  children,
  from = '#8b5cf6',
  to = '#06b6d4',
  direction = '135deg',
  animate = false,
  className,
  style
}) => {
  return (
    <span
      className={className}
      style={{
        background: animate
          ? `linear-gradient(${direction}, ${from}, ${to}, ${from})`
          : `linear-gradient(${direction}, ${from}, ${to})`,
        backgroundSize: animate ? '200% 200%' : undefined,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: animate ? 'gradientShift 3s ease infinite' : undefined,
        ...style
      }}
    >
      {children}
      
      {animate && (
        <style>{`
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}</style>
      )}
    </span>
  )
}

export default TextGradient
