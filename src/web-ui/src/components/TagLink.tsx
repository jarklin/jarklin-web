import {Link} from "react-router-dom";
import {twMerge} from "tailwind-merge";

interface Props {
    className?: string
    tag: string
}

export default function TagLink(props: Props) {
    const { tag } = props;
    return <Link
        className={twMerge("bg-accent hover:bg-accent-light text-primary rounded-lg px-1 py-px", props.className)}
        to={{
            pathname: "/search",
            search: new URLSearchParams({ query: tag }).toString(),
        }}>
        {tag}
    </Link>;
}
