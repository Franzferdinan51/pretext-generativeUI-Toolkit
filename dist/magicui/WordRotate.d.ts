import { default as React } from 'react';

export interface WordRotateProps {
    words: string[];
    duration?: number;
    className?: string;
    style?: React.CSSProperties;
}
export declare const WordRotate: React.FC<WordRotateProps>;
export default WordRotate;
