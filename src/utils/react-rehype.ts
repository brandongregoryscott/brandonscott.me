import React, { createElement } from "react";
import rehypeReact from "rehype-react";
import { Root } from "rehype-react/lib";
import { TrackedLink } from "../components/TrackedLink";

type RenderAstFunction = (node: Root) => React.ReactNode;

export const renderAst: RenderAstFunction = new rehypeReact({
    createElement,
    components: { a: TrackedLink },
}).Compiler;
