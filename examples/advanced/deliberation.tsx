/**
 * Advanced Example: Deliberation System
 */

import React, { useState } from 'react'
import { VoteCard, SmartMessage, SummaryCard } from '../src/components'
import { ModeSelector } from '../src/ai'
import { Button, Badge } from '../src/shadcn'

export default function Deliberation() {
  const [mode, setMode] = useState('legislative')
  const [phase, setPhase] = useState<'debate' | 'vote' | 'summary'>('debate')
  const [proposal] = useState({
    title: 'AI Safety Standards Act',
    description: 'Establish comprehensive safety standards for AI systems...'
  })
  
  const messages = [
    { content: "I support this proposal as it addresses key safety concerns.", councilor: { name: 'Alice', color: '#8b5cf6' } },
    { content: "We need more details on implementation timeline.", councilor: { name: 'Bob', color: '#06b6d4' } },
    { content: "The cost-benefit analysis looks favorable.", councilor: { name: 'Charlie', color: '#10b981' } }
  ]
  
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      background: '#0f0f1a',
      minHeight: '100vh'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ color: '#fff', margin: 0 }}>Deliberation Chamber</h1>
        <Badge variant="primary">{mode.toUpperCase()}</Badge>
      </div>
      
      {/* Mode selector */}
      <ModeSelector 
        selectedMode={mode as any}
        onModeChange={(m) => setMode(m)}
        style={{ marginBottom: '24px' }}
      />
      
      {/* Proposal */}
      <div style={{
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        marginBottom: '24px'
      }}>
        <h2 style={{ color: '#fff', marginBottom: '12px' }}>{proposal.title}</h2>
        <p style={{ color: '#9ca3af', margin: 0 }}>{proposal.description}</p>
      </div>
      
      {/* Phase indicator */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {(['debate', 'vote', 'summary'] as const).map(p => (
          <Button 
            key={p}
            variant={phase === p ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setPhase(p)}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </Button>
        ))}
      </div>
      
      {/* Phase content */}
      {phase === 'debate' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((msg, i) => (
            <SmartMessage key={i} {...msg} />
          ))}
        </div>
      )}
      
      {phase === 'vote' && (
        <VoteCard 
          content="1. Approve\n2. Reject\n3. Abstain"
          onVote={(selected) => console.log('Voted:', selected)}
        />
      )}
      
      {phase === 'summary' && (
        <SummaryCard 
          content="In summary:\n- Strong support from technical councilors\n- Concerns about implementation timeline\n- Cost-benefit analysis is favorable"
          title="Deliberation Summary"
        />
      )}
    </div>
  )
}
