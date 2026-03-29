import { default as React } from 'react';

export interface QuestionBubbleProps {
    content: string;
    answer?: string;
    showAnswer?: boolean;
    allowReveal?: boolean;
    onReveal?: () => void;
    councilor?: {
        name: string;
        color: string;
        avatar?: string;
    };
    className?: string;
    style?: React.CSSProperties;
}
/**
 * QuestionBubble component
 */
export declare const QuestionBubble: React.FC<QuestionBubbleProps>;
export default QuestionBubble;
