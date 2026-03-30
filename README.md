# Pretext + Canvas AI UI Toolkit

<p align="center">
  <strong>🎨 Generate UI via Pretext (text measurement) + Canvas (rendering)</strong>
</p>

<p align="center">
  AI controls every pixel with pure math • No DOM reflow • 60fps animations
</p>

---

## 🚀 Quick Start

### Web UI (Demo)
```bash
npm install
npm run dev
# → http://localhost:3456
```

### CLI (Pretext Canvas)
```bash
# Full website generation
npm run cli -- "SaaS landing page"

# Animated Pretext scenes
npm run cli -- scene weather "Storm Dashboard"
npm run cli -- scene orbit "Pretext Motion Demo"

# Verify generated HTML
npm run cli -- verify-html /tmp/orbit-scene.html
```

### MCP Server (Pretext Canvas)
```bash
npm run mcp
# → http://localhost:3457
```

---

## ⚡ What Is Pretext + Canvas?

**Pretext** measures text positions (x, y, width, height) WITHOUT DOM reflow.
**Canvas** renders at exact Pretext-measured positions.

```
User Request → Pretext measures text → Canvas draws at exact positions
     ↓                    ↓                        ↓
  Natural         - prepareWithSegments()    - ctx.fillText()
  Language        - layoutWithLines()         - GPU accelerated
     ↓                    ↓                        ↓
  "72F"    ────────────→ [measured] ────────────→ rendered!
```

**No CSS. No HTML elements. No DOM. Just pure math.**

---

## 🎯 What Gets Generated

### Pretext Canvas Cards (Pure Canvas, Animated)
| Type | Description |
|------|-------------|
| `weather` | Animated weather card with aurora background |
| `crypto` | Crypto price chart with live glow effects |
| `metric` | Stat/metric card with trend indicator |
| `plant` | Plant health dashboard with photo |

### Pretext Scene Engine (NEW)
A reusable foundation for active typography scenes:
- text nodes with measured layout
- obstacle nodes for future text-flow around objects
- motion primitives: `float`, `orbit`, `pulse`, `drift`
- starter templates: `weather`, `crypto`, `orbit`

Core exports:
- `measureSceneText()`
- `resolveMotion()`
- `sceneTemplates()`

### Full Websites (A2UI + React)
| Section | Content |
|---------|---------|
| `nav` | Logo + navigation links |
| `hero` | Headline + subtitle + CTAs |
| `features` | 6 feature cards with emojis |
| `stats` | 4 metrics with trends |
| `pricing` | 3 tiers (Free/Pro/Enterprise) |
| `faq` | 5 Q&A items |
| `cta` | Call-to-action |
| `footer` | Link categories + copyright |

---

## 🌐 Live Examples

All served via Tailscale: **http://100.68.208.113:8080/**

| Example | URL | Theme |
|---------|-----|-------|
| Weather | `/pretext-weather-glam.html` | Purple aurora |
| Dragon Whip | `/dragon-whip.html` | Red RPG |
| Plant Health | `/plant.html` | Green grow |
| Bitcoin | `/bitcoin.html` | Orange finance |

---

## 🛠️ CLI Usage

```bash
# Generate cards
npm run cli -- weather "68F partly cloudy Huber Heights"
npm run cli -- crypto "Ethereum $3400 positive"
npm run cli -- metric "10000 users active"

# Options
--output <path>   # Custom output
--open            # Open in browser
--serve           # Start LAN server

# Serve existing file
npm run cli -- serve /tmp/card.html
```

---

## 🤖 MCP Server

```bash
npm run mcp
# Endpoints:
# GET  /health    - Health check
# GET  /tools     - List tools
# POST /          - Call tool: {tool, args}
```

### MCP Tools
| Tool | Description |
|------|-------------|
| `generate_weather` | Animated weather card |
| `generate_crypto` | Crypto price chart |
| `generate_metric` | Metric/stat card |
| `generate_scene` | Build animated scene HTML from a template |
| `validate_text_fit` | Verify text fits width/line constraints |
| `serve_file` | Get LAN URL |
| `get_template` | Template info |

### OpenClaw Integration
```json
{
  "mcpServers": {
    "pretext-canvas": {
      "command": "node",
      "args": ["./backend/mcp-server.js"]
    }
  }
}
```

---

## 🏗️ Architecture

