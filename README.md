# Pretext AI UI Toolkit

<p align="center">
  <img src="https://img.shields.io/badge/Pretext-Zero%20Reflow-blue?style=flat-square" alt="Pretext">
  <img src="https://img.shields.io/badge/JSON%20Render-Safe%20UI-purple?style=flat-square" alt="JSON Render">
  <img src="https://img.shields.io/badge/A2UI-Agent%20Standard-green?style=flat-square" alt="A2UI">
</p>

<p align="center">
  <strong>📐 AI-Powered Generative UI with Zero-Reflow Text</strong><br>
  Pretext + JSON Render + A2UI + AI Council Swarm
</p>

---

## 🚀 Live Demo

**Try it:** http://localhost:3456

---

## ✨ Core Technologies

### 📐 [Pretext](https://github.com/chenglou/pretext) - Zero-Reflow Text Measurement

**Character-level text measurement without DOM reflow (~0.09ms)**

```javascript
import { prepare, layout, prepareWithSegments, layoutWithLines, layoutNextLine, walkLineRanges } from '@chenglou/pretext'

// Fast: ~0.09ms per measurement (cached!)
const prepared = prepare('Hello world', '16px Inter')
const { height } = layout(prepared, 400, 24) // pure math!

// Exact line positions for Canvas
const { lines } = layoutWithLines(prepared, 320, 26)

// Flow text around obstacles
layoutNextLine(prepared, cursor, width) // iterator for variable-width layout

// Shrinkwrap - find tightest width
walkLineRanges(prepared, 10000, line => { /* track maxWidth */ })
```

### 🎨 [JSON Render](https://github.com/vercel-labs/json-render) - Safe Components

**Generative UI with guardrails and Zod validation**

```javascript
import { defineCatalog, defineRegistry, Renderer, JSONUIProvider } from '@json-render/react'

const catalog = defineCatalog(schema, {
  components: {
    Card: { props: z.object({ title: z.string() }), description: 'Card' },
    Button: { props: z.object({ content: z.string() }), description: 'Button' },
  }
})

const { registry } = defineRegistry(catalog, { components })

<JSONUIProvider registry={registry}>
  <Renderer spec={spec} registry={registry} />
</JSONUIProvider>
```

### 🤖 [A2UI](https://github.com/google/A2UI) - Agent UI Standard

**Google's open standard for agent-generated UIs**

```javascript
// A2UI flat spec format
const spec = {
  root: 'card-1',
  elements: {
    'card-1': { type: 'Card', props: { title: 'Hello' }, children: ['button-1'] },
    'button-1': { type: 'Button', props: { content: 'Click' } },
  }
}
```

---

## 🏛️ AI Council Swarm Integration

### 11 Deliberation Modes

| Mode | Emoji | Purpose |
|------|-------|---------|
| Legislative | ⚖️ | Debate + Vote |
| Deep Research | 🧠 | Multi-vector investigation |
| Swarm Hive | 🐝 | Task decomposition |
| Swarm Coding | 💻 | Software engineering |
| Prediction | 🔮 | Superforecasting |
| Inquiry | ❓ | Rapid Q&A |
| Emergency | 🚨 | Crisis response |
| Risk | 📊 | Risk analysis |
| Consensus | 🤝 | Find agreement |
| Strategic | 🎯 | Long-term planning |
| Vision | 👁️ | Image analysis |

### 45 Specialized Councilors

| Category | Councilors |
|----------|-----------|
| **Foundation** | Speaker, Technocrat, Ethicist, Pragmatist, Skeptic, Sentinel, Visionary, Historian, Diplomat, Journalist, Psychologist, Coder |
| **Business** | Economist, Product Manager, Marketing Expert, Finance Expert, Risk Manager |
| **Technical** | Solutions Architect, DevOps Engineer, Security Expert, Performance Engineer, QA Engineer |
| **User & Community** | User Advocate, Customer Support, Community Manager, Accessibility Expert |
| **Creative & Innovation** | Visionary, Innovation Coach, Propagandist, Psychologist |
| **Legal & Compliance** | Legal Expert, Privacy Officer |
| **Agriculture** | Botanist, Geneticist |

---

## ⚡ Speed: Parallel Execution

- **5 batches × 3 agents = 15 parallel agents**
- `Promise.all()` for concurrent execution
- Consensus voting system
- Live benchmark display

---

## 📦 Component Catalog

### Standard Components
| Component | Description |
|-----------|-------------|
| Header | Header bar with logo |
| Heading | h1/h2/h3 with gradient support |
| Text | Text with styling options |
| Button | CTA button |
| Card | Feature/info card |
| Stack | Flex layout (horizontal/vertical) |
| Grid | CSS Grid layout |
| Metric | Stats display |
| Badge | Tag/label |

### Pretext-Specific Components
| Component | Description |
|-----------|-------------|
| **CanvasText** | Renders measured text on Canvas with gradient |
| **StreamingText** | Character-by-character animation as Pretext measures |
| **FlowText** | Text flowing around floating obstacle/image |

---

## 🐝 Swarm Workflow

```
1. 📋 PLAN → Architect, Product Manager, Visionary
2. 🎨 DESIGN → Designer, User Advocate, Accessibility
3. ⚙️ IMPLEMENT → Coder, Backend, Frontend
4. 🔍 REVIEW → QA Engineer, Security Expert, Performance
5. 🚀 DEPLOY → DevOps Engineer, Sentinel
```

---

## 🧬 Pretext APIs

| API | Purpose |
|-----|---------|
| `prepare(text, font)` | One-time text analysis + measurement |
| `layout(prepared, width, lineHeight)` | Calculate height (hot path, ~0.09ms) |
| `prepareWithSegments(text, font)` | Rich segment structure for line layout |
| `layoutWithLines(prepared, width, lineHeight)` | Get all lines with exact positions |
| `layoutNextLine(prepared, cursor, width)` | Iterator for variable-width layout (flow text) |
| `walkLineRanges(prepared, width, callback)` | Low-level iteration, shrinkwrap support |
| `clearCache()` | Release accumulated cache |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Pretext** | Zero-reflow text measurement |
| **JSON Render** | Safe component rendering |
| **A2UI** | Agent UI standard |
| **React** | UI framework |
| **Canvas API** | Pretext rendering |
| **MiniMax M2.7** | AI generation |
| **Tailwind CSS** | Styling |
| **Zod** | Type validation |

---

## 🚀 Quick Start

```bash
cd ~/Desktop/Pretext-Generative-UI-Toolkit
npm run dev
# Open http://localhost:3456
```

---

## 📁 Project Structure

```
Pretext-Generative-UI-Toolkit/
├── src/
│   └── webui/
│       └── App.tsx          # Main app with all integrations
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🌐 Links

| Resource | URL |
|----------|-----|
| **GitHub** | https://github.com/Franzferdinan51/pretext-generativeUI-Toolkit |
| **Pretext** | https://github.com/chenglou/pretext |
| **JSON Render** | https://github.com/vercel-labs/json-render |
| **A2UI** | https://github.com/google/A2UI |
| **AI Council** | https://github.com/Franzferdinan51/AI-Bot-Council-Concensus |

---

<p align="center">
  📐 Built with Pretext • 🏛️ Powered by AI Council Swarm • ⚡ Zero Reflow
</p>
