# Pretext AI UI Toolkit

<p align="center">
  <img src="https://img.shields.io/badge/Pretext-Canvas-blue?style=flat-square" alt="Pretext Canvas">
  <img src="https://img.shields.io/badge/React-18-black?style=flat-square" alt="React 18">
  <img src="https://img.shields.io/badge/TypeScript-5-red?style=flat-square" alt="TypeScript 5">
  <img src="https://img.shields.io/badge/LM_Studio-Local_AI-green?style=flat-square" alt="LM Studio">
</p>

<p align="center">
  <strong>🎨 AI-Controlled Generative UI with Pretext</strong><br>
  AI is the runtime engine. Character-level canvas rendering with Pretext. Every component, every interaction, controlled by AI.
</p>

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser to `http://localhost:3456` - AI builds the entire UI on load!

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

### Pretext Integration:
- **Character-level positioning** - exact pixel control
- **Zero DOM reflow** - text measured without touching the DOM
- **Pre-calculated heights** - smooth streaming animations
- **Canvas rendering** - everything drawn, not DOM elements

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
└─────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
pretext-generative-ui-toolkit/
├── src/
│   ├── pretext/          # Pretext text measurement
│   │   ├── PretextCanvas.tsx
│   │   └── PretextStream.tsx
│   ├── components/       # Smart UI components
│   │   ├── SmartMessage.tsx
│   │   ├── VoteCard.tsx
│   │   ├── CodeBlock.tsx
│   │   └── ...
│   ├── effects/          # Visual effects
│   │   ├── ParticleEmitter.tsx
│   │   ├── GradientMesh.tsx
│   │   └── GlowBorder.tsx
│   ├── magicui/          # MagicUI components
│   │   ├── AnimatedGrid.tsx
│   │   ├── BentoGrid.tsx
│   │   └── WordRotate.tsx
│   ├── streaming/         # Streaming components
│   │   ├── StreamableText.tsx
│   │   └── LoadingStates.tsx
│   ├── ai/               # AI components
│   │   ├── AIGenerator.tsx
│   │   └── ContentDetector.tsx
│   └── webui/            # Web UI demo
│       └── App.tsx       # Main AI-controlled app
├── docs/                 # Documentation
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

### AI as Runtime Engine

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
```

### Mouse Tracking

```typescript
// Track mouse position
const handleMouseMove = (e: MouseEvent) => {
  const pos = { x: e.clientX, y: e.clientY }
  // Send to AI for context
  ai.updateContext({ mousePos: pos })
}
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
  <a href="https://github.com/Franzferdinan51/pretext-generativeUI-Toolkit">GitHub</a>
</p>
