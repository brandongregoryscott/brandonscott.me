import { Document } from "../components/document";
import { Header } from "../components/header";
import { ViewProps } from "../types";

const PostLayout = (props: ViewProps) => {
    const { title = "Brandon Scott", content, page } = props;

    return (
        <Document title={title}>
            <Header title={title} fileSlug={page.fileSlug} />
            <div class="post-layout-content">{content}</div>
        </Document>
    );
};

const render = PostLayout;

export { render };
