import { useStaticQuery, graphql } from "gatsby";
import { Project } from "../interfaces/project";

const useProjectsList = (): Project[] => {
    const { allMarkdownRemark } = useStaticQuery(
        graphql`
            query ProjectsListQuery {
                allMarkdownRemark(
                    filter: { frontmatter: { template: { eq: "project" } } }
                ) {
                    group(field: frontmatter___category) {
                        fieldValue
                        totalCount
                    }
                }
            }
        `
    );

    return allMarkdownRemark.group;
};

export { useProjectsList };
