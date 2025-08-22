import { ResumeHeader } from "../components/resume-header";
import { ViewProps } from "../types";

const MainLayout = (props: ViewProps): JSX.Element => {
    const { title = "Brandon Scott", content } = props;
    return (
        <html lang="en">
            <head>
                <title>{title}</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="stylesheet" href="/css/reset.css" />
                <link rel="stylesheet" href="/css/resume.css" />
                <link rel="stylesheet" href="/css/utilities.css" />
            </head>
            <body>
                <div class="resume-layout-content">
                    <ResumeHeader />
                    {content}
                </div>
            </body>
        </html>
    );
};

const render = MainLayout;

export { render };
