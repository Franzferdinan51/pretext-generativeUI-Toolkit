# Pretext AI UI Toolkit - Complete Documentation

<p align="center">
  <img src="https://img.shields.io/badge/Pretext-Canvas-blue?style=flat-square" alt="Pretext Canvas">
  <img src="https://img.shields.io/badge/React-18-black?style=flat-square" alt="React 18">
  <img src="https://img.shields.io/badge/TypeScript-5-red?style=flat-square" alt="TypeScript 5">
  <img src="https://img.shields.io/badge/Tailwind-3-cyan?style=flat-square" alt="Tailwind 3">
</p>

A comprehensive AI-powered generative UI toolkit featuring character-level canvas rendering with Pretext, streaming components, and beautiful visual effects.

## Table of Contents

- [🚀 Quick Start](#-quick-start)
- [📐 Pretext Core](#-pretext-core)
- [🤖 AI Components](#-ai-components)
- [⚡ Streaming Components](#-streaming-components)
- [✨ Visual Effects](#-visual-effects)
- [🎨 UI Primitives](#-ui-primitives)
- [🔮 MagicUI Effects](#-magicui-effects)
- [📐 Layout Components](#-layout-components)
- [📊 Data Visualization](#-data-visualization)
- [🛠️ Agent Control](#️-agent-control)
- [🎯 Examples](#-examples)

---

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/pretext-generative-ui-toolkit.git
cd pretext-generative-ui-toolkit

# Install dependencies
npm install

# Start development server
npm run dev
```

### Basic Usage

```tsx
import { DemoShowcase } from './pages/DemoShowcase'

function App() {
  return <DemoShowcase />
}
```

---

## 📐 Pretext Core

### What is Pretext?

[Pretext](https://github.com/chenglou/pretext) provides **zero-DOM-reflow text measurement**. This means:

1. **AI generates layout instructions** → "Render 'Hello' at x=10, y=20"
2. **Pretext pre-measures all character positions** → No DOM access needed
3. **Canvas renders at exact positions** → No CSS constraints

### Core API

```tsx
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

// Prepare text once (expensive operation)
const prepared = prepareWithSegments(text, '15px Inter, system-ui')

// Layout multiple times (cached math, ~0.09ms)
const { lines, width } = layoutWithLines(prepared, 600, 22)

// Render on canvas
for (const line of lines) {
  ctx.fillText(line.text, line.x, line.y)
}
```

### PretextCanvas Component

```tsx
import { PretextCanvas } from './pages/DemoComponents/DemoPretextCanvas'

<PretextCanvas
  text="Hello from Pretext!"
  font="18px Inter"
  maxWidth={300}
  lineHeight={28}
  color="#8b5cf6"
/>
```

### Benefits

| Feature | Traditional DOM | Pretext Canvas |
|---------|----------------|----------------|
| **Reflow** | On every measurement | Zero |
| **Performance** | O(n) DOM access | O(1) cached math |
| **Precision** | CSS pixel rounding | Exact pixel control |
| **Use Case** | Static layouts | AI streaming |

---

## 🤖 AI Components

### SmartMessage

Automatically detects content type and renders appropriate components:

```tsx
import { SmartMessage } from './components'

// Vote detection
<SmartMessage content="I vote YES on this proposal. VOTE: YES" />

// Code detection
<SmartMessage content="```js\nconst x = 42;\n```" />

// List detection
<SmartMessage content="1. First item\n2. Second item" />

// Table detection
<SmartMessage content="| Name | Value |\n|------|-------|\n| A | 1 |" />

// Summary detection
<SmartMessage content="In summary: 1) Fast 2) Simple 3) Powerful" />
```

### Content Detection Rules

The `detectContentType` function uses these patterns:

| Type | Detection Pattern |
|------|-------------------|
| **Vote** | `<vote>`, `ayes and nays`, `pass/fail`, `yea/nay` |
| **Code** | ```` ``` ````, function declarations, imports |
| **Table** | `|` at start of lines, multiple rows |
| **List** | `1. ` or `- ` at line start |
| **Summary** | `in summary`, `key points`, `in conclusion` |

### VoteCard

```tsx
import { VoteCard } from './components'

<VoteCard 
  content="This proposal has passed"
  yesVotes={62}
  noVotes={28}
/>
```

### CodeBlock

```tsx
import { CodeBlock } from './components'

<CodeBlock 
  content="```js\nconst x = 42;\nconsole.log(x);\n```"
  showActions={true}
/>
```

---

## ⚡ Streaming Components

### StreamableText

Character-by-character streaming with cursor animation:

```tsx
import { StreamableText } from './streaming'

<StreamableText
  content="This text streams character by character..."
  speed={20}
  autoStart={true}
  showCursor={true}
  cursorChar="▋"
/>
```

### Loading States

| Component | Use Case |
|-----------|----------|
| `LoadingDots` | Inline text loading |
| `LoadingSpinner` | Standard spinner |
| `LoadingBars` | Audio/visual feedback |
| `LoadingPulse` | Skeleton/shimmer |
| `LoadingOrb` | Ambient/background |

```tsx
import { LoadingDots, LoadingSpinner, LoadingBars } from './streaming'

<LoadingDots count={3} color="#8b5cf6" speed={0.15} />

<LoadingSpinner size={40} color="#06b6d4" strokeWidth={3} />

<LoadingBars count={5} height={24} color="#ec4899" />
```

---

## ✨ Visual Effects

### ParticleEmitter

Three particle effect types:

```tsx
import { ParticleEmitter } from './effects'

// Energy - explosive particles
<ParticleEmitter type="energy" count={30} color="#8b5cf6" />

// Constellation - connected nodes
<ParticleEmitter type="constellation" count={40} color="#06b6d4" />

// Stars - twinkling dots
<ParticleEmitter type="stars" count={50} color="#ec4899" />
```

### GradientMesh

Animated gradient background:

```tsx
import { GradientMesh } from './effects'

<GradientMesh />
```

### GlowBorder

Animated glowing border:

```tsx
import { GlowBorder } from './effects'

<GlowBorder color="#8b5cf6" intensity={2}>
  <div>Your content here</div>
</GlowBorder>
```

### Shimmer & Skeleton

Loading placeholder effects:

```tsx
import { Shimmer, Skeleton } from './effects'

<Shimmer width={200} height={20} color="#8b5cf6" />

<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="rectangular" width="100%" height={60} />
```

---

## 🎨 UI Primitives

### Button

```tsx
import { Button } from './shadcn'

// Variants
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button disabled>Disabled</Button>
<Button loading>Loading</Button>
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from './shadcn'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here...</p>
  </CardContent>
</Card>
```

### Badge

```tsx
import { Badge } from './shadcn'

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
```

### Input

```tsx
import { Input } from './shadcn'

<Input
  placeholder="Enter text..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

---

## 🔮 MagicUI Effects

### WordRotate

Rotating word animation:

```tsx
import { WordRotate } from './magicui'

<div className="text-3xl font-bold">
  Building <WordRotate words={['Fast', 'Smart', 'Beautiful']} /> UIs
</div>
```

### TextGradient

Gradient text effect:

```tsx
import { TextGradient } from './magicui'

<TextGradient text="Gradient Text" className="text-4xl font-bold" />
```

### AnimatedGrid

Animated grid background:

```tsx
import { AnimatedGrid } from './magicui'

<AnimatedGrid rows={5} cols={5} color="#8b5cf6" animate={true} />
```

### FadeIn

Staggered fade-in animation:

```tsx
import { FadeIn } from './magicui'

<FadeIn delay={0}>
  <div>First item</div>
</FadeIn>
<FadeIn delay={0.2}>
  <div>Second item</div>
</FadeIn>
```

### BentoGrid

Modern bento box layout:

```tsx
import { BentoGrid } from './magicui'

<BentoGrid cols={4} gap={16}>
  <div className="col-span-2 row-span-2">Large</div>
  <div>Small 1</div>
  <div>Small 2</div>
  <div className="col-span-2">Wide</div>
</BentoGrid>
```

### OrbitingShapes

Orbiting animated shapes:

```tsx
import { OrbitingShapes } from './magicui'

<OrbitingShapes count={3} />
```

---

## 📐 Layout Components

### AdaptiveLayout

Responsive layout with breakpoint awareness:

```tsx
import { AdaptiveLayout } from './layout'

<AdaptiveLayout
  items={items}
  cols={{ desktop: 3, tablet: 2, mobile: 1 }}
  renderItem={(item) => <div>{item.content}</div>}
/>
```

### MasonryLayout

Pinterest-style masonry grid:

```tsx
import { MasonryLayout } from './layout'

<MasonryLayout columns={3} gap={16}>
  <div className="h-32">Item 1</div>
  <div className="h-24">Item 2</div>
  <div className="h-40">Item 3</div>
</MasonryLayout>
```

---

## 📊 Data Visualization

### DataChart

Chart types: bar, pie, line:

```tsx
import { DataChart } from './components'

const barData = {
  labels: ['React', 'Vue', 'Angular'],
  values: [85, 72, 58],
  title: 'Framework Popularity'
}

<DataChart type="bar" data={barData} />
<DataChart type="pie" data={pieData} />
<DataChart type="line" data={lineData} />
```

### DataTable

Markdown-style table rendering:

```tsx
import { DataTable } from './components'

<DataTable content={`
| Name | Role | Score |
|------|------|-------|
| Alice | Engineer | 95 |
| Bob | Designer | 88 |
`} />
```

---

## 🛠️ Agent Control

### LM Studio Agent

Direct integration with LM Studio for AI chat:

```tsx
import { useLMStudioAgent } from './agents'

function ChatComponent() {
  const { messages, sendMessage, isLoading, healthCheck } = useLMStudioAgent({
    baseUrl: 'http://100.116.54.125:1234',
    model: 'qwen3.5-27b'
  })

  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i}>{msg.content}</div>
      ))}
      <button onClick={() => sendMessage('Hello!')}>Send</button>
    </div>
  )
}
```

---

## 🎯 Examples

### Basic Examples

See `examples/basic/` for foundational usage:

- `01-pretext-canvas.tsx` - Basic canvas rendering
- `02-streaming-text.tsx` - Text streaming
- `03-smart-message.tsx` - Content detection
- `04-particle-effects.tsx` - Visual effects

### Advanced Examples

See `examples/advanced/` for complex integrations:

- `01-ai-agent-chat.tsx` - Full agent chat
- `02-generative-ui.tsx` - AI generative layout
- `03-full-playground.tsx` - Interactive playground

---

## 📁 Project Structure

```
pretext-generative-ui-toolkit/
├── src/
│   ├── components/       # Core components (SmartMessage, DataChart, etc.)
│   ├── magicui/          # MagicUI effects (WordRotate, TextGradient, etc.)
│   ├── effects/          # Visual effects (ParticleEmitter, GlowBorder, etc.)
│   ├── shadcn/           # UI primitives (Button, Card, Input, etc.)
│   ├── layout/           # Layout components (Masonry, Adaptive, etc.)
│   ├── streaming/        # Streaming components and loading states
│   ├── agents/           # Agent integrations (LM Studio)
│   ├── mcp/              # MCP tool executor
│   ├── hooks/            # Custom React hooks
│   ├── pages/
│   │   ├── DemoShowcase.tsx      # Main demo page
│   │   └── DemoComponents/       # Individual demo components
│   └── index.tsx         # Entry point
├── examples/
│   ├── basic/            # Basic usage examples
│   ├── advanced/         # Advanced integration examples
│   └── demos/            # Full demo applications
├── docs/                 # Documentation
└── package.json
```

---

## 🔧 Configuration

### Tailwind Configuration

The toolkit extends Tailwind with custom colors and animations:

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        surface: '#1a1a2e',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
}
```

### Custom CSS

Add these animations to your global CSS:

```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

---

## 📝 License

MIT License - See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [Pretext](https://github.com/chenglou/pretext) - Zero-reflow text measurement
- [shadcn/ui](https://ui.shadcn.com/) - UI component inspiration
- [MagicUI](https://magicui.design/) - Text effects inspiration
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
