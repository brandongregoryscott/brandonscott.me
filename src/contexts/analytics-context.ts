import { AnalyticsBrowser } from "@segment/analytics-next";
import { createContext } from "react";

const AnalyticsContext = createContext<AnalyticsBrowser>(
    undefined as unknown as AnalyticsBrowser
);

export { AnalyticsContext };
