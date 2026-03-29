import { default as React } from 'react';

export interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    color: string;
}
export interface ParticleEmitterProps {
    count?: number;
    colors?: string[];
    minSize?: number;
    maxSize?: number;
    minLife?: number;
    maxLife?: number;
    minSpeed?: number;
    maxSpeed?: number;
    gravity?: number;
    friction?: number;
    decay?: number;
    emitX?: number;
    emitY?: number;
    emitRadius?: number;
    width?: number;
    height?: number;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * ParticleEmitter component
 */
export declare const ParticleEmitter: React.FC<ParticleEmitterProps>;
export default ParticleEmitter;
