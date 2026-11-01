import { Document } from "../components/document";
import { Header } from "../components/header";
import { ViewProps } from "../types";

const ContentLayout = (props: ViewProps) => {
    const { title, content, page } = props;

    return (
        <Document title={title}>
            <Header fileSlug={page.fileSlug} />
            <div class="content-layout-content">{content}</div>
        </Document>
    );
};

const render = ContentLayout;

export { render };
