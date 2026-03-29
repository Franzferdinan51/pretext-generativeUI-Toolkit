# Pretext Generative UI Toolkit

**AI-powered generative UI with character-level layout control.**

[![npm version](https://img.shields.io/npm/v/@chenglou/pretext)](https://www.npmjs.com/package/@chenglou/pretext)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🎯 Overview

This toolkit combines the power of **Pretext** (zero-layout-reflow text measurement) with **shadcn/ui**, **MagicUI**, and **streaming components** to build AI-native interfaces where AI controls every pixel.

### The Core Insight

Pretext measures every character's exact (x, y, width, height) position. Canvas renders at those exact coordinates. **The AI generates layout instructions, pretext measures, canvas renders.** No DOM, no reflow, no CSS constraints.

This enables:
- AI-controlled generative UI (AI outputs positioned text, not HTML)
- Pre-calculated heights before content appears
- Character-by-character streaming with pre-measured layouts
- Complex text flows around obstacles
- Zero layout shift during streaming

---

## ✨ Features

### Pretext Core
- **Zero-reflow text measurement** - Measure text height without touching DOM
- **Character-level positioning** - Get exact (x, y) for every character
- **Line-by-line layout** - Flow text around obstacles
- **Pre-measurement** - Calculate heights before streaming content

### Smart Components
- **SmartMessage** - Auto-detects content type (vote, code, list, table, chart, question, summary)
- **StreamingCard** - Streaming text with pre-measured height
- **VoteCard** - Animated voting results
- **CodeBlock** - Syntax highlighting with copy button
- **DataTable** - Sortable, filterable tables
- **DataChart** - Bar, line, and pie charts
- **ListCard** - Styled lists with icons
- **SummaryCard** - Key points extraction
- **QuestionBubble** - Interactive question bubbles

### Effects
- **ParticleEmitter** - GPU-accelerated particles
- **GradientMesh** - Animated gradient backgrounds
- **GlowBorder** - Neon glow effects
- **RippleEffect** - Touch ripple animations
- **Shimmer** - Loading skeleton animations

### Layout
- **ResponsiveGrid** - Auto-responsive grid layouts
- **MasonryLayout** - Pinterest-style masonry
- **AdaptiveLayout** - Breakpoint-based layouts

### Streaming
- **StreamableText** - Character-by-character streaming with Pretext
- **LoadingStates** - Animated loading indicators

### shadcn/ui Components
- Button, Card, Badge, Input, Dialog, Tabs, ScrollArea

### MagicUI Components
- AnimatedGrid, FadeIn, BentoGrid, WordRotate, TextGradient, OrbitingShapes

### AI Components
- **AIGenerator** - AI-powered content generation
- **ContentDetector** - Auto-detect content types
- **LayoutOptimizer** - Optimize text layouts

---

## 🚀 Quick Start

### Installation

```bash
npm install @chenglou/pretext react react-dom
```

### Basic Usage

```tsx
import { PretextCanvas, StreamingMessage } from 'pretext-generative-ui-toolkit'

// Pre-measure text height before streaming
function MyComponent() {
  const [content, setContent] = useState('')
  
  return (
    <StreamingMessage 
      content={content}
      font="15px Inter"
      maxWidth={500}
      lineHeight={22}
      color="#8b5cf6"
    />
  )
}
```

### Pretext Core API

```tsx
import { prepare, layout, prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

// Measure text height (fast, cached)
const prepared = prepare('Hello world', '16px Inter')
const { height, lineCount } = layout(prepared, 400, 20) // pure math!

// Get all lines with exact positions
const prepared = prepareWithSegments('Hello world', '18px Inter')
const { lines } = layoutWithLines(prepared, 320, 26)
for (const line of lines) {
  console.log(line.text, line.y) // exact positions
}
```

### Canvas Rendering

```tsx
import { usePretext } from 'pretext-generative-ui-toolkit'

function PretextCanvas({ text, font, maxWidth, lineHeight }) {
  const canvasRef = useRef(null)
  const measurement = usePretext(text, font, maxWidth, lineHeight)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !measurement) return
    
    const ctx = canvas.getContext('2d')
    canvas.width = maxWidth
    canvas.height = measurement.height + 20
    
    ctx.font = font
    for (const line of measurement.lines) {
      ctx.fillText(line.text, 0, line.y + lineHeight)
    }
  }, [measurement])
  
  return <canvas ref={canvasRef} />
}
```

---

## 📦 Components

### SmartMessage

Auto-detects content type and renders appropriate component:

```tsx
import { SmartMessage } from 'pretext-generative-ui-toolkit'

// Automatically detects vote, code, list, table, etc.
<SmartMessage content={aiResponse} />
```

### VoteCard

```tsx
import { VoteCard } from 'pretext-generative-ui-toolkit'

<VoteCard 
  votes={[
    { voter: 'Alice', choice: 'yes', confidence: 95, color: '#8b5cf6' },
    { voter: 'Bob', choice: 'no', confidence: 72, color: '#ef4444' },
  ]}
  title="Decision Vote"
/>
```

### StreamingCard

```tsx
import { StreamingCard } from 'pretext-generative-ui-toolkit'

<StreamingCard
  content="AI is generating text character by character..."
  title="AI Response"
  avatar="🤖"
  color="#8b5cf6"
/>
```

### CodeBlock

```tsx
import { CodeBlock } from 'pretext-generative-ui-toolkit'

<CodeBlock 
  code={`function hello() {
  console.log('Hello, World!')
}`}
  language="javascript"
  filename="hello.js"
  showLineNumbers
  showCopy
/>
```

### DataTable

```tsx
import { DataTable } from 'pretext-generative-ui-toolkit'

<DataTable
  data={[
    { name: 'Alice', age: 30, city: 'NYC' },
    { name: 'Bob', age: 25, city: 'LA' },
  ]}
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'age', header: 'Age', align: 'right' },
    { key: 'city', header: 'City' },
  ]}
  striped
  hoverable
/>
```

### DataChart

```tsx
import { DataChart } from 'pretext-generative-ui-toolkit'

<DataChart
  data={[
    { label: 'Jan', value: 40, color: '#8b5cf6' },
    { label: 'Feb', value: 65, color: '#06b6d4' },
    { label: 'Mar', value: 45, color: '#22c55e' },
  ]}
  type="bar"
  title="Monthly Revenue"
/>
```

---

## 🎨 Effects

### ParticleEmitter

```tsx
import { ParticleEmitter, useParticleSystem } from 'pretext-generative-ui-toolkit'

function MyComponent() {
  const { emit, start, stop } = useParticleSystem(canvasRef, {
    colors: ['#8b5cf6', '#06b6d4', '#22c55e'],
    count: 50,
    minSize: 2,
    maxSize: 6,
  })
  
  // Emit particles on click
  return <canvas ref={canvasRef} onClick={(e) => emit(e.x, e.y, 20)} />
}
```

### GradientMesh

```tsx
import { GradientMesh } from 'pretext-generative-ui-toolkit'

<GradientMesh
  width={400}
  height={300}
  colors={['#8b5cf6', '#06b6d4', '#22c55e']}
  blur={100}
/>
```

### GlowBorder

```tsx
import { GlowBorder } from 'pretext-generative-ui-toolkit'

<GlowBorder color="#8b5cf6" blur={20} intensity={0.5}>
  <div style={{ padding: 20, background: '#1a1a1a' }}>
    Content with glow
  </div>
</GlowBorder>
```

---

## 🎭 Layout

### ResponsiveGrid

```tsx
import { ResponsiveGrid } from 'pretext-generative-ui-toolkit'

<ResponsiveGrid columns={{ base: 1, md: 2, lg: 3 }} gap={16}>
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
</ResponsiveGrid>
```

### BentoGrid

```tsx
import { BentoGrid } from 'pretext-generative-ui-toolkit'

<BentoGrid
  items={[
    { id: '1', title: 'Sales', icon: '💰', span: { col: 2 } },
    { id: '2', title: 'Users', icon: '👥' },
    { id: '3', title: 'Growth', icon: '📈' },
  ]}
  columns={3}
/>
```

---

## 🔮 MagicUI

### AnimatedGrid

```tsx
import { AnimatedGrid } from 'pretext-generative-ui-toolkit'

<AnimatedGrid rows={5} columns={5} color="#8b5cf6" />
```

### WordRotate

```tsx
import { WordRotate } from 'pretext-generative-ui-toolkit'

<WordRotate words={['Hello', 'Bonjour', 'Hola', 'Ciao']} />
```

### TextGradient

```tsx
import { TextGradient } from 'pretext-generative-ui-toolkit'

<TextGradient from="#8b5cf6" to="#06b6d4">
  Gradient Text
</TextGradient>
```

---

## 🤖 AI Integration

### Content Detection

```tsx
import { detectContent } from 'pretext-generative-ui-toolkit'

const { type, confidence, suggestions } = detectContent(content)
// type: 'vote' | 'code' | 'list' | 'table' | 'chart' | 'question' | 'summary' | 'normal'
```

### Layout Optimization

```tsx
import { optimizeLayout } from 'pretext-generative-ui-toolkit'

const layout = optimizeLayout(
  [
    { id: '1', text: 'First message', maxWidth: 400 },
    { id: '2', text: 'Second message', maxWidth: 400 },
  ],
  800, // container width
  { gap: 12, padding: 16, lineHeight: 22 }
)
// Returns: [{ id: '1', x: 16, y: 16, width: 368, height: 60 }, ...]
```

---

## ⚓ API Reference

### Pretext Hooks

```tsx
// usePretext - Measure text
const measurement = usePretext(text, font, maxWidth, lineHeight)
// Returns: { prepared, height, lineCount, lines }

// usePretextCanvas - Canvas + Pretext
const { canvasRef, drawText, measureTextHeight } = usePretextCanvas()
```

### Streaming Hooks

```tsx
// useStreaming - Stream text character by character
const { displayed, isStreaming, progress } = useStreaming(content, {
  speed: 20,
  onProgress: (p) => console.log(`${p * 100}%`),
  onComplete: () => console.log('Done'),
})
```

### Layout Hooks

```tsx
// useDebounce - Debounce value
const debounced = useDebounce(value, 300)

// useIntersection - Intersection observer
const isVisible = useIntersection(ref, { threshold: 0.5 })

// useKeyboard - Keyboard shortcuts
useKeyboard('Escape', () => close(), { ctrl: true })
```

---

## 📁 Project Structure

```
pretext-generativeUI-Toolkit/
├── src/
│   ├── pretext/          # Pretext core (Canvas, Text, Stream)
│   ├── components/       # Smart components
│   ├── effects/          # Visual effects
│   ├── layout/           # Layout components
│   ├── streaming/        # Streaming components
│   ├── hooks/            # Custom React hooks
│   ├── shadcn/           # shadcn/ui components
│   ├── magicui/          # MagicUI components
│   ├── ai/               # AI integration
│   └── index.ts          # Main export
├── index.html            # Demo page
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🔧 Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

---

## 🎯 Use Cases

### AI Council Chamber

Build multi-agent deliberation UIs with:
- Pre-measured streaming messages
- Vote panels with animated bars
- Consensus meters
- Character scatter effects

### Generative Chat

Stream AI responses with:
- Pre-calculated height (no layout shift)
- Syntax highlighting code blocks
- Auto-detected content components
- Particle effects on completion

### Data Dashboards

Create real-time dashboards with:
- Pretext-measured labels
- Animated charts
- Responsive grids
- Loading states

---

## 📚 References

- [Pretext](https://github.com/chenglou/pretext) - Zero-layout-reflow text measurement
- [shadcn/ui](https://ui.shadcn.com/) - Reusable components
- [MagicUI](https://magicui.design/) - Beautiful UI components
- [Morphic](https://github.com/miurla/morphic) - AI-powered search with generative UI

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🙏 Credits

- **Pretext** by [chenglou](https://github.com/chenglou)
- **shadcn/ui** by the shadcn team
- **MagicUI** by the MagicUI team
- Built with ❤️ for the AI-native UI future
