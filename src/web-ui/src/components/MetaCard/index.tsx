import GalleryCard from "./gallery.tsx";
import VideoCard from "./video.tsx";
import type { GalleryMeta, VideoMeta } from "~/types";


interface Props {
    meta: GalleryMeta | VideoMeta,
}


export default function MetaCard({ meta }: Props) {
    switch (meta.type) {
        case "gallery":
            return <GalleryCard meta={meta} />
        case "video":
            return <VideoCard meta={meta} />
        default:
            throw new Error(`unknown meta: '${JSON.stringify(meta)}'`)
    }
}
