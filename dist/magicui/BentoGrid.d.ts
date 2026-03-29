import { default as React } from 'react';

export interface BentoItem {
    title?: string;
    children?: React.ReactNode;
    colSpan?: number;
    rowSpan?: number;
    className?: string;
    style?: React.CSSProperties;
}
export interface BentoGridProps {
    children?: React.ReactNode;
    cols?: number;
    gap?: number;
    className?: string;
    style?: React.CSSProperties;
}
export declare const BentoGrid: React.FC<BentoGridProps>;
export declare const BentoItem: React.FC<BentoItem>;
export default BentoGrid;
