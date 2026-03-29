interface AICodeRendererProps {
    code: string;
    streaming?: boolean;
    className?: string;
}
export default function AICodeRenderer({ code, streaming, className }: AICodeRendererProps): import("react/jsx-runtime").JSX.Element;
export declare function extractCodeFromMarkdown(markdown: string): string;
export declare function isValidJSX(code: string): boolean;
export {};
