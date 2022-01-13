import { Analytics, AnalyticsBrowser } from "@segment/analytics-next";
import { useCallback, useEffect, useRef, useState } from "react";
import useSiteMetadata from "./use-site-metadata";

interface LinkClickedProperties {
    name: string;
    url: string;
}

interface UseAnalyticsResult {
    analytics?: Analytics;
    projectLinkClicked: (properties: LinkClickedProperties) => () => void;
    socialLinkClicked: (properties: LinkClickedProperties) => () => void;
}

const useAnalytics = (): UseAnalyticsResult => {
    const { segmentWriteKey: writeKey } = useSiteMetadata();
    const [analytics, setAnalytics] = useState<Analytics | undefined>(
        undefined
    );

    useEffect(() => {
        const loadAnalytics = async () => {
            const [response] = await AnalyticsBrowser.load({
                writeKey,
            });

            setAnalytics(response);
        };
        loadAnalytics();
    }, []);

    const projectLinkClicked = useCallback(
        (properties: LinkClickedProperties) => () => {
            analytics?.track("Project Link Clicked", properties);
        },
        [analytics]
    );

    const socialLinkClicked = useCallback(
        (properties: LinkClickedProperties) => () => {
            analytics?.track("Social Link Clicked", properties);
        },
        [analytics]
    );

    return {
        analytics,
        projectLinkClicked,
        socialLinkClicked,
    };
};

export { useAnalytics };
