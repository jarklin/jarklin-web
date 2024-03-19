import "@vidstack/react/player/styles/base.css";
import {lazy} from "react";
import {useParams} from "react-router-dom";
import useMedia from "~/hooks/useMedia.ts";
import NotFound from "~/pages/404.tsx";
const VideoPlayer = lazy(() => import("~/components/VideoPlayer"));


export default function MediaWatchVideoPage() {
    const { mediaList } = useMedia();
    const { "*": path } = useParams();

    const media = mediaList.find(media => media.path === path);

    if (media === undefined) {
        return <NotFound />;
    }
    if (media.type !== "video") {
        throw new Error("not a video");
    }

    return <>
        <VideoPlayer
            className="h-full"
            media={media}
        />
    </>;
}
