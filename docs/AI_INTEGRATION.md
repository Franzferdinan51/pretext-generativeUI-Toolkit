# AI Integration Guide

## Overview

This toolkit is designed for AI-native UIs where AI controls the layout and rendering.

## AI Layout Control Pattern

The AI generates layout instructions, Pretext measures, Canvas renders:

```tsx
// AI generates layout
const layoutFromAI = {
  "render": [
    {
      "type": "message",
      "councilor": "Facilitator",
      "position": { "x": 0, "y": 0 },
      "width": 600,
      "lines": [
        { "text": "The council will", "y": 30 },
        { "text": "now deliberate.", "y": 52 }
      ]
    },
    {
      "type": "vote_panel",
      "position": { "x": 620, "y": 0 },
      "width": 180,
      "result": "PASSED"
    }
  ]
}
```

## Content Detection

Automatically detect content type:

```tsx
import { detectContent } from 'pretext-generative-ui-toolkit'

const { type, confidence, suggestions } = detectContent(content)

switch (type) {
  case 'vote': return <VoteCard />
  case 'code': return <CodeBlock />
  case 'list': return <ListCard />
  // ...
}
```

## Layout Optimization

Pre-calculate optimal layouts:

```tsx
import { optimizeLayout } from 'pretext-generative-ui-toolkit'

const layout = optimizeLayout(
  [
    { id: 'msg1', text: 'First message' },
    { id: 'msg2', text: 'Second message' },
  ],
  800, // container width
  { gap: 12, padding: 16, lineHeight: 22 }
)
```

## Streaming with AI

Stream AI responses with pre-measured heights:

```tsx
import { useStreaming } from 'pretext-generative-ui-toolkit'

function AIStream({ chunks }) {
  const { displayed, isStreaming } = useStreaming(chunks.join(''), {
    speed: 20,
    onComplete: () => console.log('Done'),
  })
  
  // Pre-measure height
  const height = useMemo(() => {
    const prepared = prepare(displayed, '15px Inter')
    return layout(prepared, 500, 22).height
  }, [displayed])
  
  return (
    <div style={{ minHeight: height }}>
      <PretextCanvas text={displayed} />
    </div>
  )
}
```

## Animation Patterns

### Character Scatter Effect

```tsx
function animateScatter(ctx, text, prepared, targetX, targetY) {
  const { lines } = layoutWithLines(prepared, 500, 22)
  
  const particles = []
  for (const line of lines) {
    for (const char of line.text) {
      particles.push({
        char,
        x: targetX + Math.random() * 100,
        y: targetY + Math.random() * 100,
        targetX,
        targetY,
      })
    }
  }
  
  function frame() {
    let done = true
    for (const p of particles) {
      p.x += (p.targetX - p.x) * 0.15
      p.y += (p.targetY - p.y) * 0.15
      if (Math.abs(p.targetX - p.x) > 0.5) done = false
      ctx.fillText(p.char, p.x, p.y)
    }
    if (!done) requestAnimationFrame(frame)
  }
  
  frame()
}
```

## Integration Examples

### AI Council Chamber

```tsx
function CouncilChamber({ messages }) {
  return (
    <Canvas>
      {messages.map((msg, i) => {
        const layout = optimizeLayout([{ id: msg.id, text: msg.text }], 600)
        return (
          <MessageBubble
            key={msg.id}
            message={msg}
            x={layout[0].x}
            y={layout[0].y}
          />
        )
      })}
      <VotePanel votes={votes} position="right" />
      <ConsensusMeter consensus={consensus} />
    </Canvas>
  )
}
```
