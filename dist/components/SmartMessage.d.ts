import { default as React } from 'react';

export interface SmartMessageProps {
    content: string;
    councilor?: {
        name: string;
        color: string;
        avatar?: string;
    };
    streaming?: boolean;
    showIcon?: boolean;
    showTimestamp?: boolean;
    timestamp?: Date;
    className?: string;
    style?: React.CSSProperties;
}
export interface NormalMessageProps extends SmartMessageProps {
    onImageLoad?: () => void;
}
/**
 * SmartMessage - Automatically detects content type and renders appropriately
 */
export declare const SmartMessage: React.FC<SmartMessageProps>;
export default SmartMessage;
