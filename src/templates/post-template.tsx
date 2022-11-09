import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Post from "../components/Post";
import { useSiteMetadata } from "../hooks";
import type { MarkdownRemark } from "../types";
import { AnalyticsProvider } from "../components/AnalyticsProvider";

type Props = {
    data: {
        markdownRemark: MarkdownRemark;
    };
};

const PostTemplate = ({ data }: Props) => {
    const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
    const { frontmatter } = data.markdownRemark;
    const {
        title: postTitle,
        description: postDescription = "",
        socialImage,
    } = frontmatter;
    const metaDescription = postDescription || siteSubtitle;
    const socialImageUrl = socialImage?.publicURL;

    return (
        <AnalyticsProvider>
            <Layout
                title={`${postTitle} - ${siteTitle}`}
                description={metaDescription}
                socialImage={socialImageUrl}>
                <Post post={data.markdownRemark} />
            </Layout>
        </AnalyticsProvider>
    );
};

export const query = graphql`
    query PostBySlug($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            html
            fields {
                slug
                tagSlugs
            }
            frontmatter {
                date
                description
                tags
                title
                socialImage {
                    publicURL
                }
            }
        }
    }
`;

export default PostTemplate;
