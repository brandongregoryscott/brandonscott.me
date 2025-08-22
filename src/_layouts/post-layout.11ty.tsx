import { PostHeader } from "../components/post-header";
import { ViewProps } from "../types";

const PostLayout = (props: ViewProps): JSX.Element => {
    const { title = "Brandon Scott", content, page } = props;
    return (
        <html lang="en">
            <head>
                <title>{title}</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="stylesheet" href="/css/reset.css" />
                <link rel="stylesheet" href="/css/index.css" />
                <link rel="stylesheet" href="/css/utilities.css" />
            </head>
            <body>
                <PostHeader title={title} fileSlug={page.fileSlug} />
                <div class="post-layout-content">{content}</div>
            </body>
        </html>
    );
};

const render = PostLayout;

export { render };
