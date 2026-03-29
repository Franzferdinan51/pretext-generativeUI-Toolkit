import { default as React } from 'react';

export interface ResponsiveGridProps {
    children: React.ReactNode[];
    columns?: number | {
        base: number;
        md?: number;
        lg?: number;
        xl?: number;
    };
    gap?: number;
    className?: string;
}
export declare function ResponsiveGrid({ children, columns, gap, className, }: ResponsiveGridProps): import("react/jsx-runtime").JSX.Element;
export default ResponsiveGrid;
