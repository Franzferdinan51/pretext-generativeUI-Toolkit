/**
 * Basic Example 2: Smart Messages
 */

import React from 'react'
import { SmartMessage } from '../src/components'

const councilor = { name: 'Councilor Alpha', color: '#8b5cf6', avatar: '👤' }

export default function MessagesExample() {
  return (
    <div style={{ padding: '40px', maxWidth: '600px' }}>
      <h2 style={{ color: '#fff', marginBottom: '20px' }}>Smart Messages</h2>
      
      {/* Normal text */}
      <SmartMessage 
        content="This is a normal message. SmartMessage automatically detects the content type!"
        councilor={councilor}
      />
      
      {/* Code detection */}
      <SmartMessage 
        content="Here's the implementation:\n```typescript\nconst x = 42;\nconsole.log(x);\n```"
        councilor={councilor}
      />
      
      {/* List detection */}
      <SmartMessage 
        content="Key points:\n1. First point with detail\n2. Second point\n3. Third point"
        councilor={councilor}
      />
      
      {/* Question */}
      <SmartMessage 
        content="Should we proceed with the vote?"
        councilor={councilor}
      />
      
      {/* Summary */}
      <SmartMessage 
        content="In summary, we should vote on this proposal now."
        councilor={councilor}
      />
    </div>
  )
}
