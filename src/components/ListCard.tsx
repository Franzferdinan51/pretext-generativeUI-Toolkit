/**
 * ListCard - List rendering component
 */

import React, { useMemo } from 'react'

export interface ListItem {
  id?: string
  text: string
  checked?: boolean
  subtext?: string
  icon?: string
}

export interface ListCardProps {
  content?: string
  items?: ListItem[]
  style?: 'bullet' | 'numbered' | 'checkbox' | 'icon'
  columns?: number
  onItemClick?: (item: ListItem, index: number) => void
  councilor?: {
    name: string
    color: string
    avatar?: string
  }
  className?: string
  style?: React.CSSProperties
}

/**
 * Parse list items from content
 */
function parseListItems(content: string, style: string): ListItem[] {
  const items: ListItem[] = []
  const lines = content.split('\n')
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    
    // Checkbox
    const checkboxMatch = trimmed.match(/^\[([\s|x])\]\s*(.+)$/i)
    if (checkboxMatch) {
      items.push({
        text: checkboxMatch[2],
        checked: checkboxMatch[1].toLowerCase() === 'x'
      })
      continue
    }
    
    // Numbered
    const numberedMatch = trimmed.match(/^(\d+)\.\s*(.+)$/)
    if (numberedMatch) {
      items.push({
        id: numberedMatch[1],
        text: numberedMatch[2]
      })
      continue
    }
    
    // Bullet
    const bulletMatch = trimmed.match(/^[-*•]\s+(.+)$/)
    if (bulletMatch) {
      items.push({
        text: bulletMatch[1]
      })
      continue
    }
  }
  
  return items
}

/**
 * ListCard component
 */
export const ListCard: React.FC<ListCardProps> = ({
  content,
  items: initialItems,
  style: listStyle = 'bullet',
  columns = 1,
  onItemClick,
  councilor,
  className,
  style
}) => {
  const items = useMemo(
    () => initialItems || parseListItems(content || '', listStyle),
    [content, initialItems, listStyle]
  )
  
  const getBullet = (index: number) => {
    switch (listStyle) {
      case 'numbered':
        return `${index + 1}.`
      case 'checkbox':
        return null
      default:
        return '•'
    }
  }
  
  return (
    <div
      className={className}
      style={{
        padding: '16px',
        borderRadius: '12px',
        background: 'rgba(59, 130, 246, 0.05)',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        ...style
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px'
      }}>
        <span style={{ fontSize: '18px' }}>📋</span>
        <span style={{
          fontWeight: 600,
          color: '#3b82f6',
          fontSize: '14px'
        }}>
          {items.length} item{items.length !== 1 ? 's' : ''}
        </span>
        {councilor && (
          <span style={{
            color: '#6b7280',
            fontSize: '12px'
          }}>
            from {councilor.name}
          </span>
        )}
      </div>
      
      {/* List items */}
      <div style={{
        display: columns > 1 ? 'grid' : 'flex',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        flexDirection: 'column',
        gap: '8px'
      }}>
        {items.map((item, index) => (
          <div
            key={item.id || index}
            onClick={() => onItemClick?.(item, index)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '8px 12px',
              borderRadius: '8px',
              background: onItemClick ? 'rgba(255,255,255,0.03)' : 'transparent',
              cursor: onItemClick ? 'pointer' : 'default',
              transition: 'background 0.2s ease'
            }}
          >
            {/* Bullet/number/checkbox */}
            <div style={{
              flexShrink: 0,
              color: '#3b82f6',
              fontWeight: 600,
              minWidth: '24px'
            }}>
              {listStyle === 'checkbox' ? (
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '4px',
                  border: `2px solid ${item.checked ? '#10b981' : '#6b7280'}`,
                  background: item.checked ? '#10b981' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {item.checked && <span style={{ color: '#fff', fontSize: '10px' }}>✓</span>}
                </div>
              ) : (
                getBullet(index)
              )}
            </div>
            
            {/* Item content */}
            <div style={{ flex: 1 }}>
              <div style={{
                color: item.checked !== undefined && item.checked ? '#9ca3af' : '#e5e7eb',
                textDecoration: item.checked ? 'line-through' : 'none',
                fontSize: '14px',
                lineHeight: 1.4
              }}>
                {item.icon && <span style={{ marginRight: '6px' }}>{item.icon}</span>}
                {item.text}
              </div>
              {item.subtext && (
                <div style={{
                  color: '#6b7280',
                  fontSize: '12px',
                  marginTop: '2px'
                }}>
                  {item.subtext}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListCard
