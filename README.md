# Pretext + A2UI Toolkit

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

### Live Demos
- [chenglou.me/pretext](https://chenglou.me/pretext/) - Official Pretext demos
- [somnai-dreams/pretext-demos](https://somnai-dreams.github.io/pretext-demos/) - Community demos

### Pretext Layout Methods

| Method | What It Does |
|--------|-------------|
| `masonry()` | Auto-calculated column heights |
| `floatAround()` | Text flows around obstacles |
| `shrinkwrap()` | Find tightest width |
| `balanced()` | Equal line widths |
| `virtualList()` | Pre-calculate without DOM |

### API

```javascript
import { prepare, layout, prepareWithSegments, layoutWithLines, layoutNextLine, walkLineRanges } from '@chenglou/pretext'

// Fast: ~0.09ms (cached)
const prepared = prepare('Hello world', '16px Inter')
const { height } = layout(prepared, 400, 24) // pure math!

// Line positions
const { lines } = layoutWithLines(prepared, 320, 26)

// Flow around obstacle
layoutNextLine(prepared, cursor, width) // iterator
```

---

## 🤖 A2UI - Google's Agent UI Standard

Declarative JSON format. Security-first. Framework-agnostic.

```javascript
const spec = {
  version: "0.8",
  root: "element-id",
  elements: {
    "element-id": { type: "Card", props: { title: "Hello" } }
  }
}
```

### Use Cases
- Dynamic forms
- Remote sub-agents
- Adaptive workflows

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| **Pretext** | Text measurement + layouts |
| **A2UI** | Agent UI standard |
| **React** | UI framework |
| **MiniMax** | AI generation |

---

## 🌐 Links

- [Pretext](https://github.com/chenglou/pretext)
- [Pretext Demos](https://somnai-dreams.github.io/pretext-demos/)
- [A2UI](https://github.com/google/A2UI)
- [GitHub](https://github.com/Franzferdinan51/pretext-generativeUI-Toolkit)

---

<p align="center">
  📐 Pretext • 🤖 A2UI • ⚡ 0.09ms
</p>
