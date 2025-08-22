import { PostPreview } from "../components/post-preview";
import { ViewProps } from "../types";
import { cn } from "../utils";

const Index = (props: ViewProps) => {
    const posts = props.collections.posts.toReversed();
    return (
        <div class={cn("flex-column", "gap-lg")}>
            {posts.map((post) => (
                <PostPreview post={post} />
            ))}
        </div>
    );
};

const render = Index;

export { render };
