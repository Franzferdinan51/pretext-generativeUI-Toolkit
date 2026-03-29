/**
 * Button - Beautiful button component
 */

import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  style,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: 600,
    borderRadius: '8px',
    border: 'none',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    opacity: disabled || isLoading ? 0.6 : 1
  }
  
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '6px 12px', fontSize: '13px' },
    md: { padding: '10px 16px', fontSize: '14px' },
    lg: { padding: '14px 24px', fontSize: '16px' }
  }
  
  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      color: '#fff',
      boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
    },
    secondary: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#e5e7eb',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    outline: {
      background: 'transparent',
      color: '#8b5cf6',
      border: '2px solid #8b5cf6'
    },
    ghost: {
      background: 'transparent',
      color: '#e5e7eb'
    },
    destructive: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      color: '#fff',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
    }
  }
  
  return (
    <button
      className={className}
      disabled={disabled || isLoading}
      style={{
        ...baseStyle,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style
      }}
      {...props}
    >
      {isLoading ? (
        <LoadingSpinner size={16} />
      ) : leftIcon ? (
        leftIcon
      ) : null}
      {children}
      {!isLoading && rightIcon}
    </button>
  )
}

const LoadingSpinner: React.FC<{ size: number }> = ({ size }) => (
  <div style={{
    width: `${size}px`,
    height: `${size}px`,
    border: '2px solid currentColor',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  }}>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
    `}</style>
  </div>
)

export default Button
