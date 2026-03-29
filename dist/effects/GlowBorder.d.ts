import { default as React } from 'react';

export interface GlowBorderProps {
    children?: React.ReactNode;
    color?: string;
    intensity?: number;
    blurRadius?: number;
    borderRadius?: number;
    animate?: boolean;
    speed?: number;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * GlowBorder component
 */
export declare const GlowBorder: React.FC<GlowBorderProps>;
export default GlowBorder;
