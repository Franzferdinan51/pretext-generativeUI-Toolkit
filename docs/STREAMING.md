# Streaming Guide

## Why Streaming?

Streaming provides a better user experience by showing text as it's generated, rather than waiting for the complete response.

## Basic Streaming

```tsx
import { StreamableText } from 'pretext-generative-ui-toolkit'

<StreamableText 
  content="This will appear character by character..."
  speed={20}  // ms per character
/>
```

## Pre-measured Streaming

Prevents content jumping by pre-calculating final height:

```tsx
import { PretextStream } from 'pretext-generative-ui-toolkit'

<PretextStream 
  text="Long AI response..."
  config={{
    speed: 20,
    startDelay: 0,
    enableCursor: true,
    cursorChar: '▋'
  }}
/>
```

## Hook-based Streaming

```tsx
import { useStreamingText } from 'pretext-generative-ui-toolkit'

function MyComponent() {
  const { 
    displayedText, 
    isStreaming, 
    progress,
    start, 
    pause, 
    reset 
  } = useStreamingText('Your text here', { speed: 20 })
  
  return (
    <div>
      <p>{displayedText}</p>
      <div>Progress: {Math.round(progress * 100)}%</div>
      <button onClick={isStreaming ? pause : start}>
        {isStreaming ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}
```

## Streaming with Callbacks

```tsx
<StreamableText 
  content="AI response..."
  onProgress={(p) => setProgress(p)}
  onComplete={() => setIsComplete(true)}
/>
```

## Chunk Streaming

Stream multiple chunks (like paragraphs):

```tsx
import { ChunkStream } from 'pretext-generative-ui-toolkit'

<ChunkStream 
  chunks={['First chunk...', 'Second chunk...']}
  chunkDelay={500}  // Delay between chunks
  onChunkComplete={(i) => console.log(`Chunk ${i} done`)}
  onComplete={() => console.log('All chunks done')}
/>
```

## Tips

1. **Pre-measure**: Always pre-measure final text to prevent layout shift
2. **Adjust speed**: 20-30ms is natural; 50ms is dramatic pauses
3. **Cursor**: Show cursor during streaming, hide when complete
4. **Progress**: Display progress for long texts
