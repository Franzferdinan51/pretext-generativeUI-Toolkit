# Streaming Guide

## Overview

This toolkit provides streaming components that render text character-by-character while pre-measuring heights to prevent layout shift.

## Core Streaming Pattern

```tsx
import { StreamingMessage } from 'pretext-generative-ui-toolkit'

<StreamingMessage 
  content={aiResponse}
  font="15px Inter"
  maxWidth={500}
  lineHeight={22}
  color="#8b5cf6"
/>
```

## Pre-measurement Pattern

The key to zero-layout-shift streaming:

```tsx
import { useEffect, useState } from 'react'
import { prepare, layout } from '@chenglou/pretext'

function StreamWithMeasure({ content }) {
  const [displayed, setDisplayed] = useState('')
  const [height, setHeight] = useState(100)
  
  // Pre-measure BEFORE streaming
  useEffect(() => {
    if (!content) return
    const prepared = prepare(content, '15px Inter')
    const { height: h } = layout(prepared, 500, 22)
    setHeight(Math.ceil(h) + 40)
  }, [content])
  
  // Stream
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < content.length) {
        setDisplayed(content.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 20)
    return () => clearInterval(interval)
  }, [content])
  
  return (
    <div style={{ minHeight: height }}>
      <canvas height={height} />
    </div>
  )
}
```

## useStreaming Hook

```tsx
import { useStreaming } from 'pretext-generative-ui-toolkit'

function MyComponent({ content }) {
  const { displayed, isStreaming, progress } = useStreaming(content, {
    speed: 20,
    onProgress: (p) => updateProgressBar(p),
    onComplete: () => enableSendButton(),
  })
  
  return (
    <div>
      <ProgressBar progress={progress} />
      <DisplayText text={displayed} />
    </div>
  )
}
```

## Streaming API Responses

```tsx
async function streamAIResponse(prompt) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  })
  
  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let fullResponse = ''
  
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    
    const chunk = decoder.decode(value)
    fullResponse += chunk
    
    // Update displayed text
    setDisplayed(fullResponse)
  }
  
  return fullResponse
}
```

## Streaming with Multiple Components

```tsx
function MultiStream({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  
  useEffect(() => {
    if (currentIndex >= items.length) return
    
    const item = items[currentIndex]
    let i = 0
    
    const interval = setInterval(() => {
      if (i < item.content.length) {
        setDisplayed(item.content.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setDisplayed('')
          setCurrentIndex(prev => prev + 1)
        }, 500)
      }
    }, 20)
    
    return () => clearInterval(interval)
  }, [currentIndex, items])
  
  return (
    <div>
      {items.slice(0, currentIndex).map(item => (
        <CompletedItem key={item.id} {...item} />
      ))}
      {items[currentIndex] && (
        <StreamingCard content={displayed} />
      )}
    </div>
  )
}
```

## Performance Tips

1. **Pre-measure once** - Don't re-measure on every character
2. **Use Canvas** - Canvas is faster than DOM for frequent updates
3. **Batch updates** - Update every N characters, not every character
4. **Cleanup intervals** - Always clear intervals on unmount

```tsx
// Good: Pre-measure, then stream
useEffect(() => {
  const prepared = prepare(content, font)
  const { height } = layout(prepared, maxWidth, lineHeight)
  setHeight(height)
}, [content]) // Only re-run when content changes

// Bad: Re-measuring on every character
useEffect(() => {
  const prepared = prepare(displayed, font) // Expensive!
  // ...
}, [displayed]) // Runs on every character!
```
