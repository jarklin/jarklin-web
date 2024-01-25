import {GalleryInfoEntry} from "~/types";

interface Props {
    info: GalleryInfoEntry
}


export default function GalleryView({ info }: Props) {
    return <>
        {JSON.stringify(info)}
    </>;
}
