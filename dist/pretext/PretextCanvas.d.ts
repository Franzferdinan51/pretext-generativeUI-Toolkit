import { default as React } from 'react';

export interface TextMeasurement {
    height: number;
    lines: TextLine[];
    totalWidth: number;
}
export interface TextLine {
    text: string;
    x: number;
    y: number;
    width: number;
    baseline: number;
}
export interface PretextCanvasProps {
    text: string;
    font?: string;
    maxWidth?: number;
    lineHeight?: number;
    color?: string;
    x?: number;
    y?: number;
    align?: 'left' | 'center' | 'right';
    verticalAlign?: 'top' | 'middle' | 'bottom';
    className?: string;
    style?: React.CSSProperties;
    onMeasure?: (measurement: TextMeasurement) => void;
}
export interface PretextTextProps extends Omit<PretextCanvasProps, 'onMeasure'> {
    measurement?: TextMeasurement | null;
}
/**
 * Core hook for text measurement using Canvas 2D fallback
 */
export declare function useTextMeasurement(text: string, font: string, maxWidth: number, lineHeight: number): TextMeasurement | null;
/**
 * PretextCanvas - Renders measured text on a canvas element
 */
export declare const PretextCanvas: React.FC<PretextCanvasProps>;
/**
 * PretextText - Renders measured text with HTML fallback
 */
export declare const PretextText: React.FC<PretextTextProps>;
export default PretextCanvas;
