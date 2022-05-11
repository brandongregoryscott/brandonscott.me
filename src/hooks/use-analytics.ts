import { Analytics, AnalyticsBrowser } from "@segment/analytics-next";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { AnalyticsAtom } from "../utils/analytics-atom";
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
    const analytics = useAtomValue(AnalyticsAtom);
    const setAnalytics = useSetAtom(AnalyticsAtom);

    useEffect(() => {
        if (analytics != null) {
            return;
        }

        const loadAnalytics = async () => {
            const [response] = await AnalyticsBrowser.load({
                writeKey,
            });

            setAnalytics(response);
        };
        loadAnalytics();
    }, [analytics]);

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
