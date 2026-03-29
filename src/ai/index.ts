/**
 * AI module exports
 */

export {
  detectContentType,
  detectMixedContent,
  extractStructuredData,
  getContentTypeColor,
  getContentTypeIcon,
  type ContentType,
  type DetectionResult
} from './ContentDetector'

export {
  AIGenerator,
  generateComponentProps,
  useAIGeneration,
  type GeneratorOptions,
  type GeneratedComponent,
  type AIGeneratorProps
} from './AIGenerator'

export {
  LayoutOptimizer,
  analyzeLayout,
  getBestLayout,
  calculateOptimalColumns,
  useLayoutOptimizer,
  type LayoutSuggestion,
  type LayoutContext,
  type LayoutOptimizerProps
} from './LayoutOptimizer'

export {
  ModeSelector,
  AutoModeSelector,
  detectOptimalMode,
  getModeOption,
  useModeSelector,
  type DeliberationMode,
  type ModeOption,
  type ModeSelectorProps
} from './ModeSelector'

export {
  CouncilorSelector,
  selectCouncilorsForContext,
  useCouncilorSelector,
  COUNCILOR_ARCHETYPES,
  type Councilor,
  type CouncilorSelectorProps
} from './CouncilorSelector'
