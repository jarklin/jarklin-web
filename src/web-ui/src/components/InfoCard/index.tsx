import GalleryCard from "./gallery.tsx";
import VideoCard from "./video.tsx";
import type {GalleryMeta, JarklinInfoEntry, VideoMeta} from "~/types";


interface Props {
    info: JarklinInfoEntry
}


export default function MetaCard({ info }: Props) {
    switch (info.meta.type) {
        case "gallery":
            return <GalleryCard info={info as JarklinInfoEntry<GalleryMeta>} />
        case "video":
            return <VideoCard info={info as JarklinInfoEntry<VideoMeta>} />
        default:
            throw new Error(`unknown meta: '${JSON.stringify(info)}'`)
    }
}
