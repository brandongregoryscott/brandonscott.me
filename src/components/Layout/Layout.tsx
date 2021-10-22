import React, { PropsWithChildren, useEffect, useState } from "react";
import Helmet from "react-helmet";
import type { ReactNode } from "react";
import { useSiteMetadata } from "../../hooks";
import styles from "./Layout.module.scss";
import { Analytics, AnalyticsBrowser } from "@segment/analytics-next";
import { useAnalytics } from "../../hooks/use-analytics";

type Props = {
    children: ReactNode;
    title: string;
    description?: string;
    socialImage?: string;
};

const Layout = (props: PropsWithChildren<Props>) => {
    const { children, description, socialImage, title } = props;
    const { author, url } = useSiteMetadata();
    const analytics = useAnalytics();

    useEffect(() => {
        analytics?.page();
    }, [analytics]);

    const metaImage = socialImage ?? author.photo;
    const metaImageUrl = url + metaImage;

    return (
        <div className={styles.layout}>
            <Helmet>
                <html lang="en" />
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:site_name" content={title} />
                <meta property="og:image" content={metaImageUrl} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={metaImageUrl} />
            </Helmet>
            {children}
        </div>
    );
};

export default Layout;
