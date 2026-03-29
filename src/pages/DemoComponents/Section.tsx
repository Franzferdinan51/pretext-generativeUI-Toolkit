/**
 * Section - Wrapper component for demo sections
 */
import React from 'react'

interface SectionProps {
  title: string
  children: React.ReactNode
}

export function Section({ title, children }: SectionProps) {
  return (
    <section className="py-8 border-t border-white/10">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
        {title}
      </h2>
      <div className="bg-gray-900/50 rounded-xl p-6 border border-white/5">
        {children}
      </div>
    </section>
  )
}

export default Section
