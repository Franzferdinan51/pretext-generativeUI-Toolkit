/**
 * WordRotate - Word rotation effect
 */

import React, { useEffect, useState } from 'react'

export interface WordRotateProps {
  words: string[]
  duration?: number
  className?: string
  style?: React.CSSProperties
}

export const WordRotate: React.FC<WordRotateProps> = ({
  words,
  duration = 2000,
  className,
  style
}) => {
  const [index, setIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % words.length)
    }, duration)
    
    return () => clearInterval(interval)
  }, [words.length, duration])
  
  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        minWidth: '100px',
        ...style
      }}
    >
      {words.map((word, i) => (
        <span
          key={word}
          style={{
            display: 'inline-block',
            opacity: index === i ? 1 : 0,
            transform: index === i ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'all 0.3s ease',
            position: index === i ? 'relative' : 'absolute'
          }}
        >
          {word}
        </span>
      ))}
    </span>
  )
}

export default WordRotate
