# 🎯 Pretext AI UI Toolkit

**A comprehensive AI-powered generative UI toolkit for React.**

Build stunning, AI-generated user interfaces with character-level text control, streaming components, and beautiful visual effects.

> **Powered by:** Pretext + Morphic + CopilotKit + Vercel AI SDK + shadcn/ui + MagicUI

---

## 🚀 Quick Start

```bash
# Clone the toolkit
git clone https://github.com/Franzferdinan51/pretext-generativeUI-Toolkit.git
cd pretext-generativeUI-Toolkit

# Install dependencies
npm install

# Start the AI Playground
npm run dev

# Open http://localhost:5173
```

---

## 🎮 Live AI Playground

The toolkit includes a **full AI-powered Web UI** where you can:

1. **Chat with AI** — Ask AI to generate UI components in real-time
2. **See components render LIVE** — Watch AI-generated components appear instantly
3. **Browse all components** — Search and filter by category
4. **Configure LM Studio** — Connect to your local AI for fast, private inference

```bash
npm run dev
# → http://localhost:5173
```

---

## 📦 What's Included

### 🤖 AI-Powered Core

| Component | Description |
|-----------|-------------|
| `SmartMessage` | Auto-detects content type (vote, code, list, table, chart, summary) and renders appropriate UI |
| `ContentDetector` | AI-powered content classification with regex + keyword matching |
| `AIGenerator` | Generate React components from natural language |
| `LayoutOptimizer` | AI-driven layout suggestions based on content |
| `AutoModeSelector` | Analyze topics and suggest optimal modes |
| `PredictiveCouncilorSelection` | AI suggests relevant councilors based on topic |

### ⚡ Streaming Components

| Component | Description |
|-----------|-------------|
| `StreamableText` | Character-by-character streaming with pre-measured heights (no reflow!) |
| `StreamingComponent` | Stream AI-generated components (vote, chart, table, code, list) |
| `StreamingCode` | Streaming code blocks with syntax highlighting |
| `StreamingCard` | Full-featured streaming message cards with glassmorphism |
| `StreamingLoadingState` | 10 beautiful loaders: TypingDots, CouncilThinking, AudioBars, etc. |
| `StreamableUI` | Generic streamable value hook for RSC patterns |

### 📐 Pretext Core (Character-Level Control)

| Component | Description |
|-----------|-------------|
| `PretextCanvas` | Core canvas renderer with pretext measurement |
| `PretextText` | Text measurement without DOM |
| `PretextLayout` | Layout engine for precise positioning |
| `PretextStream` | Streaming with pre-measured heights |
| `usePretext` | React hook for text measurement |

### ✨ Visual Effects

| Component | Description |
|-----------|-------------|
| `ParticleEmitter` | Canvas particles: energy, constellations, stars |
| `GradientMesh` | Animated gradient mesh with spring physics |
| `GlowBorder` | Animated glowing borders |
| `LiquidFill` | Liquid fill animations for meters/bars |
| `MorphShape` | Morphing shapes with spring physics |
| `RippleEffect` | Ripple click effects |
| `Shimmer` | Loading shimmer animations |

### 🎨 UI Primitives (shadcn-inspired)

| Component | Description |
|-----------|-------------|
| `Button` | Buttons with variants: primary, secondary, ghost, outline |
| `Card` | Glass/blur cards with hover effects |
| `Badge` | Status badges with pulse animation |
| `Input` | Styled inputs with icons |
| `Dialog` | Modal dialogs with animations |
| `Sheet` | Slide-out panels (sidebars) |
| `Tabs` | Tab navigation |
| `ScrollArea` | Custom scrollbar styling |

### 🔮 MagicUI Effects

