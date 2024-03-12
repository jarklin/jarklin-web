import GalleryCard from "./gallery.tsx";
import VideoCard from "./video.tsx";
import type {MediaEntry} from "~/types/media.ts";


interface Props {
    className?: string
    media: MediaEntry
}


export default function MediaCard(props: Props) {
    switch (props.media.type) {
    case "gallery":
        return <GalleryCard className={props.className} media={props.media} />;
    case "video":
        return <VideoCard className={props.className} media={props.media} />;
    default:
        throw new Error(`unknown meta: '${JSON.stringify(props.media)}'`);
    }
}
