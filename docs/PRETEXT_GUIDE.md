# Pretext Guide

Pretext is a character-level text measurement library that enables smooth, jank-free streaming of AI-generated text.

## What is Pretext?

Pretext measures text **before** it's rendered, calculating exact character positions without triggering expensive DOM layout reflows.

### Why Pretext?

Traditional approaches:
1. AI generates a character
2. DOM updates and reflows
3. Browser recalculates layout
4. **Jank!**

With Pretext:
1. Pre-measure ALL text upfront
2. Stream characters into pre-allocated space
3. **Smooth!**

## Usage

### Basic Canvas

```tsx
import { PretextCanvas } from 'pretext-generative-ui-toolkit'

<PretextCanvas 
  text="Your text here"
  font="16px Inter"
  maxWidth={500}
  lineHeight={22}
/>
```

### Pre-measured Streaming

```tsx
import { PretextStream } from 'pretext-generative-ui-toolkit'

<PretextStream 
  text="Long AI response..."
  speed={20}  // ms per character
  onComplete={() => console.log('Streaming complete!')}
/>
```

### Hooks

```tsx
import { usePretext } from 'pretext-generative-ui-toolkit'

function MyComponent() {
  const measurement = usePretext('Text to measure', {
    font: '16px Inter',
    maxWidth: 500,
    lineHeight: 22
  })
  
  return (
    <div>
      Height: {measurement?.height}px
      Lines: {measurement?.lines.length}
    </div>
  )
}
```

## API Reference

### PretextCanvas Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | - | Text to render |
| `font` | `string` | `'16px Inter'` | Font CSS |
| `maxWidth` | `number` | `500` | Max width in px |
| `lineHeight` | `number` | `22` | Line height in px |
| `color` | `string` | `'#fff'` | Text color |
| `x` | `number` | `0` | X offset |
| `y` | `number` | `0` | Y offset |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment |

### usePretext Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `font` | `string` | `'16px Inter'` | Font CSS |
| `maxWidth` | `number` | `500` | Max width in px |
| `lineHeight` | `number` | `22` | Line height in px |

### Return Value

```typescript
interface TextMeasurement {
  height: number      // Total height
  lines: TextLine[]   // Array of lines
  totalWidth: number  // Max line width
}

interface TextLine {
  text: string    // Line text
  x: number       // X position
  y: number       // Y position
  width: number   // Line width
  baseline: number
}
```

## Performance Tips

1. **Pre-measure once**: Measure final text before streaming starts
2. **Use consistent fonts**: Same font = better caching
3. **Set maxWidth**: Prevents unnecessary reflows
4. **Batch updates**: Don't update on every character if possible
