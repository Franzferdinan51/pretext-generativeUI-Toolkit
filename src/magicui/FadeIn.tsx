/**
 * FadeIn - Fade in animation
 */

import React, { useEffect, useState } from 'react'

export interface FadeInProps {
  children?: React.ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  className?: string
  style?: React.CSSProperties
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  distance = 20,
  className,
  style
}) => {
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay * 1000)
    return () => clearTimeout(timeout)
  }, [delay])
  
  const transforms: Record<string, string> = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    none: 'none'
  }
  
  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : transforms[direction],
        transition: `opacity ${duration}s ease, transform ${duration}s ease`,
        ...style
      }}
    >
      {children}
    </div>
  )
}

export default FadeIn
