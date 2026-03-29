import { default as React } from 'react';

export interface ListItem {
    id?: string;
    text: string;
    checked?: boolean;
    subtext?: string;
    icon?: string;
}
export interface ListCardProps {
    content?: string;
    items?: ListItem[];
    style?: 'bullet' | 'numbered' | 'checkbox' | 'icon';
    columns?: number;
    onItemClick?: (item: ListItem, index: number) => void;
    councilor?: {
        name: string;
        color: string;
        avatar?: string;
    };
    className?: string;
    style?: React.CSSProperties;
}
/**
 * ListCard component
 */
export declare const ListCard: React.FC<ListCardProps>;
export default ListCard;
