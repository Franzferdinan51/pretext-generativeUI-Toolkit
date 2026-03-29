/**
 * DataTable - Table rendering component
 */

import React, { useMemo, useState } from 'react'

export interface TableColumn {
  key: string
  header: string
  width?: number | string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
}

export interface DataTableProps {
  content?: string
  headers?: string[]
  rows?: string[][]
  columns?: TableColumn[]
  data?: Record<string, any>[]
  sortable?: boolean
  striped?: boolean
  hoverable?: boolean
  maxHeight?: number
  councilor?: {
    name: string
    color: string
    avatar?: string
  }
  className?: string
  style?: React.CSSProperties
}

/**
 * Parse table from markdown content
 */
function parseTable(content: string): { headers: string[]; rows: string[][] } {
  const lines = content.split('\n').filter(l => l.trim() && /^\|/.test(l))
  
  if (lines.length < 2) {
    return { headers: [], rows: [] }
  }
  
  const headers = lines[0]
    .split('|')
    .filter(h => h.trim() && !/^-+$/.test(h.trim()))
    .map(h => h.trim())
  
  const rows: string[][] = []
  for (let i = 1; i < lines.length; i++) {
    // Skip separator line
    if (/^\|[-:\s]+\|$/.test(lines[i])) continue
    
    const row = lines[i]
      .split('|')
      .filter(c => c.trim())
      .map(c => c.trim())
    
    if (row.length > 0) {
      rows.push(row)
    }
  }
  
  return { headers, rows }
}

/**
 * DataTable component
 */
export const DataTable: React.FC<DataTableProps> = ({
  content,
  headers: initialHeaders,
  rows: initialRows,
  columns: initialColumns,
  data,
  sortable = true,
  striped = true,
  hoverable = true,
  maxHeight,
  councilor,
  className,
  style
}) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  
  // Parse table from content if data not provided
  const { headers, rows } = useMemo(() => {
    if (initialRows && initialHeaders) {
      return { headers: initialHeaders, rows: initialRows }
    }
    if (content) {
      return parseTable(content)
    }
    return { headers: [], rows: [] }
  }, [content, initialHeaders, initialRows])
  
  // Use provided columns or generate from headers
  const columns = useMemo(() => {
    if (initialColumns) return initialColumns
    return headers.map((header, i) => ({
      key: `col-${i}`,
      header,
      sortable
    }))
  }, [headers, initialColumns, sortable])
  
  // Sort rows if needed
  const sortedRows = useMemo(() => {
    if (!sortColumn) return rows
    
    const colIndex = columns.findIndex(c => c.key === sortColumn)
    if (colIndex === -1) return rows
    
    return [...rows].sort((a, b) => {
      const aVal = a[colIndex] || ''
      const bVal = b[colIndex] || ''
      
      // Try numeric comparison
      const aNum = parseFloat(aVal)
      const bNum = parseFloat(bVal)
      
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return sortDirection === 'asc' ? aNum - bNum : bNum - aNum
      }
      
      // String comparison
      const comparison = aVal.localeCompare(bVal)
      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [rows, sortColumn, sortDirection, columns])
  
  const handleSort = (columnKey: string) => {
    if (!sortable) return
    
    if (sortColumn === columnKey) {
      setSortDirection(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }
  
  return (
    <div
      className={className}
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        background: 'rgba(16, 185, 129, 0.03)',
        ...style
      }}
    >
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span style={{ fontSize: '18px' }}>📊</span>
        <span style={{
          fontWeight: 600,
          color: '#10b981',
          fontSize: '14px'
        }}>
          Table
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
      
      {/* Table */}
      <div style={{
        maxHeight: maxHeight,
        overflow: 'auto'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px'
        }}>
          <thead>
            <tr style={{
              background: 'rgba(255,255,255,0.05)',
              position: 'sticky',
              top: 0
            }}>
              {columns.map((col, i) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{
                    padding: '10px 12px',
                    textAlign: col.align || 'left',
                    fontWeight: 600,
                    color: sortColumn === col.key ? '#10b981' : '#9ca3af',
                    cursor: sortable ? 'pointer' : 'default',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  {col.header}
                  {sortable && (
                    <span style={{ marginLeft: '4px', opacity: sortColumn === col.key ? 1 : 0.3 }}>
                      {sortColumn === col.key ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={{
                  background: striped && rowIndex % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent',
                  transition: 'background 0.15s ease'
                }}
                onMouseEnter={(e) => hoverable && (e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)')}
                onMouseLeave={(e) => hoverable && (e.currentTarget.style.background = striped && rowIndex % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent')}
              >
                {row.map((cell, cellIndex) => {
                  const col = columns[cellIndex]
                  return (
                    <td
                      key={cellIndex}
                      style={{
                        padding: '10px 12px',
                        textAlign: col.align || 'left',
                        color: '#e5e7eb',
                        borderBottom: '1px solid rgba(255,255,255,0.05)'
                      }}
                    >
                      {cell}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        
        {sortedRows.length === 0 && (
          <div style={{
            padding: '24px',
            textAlign: 'center',
            color: '#6b7280'
          }}>
            No data available
          </div>
        )}
      </div>
    </div>
  )
}

export default DataTable
