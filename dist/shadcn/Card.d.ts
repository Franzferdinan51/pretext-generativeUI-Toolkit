import { default as React } from 'react';

export interface CardProps {
    children?: React.ReactNode;
    hover?: boolean;
    glass?: boolean;
    padding?: number | string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}
export declare const Card: React.FC<CardProps>;
export declare const CardHeader: React.FC<{
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}>;
export declare const CardTitle: React.FC<{
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}>;
export declare const CardContent: React.FC<{
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}>;
export default Card;
