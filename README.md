# Pretext AI UI Toolkit

<p align="center">
  <img src="https://img.shields.io/badge/Pretext-Canvas-blue?style=flat-square" alt="Pretext Canvas">
  <img src="https://img.shields.io/badge/React-18-black?style=flat-square" alt="React 18">
  <img src="https://img.shields.io/badge/TypeScript-5-red?style=flat-square" alt="TypeScript 5">
  <img src="https://img.shields.io/badge/LM_Studio-Local_AI-green?style=flat-square" alt="LM Studio">
  <img src="https://img.shields.io/badge/Auto_Healing-Enabled-purple?style=flat-square" alt="Auto Healing">
</p>

<p align="center">
  <strong>🎨 AI-Controlled Generative UI with Auto-Healing</strong><br>
  AI is the runtime engine. Character-level canvas rendering with Pretext.<br>
  Every component, every interaction — controlled by AI. Errors auto-healed.
</p>

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server (Demo mode)
npm run dev

# Start with Auto-Healing demo
npm run dev -- --port 3456
# Then visit: http://localhost:3456/?mode=autoheal
```

---

## 🔧 Auto-Healing Architecture

**The key innovation**: When errors occur, AI automatically detects and fixes them in real-time.

### How Auto-Healing Works:

```
User loads page
    ↓
AI generates entire UI as JSON (streams live)
    ↓
Pretext measures all text positions (zero DOM reflow!)
    ↓
Canvas renders EVERYTHING
    ↓
Error occurs (parse, network, render, etc.)
    ↓
Error Boundary catches it
    ↓
AI receives error context
    ↓
AI generates fix (JSON patches)
    ↓
Components updated automatically
    ↓
No page refresh! User never notices.
```

### Error Types Handled:

| Type | Description | Auto-heal |
|------|-------------|-----------|
| `react` | React render error | ✅ Yes |
| `canvas` | Canvas draw error | ✅ Yes |
| `network` | Network/API error | ✅ Yes |
| `parse` | JSON parse error | ✅ Yes |

---

## 🎨 Generative UI - AI Controls EVERYTHING

**The AI is the runtime engine.** It generates, controls, and updates the entire UI in real-time.

### How It Works:

```
User loads page
    ↓
AI generates entire UI as JSON (streams live)
    ↓
Pretext measures all text positions (zero DOM reflow!)
    ↓
Canvas renders EVERYTHING
    ↓
User clicks/interacts
    ↓
Event sent to AI
    ↓
AI updates UI (streams changes)
    ↓
Pretext re-measures → Canvas re-renders
```

### AI Controls:
- 📦 **Every component** - header, text, buttons, cards, inputs
- 🎨 **All styles** - colors, fonts, sizes, positions
- ✨ **All interactions** - hover, click, focus
- 🖱️ **Mouse tracking** - AI knows cursor position
- 🔄 **Real-time updates** - UI changes as AI thinks
- 🩹 **Error recovery** - AI fixes its own mistakes

---

## 🤖 Agent-Friendly API

Designed for AI agents to control UI programmatically:

```typescript
import { useAutoHealingUI } from './ai/AutoHealingUI'

const ui = useAutoHealingUI({
  lmStudioUrl: 'http://100.116.54.125:1234',
  lmStudioKey: 'sk-lm-...',
  model: 'qwen3.5-27b',
  autoHeal: true,
  maxRetries: 3
})

// Generate UI
await ui.generateUI('Create a dashboard with charts')

// Access state
const { components, errors, aiThinking, isHealing } = ui

