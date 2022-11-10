import React from "react";
import { Project as ProjectNode } from "../../interfaces/project";
import { Title } from "./Title";
import styles from "./Project.module.scss";
import { useAnalytics } from "../../hooks/use-analytics";
import { renderAst } from "../../utils/react-rehype";

interface ProjectProps {
    project: ProjectNode;
}

const Project: React.FC<ProjectProps> = (props: ProjectProps) => {
    const { project } = props;
    const { title, url, repo, htmlAst } = project;
    const { linkClicked } = useAnalytics();

    return (
        <div className={styles["content"]}>
            <div className={styles["title"]}>
                <Title title={title} />
                {url != null && (
                    <a
                        href={url}
                        onClick={linkClicked({
                            name: `${title} site`,
                            url,
                        })}
                        target="_blank">
                        site
                    </a>
                )}
                <a
                    href={repo}
                    onClick={linkClicked({
                        name: `${title} repo`,
                        url: repo,
                    })}
                    target="_blank">
                    repo
                </a>
            </div>
            {renderAst(htmlAst)}
        </div>
    );
};

export { Project };
