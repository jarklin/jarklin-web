import type { VideoMeta } from "~/types";


interface Props {
    meta: VideoMeta,
}


export default function VideoCard({ meta }: Props) {
    return <div>
        {JSON.stringify(meta)}
    </div>;
}
