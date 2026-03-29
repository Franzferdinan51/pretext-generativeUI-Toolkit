import { default as React } from 'react';

export interface TextGradientProps {
    children?: React.ReactNode;
    from?: string;
    to?: string;
    direction?: string;
    animate?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const TextGradient: React.FC<TextGradientProps>;
export default TextGradient;