| Component | Description |
|-----------|-------------|
| `AnimatedGrid` | Pulsing grid patterns |
| `FadeIn` | Smooth entrance animations |
| `BentoGrid` | Modern bento-style grid layouts |
| `WordRotate` | Rotating word animations |
| `TextGradient` | Gradient text effects |
| `OrbitingShapes` | Orbiting particle shapes |
| `MorphingSpinner` | Morphing loading spinners |

### 📊 Data Visualization

| Component | Description |
|-----------|-------------|
| `DataViz` | Auto-detecting charts: bar, line, pie, table, stat |
| `DataTable` | Auto-generated tables from data |
| `DataChart` | SVG charts with streaming support |
| `VoteCard` | Voting result cards |
| `VoteDashboard` | Full voting dashboard |
| `StatCard` | Statistics cards |

### 🛠️ Agent & MCP Tools

| Component | Description |
|-----------|-------------|
| `useLMStudioAgent` | Native LM Studio chat control with streaming |
| `AgentChat` | Chat UI with connection status |
| `AgentBuilder` | Build custom agents with system prompts |
| `useMCPTools` | 13 built-in MCP tools |
| `ToolResultsPanel` | Visual tool execution results |

### 📐 Layout Components

| Component | Description |
|-----------|-------------|
| `AdaptiveLayout` | Auto-adjusting layout based on content |
| `ResponsiveGrid` | Responsive grid system |
| `MasonryLayout` | Masonry/pinterest-style layout |
| `StackLayout` | Stack-based layout |

---

## 🧩 Usage Examples

### SmartMessage (AI Content Detection)

```tsx
import { SmartMessage } from 'pretext-generative-ui-toolkit'

// Automatically detects content type and renders appropriate UI
function App() {
  const content = `
    Let me analyze the data:
    
    1. Revenue increased by 23%
    2. Costs decreased by 15%
    
    | Metric | Q1 | Q2 |
    |--------|----|----|
    | Revenue | $100k | $123k |
    
    VOTE: APPROVE
  `
  
  return <SmartMessage content={content} />
}
```

### Streaming Text with Pretext

```tsx
import { StreamingText } from 'pretext-generative-ui-toolkit'

function App() {
  const [content, setContent] = useState('')
  
  return (
    <StreamingText 
      content={content}
      font="16px Inter"
      maxWidth={500}
      lineHeight={22}
      speed={15} // ms per character
    />
  )
}
```

### Pretext Canvas

```tsx
import { PretextCanvas, usePretext } from 'pretext-generative-ui-toolkit'

function App() {
  const measurement = usePretext('Hello world', '16px Inter', 400, 22)
  
  return (
    <PretextCanvas
      text="Hello world"
      font="16px Inter"
      maxWidth={400}
      lineHeight={22}
      color="#fff"
    />
  )
}
```

### Particle Effects

```tsx
import { ParticleEmitter } from 'pretext-generative-ui-toolkit'

function App() {
  return (
    <ParticleEmitter
      count={50}
      color="#8b5cf6"
      type="energy" // energy | constellation | stars
    />
  )
}
```

### Agent Chat with LM Studio

```tsx
import { useLMStudioAgent } from 'pretext-generative-ui-toolkit'

function App() {
  const { messages, sendMessage, isLoading, healthCheck } = useLMStudioAgent()
  const [input, setInput] = useState('')
  
  const handleSend = async () => {
    await sendMessage(input)
    setInput('')
  }
  
  return (
    <div>
      <button onClick={() => healthCheck()}>Test Connection</button>
      {messages.map((msg, i) => (
        <div key={i}>{msg.content}</div>
      ))}
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  )
}
```

---

## 🔧 Configuration

### LM Studio Connection

```tsx
// Default: Windows PC at 100.116.54.125
const config = {
  baseUrl: 'http://100.116.54.125:1234',
  model: 'qwen3.5-27b' // or 'glm-4.7-flash', 'jan-v3-4b', etc.
}
```

### Available Models (LM Studio)

