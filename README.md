# Pretext AI UI Toolkit

<p align="center">
  <img src="https://img.shields.io/badge/Pretext-Canvas-blue?style=flat-square" alt="Pretext Canvas">
  <img src="https://img.shields.io/badge/AI-Swarm-purple?style=flat-square" alt="AI Swarm">
  <img src="https://img.shields.io/badge/Multi-Provider-green?style=flat-square" alt="Multi-Provider">
</p>

<p align="center">
  <strong>🎨 AI Swarm-Built Generative UI</strong><br>
  Multiple AI agents collaborate to build websites. Zero DOM reflow. Canvas rendering.
</p>

---

## 🚀 Live Demo

**Try it:** http://localhost:3456

🐝 **5 AI Agents** build a complete website in 4 phases using **MiniMax + LM Studio**!

---

## 🐝 AI Swarm System

### Agents

| Agent | Icon | Provider | Model | Task |
|-------|------|----------|-------|------|
| 🏗️ **Architect** | 🏗️ | LM Studio | qwen3.5-9B | Header + Hero |
| 🎨 **Designer** | 🎨 | LM Studio | qwen3.5-9B | Features + Stats |
| ✍️ **Content** | ✍️ | MiniMax | M2.7 | Toolkit + How It Works |
| 💻 **Frontend** | 💻 | MiniMax | M2.7 | CTA + Footer |
| ✨ **Enhancer** | ✨ | MiniMax | M2.7 | Polish + Effects |

### 4-Phase Pipeline

```
📦 PHASE 1: Fast Generation (LM Studio 9B)
   ├─ 🏗️ Architect builds Header + Hero
   └─ 🎨 Designer builds Features + Stats
   
🎯 PHASE 2: Quality Build (MiniMax M2.7)
   ├─ ✍️ Content builds Toolkit + How It Works
   └─ 💻 Frontend builds CTA + Footer
   
✨ PHASE 3: Enhancement (MiniMax M2.7)
   └─ ✨ Enhancer adds polish + glow effects
   
✅ PHASE 4: QA Enforcement
   └─ Auto-fixes missing components
```

---

## ✨ Features

### 🤖 Multi-Agent Swarm
- **5 Specialized AI Agents** working together
- **4-Phase Pipeline**: Fast → Quality → Enhance → QA
- **Auto-Retry**: Fallback generation if agent fails
- **Supervisor**: Monitors all agents

### 🌐 Multi-Provider Support

| Provider | Status | Use |
|----------|--------|-----|
| **LM Studio** | ✅ | Fast generation (free, local) |
| **MiniMax** | ✅ | Quality + Enhancement |
| **OpenAI** | ✅ | Configurable |
| **Anthropic** | ✅ | Configurable |
| **Google** | ✅ | Configurable |
| **Groq** | ✅ | Configurable |
| **DeepSeek** | ✅ | Configurable |
| **Ollama** | ✅ | Configurable |

### 📐 Pretext Integration
- **Zero DOM Reflow**: Character-level text measurement
- Pre-calculated heights for smooth animations
- Canvas rendering for everything

### 🎨 Canvas Rendering
- All UI drawn on canvas (not DOM elements)
- Smooth hover effects and interactions
- Dynamic height based on content

### 🌐 Live Preview
- **Canvas View**: AI-controlled canvas rendering
- **HTML View**: Standalone HTML preview (no CDN dependencies)
- **Download**: Export as HTML file

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Pretext** | Zero-reflow text measurement |
| **React** | UI framework |
| **Canvas API** | Rendering engine |
| **LM Studio** | Local AI inference (fast, free) |
| **MiniMax M2.7** | Cloud AI (quality, enhancement) |
| **qwen3.5-9B** | Fast local generation |

---

## 📁 Project Structure

```
src/
├── pretext/          # Pretext text measurement
├── effects/           # Visual effects (particles, gradients)
├── magicui/           # Magic UI components
├── streaming/          # Streaming components
├── shadcn/            # UI primitives
└── webui/
    └── App.tsx        # Main swarm generative UI app
```

---

## 🎨 Generated Website Sections

Every generation includes:
1. **Header** - Logo + navigation
2. **Hero** - Gradient headline + CTA
3. **Features** - 4 feature cards
4. **The Toolkit** - Components, Effects, AI Integration
5. **How It Works** - 3 step cards
6. **Stats** - Numbers and metrics
7. **CTA** - Call to action
8. **Footer** - Links + copyright

---

## 🔧 API Keys

The app uses these API keys (embedded):

| Provider | Key |
|----------|-----|
| **MiniMax** | `sk-cp-...` |
| **LM Studio** | `sk-lm-...` |

To use different providers, update the keys in `App.tsx` or via settings.

---

## 🌐 Links

- **GitHub**: https://github.com/Franzferdinan51/pretext-generativeUI-Toolkit
- **Live Demo**: http://localhost:3456

---

## 📄 License

MIT License

---

<p align="center">
  Built with ❤️ using Pretext, React, Canvas, and AI Swarm
</p>
