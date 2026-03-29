# Pretext AI UI Toolkit

<p align="center">
  <img src="https://img.shields.io/badge/Pretext-Zero%20Reflow-blue?style=flat-square" alt="Pretext">
  <img src="https://img.shields.io/badge/JSON%20Render-Safe%20UI-purple?style=flat-square" alt="JSON Render">
  <img src="https://img.shields.io/badge/A2UI-Agent%20Standard-green?style=flat-square" alt="A2UI">
</p>

<p align="center">
  <strong>🎨 AI-Powered Generative UI</strong><br>
  Pretext + JSON Render + A2UI for zero-reflow, safe, agent-generated UIs
</p>

---

## 🚀 Live Demo

**Try it:** http://localhost:3456

---

## ✨ Core Technologies

### [Pretext](https://github.com/chenglou/pretext)
**Zero DOM reflow text measurement**

```javascript
import { prepare, layout } from '@chenglou/pretext'
const prepared = prepare('Hello', '16px Inter')
const { height } = layout(prepared, 400, 24) // ~0.09ms!
```

### [JSON Render](https://github.com/vercel-labs/json-render)
**Safe generative UI framework by Vercel**

```javascript
// AI generates JSON → Components render safely
const spec = { root: 'card-1', elements: { 'card-1': { type: 'Card', props: { title: 'Hello' } } } }
<Renderer spec={spec} registry={registry} />
```

### [Google A2UI](https://github.com/google/A2UI)
**Google's open standard for agent-generated UIs**

- Security-first declarative JSON format
- Agents can only use pre-approved components
- Framework-agnostic (React, Flutter, Lit, etc.)
- Incremental updates supported

**Core philosophies:**
- Security first: Declarative data, not executable code
- LLM-friendly: Flat component list, easy for AI to generate
- Framework-agnostic: Same JSON renders everywhere
- Incremental: Agents can update UI progressively

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         AI SWARM ORCHESTRATOR            │
│   MiniMax M2.7 (5 specialized agents)    │
├─────────────────────────────────────────┤
│         A2UI LAYER                      │
│   Declarative JSON spec format           │
│   Component catalog validation            │
├─────────────────────────────────────────┤
│         PRETEXT LAYER                    │
│   Zero-reflow text measurement          │
│   Character-level positioning            │
├─────────────────────────────────────────┤
│         JSON RENDER LAYER               │
│   Safe component catalog                │
│   Zod schema validation                 │
├─────────────────────────────────────────┤
│         CANVAS / REACT RENDERER        │
│   Exact x,y coordinates from Pretext    │
│   Components from JSON Render catalog   │
└─────────────────────────────────────────┘
```

---

## 🐝 AI Swarm System

| Agent | Provider | Task |
|-------|----------|------|
| 🏗️ **Architect** | MiniMax M2.7 | Header + Hero |
| 🎨 **Designer** | MiniMax M2.7 | Features + Stats |
| ✍️ **Content** | MiniMax M2.7 | Toolkit + How It Works |
| 💻 **Frontend** | MiniMax M2.7 | CTA + Footer |
| ✨ **Enhancer** | MiniMax M2.7 | Polish |

---

## 🔒 Security Model (A2UI-style)

1. **Declarative Only** - AI generates JSON, not code
2. **Component Catalog** - Only pre-approved components allowed
3. **Type Validation** - Zod schemas validate all props
4. **No eval()** - Components rendered safely via React
5. **Sandboxed** - Canvas rendering isolates content

---

## 📦 Component Catalog

```javascript
const catalog = defineCatalog(schema, {
  components: {
    Header: { props: z.object({ content: z.string() }) },
    Text: { props: z.object({ content: z.string(), fontSize: z.number() }) },
    Button: { props: z.object({ content: z.string(), action: z.string() }) },
    Card: { props: z.object({ title: z.string(), description: z.string() }) },
  }
})
```

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
