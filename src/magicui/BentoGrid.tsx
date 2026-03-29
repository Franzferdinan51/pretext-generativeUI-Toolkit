/**
 * BentoGrid - Bento grid layout
 */

import React from 'react'

export interface BentoItem {
  title?: string
  children?: React.ReactNode
  colSpan?: number
  rowSpan?: number
  className?: string
  style?: React.CSSProperties
}

export interface BentoGridProps {
  children?: React.ReactNode
  cols?: number
  gap?: number
  className?: string
  style?: React.CSSProperties
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  children,
  cols = 4,
  gap = 16,
  className,
  style
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: `${gap}px`,
        ...style
      }}
    >
      {React.Children.map(children, (child, i) => {
        if (!React.isValidElement(child)) return child
        
        const { colSpan = 1, rowSpan = 1, ...props } = child.props as BentoItem
        
        return (
          <div
            {...props}
            style={{
              gridColumn: `span ${colSpan}`,
              gridRow: `span ${rowSpan}`,
              ...props.style
            }}
          />
        )
      })}
    </div>
  )
}

export const BentoItem: React.FC<BentoItem> = ({
  title,
  children,
  className,
  style
}) => {
  return (
    <div
      className={className}
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        ...style
      }}
    >
      {title && (
        <h3 style={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#fff',
          margin: 0
        }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}

export default BentoGrid
