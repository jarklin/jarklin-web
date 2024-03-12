import "@vidstack/react/player/styles/base.css";
import {lazy} from "react";
import {useParams} from "react-router-dom";
import useMedia from "~/hooks/useMedia.ts";
import NotFound from "~/pages/404.tsx";
const VideoPlayer = lazy(() => import("~/components/VideoPlayer"));


export default function MediaWatchVideoPage() {
    const media = useMedia();
    const { "*": path } = useParams();

    const data = media.find(entry => entry.path === path);

    if (data === undefined) {
        return <NotFound />;
    }
    if (data.type !== "video") {
        throw new Error("not a video");
    }

    return <>
        <VideoPlayer
            className="h-full"
            media={data}
        />
    </>;
}
