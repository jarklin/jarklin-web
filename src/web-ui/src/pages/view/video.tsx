import {VideoInfoEntry} from "~/types";

interface Props {
    info: VideoInfoEntry
}


export default function VideoView({ info }: Props) {
    return <>
        {JSON.stringify(info)}
    </>;
}
