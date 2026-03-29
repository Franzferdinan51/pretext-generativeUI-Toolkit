import { default as React } from 'react';

export type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export interface AdaptiveLayoutProps {
    children: React.ReactNode;
    layouts: {
        base?: React.ReactNode;
        sm?: React.ReactNode;
        md?: React.ReactNode;
        lg?: React.ReactNode;
        xl?: React.ReactNode;
        '2xl'?: React.ReactNode;
    };
    className?: string;
}
export declare function useBreakpoint(): Breakpoint;
export declare function AdaptiveLayout({ children, layouts, className, }: AdaptiveLayoutProps): import("react/jsx-runtime").JSX.Element;
export default AdaptiveLayout;
