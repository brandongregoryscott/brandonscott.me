import { cn } from "../utils";
import { IconArrowTopRight } from "./icon-arrow-top-right";
import { IconEmail } from "./icon-email";
import { Link } from "./link";

interface HeaderProps {
    fileSlug: string;
}

const Header = (props: HeaderProps) => {
    const { fileSlug } = props;
    return (
        <div
            class={cn(
                "header",
                "padding-md",
                "flex-row",
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
            </div>
            <div class={cn("flex-row", "gap-md")}>
                <Link
                    fileSlug={fileSlug}
                    href="/resume"
                    externalIcon={<IconArrowTopRight />}>
                    Resume
                </Link>
                <Link
                    href="https://www.linkedin.com/in/brandongregoryscott/"
                    externalIcon={<IconArrowTopRight />}>
                    LinkedIn
                </Link>
                <Link
                    href="https://www.github.com/brandongregoryscott/"
                    externalIcon={<IconArrowTopRight />}>
                    GitHub
                </Link>
                <Link
                    href="mailto:contact@brandonscott.me"
                    externalIcon={<IconEmail />}>
                    Email
                </Link>
            </div>
        </div>
    );
};

export { Header };
