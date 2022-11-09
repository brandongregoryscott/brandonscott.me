import { AnalyticsBrowser } from "@segment/analytics-next";
import { useCallback, useContext } from "react";
import { AnalyticsContext } from "../contexts/analytics-context";

interface LinkClickedProperties {
    name: string;
    url: string;
}

interface UseAnalyticsResult {
    analytics: AnalyticsBrowser;
    projectLinkClicked: (properties: LinkClickedProperties) => () => void;
    socialLinkClicked: (properties: LinkClickedProperties) => () => void;
}

const useAnalytics = (): UseAnalyticsResult => {
    const analytics = useContext(AnalyticsContext);

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
