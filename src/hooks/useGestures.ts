/**
 * useGestures - Hook for touch and gesture handling
 */

import { useState, useEffect, useRef, useCallback } from 'react'

export interface Point {
  x: number
  y: number
}

export interface GestureState {
  isActive: boolean
  startPoint: Point | null
  currentPoint: Point | null
  delta: Point | null
  distance: number
  angle: number
  scale: number
  rotation: number
}

export interface UseGesturesOptions {
  onTap?: (point: Point) => void
  onDoubleTap?: (point: Point) => void
  onPan?: (state: GestureState) => void
  onPanStart?: (point: Point) => void
  onPanEnd?: (state: GestureState) => void
  onPinch?: (state: GestureState) => void
  onRotate?: (state: GestureState) => void
  onSwipe?: (direction: 'up' | 'down' | 'left' | 'right', velocity: Point) => void
  threshold?: {
    tap?: number
    pan?: number
    swipe?: number
  }
}

/**
 * Calculate distance between two points
 */
function distance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
}

/**
 * Calculate angle between two points (in radians)
 */
function angle(p1: Point, p2: Point): number {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x)
}

/**
 * Hook for handling touch gestures
 */
export function useGestures(
  targetRef: React.RefObject<HTMLElement>,
  options: UseGesturesOptions = {}
) {
  const {
    onTap,
    onDoubleTap,
    onPan,
    onPanStart,
    onPanEnd,
    onPinch,
    onRotate,
    onSwipe,
    threshold = {
      tap: 10,
      pan: 10,
      swipe: 50
    }
  } = options
  
  const [gestureState, setGestureState] = useState<GestureState>({
    isActive: false,
    startPoint: null,
    currentPoint: null,
    delta: null,
    distance: 0,
    angle: 0,
    scale: 1,
    rotation: 0
  })
  
  const touchIdRef = useRef<number | null>(null)
  const lastTapRef = useRef<number>(0)
  const startDistanceRef = useRef<number>(0)
  const startAngleRef = useRef<number>(0)
  const initialScaleRef = useRef<number>(1)
  const initialRotationRef = useRef<number>(0)
  const velocityRef = useRef<Point>({ x: 0, y: 0 })
  const lastPointRef = useRef<Point>({ x: 0, y: 0 })
  const lastTimeRef = useRef<number>(0)
  
  // Handle touch start
  const handleTouchStart = useCallback((event: TouchEvent) => {
    if (touchIdRef.current !== null) return
    
    const touch = event.touches[0]
    touchIdRef.current = touch.identifier
    
    const point: Point = { x: touch.clientX, y: touch.clientY }
    
    lastPointRef.current = point
    lastTimeRef.current = Date.now()
    
    setGestureState({
      isActive: true,
      startPoint: point,
      currentPoint: point,
      delta: null,
      distance: 0,
      angle: 0,
      scale: 1,
      rotation: 0
    })
    
    if (onPanStart) {
      onPanStart(point)
    }
  }, [onPanStart])
  
  // Handle touch move
  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (touchIdRef.current === null) return
    
    const touch = Array.from(event.touches).find(t => t.identifier === touchIdRef.current)
    if (!touch) return
    
    const point: Point = { x: touch.clientX, y: touch.clientY }
    const startPoint = gestureState.startPoint!
    
    const delta: Point = {
      x: point.x - (gestureState.currentPoint?.x || point.x),
      y: point.y - (gestureState.currentPoint?.y || point.y)
    }
    
    const dist = distance(startPoint, point)
    const ang = angle(startPoint, point)
    
    // Calculate velocity
    const now = Date.now()
    const dt = now - lastTimeRef.current
    if (dt > 0) {
      velocityRef.current = {
        x: (point.x - lastPointRef.current.x) / dt,
        y: (point.y - lastPointRef.current.y) / dt
      }
    }
    lastPointRef.current = point
    lastTimeRef.current = now
    
    // Check for pinch/rotate with two fingers
    if (event.touches.length >= 2) {
      const touch2 = Array.from(event.touches)[0].identifier === touchIdRef.current
        ? Array.from(event.touches)[1]
        : Array.from(event.touches)[0]
      
      if (touch2) {
        const point2: Point = { x: touch2.clientX, y: touch2.clientY }
        const newDistance = distance(point, point2)
        const newAngle = angle(point, point2)
        
        if (startDistanceRef.current === 0) {
          startDistanceRef.current = newDistance
          startAngleRef.current = newAngle
        }
        
        const scale = newDistance / startDistanceRef.current
        const rotation = (newAngle - startAngleRef.current) * (180 / Math.PI)
        
        if (onPinch) {
          onPinch({
            ...gestureState,
            currentPoint: point,
            delta,
            distance: dist,
            angle: ang,
            scale,
            rotation
          })
        }
        
        if (onRotate) {
          onRotate({
            ...gestureState,
            currentPoint: point,
            delta,
            distance: dist,
            angle: ang,
            scale,
            rotation
          })
        }
        
        initialScaleRef.current = scale
        initialRotationRef.current = rotation
      }
    }
    
    setGestureState(prev => ({
      ...prev,
      currentPoint: point,
      delta,
      distance: dist,
      angle: ang
    }))
    
    if (onPan) {
      onPan({
        ...gestureState,
        currentPoint: point,
        delta,
        distance: dist,
        angle: ang
      })
    }
  }, [gestureState, onPan, onPinch, onRotate])
  
  // Handle touch end
  const handleTouchEnd = useCallback((event: TouchEvent) => {
    if (touchIdRef.current === null) return
    
    const touch = Array.from(event.changedTouches).find(t => t.identifier === touchIdRef.current)
    if (!touch) return
    
    const point: Point = { x: touch.clientX, y: touch.clientY }
    const startPoint = gestureState.startPoint!
    
    touchIdRef.current = null
    startDistanceRef.current = 0
    
    const dist = distance(startPoint, point)
    const duration = Date.now() - lastTimeRef.current
    
    // Check for tap
    if (dist < (threshold.tap || 10) && duration < 300) {
      const now = Date.now()
      
      // Check for double tap
      if (now - lastTapRef.current < 300) {
        if (onDoubleTap) {
          onDoubleTap(startPoint)
        }
        lastTapRef.current = 0
      } else {
        if (onTap) {
          onTap(startPoint)
        }
        lastTapRef.current = now
      }
    }
    
    // Check for swipe
    if (dist > (threshold.swipe || 50)) {
      const ang = angle(startPoint, point)
      const velocity = velocityRef.current
      
      let direction: 'up' | 'down' | 'left' | 'right'
      
      if (ang > -Math.PI / 4 && ang < Math.PI / 4) {
        direction = 'right'
      } else if (ang >= Math.PI / 4 && ang < 3 * Math.PI / 4) {
        direction = 'down'
      } else if (ang >= -3 * Math.PI / 4 && ang < -Math.PI / 4) {
        direction = 'up'
      } else {
        direction = 'left'
      }
      
      if (onSwipe) {
        onSwipe(direction, velocity)
      }
    }
    
    if (onPanEnd) {
      onPanEnd({
        ...gestureState,
        currentPoint: point,
        isActive: false
      })
    }
    
    setGestureState({
      isActive: false,
      startPoint: null,
      currentPoint: null,
      delta: null,
      distance: 0,
      angle: 0,
      scale: 1,
      rotation: 0
    })
  }, [gestureState, onTap, onDoubleTap, onPanEnd, onSwipe, threshold])
  
  // Attach event listeners
  useEffect(() => {
    const element = targetRef.current
    if (!element) return
    
    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchmove', handleTouchMove, { passive: true })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })
    element.addEventListener('touchcancel', handleTouchEnd, { passive: true })
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
      element.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [targetRef, handleTouchStart, handleTouchMove, handleTouchEnd])
  
  return {
    gestureState,
    isActive: gestureState.isActive
  }
}

export default useGestures
