/**
 * DemoSmartMessage - Demo for SmartMessage content detection
 */
import React from 'react'
import { SmartMessage } from '../../components'

export function DemoSmartMessage() {
  const messages = [
    { type: 'vote', content: 'I vote YES on this proposal. VOTE: YES' },
    { type: 'code', content: '```js\nconst x = 42;\nconsole.log(x);\n```' },
    { type: 'list', content: '1. First item\n2. Second item\n3. Third item' },
    { type: 'table', content: '| Name | Value |\n|------|-------|\n| A | 1 |\n| B | 2 |' },
    { type: 'summary', content: 'In summary, the key points are: 1) Fast 2) Simple 3) Powerful' },
  ]

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-400 mb-4">
        SmartMessage automatically detects content type and renders appropriate components:
      </p>
      {messages.map((msg, i) => (
        <SmartMessage key={i} content={msg.content} />
      ))}
    </div>
  )
}

export default DemoSmartMessage
