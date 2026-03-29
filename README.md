# Pretext AI UI Toolkit

<p align="center">
  <img src="https://img.shields.io/badge/Pretext-Canvas-blue?style=flat-square" alt="Pretext Canvas">
  <img src="https://img.shields.io/badge/React-18-black?style=flat-square" alt="React 18">
  <img src="https://img.shields.io/badge/TypeScript-5-red?style=flat-square" alt="TypeScript 5">
  <img src="https://img.shields.io/badge/Tailwind-3-cyan?style=flat-square" alt="Tailwind 3">
  <img src="https://img.shields.io/badge/LM_Studio-Local_AI-green?style=flat-square" alt="LM Studio">
</p>

<p align="center">
  <strong>🎨 The world's most advanced AI-powered generative UI toolkit</strong><br>
  Character-level canvas rendering with Pretext, streaming components, beautiful visual effects, and <strong>live AI-controlled UI</strong>.
</p>

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser to `http://localhost:3456` to see the Generative UI demo!

---

## 🎨 Generative UI (NEW!)

**AI controls the entire UI in real-time using Pretext for zero-reflow rendering.**

### How It Works:
```
User clicks button
    ↓
Event sent to AI (LM Studio)
    ↓
AI generates component JSON (streams live)
    ↓
Pretext measures text positions (zero DOM reflow!)
    ↓
Canvas renders everything
    ↓
No DOM manipulation = instant updates!
```

### Features:
- **Pretext** - Character-level text measurement without DOM reflow
- **Canvas rendering** - Everything drawn, not DOM elements
- **AI as runtime** - Controls all UI state
- **Streaming** - Components appear as AI thinks
- **Mouse tracking** - AI knows cursor position

### Demo Buttons:
- 🚀 Landing Page - AI generates full landing page
- 📊 Dashboard - AI generates dashboard with cards
- 🛒 Product Card - AI generates e-commerce components

---

## 🌟 What's New (v1.1.0)

### 🆕 Generative UI Mode
**AI is the runtime engine - controls everything in real-time.**

### 🆕 Pretext + Canvas
- Text streaming with zero DOM reflow
- Character-level positioning
- Pre-calculated heights

### 🆕 Live Website Generation
**Generate complete websites in real-time as AI thinks!**

```
User: "Generate a crypto trading dashboard"
→ AI generates JSON structure in real-time
→ Sections appear as AI streams them
→ Full responsive website with animations
```

### 🆕 Full-Featured WebUI
- **8 Tabs**: Gen UI, Home, Playground, Components, Live Website, Agents, Effects, Settings
- **Particle Backgrounds** with toggle
- **LM Studio Integration** with model selection
- **Real-time Streaming** chat interface

---

## 🎯 Full Feature List

### 📐 Pretext Core
- **PretextCanvas** - Character-level canvas rendering, zero DOM reflow
- **PretextText** - Direct text rendering with exact positioning
- **PretextLayout** - Pre-calculated layouts for streaming
- **PretextStream** - Streaming text with pre-measured heights

### 🤖 AI Components
- **SmartMessage** - Auto-detects content type (vote, code, list, table, chart, summary, question)
- **ContentDetector** - Detects content type from text
- **AIGenerator** - AI-powered content generation
- **LayoutOptimizer** - Optimize text layouts with AI

### ⚡ Streaming Components
- **StreamableText** - Character-by-character streaming with pretext
- **StreamableComponent** - Stream React components
- **StreamableCode** - Stream code with syntax highlighting
- **LoadingDots** - Animated typing dots
- **LoadingSpinner** - Spinning animation
- **LoadingBars** - Audio visualizer bars
- **LoadingPulse** - Pulsing animation
- **LoadingOrb** - Orbiting dots
- **CouncilThinking** - Multi-agent thinking display
- **AudioBars** - Audio visualizer effect
- **SkeletonWave** - Skeleton loading wave

### ✨ Visual Effects
- **ParticleEmitter** - 3 types: energy, constellation, stars
- **GradientMesh** - Animated gradient backgrounds
- **GlowBorder** - Glowing borders (high/medium/low intensity)
- **LiquidFill** - Liquid fill animation
- **MorphShape** - Morphing shape animation
- **RippleEffect** - Ripple click effect
- **Shimmer** - Shimmer loading effect

