import { Root } from "rehype-react/lib";

interface Project {
    title: string;
    repo: string;
    url?: string;
    body: string;
    htmlAst: Root;
    position: number;
}

export type { Project };
