import { default as React } from 'react';

export interface CodeBlockProps {
    content: string;
    language?: string;
    showLineNumbers?: boolean;
    showCopyButton?: boolean;
    theme?: 'dark' | 'light';
    maxHeight?: number;
    onCopy?: () => void;
    councilor?: {
        name: string;
        color: string;
        avatar?: string;
    };
    className?: string;
    style?: React.CSSProperties;
}
/**
 * CodeBlock component
 */
export declare const CodeBlock: React.FC<CodeBlockProps>;
export default CodeBlock;
