import { isArray, isBoolean, isError, isNumber, isString } from "lodash";
import React, { AnchorHTMLAttributes } from "react";
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

    let stringifiedObject = "";
    try {
        return JSON.stringify(children);
    } catch (error) {
        stringifiedObject = "Unable to serialize object";
        if (isError(error)) {
            stringifiedObject = `${stringifiedObject} ${error.message}`;
        }
    }

    return stringifiedObject;
};

export { TrackedLink };
