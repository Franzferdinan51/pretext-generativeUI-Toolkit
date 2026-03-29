import { default as React } from 'react';

export interface OrbitingShapesProps {
    count?: number;
    size?: number;
    colors?: string[];
    orbitRadius?: number;
    shapeSize?: number;
    speed?: number;
    shape?: 'circle' | 'square' | 'triangle';
    className?: string;
    style?: React.CSSProperties;
}
export declare const OrbitingShapes: React.FC<OrbitingShapesProps>;
export default OrbitingShapes;
