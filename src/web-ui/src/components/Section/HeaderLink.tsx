import {Link, type LinkProps} from "react-router-dom";
import {twMerge} from "tailwind-merge";


export default function SectionHeaderLink(props: LinkProps) {
    return <Link {...props} className={twMerge("text-2xl font-bold hover:text-accent", props.className)}>{props.children}</Link>;
}
