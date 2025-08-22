import { Header } from "../components/header";
import { ViewProps } from "../types";

const MainLayout = (props: ViewProps): JSX.Element => {
    const { title = "Brandon Scott", content, page } = props;
    return (
        <html lang="en">
            <head>
                <title>{title}</title>
                <link rel="stylesheet" href="/css/reset.css" />
                <link rel="stylesheet" href="/css/index.css" />
                <link rel="stylesheet" href="/css/utilities.css" />
            </head>
            <body>
                <Header fileSlug={page.fileSlug} />
                <div class="main-layout-content">{content}</div>
            </body>
        </html>
    );
};

const render = MainLayout;

export { render };
