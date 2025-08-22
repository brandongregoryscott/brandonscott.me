import { cn } from "../utils";

const ResumeHeader = () => {
    return (
        <div class={cn("flex-column")}>
            <div class={cn("flex-row", "justify-content-space-between")}>
                <h4>Brandon Scott</h4>
                <span>www.brandonscott.me</span>
            </div>
            <div class={cn("flex-row", "justify-content-space-between")}>
                <span>Lancaster, PA</span>
                <span>contact@brandonscott.me</span>
            </div>
            <hr />
        </div>
    );
};

export { ResumeHeader };
