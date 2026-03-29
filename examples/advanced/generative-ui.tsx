/**
 * Advanced Example: Generative UI Dashboard
 */

import React from 'react'
import { BentoGrid, BentoItem } from '../src/magicui'
import { AnimatedGrid, OrbitingShapes } from '../src/magicui'
import { GlowBorder } from '../src/effects'
import { TextGradient, WordRotate } from '../src/magicui'
import { ParticleEmitter } from '../src/effects'
import { DataChart, DataTable } from '../src/components'
import { Badge } from '../src/shadcn'

export default function GenerativeUI() {
  const chartData = [
    { label: 'Jan', value: 400 },
    { label: 'Feb', value: 300 },
    { label: 'Mar', value: 600 },
    { label: 'Apr', value: 450 },
    { label: 'May', value: 800 }
  ]
  
  const tableData = {
    headers: ['Councilor', 'Votes', 'Stance'],
    rows: [
      ['Alice', '12', 'Support'],
      ['Bob', '8', 'Neutral'],
      ['Charlie', '15', 'Support']
    ]
  }
  
  return (
    <div style={{ 
      padding: '40px',
      background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '12px' }}>
          <TextGradient from="#8b5cf6" to="#06b6d4" animate>
            AI Council Dashboard
          </TextGradient>
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '18px' }}>
          Powered by{' '}
          <WordRotate words={['Pretext', 'Generative UI', 'AI Components']} />
        </p>
      </div>
      
      {/* Bento Grid */}
      <BentoGrid cols={3} gap={24}>
        {/* Overview */}
        <BentoItem title="Overview" colSpan={2}>
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ flex: 1 }}>
              <AnimatedGrid rows={3} cols={3} color="#8b5cf6" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#9ca3af', lineHeight: 1.6 }}>
                This dashboard showcases the Pretext Generative UI Toolkit.
                Each component is designed for AI-powered interfaces with
                smooth animations and smart content detection.
              </p>
            </div>
          </div>
        </BentoItem>
        
        {/* Orbiting Shapes */}
        <BentoItem title="Activity">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <OrbitingShapes count={5} size={150} />
          </div>
        </BentoItem>
        
        {/* Chart */}
        <BentoItem title="Voting Trends">
          <DataChart 
            data={chartData}
            chartType="bar"
            showValues={true}
            height={180}
          />
        </BentoItem>
        
        {/* Particles */}
        <BentoItem title="Live Activity">
          <ParticleEmitter 
            count={30}
            colors={['#8b5cf6', '#06b6d4', '#ec4899']}
            width={200}
            height={120}
            speed={0.8}
          />
        </BentoItem>
        
        {/* Glow Card */}
        <BentoItem title="Featured" colSpan={2}>
          <GlowBorder color="#8b5cf6" intensity={0.6}>
            <div style={{ padding: '24px' }}>
              <Badge variant="primary" style={{ marginBottom: '12px' }}>Featured</Badge>
              <h3 style={{ color: '#fff', marginBottom: '8px' }}>Smart Content Detection</h3>
              <p style={{ color: '#9ca3af', margin: 0 }}>
                Automatically render the right component based on AI content type.
              </p>
            </div>
          </GlowBorder>
        </BentoItem>
        
        {/* Table */}
        <BentoItem title="Councilor Stats">
          <DataTable 
            headers={tableData.headers}
            rows={tableData.rows}
            maxHeight={200}
          />
        </BentoItem>
      </BentoGrid>
    </div>
  )
}
