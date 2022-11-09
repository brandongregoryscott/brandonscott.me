import React from "react";
import { Link } from "gatsby";
import kebabCase from "lodash/kebabCase";
import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";
import Page from "../components/Page";
import { useSiteMetadata, useCategoriesList } from "../hooks";
import { AnalyticsProvider } from "../components/AnalyticsProvider";

const CategoriesListTemplate = () => {
    const { title, subtitle } = useSiteMetadata();
    const categories = useCategoriesList();

    return (
        <AnalyticsProvider>
            <Layout title={`Categories - ${title}`} description={subtitle}>
                <Sidebar />
                <Page title="Categories">
                    <ul>
                        {categories.map((category) => (
                            <li key={category.fieldValue}>
                                <Link
                                    to={`/category/${kebabCase(
                                        category.fieldValue
                                    )}/`}>
                                    {category.fieldValue} ({category.totalCount}
                                    )
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Page>
            </Layout>
        </AnalyticsProvider>
    );
};

export default CategoriesListTemplate;
