# Pretext AI UI Toolkit

<p align="center">
  <img src="https://img.shields.io/badge/Pretext-Zero%20Reflow-blue?style=flat-square" alt="Pretext">
  <img src="https://img.shields.io/badge/JSON%20Render-Safe%20UI-purple?style=flat-square" alt="JSON Render">
  <img src="https://img.shields.io/badge/A2UI-Agent%20Standard-green?style=flat-square" alt="A2UI">
</p>

<p align="center">
  <strong>🎨 AI-Powered Generative UI</strong><br>
  The ultimate stack combining Pretext + JSON Render + A2UI
</p>

---

## 🚀 Live Demo

**Try it:** http://localhost:3456

---

## ✨ Core Technologies

### [Pretext](https://github.com/chenglou/pretext) - Zero-Reflow Text Engine

**Character-level text measurement without DOM reflow**

```javascript
import { prepare, layout, layoutWithLines, layoutNextLine } from '@chenglou/pretext'

// Fast: ~0.09ms per measurement (cached!)
const prepared = prepare('Hello world', '16px Inter')
const { height } = layout(prepared, 400, 24) // pure math, no DOM!

// Get exact line positions
const { lines } = layoutWithLines(prepared, 320, 26)
for (const line of lines) {
  ctx.fillText(line.text, 0, line.y)
}

// Flow text around floating obstacles
let cursor = { segmentIndex: 0, graphemeIndex: 0 }
let y = 0
while (true) {
  const width = y < imageBottom ? columnWidth - imageWidth : columnWidth
  const line = layoutNextLine(prepared, cursor, width)
  if (!line) break
  ctx.fillText(line.text, 0, y)
  cursor = line.end
  y += 26
}
```

**Pretext Features:**
| Feature | Description |
|---------|-------------|
| ~0.09ms | Per measurement (cached!) |
| Zero Reflow | No DOM access triggered |
| Exact Positions | x, y, width for every character |
| Flow Around | Text flows around obstacles |
| Shrinkwrap | Calculate tightest container width |
| Multi-language | Emojis, RTL, mixed bidi |
| Cache | Shared internal cache |

---

### [JSON Render](https://github.com/vercel-labs/json-render) - Safe Component Framework

**Generative UI with guardrails**

```javascript
import { defineCatalog, defineRegistry, Renderer } from '@json-render/core'
import { schema } from '@json-render/react/schema'
import { z } from 'zod'

// Define component catalog (AI can ONLY use these)
const catalog = defineCatalog(schema, {
  components: {
    Card: {
      props: z.object({ title: z.string() }),
      description: 'Card container'
    },
    Button: {
      props: z.object({ content: z.string(), action: z.string() }),
      description: 'Clickable button'
    },
    Metric: {
      props: z.object({
        label: z.string(),
        value: z.string(),
        format: z.enum(['currency', 'percent', 'number'])
      }),
      description: 'Metric display'
    }
  },
  actions: {
    generate: { description: 'Regenerate' },
    refresh: { description: 'Refresh data' }
  }
})

// Register React implementations
const { registry } = defineRegistry(catalog, {
  components: {
    Card: ({ props, children }) => (
      <div className="card">
        <h3>{props.title}</h3>
        {children}
      </div>
    ),
    Button: ({ props, emit }) => (
      <button onClick={() => emit('press')}>
        {props.content}
      </button>
    ),
  }
})

// AI generates JSON → Safely rendered
<Renderer spec={spec} registry={registry} />
```

**JSON Render Features:**
| Feature | Description |
|---------|-------------|
| Guardrailed | AI only uses catalog components |
| Predictable | JSON matches schema every time |
| Fast | Stream and render progressively |
| Cross-Platform | React, Vue, Svelte, Solid, React Native |
| 36+ Components | Pre-built shadcn/ui components |
| Zod Validation | All props type-checked |

---

### [Google A2UI](https://github.com/google/A2UI) - Agent UI Standard

**Google's open standard for agent-generated UIs**

```javascript
// A2UI flat spec format (LLM-friendly)
const spec = {
  root: 'card-1',
  elements: {
    'card-1': { 
      type: 'Card', 
      props: { title: 'Hello' }, 
      children: ['button-1'] 
    },
    'button-1': { 
      type: 'Button', 
      props: { label: 'Click me' }, 
      children: [] 
    },
  }
}
```

