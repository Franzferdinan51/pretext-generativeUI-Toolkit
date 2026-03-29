import { default as React } from 'react';

export interface TableColumn {
    key: string;
    header: string;
    width?: number | string;
    align?: 'left' | 'center' | 'right';
    sortable?: boolean;
}
export interface DataTableProps {
    content?: string;
    headers?: string[];
    rows?: string[][];
    columns?: TableColumn[];
    data?: Record<string, any>[];
    sortable?: boolean;
    striped?: boolean;
    hoverable?: boolean;
    maxHeight?: number;
    councilor?: {
        name: string;
        color: string;
        avatar?: string;
    };
    className?: string;
    style?: React.CSSProperties;
}
/**
 * DataTable component
 */
export declare const DataTable: React.FC<DataTableProps>;
export default DataTable;
