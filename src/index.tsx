/**
 * Main entry point for Pretext AI UI Toolkit
 * 
 * Routes to either the DemoShowcase or AutoHealingApp based on URL.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { DemoShowcase } from './pages/DemoShowcase'
import { AutoHealingApp } from './webui/App'
import './index.css'

// Check URL for which app to show
const url = new URL(window.location.href)
const mode = url.searchParams.get('mode')

function App() {
  if (mode === 'autoheal') {
    return <AutoHealingApp />
  }
  return <DemoShowcase />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
