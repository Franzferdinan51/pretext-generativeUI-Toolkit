/**
 * Badge - Badge component
 */

import React from 'react'

export interface BadgeProps {
  children?: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive'
  size?: 'sm' | 'md'
  className?: string
  style?: React.CSSProperties
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  style
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    borderRadius: '9999px',
    whiteSpace: 'nowrap'
  }
  
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '2px 8px', fontSize: '10px' },
    md: { padding: '4px 12px', fontSize: '12px' }
  }
  
  const variantStyles: Record<string, React.CSSProperties> = {
    default: { background: 'rgba(255, 255, 255, 0.1)', color: '#e5e7eb' },
    primary: { background: 'rgba(139, 92, 246, 0.2)', color: '#a78bfa' },
    secondary: { background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' },
    success: { background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' },
    warning: { background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24' },
    destructive: { background: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }
  }
  
  return (
    <span
      className={className}
      style={{
        ...baseStyle,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style
      }}
    >
      {children}
    </span>
  )
}

export default Badge
