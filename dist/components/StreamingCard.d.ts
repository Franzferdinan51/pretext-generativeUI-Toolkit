import { default as React } from 'react';

export interface StreamingCardProps {
    content: string;
    font?: string;
    maxWidth?: number;
    lineHeight?: number;
    speed?: number;
    showCursor?: boolean;
    onComplete?: () => void;
    onProgress?: (progress: number) => void;
    councilor?: {
        name: string;
        color: string;
        avatar?: string;
    };
    className?: string;
    style?: React.CSSProperties;
}
/**
 * StreamingCard component
 */
export declare const StreamingCard: React.FC<StreamingCardProps>;
export default StreamingCard;
