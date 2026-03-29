# Pretext AI UI Toolkit

<p align="center">
  <img src="https://img.shields.io/badge/Pretext-Zero%20Reflow-blue?style=flat-square" alt="Pretext">
  <img src="https://img.shields.io/badge/JSON%20Render-Safe%20UI-purple?style=flat-square" alt="JSON Render">
  <img src="https://img.shields.io/badge/A2UI-Agent%20Standard-green?style=flat-square" alt="A2UI">
</p>

<p align="center">
  <strong>🎨 AI-Powered Generative UI</strong><br>
  Combining Pretext + JSON Render + A2UI for the ultimate generative UI stack
</p>

---

## 🚀 Live Demo

**Try it:** http://localhost:3456

---

## ✨ Core Technologies

### [Pretext](https://github.com/chenglou/pretext) - Zero-Reflow Text
**Character-level text measurement without DOM reflow**

```javascript
import { prepare, layout, layoutWithLines, layoutNextLine } from '@chenglou/pretext'

// Fast: ~0.09ms per measurement (cached!)
const prepared = prepare('Hello world', '16px Inter')
const { height } = layout(prepared, 400, 24) // pure math!

// Exact line positions
const { lines } = layoutWithLines(prepared, 320, 26)

// Flow text around obstacles
while (true) {
  const width = y < imageBottom ? columnWidth - imageWidth : columnWidth
  const line = layoutNextLine(prepared, cursor, width)
  if (!line) break
  ctx.fillText(line.text, 0, y)
  y += 26
}
```

**Features:**
- ✅ ~0.09ms per measurement (cached)
- ✅ No DOM reflow triggered
- ✅ Exact x,y positions for every character
- ✅ Flow text around obstacles
- ✅ Multi-language + emoji support
- ✅ Shrinkwrap width calculation

---

### [JSON Render](https://github.com/vercel-labs/json-render) - Safe Components
**Generative UI with guardrails**

```javascript
import { defineCatalog, defineRegistry, Renderer } from '@json-render/core'
import { schema } from '@json-render/react/schema'

// Define component catalog (AI can ONLY use these)
const catalog = defineCatalog(schema, {
  components: {
    Card: { props: z.object({ title: z.string() }), description: 'Card container' },
    Button: { props: z.object({ content: z.string() }), description: 'Clickable button' },
  }
})

// Register component implementations
const { registry } = defineRegistry(catalog, {
  components: {
    Card: ({ props }) => <div className="card"><h3>{props.title}</h3></div>,
    Button: ({ props, emit }) => <button onClick={() => emit('press')}>{props.content}</button>,
  }
})

// AI generates JSON → Safely rendered
<Renderer spec={spec} registry={registry} />
```

**Features:**
- ✅ Zod schema validation
- ✅ AI can only use catalog components
- ✅ Streaming support
- ✅ 15+ built-in components
- ✅ Cross-platform (React, Vue, Svelte, Solid)

---

### [Google A2UI](https://github.com/google/A2UI) - Agent UI Standard
**Google's open standard for agent-generated UIs**

```javascript
// A2UI flat spec format
const spec = {
  root: 'card-1',
  elements: {
    'card-1': { type: 'Card', props: { title: 'Hello' }, children: ['button-1'] },
    'button-1': { type: 'Button', props: { label: 'Click' }, children: [] },
  }
}
```

**Core philosophies:**
- 🔒 **Security first**: Declarative JSON, not executable code
- 🤖 **LLM-friendly**: Flat list with ID references
- 🔄 **Incremental**: Agents can update UI progressively
- 🌐 **Framework-agnostic**: Same spec renders on React, Flutter, Lit, etc.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    AI SWARM ORCHESTRATOR                    │
│                  MiniMax M2.7 (5 agents)                    │
├─────────────────────────────────────────────────────────────┤
│                      A2UI LAYER                             │
│  Declarative JSON spec format • Security-first design      │
│  Incremental updates • Trusted component catalog only        │
├─────────────────────────────────────────────────────────────┤
│                    PRETEXT LAYER                             │
│  Zero-reflow text measurement • ~0.09ms cached              │
│  Exact character positions • Flow around obstacles           │
├─────────────────────────────────────────────────────────────┤
│                   JSON RENDER LAYER                          │
│  Zod-validated component catalog • Safe React rendering     │
│  Streaming support • 15+ components                          │
├─────────────────────────────────────────────────────────────┤
│                    CANVAS RENDERER                           │
│  Exact Pretext coordinates • React components               │
│  Zero DOM manipulation                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Component Catalog (15 Components)

| Category | Components |
|----------|------------|
| **Text** | Header, Text, Heading |
| **Interactive** | Button, Link |
| **Layout** | Card, Container, Stack, Grid |
| **Data** | Metric, Badge |
| **Media** | Image, Icon |
| **Input** | Input, Select |

---

## 🐝 AI Swarm System

| Agent | Task | Components |
|-------|------|-----------|
| 🏗️ **Architect** | Header + Hero | Header, Heading, Text |
| 🎨 **Designer** | Features | Cards, Grid, Badges |
| ✍️ **Content** | Body | Text, Stack, Container |
| 💻 **Frontend** | CTA + Footer | Button, Link, Metrics |
| ✨ **Enhancer** | Polish | Icons, Gradients, Effects |

---

## 🔒 Security Model

1. **Declarative Only** - AI generates JSON, not code
2. **Component Catalog** - Only 15 pre-approved components
3. **Zod Validation** - All props type-checked
4. **No eval()** - Components rendered safely via React
5. **Pretext Isolation** - Text measured without DOM access

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Pretext** | Zero-reflow text measurement |
| **JSON Render** | Safe component rendering |
| **A2UI** | Agent UI standard |
| **React** | UI framework |
| **Canvas API** | Fallback rendering |
| **MiniMax M2.7** | AI generation |
| **Tailwind CSS** | Styling |
| **Zod** | Type validation |

---

## 🌐 Links

- **GitHub**: https://github.com/Franzferdinan51/pretext-generativeUI-Toolkit
- **Pretext**: https://github.com/chenglou/pretext
- **JSON Render**: https://github.com/vercel-labs/json-render
- **A2UI**: https://github.com/google/A2UI
- **Live Demo**: http://localhost:3456

---

<p align="center">
  Built with ❤️ using Pretext, JSON Render, A2UI, and AI Swarm
</p>