| Model | Description |
|-------|-------------|
| `qwen3.5-27b` | Fast local, excellent quality |
| `qwen3.5-35b-a3b` | Balanced, uses more RAM |
| `zai-org/glm-4.7-flash` | Fast reasoning, small footprint |
| `jan-v3-4b-base-instruct` | Ultra fast, compact |
| `nvidia/nemotron-3-nano` | Compact tasks only |

### MCP Tools (Built-in)

```tsx
const tools = [
  'web_search',      // Search the web
  'fetch_website',   // Fetch webpage content
  'run_code',        // Execute JavaScript
  'calculate',       // Math calculations
  'get_weather',     // Weather by location
  'get_crypto_price', // Crypto prices
  'send_telegram',   // Send Telegram message
  'generate_image',  // Generate image
  'text_to_speech', // Text to speech
  'read_file',       // Read file
  'write_file',      // Write file
  'list_directory',  // List directory
  'execute_command', // Shell command
]
```

---

## 🎨 Theming

All components support custom colors via CSS variables:

```css
:root {
  --glow-color: #8b5cf6;
  --accent-primary: #8b5cf6;
  --accent-secondary: #06b6d4;
  --background: #0a0a0f;
  --surface: #1a1a2e;
  --text-primary: #ffffff;
  --text-secondary: #a1a1aa;
}
```

---

## 📁 Project Structure

```
pretext-generativeUI-Toolkit/
├── src/
│   ├── pretext/           # Pretext core engine
│   │   ├── PretextCanvas.tsx
│   │   ├── PretextText.tsx
│   │   ├── PretextLayout.tsx
│   │   └── PretextStream.tsx
│   ├── components/        # AI components
│   │   ├── SmartMessage.tsx
│   │   ├── StreamingText.tsx
│   │   ├── VoteCard.tsx
│   │   └── ...
│   ├── effects/           # Visual effects
│   │   ├── ParticleEmitter.tsx
│   │   ├── GradientMesh.tsx
│   │   └── ...
│   ├── agents/            # Agent control
│   │   ├── LMStudioAgent.tsx
│   │   └── AgentChat.tsx
│   ├── mcp/               # MCP tools
│   │   ├── ToolExecutor.tsx
│   │   └── ...
│   ├── layout/            # Layout components
│   ├── streaming/         # Streaming components
│   ├── shadcn/            # shadcn-inspired UI
│   ├── magicui/           # MagicUI effects
│   └── hooks/             # React hooks
├── docs/                  # Documentation
├── examples/              # Usage examples
└── index.html             # AI Playground
```

---

## 🌟 Features

- ✅ **Zero DOM reflow** — Pretext measures text before rendering
- ✅ **Streaming without jitter** — Pre-measured heights prevent layout shifts
- ✅ **AI-powered content detection** — Auto-detects vote/code/list/table/chart
- ✅ **Canvas-based rendering** — Precise pixel control
- ✅ **Streaming components** — Real-time AI-generated UI
- ✅ **Beautiful effects** — Particles, gradients, glows, morphing
- ✅ **Local AI** — Works with LM Studio (no API keys needed)
- ✅ **MCP tools** — 13 built-in tools for agent control
- ✅ **Dark theme** — Beautiful lobster theme by default
- ✅ **TypeScript** — Full TypeScript support
- ✅ **Tree-shakeable** — Import only what you need

---

## 🤝 Contributing

Contributions welcome! Please read the contribution guidelines first.

1. Fork the repo
2. Create your feature branch
3. Make your changes
4. Submit a PR

---

## 📄 License

MIT License - use freely for personal and commercial projects.

---

## 🔗 Links

- **GitHub:** https://github.com/Franzferdinan51/pretext-generativeUI-Toolkit
- **Demo:** http://localhost:5173 (run `npm run dev`)
- **Pretext:** https://github.com/chenglou/pretext
- **LM Studio:** https://lmstudio.ai

---

**Built with ❤️ for AI-powered UIs**
