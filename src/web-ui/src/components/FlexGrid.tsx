import type {PropsWithChildren} from "react";
import {twMerge} from "tailwind-merge";


interface Props extends PropsWithChildren {
    className?: string
}


export default function FlexGrid(props: Props) {
    return <div className={twMerge("flex flex-wrap gap-4 p-2 items-stretch justify-between lg:after:grow-[100]", props.className)}>
        {props.children}
    </div>;
}
