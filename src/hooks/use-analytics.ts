import { AnalyticsBrowser } from "@segment/analytics-next";
import { useCallback, useContext } from "react";
import { AnalyticsContext } from "../contexts/analytics-context";

interface LinkClickedProperties {
    name: string;
    url: string;
}

interface UseAnalyticsResult {
    analytics: AnalyticsBrowser;
    linkClicked: (properties: LinkClickedProperties) => () => void;
}

const useAnalytics = (): UseAnalyticsResult => {
    const analytics = useContext(AnalyticsContext);

    const linkClicked = useCallback(
        (properties: LinkClickedProperties) => () => {
            analytics?.track("Link Clicked", properties);
        },
        [analytics]
    );

    return {
        analytics,
        linkClicked,
    };
};

export { useAnalytics };
