/**
 * Example 03: SmartMessage Content Detection
 * 
 * This example demonstrates automatic content type detection
 * and appropriate rendering.
 */

import React from 'react'
import { SmartMessage } from '../../src/components'

export function SmartMessageExample() {
  const messages = [
    {
      type: 'vote',
      content: 'I vote YES on this proposal. The benefits clearly outweigh the risks.'
    },
    {
      type: 'code',
      content: '```typescript\nconst greeting: string = "Hello, Pretext!";\nconsole.log(greeting);\n```'
    },
    {
      type: 'list',
      content: '1. First priority item\n2. Second priority item\n3. Third priority item'
    },
    {
      type: 'table',
      content: '| Feature | Status | Priority |\n|---------|--------|----------|\n| UI | Complete | High |\n| API | In Progress | Medium |\n| Tests | Pending | Low |'
    },
    {
      type: 'summary',
      content: 'In summary, the key takeaways are: 1) Easy to use 2) Fast performance 3) Beautiful design'
    }
  ]

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">SmartMessage Example</h1>
      
      <p className="text-gray-400 mb-6">
        SmartMessage automatically detects content type and renders the appropriate component.
        No manual type specification needed!
      </p>

      <div className="space-y-4">
        {messages.map((msg, i) => (
          <SmartMessage key={i} content={msg.content} />
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-800 rounded-lg">
        <h3 className="font-semibold mb-2">Supported Content Types:</h3>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-sm">
            <span className="text-purple-400">• Vote</span> - Voting results
          </div>
          <div className="text-sm">
            <span className="text-cyan-400">• Code</span> - Code blocks
          </div>
          <div className="text-sm">
            <span className="text-pink-400">• List</span> - Numbered/bullet lists
          </div>
          <div className="text-sm">
            <span className="text-orange-400">• Table</span> - Tabular data
          </div>
          <div className="text-sm">
            <span className="text-green-400">• Summary</span> - Key points
          </div>
          <div className="text-sm">
            <span className="text-blue-400">• Normal</span> - Plain text
          </div>
        </div>
      </div>
    </div>
  )
}

export default SmartMessageExample
