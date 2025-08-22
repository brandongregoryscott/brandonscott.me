import { cn } from "../utils";
import { IconArrowTopRight } from "./icon-arrow-top-right";
import { Link } from "./link";

interface ProjectDetailProps {
    name: string;
    siteUrl?: string;
    repoUrl?: string;
    description: JSX.Element;
}

const ProjectDetail = (props: ProjectDetailProps) => {
    const { name, siteUrl, repoUrl, description } = props;
    return (
        <div class={cn("flex-column", "gap-md")}>
            <div class={cn("flex-row", "gap-md", "align-items-center")}>
                <h3>{name}</h3>
                {siteUrl !== undefined && (
                    <Link href={siteUrl} externalIcon={<IconArrowTopRight />}>
                        site
                    </Link>
                )}
                {repoUrl !== undefined && (
                    <Link href={repoUrl} externalIcon={<IconArrowTopRight />}>
                        repo
                    </Link>
                )}
            </div>
            {description}
            <hr />
        </div>
    );
};

export { ProjectDetail };
