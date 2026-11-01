import { Document } from "../components/document";
import { Header } from "../components/header";
import { ViewProps } from "../types";

const MainLayout = (props: ViewProps) => {
    const { title, content, page } = props;

    return (
        <Document title={title}>
            <Header fileSlug={page.fileSlug} />
            <div class="main-layout-content">{content}</div>
        </Document>
    );
};

const render = MainLayout;

export { render };
