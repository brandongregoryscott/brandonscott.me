import { Document } from "../components/document";
import { ResumeHeader } from "../components/resume-header";
import { ViewProps } from "../types";

const ResumeLayout = (props: ViewProps) => {
    const { title, content } = props;

    return (
        <Document title={title} stylesheet="/css/resume.css">
            <div class="resume-layout-content">
                <ResumeHeader />
                {content}
            </div>
        </Document>
    );
};

const render = ResumeLayout;

export { render };
