import { AnalyticsBrowser } from "@segment/analytics-next";
import { useMemo } from "react";
import { AnalyticsContext } from "../contexts/analytics-context";
import React from "react";
import { useSiteMetadata } from "../hooks";

interface AnalyticsProviderProps {
    children?: React.ReactNode;
}

export const AnalyticsProvider = (props: AnalyticsProviderProps) => {
    const { children } = props;
    const { segmentWriteKey: writeKey } = useSiteMetadata();

    const analytics = useMemo(
        () => AnalyticsBrowser.load({ writeKey }),
        [writeKey]
    );

    return (
        <AnalyticsContext.Provider value={analytics}>
            {children}
        </AnalyticsContext.Provider>
    );
};
