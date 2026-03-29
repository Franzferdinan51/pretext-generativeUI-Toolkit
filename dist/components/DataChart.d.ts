import { default as React } from 'react';

export interface ChartDataPoint {
    label: string;
    value: number;
    color?: string;
}
export interface DataChartProps {
    content?: string;
    data?: ChartDataPoint[];
    chartType?: 'bar' | 'line' | 'pie' | 'scatter';
    title?: string;
    showLegend?: boolean;
    showValues?: boolean;
    height?: number;
    councilor?: {
        name: string;
        color: string;
        avatar?: string;
    };
    className?: string;
    style?: React.CSSProperties;
}
/**
 * DataChart component
 */
export declare const DataChart: React.FC<DataChartProps>;
export default DataChart;