### Pretext Canvas Pipeline
```
┌─────────────────────────────────────────────┐
│                 User Request                │
└─────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────┐
│  Pretext (text measurement)                 │
│  - prepareWithSegments()                    │
│  - layoutWithLines() → {x, y, width}        │
│  - ~0.09ms per layout (cached!)             │
└─────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────┐
│  Scene Engine (NEW)                         │
│  - text nodes / obstacle nodes              │
│  - motion: float / orbit / pulse / drift    │
│  - template packs for reusable scenes       │
└─────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────┐
│  Canvas (GPU rendering)                     │
│  - ctx.fillText(x, y) at Pretext positions  │
│  - requestAnimationFrame() animations       │
│  - No DOM, No CSS, No Reflow                │
└─────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────┐
│              Animated UI Output             │
│  - Weather cards                            │
│  - Crypto charts                            │
│  - Plant dashboards                         │
│  - Active text scenes / orbit systems       │
└─────────────────────────────────────────────┘
```

### Full Toolkit Structure
```
┌─────────────────────────────────────────────┐
│        Pretext Generative UI Toolkit           │
├─────────────────────────────────────────────┤
│  Pretext Canvas (NEW!)                         │
│  ├── cli.js          - pretext-canvas command  │
│  ├── mcp-server.js   - MCP JSON-RPC server     │
│  ├── pretext-server.js - Text API server       │
│  └── pretext-generator.js - Pretext generator  │
├─────────────────────────────────────────────┤
│  Full Website Generation (A2UI)                 │
│  ├── generative-ui.js - Core API (MiniMax)    │
│  ├── cli.js          - CLI tool                │
│  └── mcp-server.js  - MCP server             │
└─────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
pretext-generative-ui-toolkit/
├── README.md
├── package.json
│
├── src/webui/
│   └── App.tsx              # React web UI (A2UI)
│
├── backend/
│   ├── cli.js               # CLI (pretext-canvas + generative-ui)
│   ├── mcp-server.js        # MCP server (both modes)
│   ├── pretext-server.js    # Pretext HTTP API (port 3458)
│   ├── pretext-generator.js # Pretext-enhanced generator
│   ├── fast-generator.js    # Simple HTML generator
│   ├── generative-ui.js     # Full AI generator (A2UI)
│   └── verify.js            # Shipping sanity checks
│
├── src/pretext/
│   ├── SceneEngine.ts       # Scene nodes + motion primitives
│   ├── PretextCanvas.tsx
│   ├── PretextLayout.tsx
│   └── PretextStream.tsx
│
├── examples/
│   ├── pretext-weather-canvas.html
│   ├── dragon-whip.html
│   └── ...
│
└── .agents/skills/
    └── generative-ui/
        └── SKILL.md        # OpenClaw skill
```

---

## 🎨 Features

### Pretext Canvas
- ⚡ **Zero reflow** - Pretext measures without DOM
- 🎮 **60fps animations** - requestAnimationFrame loop
- 🔮 **Glow effects** - Canvas blur filters
- 📱 **Responsive** - Scale to any screen
- 🌐 **Tailscale ready** - Access from anywhere

### Full Website Generation
- 🤖 **AI-powered** - MiniMax M2.7
- 📦 **A2UI spec** - Google's standard
- 🎨 **Tailwind CSS** - Dark mode
- 🔄 **Streaming** - Real-time generation
- 📄 **JSON-first** - Always produces output

---

## ⚡ Tech Stack

| Layer | Technology |
|-------|------------|
| **Text Measurement** | Pretext (~0.09ms, cached) |
| **Rendering** | Canvas 2D (GPU) |
| **Website Generation** | MiniMax M2.7 API |
| **UI Spec** | A2UI JSON |
| **Styling** | Tailwind CSS |
| **Theme** | Dark mode (purple/pink/orange) |

---

## 💡 Why Pretext + Canvas?

Traditional DOM-based UI:
```
AI generates HTML → Browser parses → DOM reflow → Paint
                          ↑
                   SLOW! Expensive!
```

Pretext + Canvas:
```
AI generates → Pretext measures (cached!) → Canvas draws
                                         ↑
                              FAST! GPU accelerated!
```

**Duckets said:** *"I fucking love this new tool we created here this is amazing!"*

---

## 🌐 Resources

| Resource | Link |
|----------|------|
| **Pretext** | https://github.com/chenglou/pretext |
| **A2UI** | https://github.com/google/A2UI |
| **OpenClaw Docs** | https://docs.openclaw.ai |

---

## 📜 License

MIT

---

<p align="center">
  🎨 Pretext + Canvas • ⚡ Pure Math UI • 🤖 AI-Powered
</p>