**A2UI Core Philosophies:**
| Philosophy | Description |
|------------|-------------|
| Security First | Declarative JSON, not executable code |
| LLM-Friendly | Flat list with ID references |
| Incremental | Agents update UI progressively |
| Framework-Agnostic | React, Flutter, Lit, etc. |
| Flexible | Open registry pattern for custom components |

**A2UI Use Cases:**
- Dynamic Data Collection (forms, date pickers)
- Remote Sub-Agents (orchestrator → specialized agents)
- Adaptive Workflows (approval dashboards)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    AI SWARM ORCHESTRATOR                      │
│              MiniMax M2.7 (5 specialized agents)              │
├─────────────────────────────────────────────────────────────┤
│                        A2UI LAYER                             │
│  • Declarative JSON spec format                               │
│  • Security-first (no code execution)                        │
│  • Incremental updates (agents can patch UI)                 │
│  • Trusted component catalog only                            │
├─────────────────────────────────────────────────────────────┤
│                      PRETEXT LAYER                            │
│  • ~0.09ms cached text measurement                          │
│  • Zero DOM reflow                                         │
│  • Exact character positions                                │
│  • Flow text around obstacles                               │
│  • Multi-language + emoji support                          │
├─────────────────────────────────────────────────────────────┤
│                     JSON RENDER LAYER                         │
│  • Zod schema validation                                   │
│  • 15+ safe components                                     │
│  • Streaming support                                      │
│  • Cross-platform (React, Vue, Svelte)                     │
│  • Actions & events                                       │
├─────────────────────────────────────────────────────────────┤
│                      CANVAS RENDERER                          │
│  • Exact Pretext coordinates                               │
│  • React components from catalog                           │
│  • Zero DOM manipulation                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Component Catalog

### Text Components
| Component | Props | Description |
|-----------|-------|-------------|
| **Header** | content, width, height, bgColor | Header bar with logo |
| **Text** | content, fontSize, color, isGradient, align | Text with styling |
| **Heading** | content, level (h1/h2/h3), isGradient | Heading text |
| **Metric** | label, value, format | Metric display |

### Interactive Components
| Component | Props | Description |
|-----------|-------|-------------|
| **Button** | content, bgColor, width, height, rounded | Clickable button |
| **Link** | content, href, color | Clickable link |
| **Input** | placeholder, type, label | Text input field |
| **Select** | options[], label | Dropdown select |

### Layout Components
| Component | Props | Description |
|-----------|-------|-------------|
| **Card** | title, description, bgColor, borderColor | Card container |
| **Container** | bgColor, padding, maxWidth | Container wrapper |
| **Stack** | direction, gap, align | Flex layout |
| **Grid** | columns, gap | Grid layout |

### Media Components
| Component | Props | Description |
|-----------|-------|-------------|
| **Badge** | content, color | Badge/tag |
| **Image** | src, alt, width, height | Image display |
| **Icon** | name, size, color | Icon display |

---

## 🐝 AI Swarm System

| Agent | Task | Focus |
|-------|------|-------|
| 🏗️ **Architect** | Header + Hero | Layout, positioning |
| 🎨 **Designer** | Feature Cards | Visual design |
| ✍️ **Content** | Body Text | Copy, messaging |
| 💻 **Frontend** | CTA + Footer | Conversion |
| ✨ **Enhancer** | Polish | Effects, gradients |

### Swarm Pipeline
```
1. Agent generates A2UI-style JSON spec
2. JSON validated against component catalog
3. Pretext pre-measures all text positions
4. JSON Render renders components safely
5. Canvas/React outputs final UI
```

---

## 🔒 Security Model

1. **Declarative Only** - AI generates JSON data, not code
2. **Component Catalog** - Only 15 pre-approved components
3. **Zod Validation** - All props rigorously type-checked
4. **No eval()** - Components rendered via React safely
5. **Pretext Isolation** - Text measured without DOM access
6. **A2UI Trust Ladder** - Security in custom components

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

| Resource | URL |
|----------|-----|
| **GitHub** | https://github.com/Franzferdinan51/pretext-generativeUI-Toolkit |
| **Pretext** | https://github.com/chenglou/pretext |
| **JSON Render** | https://github.com/vercel-labs/json-render |
| **A2UI** | https://github.com/google/A2UI |
| **Live Demo** | http://localhost:3456 |

---

<p align="center">
  Built with ❤️ using <strong>Pretext</strong>, <strong>JSON Render</strong>, and <strong>A2UI</strong>
</p>
