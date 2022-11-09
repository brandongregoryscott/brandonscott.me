import React from "react";
import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";
import Page from "../components/Page";
import { useSiteMetadata } from "../hooks";
import { AnalyticsProvider } from "../components/AnalyticsProvider";

const NotFoundTemplate = () => {
    const { title, subtitle } = useSiteMetadata();

    return (
        <AnalyticsProvider>
            <Layout title={`Not Found - ${title}`} description={subtitle}>
                <Sidebar />
                <Page title="NOT FOUND">
                    <p>
                        You just hit a route that doesn&#39;t exist... the
                        sadness.
                    </p>
                </Page>
            </Layout>
        </AnalyticsProvider>
    );
};

export default NotFoundTemplate;
