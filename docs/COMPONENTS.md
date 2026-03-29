# Components Reference

## Smart Components

### SmartMessage

Automatically detects content type and renders appropriate component.

```tsx
import { SmartMessage } from 'pretext-generative-ui-toolkit'

<SmartMessage content={aiResponse} />
```

**Detected types:** vote, code, list, table, chart, question, summary

---

### StreamingCard

Streaming text with pre-measured height.

```tsx
import { StreamingCard } from 'pretext-generative-ui-toolkit'

<StreamingCard
  content="AI is generating..."
  title="Response"
  avatar="🤖"
  color="#8b5cf6"
/>
```

**Props:**
- `content` - Text to stream
- `title` - Card title
- `subtitle` - Card subtitle
- `avatar` - Avatar emoji
- `avatarColor` - Avatar circle color
- `font` - Font style (default: '15px Inter')
- `maxWidth` - Max width (default: 500)
- `lineHeight` - Line height (default: 22)
- `color` - Accent color (default: '#8b5cf6')
- `isStreaming` - Show streaming cursor (default: true)

---

### VoteCard

Animated voting results.

```tsx
import { VoteCard } from 'pretext-generative-ui-toolkit'

<VoteCard 
  votes={[
    { voter: 'Alice', choice: 'yes', confidence: 95, color: '#8b5cf6' },
    { voter: 'Bob', choice: 'no', confidence: 72, color: '#ef4444' },
  ]}
  title="Decision Vote"
  showReasons
/>
```

**Props:**
- `votes` - Array of vote objects
- `title` - Card title
- `showReasons` - Show vote reasons
- `width` - Card width (default: 400)

---

### CodeBlock

Syntax highlighted code with copy button.

```tsx
import { CodeBlock } from 'pretext-generative-ui-toolkit'

<CodeBlock 
  code={`function hello() { console.log('Hi') }`}
  language="javascript"
  filename="hello.js"
  showLineNumbers
  showCopy
/>
```

---

### DataTable

Sortable, filterable data table.

```tsx
import { DataTable } from 'pretext-generative-ui-toolkit'

<DataTable
  data={[{ name: 'Alice', age: 30 }]}
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'age', header: 'Age', align: 'right' },
  ]}
  striped
  hoverable
  onRowClick={(row) => console.log(row)}
/>
```

---

### DataChart

Bar, line, and pie charts.

```tsx
import { DataChart } from 'pretext-generative-ui-toolkit'

<DataChart
  data={[{ label: 'Jan', value: 40 }]}
  type="bar"
  title="Monthly Revenue"
  showLabels
  showValues
  animate
/>
```

---

## shadcn/ui Components

### Button

```tsx
import { Button } from 'pretext-generative-ui-toolkit'

<Button variant="default" size="default">Click me</Button>
```

**Variants:** default, destructive, outline, secondary, ghost, link
**Sizes:** default, sm, lg, icon

---

### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from 'pretext-generative-ui-toolkit'

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

---

### Dialog

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from 'pretext-generative-ui-toolkit'

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogTitle>Title</DialogTitle>
    Content
  </DialogContent>
</Dialog>
```

---

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'pretext-generative-ui-toolkit'

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

---

## MagicUI Components

### AnimatedGrid

```tsx
import { AnimatedGrid } from 'pretext-generative-ui-toolkit'

<AnimatedGrid rows={5} columns={5} color="#8b5cf6" animate />
```

---

### FadeIn

```tsx
import { FadeIn } from 'pretext-generative-ui-toolkit'

<FadeIn delay={100} duration={500} direction="up">
  Content
</FadeIn>
```

---

### BentoGrid

```tsx
import { BentoGrid } from 'pretext-generative-ui-toolkit'

<BentoGrid
  items={[
    { id: '1', title: 'Sales', icon: '💰', span: { col: 2 } },
    { id: '2', title: 'Users', icon: '👥' },
  ]}
  columns={3}
/>
```

---

### WordRotate

```tsx
import { WordRotate } from 'pretext-generative-ui-toolkit'

<WordRotate words={['Hello', 'World', '!']} duration={2000} />
```

---

### TextGradient

```tsx
import { TextGradient } from 'pretext-generative-ui-toolkit'

<TextGradient from="#8b5cf6" to="#06b6d4" direction="horizontal">
  Gradient Text
</TextGradient>
```

---

### OrbitingShapes

```tsx
import { OrbitingShapes } from 'pretext-generative-ui-toolkit'

<OrbitingShapes count={6} size={200} orbitRadius={80} speed={0.02} />
```
