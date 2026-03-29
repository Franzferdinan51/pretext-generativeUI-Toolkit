import { default as React } from 'react';

export interface GradientMeshProps {
    colors?: string[];
    speed?: number;
    blendMode?: GlobalCompositeOperation;
    opacity?: number;
    width?: number | string;
    height?: number | string;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * GradientMesh component
 */
export declare const GradientMesh: React.FC<GradientMeshProps>;
export default GradientMesh;
