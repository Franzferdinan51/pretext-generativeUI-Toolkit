# Examples

## AI Council Chamber

A complete example of a multi-agent deliberation UI:

```tsx
import { PretextCanvas, VoteCard, usePretextMeasurements } from 'pretext-generative-ui-toolkit'

function CouncilChamber({ messages, votes, consensus }) {
  const measurements = usePretextMeasurements(
    messages.map(m => ({ id: m.id, text: m.text })),
    600,
    22
  )
  
  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <div>
        {messages.map((msg, i) => {
          const m = measurements.get(msg.id)
          return (
            <MessageBubble
              key={msg.id}
              message={msg}
              x={0}
              y={i * 100} // Would use actual measurement
              height={m?.height || 100}
            />
          )
        })}
      </div>
      <div style={{ width: 200 }}>
        <VoteCard votes={votes} />
        <ConsensusMeter consensus={consensus} />
      </div>
    </div>
  )
}
```

## Streaming Chat

```tsx
import { StreamingCard } from 'pretext-generative-ui-toolkit'

function ChatMessage({ message }) {
  return (
    <StreamingCard
      content={message.content}
      avatar={message.avatar}
      avatarColor={message.color}
      title={message.sender}
      color={message.color}
    />
  )
}
```

## Data Dashboard

```tsx
import { DataTable, DataChart, BentoGrid, AdaptiveLayout } from 'pretext-generative-ui-toolkit'

function Dashboard() {
  return (
    <AdaptiveLayout
      layouts={{
        base: <MobileDashboard />,
        md: <TabletDashboard />,
        lg: (
          <BentoGrid
            items={[
              { id: 'chart', title: 'Revenue', icon: '💰', span: { col: 2 } },
              { id: 'table', title: 'Users', icon: '👥' },
              { id: 'stats', title: 'Growth', icon: '📈' },
            ]}
          />
        ),
      }}
    />
  )
}
```

## Interactive Voting

```tsx
import { VoteCard, SmartMessage } from 'pretext-generative-ui-toolkit'

function VotingSession() {
  const [votes, setVotes] = useState([])
  
  const castVote = (choice) => {
    setVotes(prev => [...prev, {
      voter: 'You',
      choice,
      confidence: 95,
      color: '#8b5cf6',
    }])
  }
  
  return (
    <div>
      <VoteCard votes={votes} />
      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <button onClick={() => castVote('yes')}>Yes</button>
        <button onClick={() => castVote('no')}>No</button>
      </div>
    </div>
  )
}
```

## Code Display

```tsx
import { CodeBlock, SmartMessage } from 'pretext-generative-ui-toolkit'

function CodeResponse({ response }) {
  // Auto-detect and render appropriate component
  return (
    <SmartMessage content={response} />
  )
}

// Or explicitly:
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

## Particle Effects

```tsx
import { ParticleEmitter, useParticleSystem } from 'pretext-generative-ui-toolkit'

function InteractiveCanvas() {
  const canvasRef = useRef(null)
  const { emit, start, stop } = useParticleSystem(canvasRef, {
    colors: ['#8b5cf6', '#06b6d4', '#22c55e'],
    count: 50,
    minSize: 2,
    maxSize: 6,
    gravity: 0.1,
  })
  
  return (
    <canvas
      ref={canvasRef}
      onClick={(e) => emit(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 20)}
      onMouseEnter={start}
      onMouseLeave={stop}
    />
  )
}
```

## Morphic-Style Search

```tsx
import { Input, Tabs, SmartMessage } from 'pretext-generative-ui-toolkit'

function SearchInterface() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  
  return (
    <div>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {results.map(result => (
            <SmartMessage key={result.id} content={result.content} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
```
