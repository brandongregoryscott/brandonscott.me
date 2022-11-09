import { isArray, isBoolean, isNumber, isString } from "lodash";
import React, { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { useAnalytics } from "../hooks/use-analytics";

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const TrackedLink: React.FC<TrackedLinkProps> = (props: TrackedLinkProps) => {
    const { children, href } = props;
    const { linkClicked } = useAnalytics();
    return (
        <a
            {...props}
            onClick={linkClicked({
                name: getChildrenAsString(children),
                url: href!,
            })}>
            {children}
        </a>
    );
};

const getChildrenAsString = (children: React.ReactNode): string => {
    if (isString(children)) {
        return children;
    }

    if (isNumber(children) || isBoolean(children)) {
        return children.toString();
    }

    if (isArray(children)) {
        return children.map(getChildrenAsString).join("");
    }

    return `Unhandled children: ${JSON.stringify(children)}`;
};

export { TrackedLink };
