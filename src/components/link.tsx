import { cn } from "../utils";

type LinkProps = {
    inline?: boolean;
    fileSlug?: string;
    href: string;
    children: string;
    externalIcon?: JSX.Element;
};

const Link = (props: LinkProps) => {
    const { href, inline, fileSlug, children, externalIcon } = props;

    return (
        <a
            class={cn("flex-row", "align-items-center", "gap-sm", {
                inline: inline === true,
                current: fileSlug === href.replace("/", ""),
            })}
            target={externalIcon !== undefined ? "_blank" : undefined}
            href={href}>
            <span>{children}</span>
            {externalIcon !== undefined && externalIcon}
        </a>
    );
};

export { Link };