### 🎨 UI Primitives (shadcn-style)
- **Button** - Multiple variants (primary, secondary, ghost), sizes, loading state
- **Card** - Headers, titles, content, footers
- **Badge** - Status badges with colors
- **Input** - Text inputs with icons
- **Dialog** - Modal dialogs
- **Sheet** - Side panels
- **Tabs** - Tab navigation
- **ScrollArea** - Custom scrollbars

### 🔮 MagicUI Effects
- **AnimatedGrid** - Animated background grid pattern
- **FadeIn** - Staggered fade-in animations
- **BentoGrid** - Modern bento box layout
- **WordRotate** - Rotating word animation
- **TextGradient** - Gradient text effects
- **OrbitingShapes** - Orbiting shapes animation
- **MorphingSpinner** - Morphing spinner animation

### 📊 Data Visualization
- **DataChart** - Bar, pie, line charts
- **DataTable** - Markdown table rendering
- **VoteCard** - Voting result display with confidence bars
- **StatCard** - Statistics display cards
- **ConsensusTracker** - Multi-agent consensus tracking

### 🌐 Live Website Generation
- **LiveWebsiteGenerator** - Generate websites in real-time
- **WebsitePreview** - Renders generated website sections
- **SectionRenderer** - Nav, Hero, Features, Pricing, CTA, Footer
- **FeatureCard** - Feature display cards
- **PricingCard** - Pricing tier cards
- **HeroGraphic** - Floating shapes hero graphics

### 🛠️ Agent & Tools
- **LM Studio Agent** - Direct AI chat with local models
- **MCP Tool Executor** - Execute MCP tools
- **useLMStudioAgent** hook - Full LM Studio integration
- **useStreaming** hook - Streaming text handling

### 📐 Layout Components
- **AdaptiveLayout** - Responsive breakpoint-based layouts
- **ResponsiveGrid** - Auto-responsive grids
- **MasonryLayout** - Pinterest-style masonry

---

## 🎮 WebUI Tabs

### 🏠 Home
- Massive animated gradient hero
- Feature cards with hover effects
- Live demo showcase (auto-cycling)
- Stats section
- Particle background toggle

### 🎮 Playground
- Full AI chat interface
- SmartMessage auto-detection
- Typing indicators with bouncy dots
- Smooth scroll animations
- Real-time streaming responses

### 🧩 Components
- Browse all 50+ components
- Search and filter by category
- Live previews
- Generated code snippets

### 🌐 Live Website
- Type a website description
- Watch AI generate in real-time
- Sections appear as AI streams
- Beautiful animations

### 🤖 Agents
- LM Studio connection status
- Model selection
- Tool execution panel
- MCP tools browser

### ✨ Effects
- ALL particle systems (live demos)
- ALL grid effects
- ALL glow effects
- ALL loading states

### ⚙️ Settings
- LM Studio URL configuration
- Model selection
- Connection testing
- Available models display

---

## 🔑 Key Features

### Zero DOM Reflow with Pretext

```tsx
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

// Prepare once (expensive operation)
const prepared = prepareWithSegments(text, '15px Inter')

// Layout multiple times (cached math, ~0.09ms)
const { lines } = layoutWithLines(prepared, 600, 22)

// Render on canvas - no DOM reflow!
for (const line of lines) {
  ctx.fillText(line.text, line.x, line.y)
}
```

### Automatic Content Detection

```tsx
<SmartMessage content="VOTE: YES (85% confidence)" />
// → Renders as VoteCard with confidence bar

<SmartMessage content="```js\nconst x = 42;\n```" />
// → Renders as CodeBlock with syntax highlighting

<SmartMessage content="| Name | Value |\n|------|-------|\n| A | 1 |" />
// → Renders as DataTable

<SmartMessage content="In summary: 1) Fast 2) Simple 3) Powerful" />
// → Renders as SummaryCard
```

### Live Website Generation

```tsx
<LiveWebsiteGenerator />
// User types: "AI startup landing page"
// AI generates JSON and streams it
// Sections appear in real-time:
// → Nav bar
// → Hero with headline
// → Features grid
// → Pricing tiers
// → CTA section
// → Footer
```

### Streaming with Pre-measured Heights

```tsx
<StreamableText
  content="This text streams character by character..."
  speed={20}
  premeasured={true} // Pre-calculates height, no reflow
/>
```

---

## 📁 Project Structure

