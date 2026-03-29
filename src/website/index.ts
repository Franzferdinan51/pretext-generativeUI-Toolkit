/**
 * Website Generator Module
 * 
 * Live AI-powered website generation - components appear in real-time
 * as the AI streams the output, similar to procedural world generation.
 */

export { LiveWebsiteGenerator } from './LiveWebsiteGenerator'
export { WebsitePreview } from './WebsitePreview'

// Types
export interface WebsiteSection {
  id: string
  type: 'header' | 'hero' | 'features' | 'pricing' | 'testimonials' | 'cta' | 'footer' | 'nav' | 'content' | 'grid' | 'form'
  content: string
  styles?: Record<string, string>
  children?: WebsiteSection[]
}

export interface GeneratedWebsite {
  title: string
  description: string
  sections: WebsiteSection[]
  css?: string
}
