import { useStaticQuery, graphql } from "gatsby";
import { Project } from "../interfaces/project";
import { sortBy } from "lodash";
import { Root } from "rehype-react/lib";

interface ProjectsListQueryResult {
    allMarkdownRemark: {
        edges: Array<{
            node: ProjectNode;
        }>;
    };
}

interface ProjectNode {
    html: string;
    htmlAst: Root;
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
                            htmlAst
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
    htmlAst: node.htmlAst,
    ...node.frontmatter,
});

export { useProjectsList };
