import "@vidstack/react/player/styles/base.css"
import useInfo from "~/hooks/useInfo.ts";
import {useParams} from "react-router-dom";
import NotFound from "~/pages/404.tsx";
import {getPreview, getSource} from "~/util";
import VideoPlayer from "~/components/VideoPlayer";


export default function WatchVideoPage() {
    const info = useInfo();
    const { "*": path } = useParams();

    const data = info.data?.find(entry => entry.path === path);

    if (data === undefined) {
        return <NotFound />
    }
    if (data.meta.type !== "video") {
        throw new Error("not a video")
    }

    return <>
        <VideoPlayer
            className=""
            title={data.name}
            src={getSource(data.path)}
            poster={getPreview(data.path)}
        />
    </>;
}
