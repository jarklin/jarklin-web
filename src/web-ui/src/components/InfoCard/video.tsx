import type {JarklinInfoEntry, VideoMeta} from "~/types";
import {twMerge} from "tailwind-merge";


interface Props {
    className?: string
    info: JarklinInfoEntry<VideoMeta>
}


export default function VideoCard(props: Props) {
    const info = props.info;

    return <div className={twMerge("", props.className)}>
        {JSON.stringify(info)}
    </div>;
}