// Manual control
ui.updateComponent('header-1', { content: 'New Title' })
ui.removeComponent('broken-card')
ui.forceHeal()
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│              USER INTERFACE              │
│           (Canvas Element)               │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│           PRETEXT ENGINE                  │
│    Text measurement without DOM reflow     │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│             AI RUNTIME                   │
│     (LM Studio / Qwen 3.5 27B)          │
│                                         │
│   • Generates component JSON             │
│   • Handles all interactions            │
│   • Updates UI state in real-time       │
│   • Streams thinking process             │
│   • AUTO-HEALS ERRORS ✨                │
└─────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
pretext-generative-ui-toolkit/
├── src/
│   ├── ai/                   # AI Auto-Healing System ⭐
│   │   ├── AutoHealingUI.tsx # Core auto-healing hook
│   │   └── index.ts
│   ├── pretext/              # Pretext text measurement
│   │   ├── PretextCanvas.tsx
│   │   └── PretextStream.tsx
│   ├── components/           # Smart UI components
│   │   ├── SmartMessage.tsx
│   │   ├── VoteCard.tsx
│   │   └── ...
│   ├── effects/              # Visual effects
│   │   ├── ParticleEmitter.tsx
│   │   ├── GradientMesh.tsx
│   │   └── GlowBorder.tsx
│   ├── magicui/              # MagicUI components
│   │   ├── AnimatedGrid.tsx
│   │   ├── BentoGrid.tsx
│   │   └── WordRotate.tsx
│   ├── streaming/            # Streaming components
│   │   ├── StreamableText.tsx
│   │   └── LoadingStates.tsx
│   ├── webui/                # Auto-Healing Demo ⭐
│   │   └── App.tsx
│   └── skills/               # OpenClaw Skills
│       └── generative-ui/
│           └── SKILL.md
├── docs/
└── package.json
```

---

## 🔑 Key Features

### Zero DOM Reflow with Pretext

```typescript
import { prepare, layout } from '@chenglou/pretext'

// Pretext measures text WITHOUT touching DOM
const prepared = prepare(text, '16px Inter')
const measured = layout(prepared, maxWidth, lineHeight)

// Render on canvas - no DOM reflow!
canvas.width = maxWidth
canvas.height = measured.height

for (const line of measured.lines) {
  ctx.fillText(line.text, line.x, line.y)
}
```

### AI as Runtime Engine with Auto-Healing

```typescript
// AI generates component JSON
const response = await fetch('/api/lm-studio/v1/chat/completions', {
  method: 'POST',
  messages: [{
    role: 'system',
    content: 'Generate a UI with buttons, cards, and text...'
  }]
})

// Canvas renders the AI's output
for (const component of aiOutput.components) {
  renderToCanvas(component)
}

// Errors? AI heals automatically!
ui.errors.forEach(error => {
  // Auto-heal triggers if autoHeal: true
})
```

### Error Recovery Flow

```typescript
// 1. Error occurs (parse error, network failure, etc.)
// 2. ErrorBoundary catches it
<UIErrorBoundary onError={(e) => ui.reportError(e)}>
  <CanvasRenderer ... />
</UIErrorBoundary>

// 3. AI receives error context
const systemPrompt = `Fix this error: ${error.message}
Current components: ${JSON.stringify(components)}`

// 4. AI generates fix
await healError(error)

// 5. Components updated - no refresh!
setComponents(fixedComponents)
```

---

## 🤖 Technology Stack

| Technology | Purpose |
|------------|---------|
| [Pretext](https://github.com/chenglou/pretext) | Zero-reflow text measurement |
| [React](https://react.dev/) | UI framework |
| [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) | Rendering engine |
| [LM Studio](https://lmstudio.ai/) | Local AI inference |
| [Qwen 3.5](https://huggingface.co/qwen) | AI model |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |

---

## 📖 Documentation

- [Auto-Healing Guide](src/skills/generative-ui/SKILL.md) - Full auto-healing documentation
- [Pretext Guide](docs/PRETEXT_GUIDE.md) - Deep dive into Pretext
- [Components](docs/COMPONENTS.md) - Component catalog
- [AI Integration](docs/AI_INTEGRATION.md) - AI setup guide
- [Streaming](docs/STREAMING.md) - Streaming components

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Run with Docker

```bash
docker build -t pretext-ai-ui .
docker run -p 3456:3456 pretext-ai-ui
```

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

MIT License

---

## 🙏 Acknowledgments

- [Pretext](https://github.com/chenglou/pretext) - Zero-reflow text measurement
- [shadcn/ui](https://ui.shadcn.com/) - UI component inspiration
- [MagicUI](https://magicui.design/) - Text effects inspiration
- [Morphic](https://github.com/miurla/morphic) - Generative UI inspiration
- [LM Studio](https://lmstudio.ai/) - Local AI inference

---

<p align="center">
  Built with ❤️ using Pretext, React, Canvas, and AI<br>
  <strong>🩹 Auto-Healing enabled</strong><br>
  <a href="https://github.com/Franzferdinan51/pretext-generativeUI-Toolkit">GitHub</a>
</p>
