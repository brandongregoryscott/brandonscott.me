import { useStaticQuery, graphql } from "gatsby";
import { Project } from "../interfaces/project";

interface ProjectNode {
    html: string;
    frontmatter: Pick<Project, "url" | "repo" | "title" | "template">;
}

const useProjectsList = (): Project[] => {
    const { allMarkdownRemark } = useStaticQuery(
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
                            }
                        }
                    }
                }
            }
        `
    );

    return allMarkdownRemark.edges.map((edge) => mapNodeToProject(edge.node));
};

const mapNodeToProject = (node: ProjectNode): Project => ({
    body: node.html,
    ...node.frontmatter,
});

export { useProjectsList };
