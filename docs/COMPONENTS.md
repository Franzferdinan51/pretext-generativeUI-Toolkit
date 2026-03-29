# Components Guide

## SmartMessage

Automatically detects and renders content based on type.

```tsx
import { SmartMessage } from 'pretext-generative-ui-toolkit'

// Detects: vote, code, list, table, chart, question, summary
<SmartMessage 
  content={aiResponse}
  councilor={{ name: 'AI', color: '#8b5cf6' }}
/>
```

## VoteCard

For voting UI in deliberation systems.

```tsx
import { VoteCard } from 'pretext-generative-ui-toolkit'

<VoteCard 
  content="1. Approve\n2. Reject\n3. Abstain"
  showResults={true}
  onVote={(selected) => console.log(selected)}
/>
```

## CodeBlock

Syntax highlighted code display.

```tsx
import { CodeBlock } from 'pretext-generative-ui-toolkit'

<CodeBlock 
  content="```typescript\nconst x = 1;\n```"
  language="typescript"
  showLineNumbers={true}
  showCopyButton={true}
/>
```

## ListCard

Structured list rendering.

```tsx
import { ListCard } from 'pretext-generative-ui-toolkit'

<ListCard 
  content="1. First item\n2. Second item\n3. Third item"
  style="numbered"
/>
```

## DataTable

Markdown table rendering.

```tsx
import { DataTable } from 'pretext-generative-ui-toolkit'

<DataTable 
  content={`
| Name | Value |
|------|-------|
| A    | 1     |
| B    | 2     |
  `}
  sortable={true}
  striped={true}
/>
```

## DataChart

Simple chart visualization.

```tsx
import { DataChart } from 'pretext-generative-ui-toolkit'

<DataChart 
  data={[
    { label: 'A', value: 100 },
    { label: 'B', value: 200 },
    { label: 'C', value: 150 }
  ]}
  chartType="bar"
  title="My Chart"
/>
```

## SummaryCard

Key points summary.

```tsx
import { SummaryCard } from 'pretext-generative-ui-toolkit'

<SummaryCard 
  content="In summary:\n- Point one\n- Point two\n- Point three"
  title="Key Takeaways"
/>
```

## QuestionBubble

Q&A component.

```tsx
import { QuestionBubble } from 'pretext-generative-ui-toolkit'

<QuestionBubble 
  content="What is Pretext?"
  answer="Pretext is a text measurement library."
  allowReveal={true}
/>
```

## StreamingCard

Full streaming message card.

```tsx
import { StreamingCard } from 'pretext-generative-ui-toolkit'

<StreamingCard 
  content="AI is typing..."
  speed={20}
  councilor={{ name: 'AI', color: '#8b5cf6' }}
/>
```
