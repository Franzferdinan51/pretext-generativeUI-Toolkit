import { default as React } from 'react';

export interface MasonryItem {
    id: string;
    content: React.ReactNode;
    height?: number;
}
export interface MasonryLayoutProps {
    items: MasonryItem[];
    columns?: number;
    gap?: number;
    className?: string;
}
export declare function MasonryLayout({ items, columns, gap, className, }: MasonryLayoutProps): import("react/jsx-runtime").JSX.Element;
export default MasonryLayout;
