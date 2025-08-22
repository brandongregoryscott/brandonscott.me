interface ViewProps {
    page: Page;
    collections: Record<string, Page[]>;
    title?: string;
    content: string;
}

interface Page {
    date?: Date;
    fileSlug: string;
    filePathStem: string;
    url: string;
    templateContent: string;
    data: PageData;
}

interface PageData {
    layout: string;
    tags: string[];
    title?: string;
    date?: Date;
    description?: string;
}

export type { ViewProps, Page };
