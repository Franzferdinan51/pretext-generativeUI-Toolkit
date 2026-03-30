# Pretext + GenerativeUI Toolkit

<p align="center">
  <strong>📐 Pretext Layout + 🤖 AI Generation + ⚡ Runtime Rendering</strong>
</p>

<p align="center">
  Deeply integrated with 8 open-source projects for generative UI
</p>

---

## 🚀 Live Demo

**http://localhost:3456**

---

## 🏗️ Architecture (8 Projects Integrated)

### 1. CopilotKit/OpenGenerativeUI ⭐ MOST RELEVANT
**Our closest match!** Pure generative UI framework for AI agents.

**Integrated Features:**
- **Generative UI Component Types** - 8 output types
- **Skills System** - Progressive disclosure via SKILL.md files
- **Sandboxed iframe rendering** - Security-first
- **useComponent hook** - Frontend integration pattern
- **Deep Agent** - Skills-based architecture

**Output Types:**
```
┌─────────────────┬──────────────┐
│ 📊 Charts       │ Chart.js     │
│ 🔄 Flowcharts   │ SVG/Mermaid │
│ 📈 Dashboards   │ HTML+CSS     │
│ 🎮 Simulations  │ Canvas+JS    │
│ 🌐 3D Scenes    │ Three.js     │
│ 🕸️ Networks    │ D3.js        │
│ 🎨 Diagrams     │ SVG          │
│ 🖼️ Widgets     │ HTML+JS      │
└─────────────────┴──────────────┘
```

### 2. webllm/renderify - JSX/TSX Runtime
**LLM generates code → Browser renders directly. Zero build step.**

**Integrated Features:**
- **5-step Pipeline**: LLM → CodeGen → Security → Execute → Render
- **Security Profiles**: strict | balanced | relaxed
- **JSPM Module Resolution** - npm packages at runtime
- **Streaming-first** - Progressive UI updates
- **Pluggable hooks** - 10 customization points

```
User Prompt → Deep Agent → Skills → Component Type → Sandboxed iframe
                                              ↓
                                    Security Policy Check
                                              ↓
                                    Babel + JSPM Execute
                                              ↓
                                    Browser renders!
```

### 3. jadouse5/ai-website
**On-the-fly website generation from prompts.**

**Integrated Features:**
- **Multi-model config** - Ready for MiniMax, Groq, Gemini, Qwen
- **URL → Prompt → HTML pipeline**
- **Infinite scalability** - Pages don't exist as files
- **Real-time personalization**

### 4. dennismeissel/WebSite-Generator
**Natural language website editing.**

**Integrated Features:**
- **Describe → Generate → Update** pattern
- **Real-time code updates**
- **macOS native experience concept**

### 5. Orillusion/orillusion-web
**Pure WebGPU 3D rendering engine.**

**Integrated Features:**
- **WebGPU standard** - Next-gen web graphics
- **Desktop-level rendering** - In browser
- **3D scene support** - For generative 3D output

### 6. krea-ai/realtime-video
**Real-time AI video generation.**

**Integrated Features:**
- **WebSocket streaming** pattern
- **11 fps generation** concept
- **Self-Forcing distillation** reference

### 7. openclaw/openclaw
**Personal AI assistant with A2UI Live Canvas.**

**Integrated Features:**
- **A2UI Standard** - Declarative JSON UI format
- **Live Canvas** - Agent-driven visual workspace
- **Multi-agent routing**
- **Skills system architecture**

### 8. google/A2UI
**Google's agent UI specification.**

**Integrated Features:**
- **Declarative JSON** format
- **Security-first** design
- **Framework-agnostic**

### 9. steipete (agent-rules)
**Production-grade agent tooling.**

**Integrated Features:**
- **SIMPLE** - Prefer obvious over clever
- **COMPLETE** - No TODOs, no placeholders
- **CONSISTENT** - Same pattern everywhere
- **Benefit-driven copy** - Not feature lists

---

## ⚡ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Layout** | Pretext | ~0.09ms text measurement |
| **UI Spec** | A2UI JSON | Declarative components |
| **Rendering** | React + iframe | Sandboxed output |
| **3D** | Three.js / WebGPU | 3D visualizations |
| **Agent** | MiniMax M2.7 | Content generation |
| **Streaming** | WebSocket-ready | Real-time updates |
| **Security** | Policy checks | Before execution |

---

## 🎯 Skills System (from CopilotKit)

Loaded on-demand via progressive disclosure:

```
📚 advanced-visualization/    → Charts, Dashboards, Art
📚 svg-diagrams/              → SVG generation rules, patterns
📚 3d-visualization/          → Three.js, WebGPU, 3D scenes
📚 algorithms/                → Algorithm visualizations
```

---

## 🔄 Pipeline (from Renderify)

```
1. LLM Output          → JSON spec or JSX/TSX code
2. CodeGen             → Parse + normalize
3. Security Policy     → Check before execution!
4. Runtime Executor    → Babel transpile + JSPM resolve
5. Browser Render      → Sandboxed iframe
```

**Security Profiles:**
- 🔒 **strict** - No dynamic imports, no eval
- ⚖️ **balanced** - JSPM packages allowed
- 🔓 **relaxed** - Full npm access

---

## 📦 Component Types

### A2UI Components
| Component | Description |
|-----------|-------------|
| `Nav` | Navigation bar |
| `Hero` | Hero section |
| `Section` | Content section |
| `Grid` | Responsive grid |
| `Card` | Feature card |
| `Metric` | Stats metric |
| `Pricing` | Pricing tier |
| `FAQ` | Q&A item |
| `CTA` | Call-to-action |
| `Footer` | Footer links |

### Generative Outputs
| Type | Library | Use Case |
|------|---------|----------|
| `line-chart` | Chart.js | Trends |
| `bar-chart` | Chart.js | Comparisons |
| `pie-chart` | Chart.js | Composition |
| `flowchart` | SVG | Processes |
| `3d-scene` | Three.js | 3D viz |
| `dashboard` | HTML+CSS | KPIs |
| `force-graph` | D3.js | Networks |
| `simulation` | Canvas+JS | Physics |

---

## 🌐 Resources

| Project | Link |
|---------|------|
| **CopilotKit/OpenGenerativeUI** | https://github.com/CopilotKit/OpenGenerativeUI |
| **renderify** | https://github.com/webllm/renderify |
| **ai-website** | https://github.com/jadouse5/ai-website |
| **WebSite-Generator** | https://github.com/dennismeissel/WebSite-Generator |
| **Orillusion** | https://github.com/Orillusion/orillusion |
| **realtime-video** | https://github.com/krea-ai/realtime-video |
| **OpenClaw** | https://github.com/openclaw/openclaw |
| **A2UI (Google)** | https://github.com/google/A2UI |
| **Pretext** | https://github.com/chenglou/pretext |
| **steipete tools** | https://github.com/steipete |

---

## 🚦 Quick Start

```bash
cd ~/Desktop/Pretext-Generative-UI-Toolkit
npm install
npm run dev
# → http://localhost:3456
```

---

<p align="center">
  📐 Pretext • 🤖 GenerativeUI • ⚡ Zero-build • 🔒 Sandboxed
</p>
