import type { GalleryMeta } from "~/types";
import {twMerge} from "tailwind-merge";


interface Props {
    className?: string
    meta: GalleryMeta
}


export default function GalleryCard(props: Props) {
    const meta = props.meta;

    return <div className={twMerge("", props.className)}>
        {JSON.stringify(meta)}
    </div>;
}
