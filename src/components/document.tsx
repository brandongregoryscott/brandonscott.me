interface DocumentProps {
    title?: string;
    stylesheet?: string;
    children: JSX.Children;
}

const Document = (props: DocumentProps) => {
    const {
        title = "Brandon Scott",
        stylesheet = "/css/index.css",
        children,
    } = props;

    return (
        <html lang="en">
            <head>
                <title>{title}</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="icon"
                    type="image/x-icon"
                    href="/media/favicon.ico"
                />
                <link rel="stylesheet" href="/css/reset.css" />
                <link rel="stylesheet" href={stylesheet} />
                <link rel="stylesheet" href="/css/utilities.css" />
            </head>
            <body>{children}</body>
        </html>
    );
};

export { Document };
