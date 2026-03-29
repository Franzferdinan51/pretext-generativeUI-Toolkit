/**
 * useKeyboard - Hook for keyboard shortcuts
 */

import { useEffect, useState, useCallback, useRef } from 'react'

export interface KeyboardShortcut {
  key: string
  ctrl?: boolean
  alt?: boolean
  shift?: boolean
  meta?: boolean
  handler: (event: KeyboardEvent) => void
  description?: string
}

export interface UseKeyboardOptions {
  enableOnInput?: boolean
  preventDefault?: boolean
}

/**
 * Parse shortcut string like "Ctrl+Shift+K" into components
 */
function parseShortcut(shortcut: string): Omit<KeyboardShortcut, 'handler' | 'description'> {
  const parts = shortcut.toLowerCase().split('+')
  const key = parts[parts.length - 1]
  
  return {
    key,
    ctrl: parts.includes('ctrl'),
    alt: parts.includes('alt'),
    shift: parts.includes('shift'),
    meta: parts.includes('meta') || parts.includes('cmd') || parts.includes('command')
  }
}

/**
 * Match keyboard event against shortcut
 */
function matchesShortcut(event: KeyboardEvent, shortcut: Omit<KeyboardShortcut, 'handler' | 'description'>): boolean {
  const ctrlMatch = shortcut.ctrl ? event.ctrlKey : !event.ctrlKey
  const altMatch = shortcut.alt ? event.altKey : !event.altKey
  const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey
  const metaMatch = shortcut.meta ? event.metaKey : !event.metaKey
  
  // Check key (handle special keys)
  let eventKey = event.key.toLowerCase()
  let shortcutKey = shortcut.key.toLowerCase()
  
  // Special key mappings
  const keyMappings: Record<string, string> = {
    'escape': 'esc',
    'arrowup': 'up',
    'arrowdown': 'down',
    'arrowleft': 'left',
    'arrowright': 'right'
  }
  
  eventKey = keyMappings[eventKey] || eventKey
  shortcutKey = keyMappings[shortcutKey] || shortcutKey
  
  return (
    eventKey === shortcutKey &&
    ctrlMatch &&
    altMatch &&
    shiftMatch &&
    metaMatch
  )
}

/**
 * Hook for handling keyboard shortcuts
 */
export function useKeyboard(
  shortcuts: Array<string | KeyboardShortcut>,
  options: UseKeyboardOptions = {}
) {
  const { enableOnInput = false, preventDefault = true } = options
  
  const shortcutsRef = useRef(shortcuts)
  
  // Update shortcuts ref when shortcuts change
  useEffect(() => {
    shortcutsRef.current = shortcuts
  }, [shortcuts])
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip if typing in input fields (unless enabled)
      if (!enableOnInput) {
        const target = event.target as HTMLElement
        const isInput = target.tagName === 'INPUT' ||
                       target.tagName === 'TEXTAREA' ||
                       target.isContentEditable
        
        if (isInput) return
      }
      
      // Check each shortcut
      for (const shortcut of shortcutsRef.current) {
        const parsedShortcut = typeof shortcut === 'string'
          ? parseShortcut(shortcut)
          : { key: shortcut.key, ctrl: shortcut.ctrl, alt: shortcut.alt, shift: shortcut.shift, meta: shortcut.meta }
        
        if (matchesShortcut(event, parsedShortcut)) {
          if (preventDefault) {
            event.preventDefault()
            event.stopPropagation()
          }
          
          const handler = typeof shortcut === 'string' ? () => {} : shortcut.handler
          handler(event)
          
          break
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enableOnInput, preventDefault])
}

/**
 * Hook for single key press detection
 */
export function useKeyPress(
  key: string,
  options: UseKeyboardOptions = {}
): boolean {
  const { enableOnInput = false } = options
  
  const [isPressed, setIsPressed] = useState(false)
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === key.toLowerCase()) {
        if (!enableOnInput) {
          const target = event.target as HTMLElement
          const isInput = target.tagName === 'INPUT' ||
                         target.tagName === 'TEXTAREA' ||
                         target.isContentEditable
          if (isInput) return
        }
        
        setIsPressed(true)
      }
    }
    
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === key.toLowerCase()) {
        setIsPressed(false)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [key, enableOnInput])
  
  return isPressed
}

/**
 * Hook for combination key press detection
 */
export function useKeysPressed(): Record<string, boolean> {
  const [keysPressed, setKeysPressed] = useState<Record<string, boolean>>({})
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeysPressed(prev => ({
        ...prev,
        [event.key.toLowerCase()]: true
      }))
    }
    
    const handleKeyUp = (event: KeyboardEvent) => {
      setKeysPressed(prev => ({
        ...prev,
        [event.key.toLowerCase()]: false
      }))
    }
    
    const handleBlur = () => {
      setKeysPressed({})
    }
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('blur', handleBlur)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('blur', handleBlur)
    }
  }, [])
  
  return keysPressed
}

export default useKeyboard
