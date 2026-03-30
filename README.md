# Pretext AI UI Toolkit - A2UI Deep Integration

<p align="center">
  <img src="https://img.shields.io/badge/A2UI-Security%20First-blue?style=flat-square" alt="A2UI">
  <img src="https://img.shields.io/badge/Pretext-Zero%20Reflow-purple?style=flat-square" alt="Pretext">
  <img src="https://img.shields.io/badge/Framework-Agnostic-green?style=flat-square" alt="Framework">
</p>

<p align="center">
  <strong>🤖 AI-Powered Generative UI with A2UI Standard</strong><br>
  Security-first • LLM-friendly • Framework-agnostic
</p>

---

## 🚀 Live Demo

**Try it:** http://localhost:3456

---

## 🤖 A2UI - Google's Agent UI Standard

A2UI is Google's open standard for **agent-generated UIs**. It allows agents to "speak UI" through a declarative JSON format.

### Core Philosophies

| Principle | Description |
|-----------|-------------|
| **Security First** | Declarative JSON data, NOT executable code. Client maintains catalog of trusted components. |
| **LLM-Friendly** | Flat list of components with ID references. Easy to generate incrementally. |
| **Framework-Agnostic** | Same JSON renders on React, Flutter, Lit, SwiftUI, Angular, etc. |
| **Incrementally Updatable** | Progressive rendering. Agent makes changes based on conversation. |

### A2UI Format

```javascript
// A2UI Spec Structure
const spec = {
  version: "0.8",
  root: "component-id",
  elements: {
    "component-id": {
      type: "ComponentName",
      props: { key: "value" },
      children: ["child-id"]
    }
  }
}
```

### A2UI Flow

```
Agent → JSON Payload → Transport (A2A, AG UI) → Client Renderer → Native UI
```

### Use Cases

1. **Dynamic Data Collection** - Forms, date pickers, sliders based on context
2. **Remote Sub-Agents** - Orchestrator delegates to specialized agents
3. **Adaptive Workflows** - Approval dashboards, data visualizations

---

## 📐 Pretext Integration

Pretext provides **zero-reflow text measurement** (~0.09ms cached).

```javascript
import { prepare, layout, prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

// Fast measurement
const prepared = prepare('Hello world', '16px Inter')
const { height } = layout(prepared, 400, 24) // pure math!

// Exact positions
const { lines } = layoutWithLines(prepared, 320, 26)
```

---

## 🏛️ AI Council Swarm (45 Councilors)

| Category | Councilors |
|----------|-----------|
| **Foundation** | Speaker, Technocrat, Ethicist, Pragmatist, Skeptic |
| **Strategy** | Economist, Product Manager, Marketing, Finance |
| **Technical** | Architect, DevOps, Security, QA |
| **Creative** | Visionary, Innovation, Psychologist |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **A2UI** | Agent UI standard (Google) |
| **Pretext** | Zero-reflow text |
| **React** | UI framework |
| **MiniMax** | AI generation |
| **Tailwind** | Styling |

---

## 🌐 Links

- [A2UI](https://github.com/google/A2UI)
- [Pretext](https://github.com/chenglou/pretext)
- [GitHub](https://github.com/Franzferdinan51/pretext-generativeUI-Toolkit)
