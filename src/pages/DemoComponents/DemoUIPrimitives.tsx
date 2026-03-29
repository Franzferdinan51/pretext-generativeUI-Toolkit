/**
 * DemoUIPrimitives - Demo for shadcn UI primitives
 */
import React, { useState } from 'react'
import { Button, Card, CardHeader, CardTitle, CardContent, Badge, Input } from '../../shadcn'

export function DemoUIPrimitives() {
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-400 mb-4">
        Basic UI primitives from shadcn:
      </p>

      {/* Buttons */}
      <div>
        <h4 className="text-sm font-semibold text-gray-500 mb-3">Buttons</h4>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
      </div>

      {/* Badges */}
      <div>
        <h4 className="text-sm font-semibold text-gray-500 mb-3">Badges</h4>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>
      </div>

      {/* Input */}
      <div>
        <h4 className="text-sm font-semibold text-gray-500 mb-3">Input</h4>
        <div className="max-w-md">
          <Input
            placeholder="Enter text..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-2">Current value: {inputValue || '(empty)'}</p>
        </div>
      </div>

      {/* Cards */}
      <div>
        <h4 className="text-sm font-semibold text-gray-500 mb-3">Cards</h4>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Simple Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">
                This is a basic card component with header and content.
              </p>
            </CardContent>
          </Card>
          <Card variant="outline">
            <CardHeader>
              <CardTitle>Outline Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">
                Cards with different variants for various use cases.
              </p>
              <Badge variant="success" className="mt-2">Featured</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DemoUIPrimitives
