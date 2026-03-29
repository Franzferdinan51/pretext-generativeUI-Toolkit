/**
 * DemoMagicUIEffects - Demo for MagicUI text effects
 */
import React from 'react'
import { WordRotate, TextGradient, FadeIn, OrbitingShapes } from '../../magicui'

export function DemoMagicUIEffects() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-400 mb-4">
        MagicUI text effects and animations:
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-black/50 rounded-lg p-6">
          <h4 className="text-sm text-gray-500 mb-4">WordRotate</h4>
          <div className="text-3xl font-bold">
            Building <WordRotate words={['Fast', 'Smart', 'Beautiful', 'Powerful']} /> UIs
          </div>
        </div>

        <div className="bg-black/50 rounded-lg p-6">
          <h4 className="text-sm text-gray-500 mb-4">TextGradient</h4>
          <TextGradient 
            text="Gradient Text Effect" 
            className="text-4xl font-bold"
          />
        </div>

        <div className="bg-black/50 rounded-lg p-6">
          <h4 className="text-sm text-gray-500 mb-4">FadeIn</h4>
          <FadeIn delay={0}>
            <div className="text-xl">This content fades in smoothly</div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="text-xl mt-2">With staggered delays</div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="text-xl mt-2">Creating elegant reveals</div>
          </FadeIn>
        </div>

        <div className="bg-black/50 rounded-lg p-6">
          <h4 className="text-sm text-gray-500 mb-4">OrbitingShapes</h4>
          <div className="flex justify-center">
            <OrbitingShapes count={3} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemoMagicUIEffects
