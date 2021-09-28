import React, { PropsWithChildren } from "react";
import Helmet from "react-helmet";
import type { ReactNode } from "react";
import { useSiteMetadata } from "../../hooks";
import styles from "./Layout.module.scss";

type Props = {
    children: ReactNode;
    title: string;
    description?: string;
    socialImage?: string;
};

const Layout = (props: PropsWithChildren<Props>) => {
    const { children, description, socialImage, title } = props;
    const { author, url } = useSiteMetadata();
    const metaImage = socialImage ?? author.photo;
    const metaImageUrl = url + metaImage;

    return (
        <div className={styles.layout}>
            <Helmet>
                <script>
                    {`
                !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="LtEMzwf9WyDaF5xAHjUbOZ9lPPObaRhx";;analytics.SNIPPET_VERSION="4.15.3";
                analytics.load("LtEMzwf9WyDaF5xAHjUbOZ9lPPObaRhx");
                analytics.page();
                }}();`}
                </script>
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
