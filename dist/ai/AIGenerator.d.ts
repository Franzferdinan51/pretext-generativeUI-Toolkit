import { default as React } from 'react';
import { ContentType, DetectionResult } from './ContentDetector';

export interface GeneratorOptions {
    includeVote?: boolean;
    includeCode?: boolean;
    includeCharts?: boolean;
    streaming?: boolean;
}
export interface GeneratedComponent {
    type: ContentType;
    props: Record<string, any>;
    children?: React.ReactNode;
}
export interface AIGeneratorProps {
    content: string;
    options?: GeneratorOptions;
    onComponentGenerated?: (component: GeneratedComponent) => void;
    councilor?: {
        name: string;
        color: string;
        avatar?: string;
    };
    className?: string;
    style?: React.CSSProperties;
}
/**
 * Generate component props based on content type
 */
export declare function generateComponentProps(content: string, type: ContentType, detection: DetectionResult): Record<string, any>;
/**
 * AIGenerator component
 */
export declare const AIGenerator: React.FC<AIGeneratorProps>;
/**
 * Use AI component generation hook
 */
export declare function useAIGeneration(options?: GeneratorOptions): {
    content: string;
    detection: DetectionResult;
    componentProps: Record<string, any>;
    isGenerating: boolean;
    generate: (text: string) => void;
};
export default AIGenerator;
