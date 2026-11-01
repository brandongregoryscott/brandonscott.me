import { cn } from "../utils";

type LinkProps = {
    inline?: boolean;
    fileSlug?: string;
    href: string;
    children: string;
    openInNewTab?: boolean;
} & ({ external?: boolean } | { icon?: JSX.Element });

const Link = (props: LinkProps) => {
    const { href, inline, fileSlug, children, openInNewTab } = props;

    return (
        <a
            class={cn("link", {
                inline: inline === true,
                current: fileSlug === href.replace("/", ""),
                external: "external" in props && props.external === true,
            })}
            target={openInNewTab === true ? "_blank" : undefined}
            rel={openInNewTab === true ? "noopener" : undefined}
            href={href}>
            <span>{children}</span>
            {"icon" in props && props.icon}
        </a>
    );
};

export { Link };
