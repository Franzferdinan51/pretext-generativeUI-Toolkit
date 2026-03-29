/**
 * Tool Results Panel Component
 * Show tool execution results
 */

import { BUILT_IN_TOOLS, type ToolResult } from './ToolExecutor'

interface ToolResultsPanelProps {
  results: Map<string, ToolResult>
  loading: Set<string>
  onToolClick?: (toolName: string) => void
  className?: string
}

export function ToolResultsPanel({
  results,
  loading,
  onToolClick,
  className = ''
}: ToolResultsPanelProps) {
  return (
    <div className={`tool-results-panel ${className}`}>
      <h3 className="panel-title">MCP Tools</h3>

      <div className="tool-list">
        {BUILT_IN_TOOLS.map(tool => (
          <div
            key={tool.name}
            className={`tool-item ${loading.has(tool.name) ? 'loading' : ''}`}
            onClick={() => onToolClick?.(tool.name)}
          >
            <div className="tool-header">
              <span className="tool-name">{tool.name}</span>
              {loading.has(tool.name) && <span className="tool-spinner" />}
            </div>
            <div className="tool-desc">{tool.description}</div>
            <div className="tool-params">
              {Object.entries(tool.inputSchema.properties).map(([key, param]) => (
                <span key={key} className="param">
                  {key}
                  {tool.inputSchema.required?.includes(key) ? '*' : ''}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {results.size > 0 && (
        <div className="results-list">
          <h4 className="results-title">Results</h4>
          {Array.from(results.entries()).map(([tool, result]) => (
            <div key={tool} className={`result-item ${result.error ? 'error' : ''}`}>
              <div className="result-header">
                <span className="result-tool">{tool}</span>
                <span className="result-time">
                  {new Date(result.timestamp).toLocaleTimeString()}
                </span>
              </div>
              {result.error ? (
                <div className="result-error">{result.error}</div>
              ) : (
                <pre className="result-content">
                  {typeof result.result === 'object'
                    ? JSON.stringify(result.result, null, 2)
                    : String(result.result)}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Compact tool button grid
export function ToolButtonGrid({
  onToolSelect,
  loading
}: {
  onToolSelect: (toolName: string) => void
  loading: Set<string>
}) {
  return (
    <div className="tool-button-grid">
      {BUILT_IN_TOOLS.map(tool => (
        <button
          key={tool.name}
          className={`tool-button ${loading.has(tool.name) ? 'loading' : ''}`}
          onClick={() => onToolSelect(tool.name)}
          disabled={loading.has(tool.name)}
        >
          {loading.has(tool.name) ? (
            <span className="btn-spinner" />
          ) : (
            <span className="btn-icon">{tool.name.charAt(0).toUpperCase()}</span>
          )}
          <span className="btn-label">{tool.name}</span>
        </button>
      ))}
    </div>
  )
}

// Tool invocation form
export function ToolInvokeForm({
  toolName,
  onInvoke,
  loading
}: {
  toolName: string
  onInvoke: (args: Record<string, any>) => void
  loading: boolean
}) {
  const tool = BUILT_IN_TOOLS.find(t => t.name === toolName)
  if (!tool) return null

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const args: Record<string, any> = {}
    for (const [key, value] of formData.entries()) {
      args[key] = value
    }
    onInvoke(args)
  }

  return (
    <form className="tool-invoke-form" onSubmit={handleSubmit}>
      <h4>Invoke: {tool.name}</h4>
      <p className="tool-description">{tool.description}</p>

      {Object.entries(tool.inputSchema.properties).map(([key, param]) => (
        <label key={key} className="form-field">
          <span>
            {key}
            {tool.inputSchema.required?.includes(key) ? ' *' : ''}
          </span>
          <input
            type="text"
            name={key}
            placeholder={param.description}
            defaultValue={param.default}
          />
        </label>
      ))}

      <button type="submit" disabled={loading}>
        {loading ? 'Running...' : 'Execute'}
      </button>
    </form>
  )
}
