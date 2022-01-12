import { useStaticQuery, graphql } from "gatsby";
import { Project } from "../interfaces/project";
import { sortBy } from "lodash";

interface ProjectsListQueryResult {
    allMarkdownRemark: {
        edges: Array<{
            node: ProjectNode;
        }>;
    };
}

interface ProjectNode {
    html: string;
    frontmatter: Pick<Project, "url" | "repo" | "title" | "position">;
}

const useProjectsList = (): Project[] => {
    const { allMarkdownRemark } = useStaticQuery<ProjectsListQueryResult>(
        graphql`
            query ProjectsListQuery {
                allMarkdownRemark(
                    filter: { frontmatter: { template: { eq: "project" } } }
                ) {
                    edges {
                        node {
                            html
                            frontmatter {
                                title
                                repo
                                url
                                position
                            }
                        }
                    }
                }
            }
        `
    );

    return sortBy(
        allMarkdownRemark.edges.map((edge) => mapNodeToProject(edge.node)),
        (project) => project.position
    );
};

const mapNodeToProject = (node: ProjectNode): Project => ({
    body: node.html,
    ...node.frontmatter,
});

export { useProjectsList };
