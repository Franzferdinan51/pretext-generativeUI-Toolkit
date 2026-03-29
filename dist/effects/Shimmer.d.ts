import { default as React } from 'react';

export interface ShimmerProps {
    width?: number | string;
    height?: number | string;
    speed?: number;
    color?: string;
    gradientWidth?: number;
    borderRadius?: number;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * Shimmer component
 */
export declare const Shimmer: React.FC<ShimmerProps>;
/**
 * Skeleton - Loading skeleton component
 */
export interface SkeletonProps {
    variant?: 'text' | 'circular' | 'rectangular';
    lines?: number;
    lastLineWidth?: number | string;
    spacing?: number;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Skeleton: React.FC<SkeletonProps>;
export default Shimmer;
