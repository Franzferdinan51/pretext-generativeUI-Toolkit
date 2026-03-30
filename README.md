# Pretext + A2UI Toolkit v2

<p align="center">
  <strong>📐 Pretext Layout Engine + 🤖 A2UI Standard</strong><br>
  Zero-reflow text measurement • CSS-replacing layouts • AI-generated UIs
</p>

---

## 🚀 Live Demo

**Try it:** http://localhost:3456

---

## 📐 Pretext - CSS Replacing Layout Engine

**Pretext** measures text without DOM access. Zero reflow. ~0.09ms cached.

### Layout Methods

| Method | What It Does |
|--------|-------------|
| `masonry()` | Auto-calculated column heights |
| `floatAround()` | Text flows around obstacles |
| `shrinkwrap()` | Find tightest width |
| `balanced()` | Equal line widths |
| `virtualList()` | Pre-calculate without DOM |

### API

```javascript
import { prepare, layout, prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

const prepared = prepare('Hello world', '16px Inter')
const { height } = layout(prepared, 400, 24) // ~0.09ms
```

---

## 🤖 A2UI - Agent User Interface

Declarative JSON standard for AI-generated UIs. Security-first, framework-agnostic.

```javascript
const spec = {
  version: "0.8",
  root: "element-id",
  elements: {
    "card": { type: "Card", props: { title: "Hello" }}
  }
}
```

### Based On

- **OpenClaw Live Canvas** - A2UI implementation in production
- **Google A2UI** - Google's agent UI standard
- **steipete's tools** - Production-grade agent tooling

---

## 🛠️ Integrated Technologies

### From OpenClaw
- **A2UI Standard** - Live Canvas declarative UI
- **Multi-agent routing** - Route to specialized agents
- **Skills system** - Composable tool chains

### From steipete
- **Peekaboo** - macOS GUI automation
- **CodexBar** - Token usage monitoring
- **agent-rules** - Shared coding rules for agents
- **Claude Code MCP** - Agent inside agent pattern

### From Google
- **A2UI Spec** - Declarative UI for agents

---

## 🎨 Built With

| Tech | Purpose |
|------|---------|
| **Pretext** | Text measurement + layouts |
| **A2UI** | Agent UI standard |
| **React** | UI framework |
| **MiniMax** | AI generation |

---

## 📦 Components

10 A2UI Components ready:
- Nav, Hero, Section, Grid, Card
- Metric, Step, CodeBlock
- Pricing, FAQ, CTA, Footer

---

## 🌐 Resources

| Resource | Link |
|----------|------|
| **Pretext** | [github.com/chenglou/pretext](https://github.com/chenglou/pretext) |
| **Pretext Demos** | [somnai-dreams.github.io/pretext-demos](https://somnai-dreams.github.io/pretext-demos/) |
| **OpenClaw** | [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw) |
| **A2UI (Google)** | [github.com/google/A2UI](https://github.com/google/A2UI) |
| **steipete tools** | [github.com/steipete](https://github.com/steipete) |
| **agent-rules** | [github.com/steipete/agent-rules](https://github.com/steipete/agent-rules) |
| **Peekaboo** | [github.com/steipete/Peekaboo](https://github.com/steipete/Peekaboo) |

---

<p align="center">
  📐 Pretext • 🤖 A2UI • ⚡ 0.09ms
</p>
