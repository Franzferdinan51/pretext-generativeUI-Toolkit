import { default as React } from 'react';

export interface LayoutSuggestion {
    type: 'grid' | 'stack' | 'masonry' | 'adaptive' | 'split';
    config: Record<string, any>;
    reason: string;
    score: number;
}
export interface LayoutContext {
    contentLength: number;
    contentTypes: string[];
    viewportWidth: number;
    viewportHeight: number;
    itemCount: number;
    hasMixedMedia: boolean;
}
export interface LayoutOptimizerProps {
    children?: React.ReactNode;
    context: LayoutContext;
    onSuggestion?: (suggestion: LayoutSuggestion) => void;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * Analyze content and suggest optimal layout
 */
export declare function analyzeLayout(context: LayoutContext): LayoutSuggestion[];
/**
 * Get best layout suggestion
 */
export declare function getBestLayout(context: LayoutContext): LayoutSuggestion;
/**
 * Calculate optimal grid columns
 */
export declare function calculateOptimalColumns(viewportWidth: number, itemCount: number, minItemWidth?: number, maxItemWidth?: number): number;
/**
 * LayoutOptimizer component
 */
export declare const LayoutOptimizer: React.FC<LayoutOptimizerProps>;
/**
 * Hook for layout optimization
 */
export declare function useLayoutOptimizer(context: LayoutContext): {
    suggestions: LayoutSuggestion[];
    best: LayoutSuggestion;
    getSuggestion: (type: LayoutSuggestion["type"]) => LayoutSuggestion;
    calculateColumns: (minWidth?: number, maxWidth?: number) => number;
};
export default LayoutOptimizer;
