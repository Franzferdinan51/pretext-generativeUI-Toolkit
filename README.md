# Pretext AI UI Toolkit

<p align="center">
  <img src="https://img.shields.io/badge/Pretext-Canvas-blue?style=flat-square" alt="Pretext Canvas">
  <img src="https://img.shields.io/badge/React-18-black?style=flat-square" alt="React 18">
  <img src="https://img.shields.io/badge/LM_Studio-Fast_AI-green?style=flat-square" alt="LM Studio">
</p>

<p align="center">
  <strong>🎨 AI-Powered Generative UI with Pretext</strong><br>
  AI builds complete websites in real-time. Zero DOM reflow. Canvas rendering.
</p>

---

## 🚀 Live Demo

**Try it:** http://localhost:3456

AI generates a complete website on every visit using Pretext for zero-reflow text rendering!

---

## ✨ Features

### 🤖 AI-Controlled Generation
- **Dual Model System**: Fast 9B for quick generation + 27B for quality enhancement
- AI generates complete websites in real-time
- Components stream as AI thinks

### 📐 Pretext Integration
- **Zero DOM Reflow**: Character-level text measurement without touching the DOM
- Pre-calculated heights for smooth animations
- Canvas rendering for everything

### 🎨 Canvas Rendering
- All UI drawn on canvas (not DOM elements)
- Smooth hover effects and interactions
- Real-time mouse tracking

### 🌐 Live Preview
- **Canvas View**: AI-controlled canvas rendering
- **HTML View**: Live iframe preview
- **Download**: Export as HTML file

---

## 🏗️ Architecture

```
User visits page
    ↓
🚀 qwen3.5-9B (fast) generates initial UI
    ↓
🎨 Pretext measures text positions
    ↓
🎯 qwen3.5-27B (quality) enhances UI
    ↓
📦 Canvas renders components
    ↓
✅ Complete website displayed
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Pretext** | Zero-reflow text measurement |
| **React** | UI framework |
| **Canvas API** | Rendering engine |
| **LM Studio** | Local AI inference |
| **qwen3.5-9B** | Fast initial generation |
| **qwen3.5-27B** | Quality enhancement |
| **Tailwind** | Styling |

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
    └── App.tsx        # Main generative UI app
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

## 🤖 Usage

```typescript
// AI generates website
generateWebsite('Build a landing page')

// Preview modes
- Canvas: AI-controlled rendering
- HTML: Live preview in iframe
- Download: Save as HTML file
```

---

## 📦 Components

- **50+ Pre-built components**
- **Visual effects** (particles, gradients, glows)
- **AI Integration** (LM Studio, OpenAI, Claude)
- **Streaming** components
- **Data visualization**

---

## 🌐 Links

- **GitHub**: https://github.com/Franzferdinan51/pretext-generativeUI-Toolkit
- **Live Demo**: http://localhost:3456

---

## 📄 License

MIT License

---

<p align="center">
  Built with ❤️ using Pretext, React, Canvas, and LM Studio
</p>
