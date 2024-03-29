import type {PropsWithChildren} from "react";
import {twMerge} from "tailwind-merge";


interface Props extends PropsWithChildren {
    className?: string
}


export default function VerticalScrollArea(props: Props) {
    return <div className={twMerge("flex gap-2 lg:gap-4 p-2 overflow-x-scroll", props.className)}>
        {props.children}
    </div>;
}
