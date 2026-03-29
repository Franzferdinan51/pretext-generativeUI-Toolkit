/**
 * Pretext Generative UI Toolkit
 *
 * A comprehensive AI-powered generative UI toolkit combining:
 * - Pretext: Character-level text measurement
 * - Streaming: Real-time text streaming with pre-measurement
 * - AI Components: Smart content detection and rendering
 * - Visual Effects: Particle systems, gradients, glows
 * - UI Primitives: shadcn-style components
 * - MagicUI Effects: Beautiful animations
 */
export * from './pretext';
export * from './components';
export * from './effects';
export * from './streaming';
export * from './hooks';
export * from './ai';
export * from './shadcn';
export * from './magicui';
export * from './morphic';
export type { ContentType, DetectionResult } from './ai/ContentDetector';
export type { DeliberationMode, ModeOption } from './ai/ModeSelector';
export type { Councilor } from './ai/CouncilorSelector';
export type { VoteOption } from './components/VoteCard';
export type { ChartDataPoint } from './components/DataChart';
export type { TableColumn } from './components/DataTable';
export type { Particle } from './effects/ParticleEmitter';
