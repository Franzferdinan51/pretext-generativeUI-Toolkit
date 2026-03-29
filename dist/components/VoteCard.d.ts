import { default as React } from 'react';

export interface VoteOption {
    id: string;
    label: string;
    votes?: number;
    percentage?: number;
}
export interface VoteCardProps {
    content: string;
    options?: VoteOption[];
    showResults?: boolean;
    allowMultiple?: boolean;
    onVote?: (selectedIds: string[]) => void;
    onComplete?: () => void;
    councilor?: {
        name: string;
        color: string;
        avatar?: string;
    };
    className?: string;
    style?: React.CSSProperties;
}
/**
 * VoteCard component
 */
export declare const VoteCard: React.FC<VoteCardProps>;
export default VoteCard;
