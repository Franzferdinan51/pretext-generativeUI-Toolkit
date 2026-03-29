/**
 * Card - Card component
 */

import React from 'react'

export interface CardProps {
  children?: React.ReactNode
  hover?: boolean
  glass?: boolean
  padding?: number | string
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  hover = false,
  glass = false,
  padding = 16,
  className,
  style,
  onClick
}) => {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        background: glass
          ? 'rgba(255, 255, 255, 0.05)'
          : 'rgba(20, 20, 30, 0.95)',
        backdropFilter: glass ? 'blur(20px)' : undefined,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: typeof padding === 'number' ? `${padding}px` : padding,
        transition: 'all 0.2s ease',
        cursor: onClick ? 'pointer' : 'default',
        ...(hover && {
          ':hover': {
            borderColor: 'rgba(139, 92, 246, 0.5)',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)'
          }
        }),
        ...style
      }}
    >
      {children}
    </div>
  )
}

export const CardHeader: React.FC<{ children?: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({
  children,
  className,
  style
}) => (
  <div
    className={className}
    style={{
      marginBottom: '12px',
      ...style
    }}
  >
    {children}
  </div>
)

export const CardTitle: React.FC<{ children?: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({
  children,
  className,
  style
}) => (
  <h3
    className={className}
    style={{
      fontSize: '18px',
      fontWeight: 600,
      color: '#fff',
      margin: 0,
      ...style
    }}
  >
    {children}
  </h3>
)

export const CardContent: React.FC<{ children?: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({
  children,
  className,
  style
}) => (
  <div
    className={className}
    style={{
      color: '#9ca3af',
      fontSize: '14px',
      lineHeight: 1.5,
      ...style
    }}
  >
    {children}
  </div>
)

export default Card
