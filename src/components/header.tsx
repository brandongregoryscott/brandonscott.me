import { cn } from "../utils";
import { IconEmail } from "./icon-email";
import { Link } from "./link";

interface HeaderProps {
    fileSlug: string;
    title?: string;
}

const Header = (props: HeaderProps) => {
    const { fileSlug, title } = props;
    return (
        <div
            class={cn(
                "header",
                "padding-md",
                "flex-row",
                { "align-items-center": title != null },
                "justify-content-space-between"
            )}>
            <div class={cn("flex-row", "gap-md")}>
                <Link fileSlug={fileSlug} href="/">
                    Home
                </Link>
                <Link fileSlug={fileSlug} href="/about">
                    About
                </Link>
                <Link fileSlug={fileSlug} href="/projects">
                    Projects
                </Link>
                <Link fileSlug={fileSlug} href="/resources">
                    Resources
                </Link>
            </div>
            {title != null && <h4>{title}</h4>}
            <div class={cn("flex-row", "gap-md")}>
                <Link
                    fileSlug={fileSlug}
                    href="/resume"
                    external={true}
                    openInNewTab={true}>
                    Resume
                </Link>
                <Link
                    href="https://www.linkedin.com/in/brandongregoryscott/"
                    external={true}
                    openInNewTab={true}>
                    LinkedIn
                </Link>
                <Link
                    href="https://www.github.com/brandongregoryscott/"
                    external={true}
                    openInNewTab={true}>
                    GitHub
                </Link>
                <Link
                    href="mailto:contact@brandonscott.me"
                    icon={<IconEmail />}>
                    Email
                </Link>
            </div>
        </div>
    );
};

export { Header };
