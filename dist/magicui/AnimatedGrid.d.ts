import { default as React } from 'react';

export interface AnimatedGridProps {
    rows?: number;
    cols?: number;
    gap?: number;
    color?: string;
    animate?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const AnimatedGrid: React.FC<AnimatedGridProps>;
export default AnimatedGrid;
