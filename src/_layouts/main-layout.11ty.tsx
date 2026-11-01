import { Document } from "../components/document";
import { Header } from "../components/header";
import { ViewProps } from "../types";
import { cn } from "../utils";

const MainLayout = (props: ViewProps) => {
    const { title, content, page, contentClass = "" } = props;

    return (
        <Document title={title}>
            <Header fileSlug={page.fileSlug} />
            <div class={cn("main-layout-content", contentClass)}>{content}</div>
        </Document>
    );
};

const render = MainLayout;

export { render };
