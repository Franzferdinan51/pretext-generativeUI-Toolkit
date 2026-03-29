# Pretext AI UI Toolkit

<p align="center">
  <img src="https://img.shields.io/badge/Preact-Zero%20Reflow-blue?style=flat-square" alt="Pretext">
  <img src="https://img.shields.io/badge/AI-Swarm%20Powered-purple?style=flat-square" alt="AI Swarm">
  <img src="https://img.shields.io/badge/Fully-AI%20Controlled-green?style=flat-square" alt="AI Controlled">
</p>

<p align="center">
  <strong>🎨 FULLY AI-POWERED GENERATIVE UI WITH PRETEXT</strong><br>
  EVERY component, tab, button, and text rendered via Pretext.<br>
  Zero DOM reflow. Canvas rendering. AI controls everything.
</p>

---

## 🚀 Live Demo

**Try it:** http://localhost:3456

🐝 **AI Swarm** builds a complete website where **EVERY pixel** is controlled by AI using **Pretext** for zero-reflow text measurement!

---

## ✨ What is Pretext?

**[Pretext](https://github.com/chenglou/pretext)** is a JavaScript library for **character-level text measurement** without DOM reflow:

```javascript
import { prepare, layout } from '@chenglou/pretext'

// Measure text WITHOUT touching the DOM
const prepared = prepare('Hello world', '16px Inter')
const { height } = layout(prepared, 400, 24) // ~0.09ms!
```

**Why Pretext?**
- ⚡ **Zero DOM Reflow** - Measure text without triggering expensive layout recalculation
- 🎯 **Pre-calculated Positions** - Know exact x,y,width,height before render
- 🎨 **Canvas Perfect** - Everything drawn at exact coordinates
- 🚀 **~0.09ms** per measurement (cached!)

---

## 🐝 AI Swarm System

### Every Component is AI-Generated

| Agent | Provider | Model | Task |
|-------|----------|-------|------|
| 🏗️ **Architect** | Kimi | K2.5 | Header + Hero |
| 🎨 **Designer** | Kimi | K2.5 | Features + Stats |
| ✍️ **Content** | Kimi | K2.5 | Toolkit + How It Works |
| 💻 **Frontend** | MiniMax | M2.7 | CTA + Footer |
| ✨ **Enhancer** | MiniMax | M2.7 | Polish |

### How It Works

```
🐝 AI Swarm starts
    ↓
📝 PRETEXT MEASURES all text positions
    ↓
🎨 AI generates components at exact x,y coordinates
    ↓
✨ Enhancer adds polish with Pretext
    ↓
✅ QA enforces quality standards
    ↓
🚀 Complete AI-powered website rendered
```

---

## 🎯 Fully AI-Controlled UI

**NOT just website building** - the ENTIRE app is AI-controlled:

### AI Controls:
- ✅ **Every Text Component** - Pretext measures position before render
- ✅ **Every Button** - AI generates labels, positions, actions
- ✅ **Every Tab/Navigation** - AI decides structure
- ✅ **Every Layout** - AI positions everything via Pretext coordinates
- ✅ **Every Visual Effect** - Gradient texts, glows, hover states
- ✅ **Loading States** - AI generates progress indicators
- ✅ **Logs/Status** - AI decides what to display

### Pretext Integration:
```javascript
// AI generates layout instruction
const instruction = {
  text: "Build UI with AI",
  x: 50,
  y: 100,
  width: 1100,
  fontSize: 48,
  style: "gradient"
}

// Pretext measures WITHOUT DOM touch
const measured = layout(prepare(instruction.text, `${instruction.fontSize}px Inter`), instruction.width, 24)

// Canvas renders at exact position
ctx.fillText(instruction.text, measured.x, measured.y)
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **[Pretext](https://github.com/chenglou/pretext)** | Zero-reflow text measurement |
| **React** | UI framework (canvas only) |
| **Canvas API** | Full UI rendering |
| **Kimi K2.5** | Primary AI (via Moonshot API) |
| **MiniMax M2.7** | Quality enhancement |

---

## 📐 Architecture

```
┌─────────────────────────────────────────┐
│         AI SWARM ORCHESTRATOR           │
├─────────────────────────────────────────┤
│  🏗️ Architect → Pretext measures        │
│  🎨 Designer → Pretext measures        │
│  ✍️ Content → Pretext measures          │
│  💻 Frontend → Pretext measures        │
│  ✨ Enhancer → Pretext measures        │
├─────────────────────────────────────────┤
│         CANVAS RENDERER                  │
│  All UI drawn at exact Pretext coords   │
└─────────────────────────────────────────┘
```

---

## 🔧 API Keys

| Provider | Key |
|----------|-----|
| **Kimi** | `sk-kimi-...` |
| **MiniMax** | `sk-cp-...` |

---

## 🌐 Links

- **GitHub**: https://github.com/Franzferdinan51/pretext-generativeUI-Toolkit
- **Pretext**: https://github.com/chenglou/pretext
- **Live Demo**: http://localhost:3456

---

## 📄 License

MIT License

---

<p align="center">
  <strong>Built with ❤️ using <a href="https://github.com/chenglou/pretext">Pretext</a>, Canvas, and AI Swarm</strong>
</p>
