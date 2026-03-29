# Getting Started

## Installation

```bash
npm install @chenglou/pretext react react-dom
npm install pretext-generative-ui-toolkit
```

## Quick Start

```tsx
import { StreamingMessage } from 'pretext-generative-ui-toolkit'

function App() {
  return (
    <StreamingMessage 
      content="Hello, this is streaming text with pre-measured height!"
      font="15px Inter"
      maxWidth={500}
      color="#8b5cf6"
    />
  )
}
```

## Basic Concepts

### Pretext Measurement

Pretext allows you to measure text without touching the DOM:

```tsx
import { prepare, layout } from '@chenglou/pretext'

const prepared = prepare('Hello world', '16px Inter')
const { height } = layout(prepared, 400, 20)
// height is calculated without DOM access!
```

### Canvas Rendering

Render text at exact positions:

```tsx
import { usePretext } from 'pretext-generative-ui-toolkit'

function PretextCanvas({ text, font, maxWidth }) {
  const canvasRef = useRef(null)
  const measurement = usePretext(text, font, maxWidth, 22)
  
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx || !measurement) return
    
    canvas.width = maxWidth
    canvas.height = measurement.height + 20
    
    ctx.font = font
    for (const line of measurement.lines) {
      ctx.fillText(line.text, 0, line.y + 22)
    }
  }, [measurement])
  
  return <canvas ref={canvasRef} />
}
```

## Next Steps

- Read [PRETEXT_GUIDE.md](./PRETEXT_GUIDE.md) for Pretext API details
- Read [COMPONENTS.md](./COMPONENTS.md) for component documentation
- Read [STREAMING.md](./STREAMING.md) for streaming patterns
- Read [EXAMPLES.md](./EXAMPLES.md) for complete examples
