# Pretext Guide

## What is Pretext?

Pretext is a JavaScript/TypeScript library for multiline text measurement & layout. It measures text **without touching the DOM**, preventing expensive layout reflows.

## Installation

```bash
npm install @chenglou/pretext
```

## Core API

### Measure Text Height

```tsx
import { prepare, layout } from '@chenglou/pretext'

const prepared = prepare('Hello world', '16px Inter')
const { height, lineCount } = layout(prepared, 400, 20)
// height: 40 (two lines * 20px line height)
```

### Get Lines with Positions

```tsx
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

const prepared = prepareWithSegments('Hello world', '18px Inter')
const { lines } = layoutWithLines(prepared, 320, 26)

for (const line of lines) {
  console.log(line.text, line.y) // 'Hello', 0
                              // 'world', 26
}
```

### Flow Text Around Obstacles

```tsx
import { prepareWithSegments, layoutNextLine } from '@chenglou/pretext'

const prepared = prepareWithSegments(text, '15px Inter')
let cursor = { segmentIndex: 0, graphemeIndex: 0 }
let y = 0

while (true) {
  // Lines beside image are narrower
  const width = y < imageBottom ? columnWidth - imageWidth : columnWidth
  const line = layoutNextLine(prepared, cursor, width)
  if (line === null) break
  
  ctx.fillText(line.text, 0, y)
  cursor = line.end
  y += 26
}
```

## Performance

- `prepare()`: ~19ms (one-time per text)
- `layout()`: ~0.09ms (cached, reusable)
- Canvas rendering: ~1-2ms for typical message
- Zero DOM reflow!

## Integration with React

```tsx
import { usePretext } from 'pretext-generative-ui-toolkit'

function StreamingMessage({ content }) {
  const measurement = usePretext(content, '15px Inter', 500, 22)
  
  return (
    <div style={{ minHeight: measurement?.height }}>
      {/* Render using measurement */}
    </div>
  )
}
```
