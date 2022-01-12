import React from "react";
import { Project as ProjectNode } from "../../interfaces/project";
import { Title } from "./Title";
import styles from "./Project.module.scss";

interface ProjectProps {
    project: ProjectNode;
}

const Project: React.FC<ProjectProps> = (props: ProjectProps) => {
    const { project } = props;
    const { title, url, body, repo } = project;
    return (
        <div className={styles["content"]}>
            <div className={styles["title"]}>
                <Title title={title} />
                <a href={repo}>repo</a>
                {url != null && <a href={url}>site</a>}
            </div>
            <div dangerouslySetInnerHTML={{ __html: body }} />
        </div>
    );
};

export { Project };
