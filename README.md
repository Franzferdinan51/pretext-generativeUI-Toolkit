# Pretext AI UI Toolkit

<p align="center">
  <img src="https://img.shields.io/badge/Pretext-Canvas-blue?style=flat-square" alt="Pretext Canvas">
  <img src="https://img.shields.io/badge/React-18-black?style=flat-square" alt="React 18">
  <img src="https://img.shields.io/badge/TypeScript-5-red?style=flat-square" alt="TypeScript 5">
  <img src="https://img.shields.io/badge/Tailwind-3-cyan?style=flat-square" alt="Tailwind 3">
</p>

<p align="center">
  <strong>A comprehensive AI-powered generative UI toolkit</strong><br>
  Character-level canvas rendering with Pretext, streaming components, and beautiful visual effects.
</p>

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser to `http://localhost:5173` to see the comprehensive demo showcase.

---

## 🎯 Demo Showcase

The demo showcases **every feature** of the toolkit:

### 📐 Pretext Core
- **Character-level canvas rendering** - Zero DOM reflow, exact pixel control
- **Streaming text** - Pre-measured text streaming with cursor animation

### 🤖 AI Components
- **SmartMessage** - Auto-detects content type (vote, code, list, table, summary)
- **Content rendering** - Appropriate components for each content type

### ⚡ Streaming Components
- **StreamableText** - Character-by-character streaming
- **Loading states** - LoadingDots, LoadingSpinner, LoadingBars, LoadingPulse, LoadingOrb

### ✨ Visual Effects
- **ParticleEmitter** - Energy, constellation, and stars effects
- **GradientMesh** - Animated gradient backgrounds
- **GlowBorder** - Glowing borders
- **Shimmer/Skeleton** - Loading placeholders

### 🎨 UI Primitives (shadcn-style)
- **Button** - Multiple variants and sizes
- **Card** - Headers, titles, content
- **Badge** - Status badges
- **Input** - Text inputs

### 🔮 MagicUI Effects
- **WordRotate** - Rotating word animation
- **TextGradient** - Gradient text
- **AnimatedGrid** - Animated background grid
- **FadeIn** - Staggered fade-in
- **BentoGrid** - Modern bento layout
- **OrbitingShapes** - Orbiting shapes animation

### 📐 Layout Components
- **AdaptiveLayout** - Responsive layout
- **MasonryLayout** - Pinterest-style grid

### 📊 Data Visualization
- **DataChart** - Bar, pie, and line charts
- **DataTable** - Markdown table rendering
- **VoteCard** - Voting result display

### 🛠️ Agent Control
- **LM Studio Agent** - Direct AI chat integration
- **MCP Tools** - Tool execution panel

---

## 📁 Project Structure

```
pretext-generative-ui-toolkit/
├── src/
│   ├── components/       # Core components (SmartMessage, DataChart, etc.)
│   ├── magicui/          # MagicUI effects (WordRotate, TextGradient, etc.)
│   ├── effects/          # Visual effects (ParticleEmitter, GlowBorder, etc.)
│   ├── shadcn/           # UI primitives (Button, Card, Input, etc.)
│   ├── layout/           # Layout components (Masonry, Adaptive, etc.)
│   ├── streaming/        # Streaming components and loading states
│   ├── agents/           # Agent integrations (LM Studio)
│   ├── mcp/              # MCP tool executor
│   ├── hooks/            # Custom React hooks
│   ├── pages/
│   │   ├── DemoShowcase.tsx      # Main demo page
│   │   └── DemoComponents/       # Individual demo components
│   ├── webui/            # Original webui (App.tsx, Playground, etc.)
│   └── index.tsx         # Entry point
├── examples/
│   ├── basic/            # Basic usage examples
│   └── advanced/         # Advanced integration examples
├── docs/                 # Documentation
└── package.json
```

---

## 🔑 Key Features

### Zero DOM Reflow with Pretext

```tsx
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

// Prepare once (expensive)
const prepared = prepareWithSegments(text, '15px Inter')

// Layout multiple times (cached math, ~0.09ms)
const { lines } = layoutWithLines(prepared, 600, 22)

// Render on canvas
for (const line of lines) {
  ctx.fillText(line.text, line.x, line.y)
}
```

### Automatic Content Detection

```tsx
<SmartMessage content="```js\nconst x = 42;\n```" />
// Automatically renders as CodeBlock

<SmartMessage content="| Name | Value |\n| A | 1 |" />
// Automatically renders as DataTable

<SmartMessage content="In summary: 1) Fast 2) Simple" />
// Automatically renders as SummaryCard
```

---

## 📚 Documentation

See [docs/FULL_DOCUMENTATION.md](docs/FULL_DOCUMENTATION.md) for complete API reference and usage examples.

---

## 🎨 Theming

The toolkit uses a dark theme by default with customizable colors:

```css
:root {
  --background: #0a0a0f;
  --surface: #1a1a2e;
  --border: rgba(255, 255, 255, 0.1);
}
```

Custom colors are passed via props:

```tsx
<PretextCanvas color="#8b5cf6" />
<ParticleEmitter color="#06b6d4" />
<LoadingDots color="#ec4899" />
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [Pretext](https://github.com/chenglou/pretext) - Zero-reflow text measurement
- [shadcn/ui](https://ui.shadcn.com/) - UI component inspiration
- [MagicUI](https://magicui.design/) - Text effects inspiration
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

---

<p align="center">
  Built with ❤️ using Pretext, React, and AI
</p>
