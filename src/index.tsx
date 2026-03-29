/**
 * Main entry point for demos
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './examples/advanced/generative-ui'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
