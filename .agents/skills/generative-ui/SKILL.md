---
name: generative-ui
description: Generate UI cards and websites instantly using Pretext for smart text measurement. No API calls needed - runs locally.
metadata: {"openclaw": {"emoji": "🎨", "requires": {"bins": ["node"]}}}
---

# 🎨 Generative UI Skill

Generate visual UI components **instantly** using Pretext for smart text measurement.

## Architecture

```
User Request → Pretext Server (text measurement) → HTML Generator → Browser
     ↓                    ↓
  Natural         - measureText()
  Language        - getLines()
     ↓            - shrinkwrap()
  Card Type       - floatAround()
```

## Quick Start

### 1. Start Pretext Server (if not running)
```bash
cd ~/.openclaw/workspace/skills/generative-ui
node backend/pretext-server.js &
```

### 2. Generate UI
```bash
node ~/.openclaw/workspace/skills/generative-ui/backend/pretext-generator.js "weather 72F sunny"
```

## Available Card Types

| Type | Command | Example |
|------|---------|---------|
| ☀️ **Weather** | `weather 72F sunny Dayton` | Current conditions |
| 📊 **Metric** | `99.9% uptime metric` | Stats with trends |
| 📦 **Product** | `wireless headphones $99` | Product cards |
| 💰 **Pricing** | `pro plan $29 month` | Pricing tiers |
| ✨ **Feature** | `AI powered search feature` | Feature highlights |
| 🚀 **CTA** | `signup cta button` | Call to action |
| ❌ **Error** | `error notification failed` | Alerts/notifications |
| ⏱️ **Countdown** | `launch countdown timer` | Event countdowns |
| 👤 **Avatar** | `user avatar profile` | Profile cards |
| 🏷️ **Badge** | `new badge` | Labels/tags |

## Pretext Text Measurement API

The Pretext Server (port 3458) provides:

```bash
# Measure text height
curl -X POST http://localhost:3458 -H "Content-Type: application/json" \
  -d '{"action":"measure","text":"Hello World","fontSize":24,"maxWidth":300}'

# Get wrapped lines
curl -X POST http://localhost:3458 -H "Content-Type: application/json" \
  -d '{"action":"lines","text":"Long text here","fontSize":18,"maxWidth":200}'

# Get tightest width (shrinkwrap)
curl -X POST http://localhost:3458 -H "Content-Type: application/json" \
  -d '{"action":"shrinkwrap","text":"Button","fontSize":16}'

# Float text around obstacle
curl -X POST http://localhost:3458 -H "Content-Type: application/json" \
  -d '{"action":"float","text":"Content here","fontSize":16,"maxWidth":400,"obstacle":{"x":0,"y":0,"width":100,"height":100}}'
```

## Tips for Best Results

1. **Include specific data** - Numbers, prices, locations
2. **Specify the type** - Use trigger words like "weather", "metric", "product"
3. **Add context** - "sunny Dayton" not just "weather"
4. **Chain requests** - Generate multiple cards for dashboards

## Files

```
~/.openclaw/workspace/skills/generative-ui/
├── SKILL.md              ← This file
├── backend/
│   ├── fast-generator.js     ← Simple generator (no server needed)
│   ├── pretext-generator.js   ← Pretext-enhanced (needs server)
│   ├── pretext-server.js     ← Text measurement server
│   ├── generative-ui.js      ← Full AI generator (MiniMax API)
│   ├── cli.js               ← CLI tool
│   └── mcp-server.js         ← MCP server
```

## Examples

### Generate Weather Card
```bash
node backend/pretext-generator.js "weather for Huber Heights 74F partly cloudy 45 humidity"
```

### Generate Metric Card
```bash
node backend/pretext-generator.js "99.9 percent uptime metric positive trend"
```

### Generate Product Card
```bash
node backend/pretext-generator.js "wireless headphones 149 dollars"
```

### Generate Full Dashboard
```bash
node backend/pretext-generator.js "weather 72F" > /tmp/weather.html
node backend/pretext-generator.js "10000 users metric" > /tmp/users.html
node backend/pretext-generator.js "99.9 uptime metric" > /tmp/uptime.html
```

## Server Management

```bash
# Start server
node backend/pretext-server.js &

# Check status
curl http://localhost:3458/health

# Stop server
pkill -f pretext-server
```
