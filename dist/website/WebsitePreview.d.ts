interface WebsiteSection {
    id: string;
    type: 'header' | 'hero' | 'features' | 'pricing' | 'testimonials' | 'cta' | 'footer' | 'nav' | 'content' | 'grid' | 'form';
    content: string;
    styles?: Record<string, string>;
    children?: WebsiteSection[];
}
interface GeneratedWebsite {
    title: string;
    description: string;
    sections: WebsiteSection[];
    css?: string;
}
export declare function WebsitePreview({ website }: {
    website: GeneratedWebsite;
}): import("react/jsx-runtime").JSX.Element;
export {};
