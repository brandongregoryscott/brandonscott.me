"use strict";
import React from "react";
import { AnalyticsProvider } from "./src/components/AnalyticsProvider";

require("./src/assets/scss/init.scss");
require("./static/css/prismjs/theme.min.css");

const wrapRootElement = ({ element }) => (
    <AnalyticsProvider>{element}</AnalyticsProvider>
);

export { wrapRootElement };
