# AI Integration Guide

## Content Detection

Automatically detect content type from AI output:

```tsx
import { detectContentType } from 'pretext-generative-ui-toolkit'

const result = detectContentType("Here's a vote:\n1. Yes\n2. No")
// result.type = 'vote'
```

## Layout Optimization

AI-driven layout suggestions:

```tsx
import { useLayoutOptimizer } from 'pretext-generative-ui-toolkit'

const { best, suggestions } = useLayoutOptimizer({
  contentLength: 1000,
  contentTypes: ['text', 'code'],
  viewportWidth: 800,
  viewportHeight: 600,
  itemCount: 6,
  hasMixedMedia: true
})
```

## Mode Selection

Auto-detect deliberation mode:

```tsx
import { ModeSelector, detectOptimalMode } from 'pretext-generative-ui-toolkit'

// Auto-detect
<AutoModeSelector input={userInput} />

// Manual selection
<ModeSelector 
  selectedMode="legislative"
  onModeChange={(mode) => console.log(mode)}
/>
```

## Councilor Selection

```tsx
import { CouncilorSelector, selectCouncilorsForContext } from 'pretext-generative-ui-toolkit'

const selected = selectCouncilorsForContext(
  availableCouncilors,
  "Let's discuss the code",
  3  // Select 3 councilors
)
```

## Component Generation

Generate components from AI output:

```tsx
import { AIGenerator } from 'pretext-generative-ui-toolkit'

<AIGenerator 
  content={aiResponse}
  options={{
    streaming: true,
    includeVote: true,
    includeCode: true
  }}
  councilor={{ name: 'AI', color: '#8b5cf6' }}
/>
```

## Complete AI Chat Example

```tsx
import { SmartMessage, StreamingCard } from 'pretext-generative-ui-toolkit'

function AIChat({ messages }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {messages.map((msg, i) => (
        <SmartMessage 
          key={i}
          content={msg.content}
          councilor={msg.councilor}
          streaming={msg.isStreaming}
        />
      ))}
    </div>
  )
}
```
