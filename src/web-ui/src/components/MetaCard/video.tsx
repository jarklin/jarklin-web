import type { VideoMeta } from "~/types";
import {twMerge} from "tailwind-merge";


interface Props {
    className?: string
    meta: VideoMeta
}


export default function VideoCard(props: Props) {
    const meta = props.meta;

    return <div className={twMerge("", props.className)}>
        {JSON.stringify(meta)}
    </div>;
}
