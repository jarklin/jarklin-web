import GalleryCard from "./gallery.tsx";
import VideoCard from "./video.tsx";
import type {GalleryInfoEntry, InfoEntry, VideoInfoEntry} from "~/types";


interface Props {
    className?: string
    info: InfoEntry
}


export default function MetaCard(props: Props) {
    switch (props.info.meta.type) {
        case "gallery":
            return <GalleryCard className={props.className} info={props.info as GalleryInfoEntry} />
        case "video":
            return <VideoCard className={props.className} info={props.info as VideoInfoEntry} />
        default:
            throw new Error(`unknown meta: '${JSON.stringify(props.info)}'`)
    }
}
