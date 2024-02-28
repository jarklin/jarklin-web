import {HTMLProps} from "react";
import {twMerge} from "tailwind-merge";


export default function SectionHeader(props: HTMLProps<HTMLHeadingElement>) {
    return <h1 {...props} className={twMerge("text-2xl font-bold", props.className)}>{props.children}</h1>
}
