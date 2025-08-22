import { Page } from "../types";
import { cn } from "../utils";
import { formatDate } from "../utils/date-utils";

interface PostPreviewProps {
    post: Page;
}

const PostPreview = (props: PostPreviewProps) => {
    const { post } = props;
    return (
        <div class={cn("flex-column", "gap-md")}>
            <div class={cn("flex-row", "gap-sm", "align-items-center")}>
                <a href={post.url}>
                    <h3>{post.data.title}</h3>
                </a>
                {post.date !== undefined && (
                    <span>{formatDate(post.date)}</span>
                )}
            </div>
            <span>{post.data.description}</span>
        </div>
    );
};

export { PostPreview };
