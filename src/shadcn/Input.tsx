/**
 * Input - Input component
 */

import React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  leftIcon,
  rightIcon,
  className,
  style,
  ...props
}, ref) => {
  const [focused, setFocused] = React.useState(false)
  
  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: 500,
          color: '#e5e7eb',
          marginBottom: '6px'
        }}>
          {label}
        </label>
      )}
      
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }}>
        {leftIcon && (
          <div style={{
            position: 'absolute',
            left: '12px',
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center'
          }}>
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          className={className}
          onFocus={(e) => {
            setFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            props.onBlur?.(e)
          }}
          style={{
            width: '100%',
            padding: leftIcon ? '10px 12px 10px 40px' : '10px 12px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: `2px solid ${error ? '#ef4444' : focused ? '#8b5cf6' : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: '8px',
            color: '#fff',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.2s ease',
            ...style
          }}
          {...props}
        />
        
        {rightIcon && (
          <div style={{
            position: 'absolute',
            right: '12px',
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center'
          }}>
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p style={{
          marginTop: '4px',
          fontSize: '12px',
          color: '#ef4444'
        }}>
          {error}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
