import { default as React } from 'react';

export interface FadeInProps {
    children?: React.ReactNode;
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
    className?: string;
    style?: React.CSSProperties;
}
export declare const FadeIn: React.FC<FadeInProps>;
export default FadeIn;
