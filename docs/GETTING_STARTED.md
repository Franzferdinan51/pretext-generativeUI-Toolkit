# Getting Started with Pretext Generative UI Toolkit

## Installation

```bash
npm install pretext-generative-ui-toolkit
```

## Basic Setup

```tsx
import React from 'react'
import { 
  PretextCanvas, 
  SmartMessage 
} from 'pretext-generative-ui-toolkit'

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif' }}>
      <h1>My AI Chat</h1>
      
      {/* Pretext Canvas */}
      <PretextCanvas 
        text="Hello from Pretext!"
        font="18px Inter"
        maxWidth={400}
        lineHeight={24}
        color="#fff"
      />
      
      {/* Smart Message */}
      <SmartMessage 
        content="This is an AI-generated response."
        councilor={{ name: 'AI', color: '#8b5cf6' }}
      />
    </div>
  )
}
```

## Streaming Text

```tsx
import { StreamableText } from 'pretext-generative-ui-toolkit'

function StreamingExample() {
  return (
    <StreamableText 
      content="This text will appear character by character..."
      speed={20}
      showCursor={true}
      onComplete={() => console.log('Done!')}
    />
  )
}
```

## UI Components

```tsx
import { Button, Card, Badge, Input } from 'pretext-generative-ui-toolkit'

function FormExample() {
  return (
    <Card hover padding={24}>
      <Badge variant="primary">New</Badge>
      
      <Input 
        label="Name"
        placeholder="Enter your name"
      />
      
      <Button variant="primary" size="lg">
        Submit
      </Button>
    </Card>
  )
}
```

## Visual Effects

```tsx
import { ParticleEmitter, GlowBorder, Shimmer } from 'pretext-generative-ui-toolkit'

function EffectsExample() {
  return (
    <div>
      {/* Particle system */}
      <ParticleEmitter 
        count={50}
        colors={['#8b5cf6', '#06b6d4', '#ec4899']}
        width={300}
        height={200}
      />
      
      {/* Glow border */}
      <GlowBorder color="#8b5cf6">
        <div style={{ padding: 20 }}>Content</div>
      </GlowBorder>
      
      {/* Loading shimmer */}
      <Shimmer width={200} height={20} />
    </div>
  )
}
```

## Next Steps

- Read [PRETEXT_GUIDE.md](./PRETEXT_GUIDE.md) for detailed pretext usage
- See [COMPONENTS.md](./COMPONENTS.md) for all available components
- Check [AI_INTEGRATION.md](./AI_INTEGRATION.md) for AI integration
- Explore [EXAMPLES.md](./EXAMPLES.md) for complete examples
