/**
 * DataChart - Chart visualization component
 */

import React, { useMemo, useRef, useEffect, useState } from 'react'

export interface ChartDataPoint {
  label: string
  value: number
  color?: string
}

export interface DataChartProps {
  content?: string
  data?: ChartDataPoint[]
  chartType?: 'bar' | 'line' | 'pie' | 'scatter'
  title?: string
  showLegend?: boolean
  showValues?: boolean
  height?: number
  councilor?: {
    name: string
    color: string
    avatar?: string
  }
  className?: string
  style?: React.CSSProperties
}

const DEFAULT_COLORS = [
  '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899',
  '#3b82f6', '#ef4444', '#6366f1', '#14b8a6', '#f97316'
]

/**
 * Parse chart data from content
 */
function parseChartData(content: string): ChartDataPoint[] {
  const data: ChartDataPoint[] = []
  const numberRegex = /(\w+):\s*(\d+\.?\d*)/g
  let match
  
  while ((match = numberRegex.exec(content)) !== null) {
    data.push({
      label: match[1],
      value: parseFloat(match[2])
    })
  }
  
  return data
}

/**
 * Simple Bar Chart
 */
function BarChart({ data, showValues, height }: {
  data: ChartDataPoint[]
  showValues: boolean
  height: number
}) {
  const maxValue = Math.max(...data.map(d => d.value))
  const barWidth = 100 / data.length
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      height: height,
      padding: '20px 10px 40px'
    }}>
      {data.map((point, i) => {
        const barHeight = (point.value / maxValue) * (height - 60)
        
        return (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: `${barWidth}%`
            }}
          >
            {showValues && (
              <div style={{
                color: '#9ca3af',
                fontSize: '11px',
                marginBottom: '4px'
              }}>
                {point.value}
              </div>
            )}
            <div style={{
              width: '70%',
              maxWidth: '60px',
              height: `${barHeight}px`,
              background: `linear-gradient(to top, ${point.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]}, ${point.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]}aa)`,
              borderRadius: '4px 4px 0 0',
              transition: 'height 0.5s ease'
            }} />
            <div style={{
              color: '#9ca3af',
              fontSize: '11px',
              marginTop: '8px',
              textAlign: 'center',
              maxWidth: '80px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {point.label}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/**
 * Simple Pie Chart
 */
function PieChart({ data, showValues, height }: {
  data: ChartDataPoint[]
  showValues: boolean
  height: number
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  const size = Math.min(height - 40, 200)
  const center = size / 2
  const radius = center - 10
  
  let currentAngle = -90
  
  const slices = data.map((point, i) => {
    const angle = (point.value / total) * 360
    const startAngle = currentAngle
    currentAngle += angle
    
    const startRad = (startAngle * Math.PI) / 180
    const endRad = (currentAngle * Math.PI) / 180
    
    const x1 = center + radius * Math.cos(startRad)
    const y1 = center + radius * Math.sin(startRad)
    const x2 = center + radius * Math.cos(endRad)
    const y2 = center + radius * Math.sin(endRad)
    
    const largeArc = angle > 180 ? 1 : 0
    
    const path = `
      M ${center} ${center}
      L ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
      Z
    `
    
    return {
      path,
      color: point.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length],
      point,
      percentage: Math.round((point.value / total) * 100)
    }
  })
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      padding: '20px'
    }}>
      <svg width={size} height={size}>
        {slices.map((slice, i) => (
          <path
            key={i}
            d={slice.path}
            fill={slice.color}
            style={{ transition: 'opacity 0.2s ease' }}
          />
        ))}
      </svg>
      
      {showValues && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          {data.map((point, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px'
              }}
            >
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '2px',
                background: point.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]
              }} />
              <span style={{ color: '#e5e7eb' }}>{point.label}</span>
              <span style={{ color: '#6b7280' }}>
                {Math.round((point.value / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Line Chart
 */
function LineChart({ data, showValues, height }: {
  data: ChartDataPoint[]
  showValues: boolean
  height: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  const range = maxValue - minValue || 1
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const width = canvas.width
    const chartHeight = height - 40
    const padding = 30
    
    ctx.clearRect(0, 0, width, height)
    
    // Draw line
    ctx.beginPath()
    ctx.strokeStyle = '#8b5cf6'
    ctx.lineWidth = 2
    
    data.forEach((point, i) => {
      const x = padding + (i / (data.length - 1)) * (width - padding * 2)
      const y = padding + (1 - (point.value - minValue) / range) * (chartHeight - padding)
      
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    
    ctx.stroke()
    
    // Draw points
    data.forEach((point, i) => {
      const x = padding + (i / (data.length - 1)) * (width - padding * 2)
      const y = padding + (1 - (point.value - minValue) / range) * (chartHeight - padding)
      
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#8b5cf6'
      ctx.fill()
    })
  }, [data, height, maxValue, minValue, range])
  
  return (
    <div>
      <canvas
        ref={canvasRef}
        width={300}
        height={height - 40}
        style={{ width: '100%', height: `${height - 40}px` }}
      />
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        paddingTop: '10px'
      }}>
        {data.map((point, i) => (
          <div
            key={i}
            style={{
              fontSize: '10px',
              color: '#6b7280',
              textAlign: 'center'
            }}
          >
            {showValues && <div style={{ color: '#9ca3af' }}>{point.value}</div>}
            {point.label}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * DataChart component
 */
export const DataChart: React.FC<DataChartProps> = ({
  content,
  data: initialData,
  chartType = 'bar',
  title,
  showLegend = true,
  showValues = true,
  height = 250,
  councilor,
  className,
  style
}) => {
  const data = useMemo(
    () => initialData || parseChartData(content || ''),
    [content, initialData]
  )
  
  return (
    <div
      className={className}
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(236, 72, 153, 0.2)',
        background: 'rgba(236, 72, 153, 0.03)',
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
        <span style={{ fontSize: '18px' }}>📈</span>
        <span style={{
          fontWeight: 600,
          color: '#ec4899',
          fontSize: '14px'
        }}>
          {title || 'Chart'}
        </span>
        {councilor && (
          <span style={{
            color: '#6b7280',
            fontSize: '12px',
            marginLeft: 'auto'
          }}>
            from {councilor.name}
          </span>
        )}
      </div>
      
      {/* Chart */}
      {data.length > 0 ? (
        <>
          {chartType === 'bar' && (
            <BarChart data={data} showValues={showValues} height={height} />
          )}
          {chartType === 'pie' && (
            <PieChart data={data} showValues={showValues} height={height} />
          )}
          {chartType === 'line' && (
            <LineChart data={data} showValues={showValues} height={height} />
          )}
        </>
      ) : (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          color: '#6b7280'
        }}>
          No data available
        </div>
      )}
    </div>
  )
}

export default DataChart
