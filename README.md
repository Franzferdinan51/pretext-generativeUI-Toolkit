# Pretext + A2UI Toolkit v3

<p align="center">
  <strong>📐 Pretext Layout + 🤖 AI Generation + ⚡ Runtime Rendering</strong>
</p>

---

## 🚀 Live Demo

**Try it:** http://localhost:3456

---

## 🏗️ Architecture (Inspired by 5 Powerful Projects)

### 1. jadouse5/ai-website - On-the-fly Generation
- **URL → Prompt → HTML** pipeline
- Multiple LLM providers (Gemini, Groq, Mercury, Qwen)
- Infinite scalability - pages don't exist as files
- Real-time personalization

### 2. dennismeissel/WebSite-Generator - Natural Language Editing
- Describe → Generate → Update in real-time
- macOS native experience

### 3. webllm/renderify - Runtime JSX/TSX (CRITICAL!)
- **LLM generates JSX → Browser renders directly**
- **No backend build step!**
- Security policy checker before execution
- Streaming-first rendering
- JSPM module resolution at runtime
- Zero-build rendering

### 4. openclaw/openclaw - A2UI Standard
- Declarative JSON UI format
- Live Canvas implementation
- Multi-agent routing

### 5. steipete - Agent Rules
- SIMPLE, COMPLETE, CONSISTENT code
- No TODOs or placeholders

---

## 📐 Pretext - CSS Replacing Layout

| Method | What It Does |
|--------|-------------|
| `masonry()` | Auto-calculated column heights |
| `floatAround()` | Text flows around obstacles |
| `shrinkwrap()` | Find tightest width |

---

## ⚡ Renderify Pipeline (NEW!)

```
LLM Output (JSX/TSX)
  ↓
CodeGen (parse + normalize)
  ↓
Security Policy Check
  ↓
Runtime Executor (Babel transpile + JSPM)
  ↓
Browser renders instantly!
```

### Key Features:
- **Zero-build** - No backend compiler
- **Security-first** - Policy checker before execution
- **Streaming** - Progressive UI updates
- **Pluggable** - 10 hook points

---

## 🎯 Tech Stack

| Tech | Purpose |
|------|---------|
| **Pretext** | Text measurement + layouts |
| **A2UI** | Declarative UI spec |
| **Renderify** | Runtime JSX rendering |
| **React** | UI framework |
| **MiniMax** | AI generation |

---

## 🌐 Resources

| Project | Link |
|---------|------|
| **Pretext** | [chenglou/pretext](https://github.com/chenglou/pretext) |
| **ai-website** | [jadouse5/ai-website](https://github.com/jadouse5/ai-website) |
| **WebSite-Generator** | [dennismeissel/WebSite-Generator](https://github.com/dennismeissel/WebSite-Generator) |
| **renderify** | [webllm/renderify](https://github.com/webllm/renderify) |
| **OpenClaw** | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| **A2UI** | [google/A2UI](https://github.com/google/A2UI) |

---

<p align="center">
  📐 Pretext • 🤖 A2UI • ⚡ Renderify • 🔒 Security-First
</p>
