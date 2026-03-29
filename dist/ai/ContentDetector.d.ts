/**
 * ContentDetector - AI-powered content type detection
 */
export type ContentType = 'normal' | 'vote' | 'code' | 'list' | 'table' | 'chart' | 'question' | 'summary' | 'error' | 'warning' | 'success' | 'info';
export interface DetectionResult {
    type: ContentType;
    confidence: number;
    metadata?: Record<string, any>;
}
/**
 * Detect content type from text
 */
export declare function detectContentType(content: string): DetectionResult;
/**
 * Detect multiple content types in mixed content
 */
export declare function detectMixedContent(content: string): DetectionResult[];
/**
 * Extract structured data from content
 */
export declare function extractStructuredData(content: string): {
    headings: string[];
    bulletPoints: string[];
    codeBlocks: string[];
    links: Array<{
        text: string;
        url: string;
    }>;
    numbers: number[];
};
/**
 * Get content type color
 */
export declare function getContentTypeColor(type: ContentType): string;
/**
 * Get content type icon
 */
export declare function getContentTypeIcon(type: ContentType): string;
export default detectContentType;
