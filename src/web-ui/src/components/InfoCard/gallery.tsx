import type {GalleryMeta, JarklinInfoEntry} from "~/types";
import {twMerge} from "tailwind-merge";


interface Props {
    className?: string
    info: JarklinInfoEntry<GalleryMeta>
}


export default function GalleryCard(props: Props) {
    const info = props.info;

    return <div className={twMerge("", props.className)}>
        {JSON.stringify(info)}
    </div>;
}
