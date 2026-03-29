import { default as React } from 'react';

export interface SummaryCardProps {
    content: string;
    points?: string[];
    title?: string;
    collapsible?: boolean;
    defaultExpanded?: boolean;
    onPointClick?: (point: string, index: number) => void;
    councilor?: {
        name: string;
        color: string;
        avatar?: string;
    };
    className?: string;
    style?: React.CSSProperties;
}
/**
 * SummaryCard component
 */
export declare const SummaryCard: React.FC<SummaryCardProps>;
export default SummaryCard;
