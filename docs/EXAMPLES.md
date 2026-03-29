# Examples

## Basic Examples

### Simple Pretext Canvas

```tsx
import { PretextCanvas } from 'pretext-generative-ui-toolkit'

export default function SimpleCanvas() {
  return (
    <PretextCanvas 
      text="Hello, Pretext!"
      font="24px Inter"
      maxWidth={400}
    />
  )
}
```

### Streaming Message

```tsx
import { StreamableText } from 'pretext-generative-ui-toolkit'

export default function StreamingMessage() {
  return (
    <StreamableText 
      content="This text streams in character by character..."
      speed={30}
      showCursor={true}
    />
  )
}
```

### AI Chat Bubble

```tsx
import { SmartMessage } from 'pretext-generative-ui-toolkit'

export default function ChatBubble({ message }) {
  return (
    <SmartMessage 
      content={message.content}
      councilor={message.councilor}
    />
  )
}
```

## Advanced Examples

### AI Chat Interface

```tsx
import { SmartMessage, StreamableText, Button } from 'pretext-generative-ui-toolkit'
import { useState } from 'react'

export default function AIChat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  
  const handleSend = async () => {
    const userMsg = { content: input, councilor: { name: 'User', color: '#3b82f6' } }
    setMessages([...messages, userMsg])
    setInput('')
    
    // Simulate AI response
    const aiResponse = await fetchAIResponse(input)
    setMessages(prev => [...prev, { content: aiResponse, councilor: { name: 'AI', color: '#8b5cf6' } }])
  }
  
  return (
    <div>
      <div style={{ maxHeight: '400px', overflow: 'auto' }}>
        {messages.map((msg, i) => (
          <SmartMessage key={i} {...msg} />
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <Button onClick={handleSend}>Send</Button>
    </div>
  )
}
```

### Voting Interface

```tsx
import { VoteCard } from 'pretext-generative-ui-toolkit'

export default function VotingInterface() {
  const [votes, setVotes] = useState({})
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h2>Council Vote</h2>
      
      <VoteCard 
        content="1. Approve proposal\n2. Reject proposal\n3. Abstain"
        onVote={(selected) => setVotes(v => ({ ...v, vote: selected }))}
      />
    </div>
  )
}
```

### Generative UI Dashboard

```tsx
import { BentoGrid, BentoItem, AnimatedGrid, TextGradient } from 'pretext-generative-ui-toolkit'

export default function Dashboard() {
  return (
    <BentoGrid cols={3} gap={20}>
      <BentoItem title="Overview" colSpan={2}>
        <TextGradient from="#8b5cf6" to="#06b6d4">
          Dashboard Title
        </TextGradient>
      </BentoItem>
      
      <BentoItem title="Activity">
        <AnimatedGrid rows={3} cols={3} />
      </BentoItem>
      
      <BentoItem title="Recent">
        List of items...
      </BentoItem>
    </BentoGrid>
  )
}
```

## Running Examples

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```
