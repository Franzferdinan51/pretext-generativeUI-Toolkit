# Pretext + A2UI + GenerativeUI Toolkit v5

<p align="center">
  <strong>📐 Pretext Layout + 🤖 Generative UI + ⚡ Runtime Rendering</strong>
</p>

---

## 🚀 Live Demo

**Try it:** http://localhost:3456

---

## 🏗️ Architecture (Inspired by 8 Projects)

### 1. CopilotKit/OpenGenerativeUI (MOST RELEVANT!)
**Our closest match!** Pure generative UI framework.
- Sandboxed iframe rendering
- Progressive reveal animations
- Automatic light/dark theming
- Skills-based architecture (SKILL.md)
- Deep agent with tools
- `useComponent` hook for generative UI
- Output types: charts, diagrams, 3D, SVG, HTML

### 2. webllm/renderify (JSX Runtime)
- LLM generates JSX → Browser renders directly
- Zero backend build step
- Security policy checker
- JSPM module resolution
- Streaming-first rendering

### 3. jadouse5/ai-website
- URL → Prompt → HTML pipeline
- Multiple LLM providers
- Infinite scalability

### 4. Orillusion (WebGPU 3D)
- 3D rendering in browser
- WebGPU standard
- Desktop-level effects

### 5. krea-ai/realtime-video (Reference)
- Real-time AI video generation
- WebSocket streaming
- 11 fps on B200

### 6. openclaw/openclaw
- A2UI Live Canvas standard
- Multi-agent routing

### 7. google/A2UI
- Declarative JSON UI spec

### 8. steipete
- Agent rules (SIMPLE, COMPLETE, CONSISTENT)

---

## ⚡ Generative UI Pipeline

```
User Prompt → Deep Agent → Skills → Component Type → Render

Types of Output:
┌─────────────────┬──────────────┐
│ Algorithm viz   │ SVG/Canvas   │
│ 3D animations   │ Three.js    │
│ Charts          │ Chart.js    │
│ Diagrams        │ SVG/Mermaid │
│ Interactive     │ HTML+JS     │
│ Simulations     │ Canvas+JS   │
│ Dashboards      │ HTML+CSS    │
└─────────────────┴──────────────┘
```

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|------------|
| **Layout** | Pretext (~0.09ms) |
| **UI Spec** | A2UI JSON |
| **Rendering** | React + iframe sandbox |
| **3D** | Orillusion WebGPU |
| **Agent** | MiniMax M2.7 + Skills |
| **Streaming** | WebSocket-ready |

---

## 📦 Output Types (from OpenGenerativeUI)

| When user asks... | Output | Tech |
|-------------------|--------|------|
| How X works (physical) | Illustrative diagram | SVG |
| Process/steps | Flowchart | SVG |
| Trends over time | Line chart | Chart.js |
| Category comparison | Bar chart | Chart.js |
| KPIs/metrics | Dashboard | HTML |
| Architecture | Structural diagram | SVG |
| Physics/math | Simulation | Canvas+JS |
| 3D visualization | 3D scene | Three.js |
| Network/graph | Force layout | D3.js |

---

## 🌐 Resources

| Project | Link |
|---------|------|
| **OpenGenerativeUI** | [CopilotKit/OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) |
| **renderify** | [webllm/renderify](https://github.com/webllm/renderify) |
| **ai-website** | [jadouse5/ai-website](https://github.com/jadouse5/ai-website) |
| **Orillusion** | [Orillusion/orillusion](https://github.com/Orillusion/orillusion) |
| **realtime-video** | [krea-ai/realtime-video](https://github.com/krea-ai/realtime-video) |
| **OpenClaw** | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| **A2UI** | [google/A2UI](https://github.com/google/A2UI) |
| **Pretext** | [chenglou/pretext](https://github.com/chenglou/pretext) |

---

<p align="center">
  📐 Pretext • 🤖 GenerativeUI • ⚡ Zero-build • 🔒 Sandboxed
</p>
