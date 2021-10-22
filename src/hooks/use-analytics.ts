import { Analytics, AnalyticsBrowser } from "@segment/analytics-next";
import { useEffect, useState } from "react";
import useSiteMetadata from "./use-site-metadata";

const useAnalytics = (): Analytics | undefined => {
    const { segmentWriteKey: writeKey } = useSiteMetadata();
    const [analytics, setAnalytics] = useState<Analytics>(undefined);

    useEffect(() => {
        if (writeKey == null) {
            return;
        }

        const loadAnalytics = async () => {
            const [response] = await AnalyticsBrowser.load({
                writeKey,
            });

            setAnalytics(response);
        };
        loadAnalytics();
    }, [writeKey]);

    return analytics;
};

export { useAnalytics };
