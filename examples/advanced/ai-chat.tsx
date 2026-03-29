/**
 * Advanced Example: AI Chat Interface
 */

import React, { useState } from 'react'
import { SmartMessage } from '../src/components'
import { Button, Input } from '../src/shadcn'
import { StreamingCard } from '../src/components'

interface Message {
  id: string
  content: string
  councilor: { name: string; color: string; avatar?: string }
  isStreaming?: boolean
}

const councilors = [
  { name: 'Alice', color: '#8b5cf6', avatar: '👩‍💼' },
  { name: 'Bob', color: '#06b6d4', avatar: '👨‍💻' },
  { name: 'Charlie', color: '#10b981', avatar: '👨‍🔬' }
]

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  
  const handleSend = async () => {
    if (!input.trim() || isTyping) return
    
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      content: input,
      councilor: { name: 'You', color: '#3b82f6', avatar: '👤' }
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    
    // Simulate AI response
    setTimeout(() => {
      const councilor = councilors[Math.floor(Math.random() * councilors.length)]
      const responses = [
        "I think we should consider all the options carefully before making a decision.",
        "Let me provide some analysis based on the available data.",
        "Here's my perspective on this matter. The key factors are..."
      ]
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        councilor,
        isStreaming: true
      }
      
      setMessages(prev => [...prev, aiMsg])
      setIsTyping(false)
      
      // Simulate streaming completion
      setTimeout(() => {
        setMessages(prev => 
          prev.map(m => m.id === aiMsg.id ? { ...m, isStreaming: false } : m)
        )
      }, 2000)
    }, 500)
  }
  
  return (
    <div style={{ 
      maxWidth: '700px', 
      margin: '0 auto', 
      padding: '20px',
      background: 'rgba(15, 15, 25, 0.95)',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#fff', marginBottom: '20px' }}>AI Council Chat</h1>
      
      {/* Messages */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '12px',
        marginBottom: '20px',
        maxHeight: '60vh',
        overflow: 'auto'
      }}>
        {messages.length === 0 && (
          <div style={{ color: '#6b7280', textAlign: 'center', padding: '40px' }}>
            Start a conversation...
          </div>
        )}
        
        {messages.map(msg => (
          <SmartMessage 
            key={msg.id}
            content={msg.content}
            councilor={msg.councilor}
            streaming={msg.isStreaming}
          />
        ))}
      </div>
      
      {/* Input */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <Input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          style={{ flex: 1 }}
        />
        <Button onClick={handleSend} disabled={isTyping || !input.trim()}>
          Send
        </Button>
      </div>
    </div>
  )
}