```
pretext-generative-ui-toolkit/
├── src/
│   ├── pretext/          # Pretext core (Canvas, Text, Layout, Stream)
│   ├── components/       # Core components (SmartMessage, DataChart, etc.)
│   ├── magicui/          # MagicUI effects (WordRotate, TextGradient, etc.)
│   ├── effects/          # Visual effects (ParticleEmitter, GlowBorder, etc.)
│   ├── shadcn/           # UI primitives (Button, Card, Input, etc.)
│   ├── layout/           # Layout components (Masonry, Adaptive, etc.)
│   ├── streaming/        # Streaming components and loading states
│   ├── agents/           # Agent integrations (LM Studio)
│   ├── ai/               # AI components (AIGenerator, ContentDetector)
│   ├── mcp/              # MCP tool executor
│   ├── website/          # Live website generation
│   ├── hooks/            # Custom React hooks
│   ├── webui/
│   │   ├── App.tsx           # Main app with tabs
│   │   ├── main.tsx          # Entry point
│   │   ├── index.css         # Global styles
│   │   ├── hooks/
│   │   │   └── useLMStudioAgent.tsx  # LM Studio integration
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── PlaygroundPage.tsx
│   │   │   ├── ComponentsPage.tsx
│   │   │   ├── LiveWebsitePage.tsx
│   │   │   ├── AgentsPage.tsx
│   │   │   ├── EffectsPage.tsx
│   │   │   └── Settings.tsx
│   │   └── components/
│   │       └── ComponentPreview.tsx
│   └── pages/
│       └── DemoShowcase.tsx      # Main demo page
├── examples/
│   ├── basic/            # Basic usage examples
│   └── advanced/          # Advanced integration examples
├── docs/                 # Documentation
└── package.json
```

---

## 🤖 LM Studio Integration

The toolkit integrates with **LM Studio** for local AI inference:

```tsx
import { useLMStudioAgent } from './hooks/useLMStudioAgent'

function App() {
  const { sendMessage, isLoading, healthCheck } = useLMStudioAgent({
    baseUrl: 'http://100.116.54.125:1234',
    apiKey: 'your-api-key', // Optional
    model: 'qwen3.5-27b'
  })
  
  // Send messages and stream responses
  const response = await sendMessage('Hello AI!')
}
```

### Available Models (via LM Studio)
- `qwen3.5-27b` - Fast responses, good quality
- `qwen3.5-35b-a3b` - Balanced mixture of experts
- `glm-4.7-flash` - Very fast reasoning
- `jan-v3-4b-base-instruct` - Ultra fast, lower quality
- And many more...

---

## 🎨 Theming

The toolkit uses a dark theme by default:

```css
:root {
  --background: #0a0a0f;
  --surface: #1a1a2e;
  --border: rgba(255, 255, 255, 0.1);
  --accent-purple: #8b5cf6;
  --accent-pink: #ec4899;
  --accent-cyan: #06b6d4;
}
```

Custom colors via props:

```tsx
<PretextCanvas color="#8b5cf6" />
<ParticleEmitter color="#06b6d4" />
<LoadingDots color="#ec4899" />
<GlowBorder color="#8b5cf6" intensity="high" />
```

---

## 📚 Documentation

- [docs/FULL_DOCUMENTATION.md](docs/FULL_DOCUMENTATION.md) - Complete API reference
- [docs/GETTING_STARTED.md](docs/GETTING_STARTED.md) - Quick start guide
- [docs/PRETEXT_GUIDE.md](docs/PRETEXT_GUIDE.md) - Pretext deep dive
- [docs/COMPONENTS.md](docs/COMPONENTS.md) - Component catalog
- [docs/AI_INTEGRATION.md](docs/AI_INTEGRATION.md) - AI integration guide
- [docs/STREAMING.md](docs/STREAMING.md) - Streaming components
- [docs/EXAMPLES.md](docs/EXAMPLES.md) - Code examples

---

## 🤝 Contributing

Contributions welcome! Please submit issues and pull requests.

---

## 📄 License

MIT License

---

## 🙏 Acknowledgments

- [Pretext](https://github.com/chenglou/pretext) - Zero-reflow text measurement
- [shadcn/ui](https://ui.shadcn.com/) - UI component inspiration
- [MagicUI](https://magicui.design/) - Text effects inspiration
- [Morphic](https://github.com/miurla/morphic) - Generative UI inspiration
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [LM Studio](https://lmstudio.ai/) - Local AI inference

---

<p align="center">
  Built with ❤️ using Pretext, React, AI, and LM Studio<br>
  <a href="https://github.com/Franzferdinan51/pretext-generativeUI-Toolkit">GitHub</a> • <a href="http://localhost:5173">Demo</a>
</p>
