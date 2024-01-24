import GalleryCard from "./gallery.tsx";
import VideoCard from "./video.tsx";
import type {GalleryMeta, JarklinInfoEntry, VideoMeta} from "~/types";


interface Props {
    className?: string
    info: JarklinInfoEntry
}


export default function MetaCard(props: Props) {
    switch (props.info.meta.type) {
        case "gallery":
            return <GalleryCard className={props.className} info={props.info as JarklinInfoEntry<GalleryMeta>} />
        case "video":
            return <VideoCard className={props.className} info={props.info as JarklinInfoEntry<VideoMeta>} />
        default:
            throw new Error(`unknown meta: '${JSON.stringify(props.info)}'`)
    }
}
