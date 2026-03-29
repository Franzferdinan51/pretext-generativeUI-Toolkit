import { default as React } from 'react';

export interface LayoutBox {
    x: number;
    y: number;
    width: number;
    height: number;
    content?: string | React.ReactNode;
}
export interface LayoutOptions {
    direction?: 'row' | 'column';
    gap?: number;
    padding?: number;
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
    wrap?: boolean;
    maxWidth?: number;
    maxHeight?: number;
}
export interface PretextLayoutProps {
    children?: React.ReactNode;
    options?: LayoutOptions;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * Calculate layout boxes for children
 */
export declare function calculateLayout(children: React.ReactNode[], options: LayoutOptions): LayoutBox[];
/**
 * FlexLayout - Flexbox-like layout component
 */
export declare const PretextLayout: React.FC<PretextLayoutProps>;
/**
 * StackLayout - Vertical or horizontal stack
 */
export interface StackLayoutProps {
    children?: React.ReactNode;
    direction?: 'row' | 'column';
    gap?: number;
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
    className?: string;
    style?: React.CSSProperties;
}
export declare const StackLayout: React.FC<StackLayoutProps>;
/**
 * GridLayout - CSS Grid-based layout
 */
export interface GridLayoutProps {
    children?: React.ReactNode;
    columns?: number | string;
    rows?: number | string;
    gap?: number;
    columnGap?: number;
    rowGap?: number;
    alignItems?: string;
    justifyItems?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const GridLayout: React.FC<GridLayoutProps>;
/**
 * MasonryLayout - Pinterest-style masonry layout
 */
export interface MasonryLayoutProps {
    children?: React.ReactNode;
    columns?: number;
    gap?: number;
    className?: string;
    style?: React.CSSProperties;
}
export declare const MasonryLayout: React.FC<MasonryLayoutProps>;
/**
 * AdaptiveLayout - Automatically adjusts based on container size
 */
export interface AdaptiveLayoutProps {
    children?: React.ReactNode;
    breakpoints?: Array<{
        minWidth: number;
        columns: number;
    }>;
    gap?: number;
    className?: string;
    style?: React.CSSProperties;
}
export declare const AdaptiveLayout: React.FC<AdaptiveLayoutProps>;
export default PretextLayout;
