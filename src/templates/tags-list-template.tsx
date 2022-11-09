import React from "react";
import { Link } from "gatsby";
import kebabCase from "lodash/kebabCase";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import Page from "../components/Page";
import { useSiteMetadata, useTagsList } from "../hooks";
import { AnalyticsProvider } from "../components/AnalyticsProvider";

const TagsListTemplate = () => {
    const { title, subtitle } = useSiteMetadata();
    const tags = useTagsList();

    return (
        <AnalyticsProvider>
            <Layout title={`Tags - ${title}`} description={subtitle}>
                <Sidebar />
                <Page title="Tags">
                    <ul>
                        {tags.map((tag) => (
                            <li key={tag.fieldValue}>
                                <Link to={`/tag/${kebabCase(tag.fieldValue)}/`}>
                                    {tag.fieldValue} ({tag.totalCount})
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Page>
            </Layout>
        </AnalyticsProvider>
    );
};

export default TagsListTemplate;
