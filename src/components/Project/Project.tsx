import React from "react";
import { Project as ProjectNode } from "../../interfaces/project";
import { Title } from "./Title";
import styles from "./Project.module.scss";
import { useCallback } from "react";
import { useAnalytics } from "../../hooks/use-analytics";

interface ProjectProps {
    project: ProjectNode;
}

const Project: React.FC<ProjectProps> = (props: ProjectProps) => {
    const { project } = props;
    const { title, url, body, repo } = project;
    const { projectLinkClicked } = useAnalytics();

    return (
        <div className={styles["content"]}>
            <div className={styles["title"]}>
                <Title title={title} />
                {url != null && (
                    <a
                        href={url}
                        onClick={projectLinkClicked({
                            name: `${title} site`,
                            url,
                        })}
                        target="_blank">
                        site
                    </a>
                )}
                <a
                    href={repo}
                    onClick={projectLinkClicked({
                        name: `${title} repo`,
                        url: repo,
                    })}
                    target="_blank">
                    repo
                </a>
            </div>
            <div dangerouslySetInnerHTML={{ __html: body }} />
        </div>
    );
};

export { Project };
