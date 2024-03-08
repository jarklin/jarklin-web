import GalleryCard from "./gallery.tsx";
import VideoCard from "./video.tsx";
import type {InfoEntry} from "~/types/info.ts";


interface Props {
    className?: string
    info: InfoEntry
}


export default function InfoCard(props: Props) {
    switch (props.info.type) {
    case "gallery":
        return <GalleryCard className={props.className} info={props.info} />;
    case "video":
        return <VideoCard className={props.className} info={props.info} />;
    default:
        throw new Error(`unknown meta: '${JSON.stringify(props.info)}'`);
    }
}
