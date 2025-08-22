import { cn } from "../utils";
import { IconArrowTopRight } from "./icon-arrow-top-right";
import { IconEmail } from "./icon-email";
import { Link } from "./link";

interface PostHeaderProps {
    title: string;
    fileSlug: string;
}

const PostHeader = (props: PostHeaderProps) => {
    const { fileSlug, title } = props;
    return (
        <div
            class={cn(
                "header",
                "padding-md",
                "flex-row",
                "align-items-center",
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
            <h4>{title}</h4>
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

export { PostHeader };
