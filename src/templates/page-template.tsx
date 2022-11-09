import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import Page from "../components/Page";
import { useSiteMetadata } from "../hooks";
import type { MarkdownRemark } from "../types";
import { AnalyticsProvider } from "../components/AnalyticsProvider";
import { renderAst } from "../utils/react-rehype";

type Props = {
    data: {
        markdownRemark: MarkdownRemark;
    };
};

const PageTemplate = ({ data }: Props) => {
    const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
    const { htmlAst: pageBody } = data.markdownRemark;
    const { frontmatter } = data.markdownRemark;
    const {
        title: pageTitle,
        description: pageDescription = "",
        socialImage,
    } = frontmatter;
    const metaDescription = pageDescription || siteSubtitle;
    const socialImageUrl = socialImage?.publicURL;

    return (
        <AnalyticsProvider>
            <Layout
                title={`${pageTitle} - ${siteTitle}`}
                description={metaDescription}
                socialImage={socialImageUrl}>
                <Sidebar />
                <Page title={pageTitle}>{renderAst(pageBody)}</Page>
            </Layout>
        </AnalyticsProvider>
    );
};

export const query = graphql`
    query PageBySlug($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            html
            htmlAst
            frontmatter {
                title
                date
                description
                socialImage {
                    publicURL
                }
            }
        }
    }
`;

export default PageTemplate;
