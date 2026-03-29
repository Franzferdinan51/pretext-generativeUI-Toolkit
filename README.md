# Pretext Generative UI Toolkit

A comprehensive AI-powered generative UI toolkit combining the best ideas from Pretext, Morphic, CopilotKit, Vercel AI SDK, shadcn/ui, and MagicUI.

## Features

### 🎯 Core Pretext Engine
- Character-level text measurement without DOM reflow
- Canvas-based text rendering for precise positioning
- Pre-measured streaming to prevent content jumping

### 🤖 AI-Powered Components
- **SmartMessage**: Automatically detects content type (vote, code, list, table, chart, question, summary)
- **ContentDetector**: AI-powered content type detection
- **AIGenerator**: Generate components from AI output
- **LayoutOptimizer**: AI-driven layout suggestions

### ⚡ Streaming Components
- **StreamableText**: Character-by-character streaming with pre-measurement
- **StreamingCard**: Full-featured streaming message cards
- **LoadingStates**: Beautiful loading indicators

### ✨ Visual Effects
- **ParticleEmitter**: Canvas-based particle systems
- **GradientMesh**: Animated gradient backgrounds
- **GlowBorder**: Animated glowing borders
- **Shimmer**: Loading shimmer effects

### 🎨 UI Primitives (shadcn-inspired)
- **Button**: Beautiful buttons with variants
- **Card**: Glass/blur cards with hover effects
- **Badge**: Status badges
- **Input**: Styled inputs with icons

### 🔮 MagicUI Effects
- **AnimatedGrid**: Pulsing grid patterns
- **FadeIn**: Smooth entrance animations
- **BentoGrid**: Modern grid layouts
- **WordRotate**: Rotating word animations
- **TextGradient**: Gradient text effects
- **OrbitingShapes**: Orbiting particles

## Installation

```bash
npm install pretext-generative-ui-toolkit
# or
yarn add pretext-generative-ui-toolkit
# or
pnpm add pretext-generative-ui-toolkit
```

## Quick Start

```tsx
import { 
  PretextCanvas, 
  SmartMessage, 
  StreamableText,
  Button,
  Card 
} from 'pretext-generative-ui-toolkit'

function App() {
  return (
    <div style={{ padding: '20px' }}>
      {/* AI-powered message rendering */}
      <SmartMessage 
        content="Here are the key points:\n1. First point\n2. Second point"
        councilor={{ name: 'Alice', color: '#8b5cf6' }}
      />
      
      {/* Streaming text */}
      <StreamableText 
        content="This text will appear character by character..."
        speed={20}
      />
      
      {/* Pretext canvas */}
      <PretextCanvas 
        text="Hello, Pretext!"
        font="20px Inter"
        maxWidth={400}
      />
      
      {/* UI Components */}
      <Card hover>
        <Button variant="primary">Click me</Button>
      </Card>
    </div>
  )
}
```

## Core Concepts

### Pretext Canvas

Pretext measures text character-by-character, enabling smooth streaming:

```tsx
import { PretextCanvas } from 'pretext-generative-ui-toolkit'

// Text is measured without DOM reflow
<PretextCanvas 
  text="Your text here"
  font="16px Inter"
  maxWidth={500}
  lineHeight={22}
/>
```

### Smart Content Detection

Automatically render the right component:

```tsx
import { SmartMessage } from 'pretext-generative-ui-toolkit'

// Detects vote, code, list, table, chart, etc.
<SmartMessage content={aiResponse} />
```

### Streaming with Pre-Measure

Prevent content jumping during streaming:

```tsx
import { StreamableText } from 'pretext-generative-ui-toolkit'

<StreamableText 
  content="Long AI response..."
  speed={20}  // ms per character
  onComplete={() => console.log('Done!')}
/>
```

## API Reference

### Pretext

| Component | Description |
|-----------|-------------|
| `PretextCanvas` | Canvas-based text renderer |
| `PretextText` | HTML fallback renderer |
| `PretextStream` | Streaming text component |
| `PretextLayout` | Layout primitives |

### Components

| Component | Description |
|-----------|-------------|
| `SmartMessage` | AI content detection |
| `VoteCard` | Voting UI |
| `CodeBlock` | Syntax highlighted code |
| `ListCard` | List rendering |
| `DataTable` | Table rendering |
| `DataChart` | Chart visualization |
| `SummaryCard` | Key points summary |
| `QuestionBubble` | Q&A component |
| `StreamingCard` | Streaming message card |

### Effects

| Component | Description |
|-----------|-------------|
| `ParticleEmitter` | Canvas particles |
| `GradientMesh` | Animated gradients |
| `GlowBorder` | Glow effects |
| `Shimmer` | Loading shimmer |

### Hooks

| Hook | Description |
|------|-------------|
| `usePretext` | Text measurement |
| `useCanvas` | Canvas rendering |
| `useStreaming` | Text streaming |
| `useDebounce` | Debounce values |
| `useIntersection` | Intersection observer |
| `useKeyboard` | Keyboard shortcuts |
| `useGestures` | Touch gestures |

## Configuration

### Custom Councilor Colors

```tsx
<SmartMessage 
  content={content}
  councilor={{
    name: 'Councilor',
    color: '#10b981',
    avatar: '👤'
  }}
/>
```

### Streaming Speed

```tsx
<StreamableText 
  content="Text"
  speed={50}  // Faster
  // or
  speed={10}  // Slower
/>
```

## License

MIT
