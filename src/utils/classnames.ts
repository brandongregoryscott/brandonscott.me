import { uniq } from "./collection-utils";

const cn = (
    ...classNames: Array<string | boolean | Record<string, boolean>>
): string => {
    const _classNames: string[] = [];
    classNames.filter(Boolean).forEach((className) => {
        if (typeof className === "string") {
            _classNames.push(className);
            return;
        }

        if (typeof className === "object") {
            Object.entries(className)
                .filter(([_key, value]) => value)
                .forEach(([key]) => {
                    _classNames.push(key);
                });
        }
    });

    return uniq(_classNames)
        .map((className) => className.trim())
        .join(" ");
};

export { cn };
