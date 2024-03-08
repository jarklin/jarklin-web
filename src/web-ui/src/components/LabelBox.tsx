import {twMerge} from "tailwind-merge";
import type {PropsWithChildren} from "react";


interface Props extends PropsWithChildren {
    className?: string
    // style: "none" | "default" | keyof styles
}


export default function LabelBox(props: Props) {
    return <span className={twMerge("px-2 py-px bg-accent text-primary rounded-full cursor-default", props.className)}>{props.children}</span>;
}
