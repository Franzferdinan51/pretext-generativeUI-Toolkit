import { default as React } from 'react';

export interface BadgeProps {
    children?: React.ReactNode;
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive';
    size?: 'sm' | 'md';
    className?: string;
    style?: React.CSSProperties;
}
export declare const Badge: React.FC<BadgeProps>;
export default Badge;
