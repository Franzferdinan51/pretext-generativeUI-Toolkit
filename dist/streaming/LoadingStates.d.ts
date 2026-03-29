import { default as React } from 'react';

export interface LoadingDotsProps {
    count?: number;
    size?: number;
    color?: string;
    speed?: number;
    className?: string;
    style?: React.CSSProperties;
}
export declare const LoadingDots: React.FC<LoadingDotsProps>;
export interface LoadingSpinnerProps {
    size?: number;
    color?: string;
    strokeWidth?: number;
    className?: string;
    style?: React.CSSProperties;
}
export declare const LoadingSpinner: React.FC<LoadingSpinnerProps>;
export interface LoadingBarsProps {
    count?: number;
    width?: number;
    height?: number;
    gap?: number;
    color?: string;
    speed?: number;
    className?: string;
    style?: React.CSSProperties;
}
export declare const LoadingBars: React.FC<LoadingBarsProps>;
export interface LoadingPulseProps {
    width?: number | string;
    height?: number;
    color?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const LoadingPulse: React.FC<LoadingPulseProps>;
export interface LoadingOrbProps {
    size?: number;
    color?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const LoadingOrb: React.FC<LoadingOrbProps>;
export default LoadingDots;
