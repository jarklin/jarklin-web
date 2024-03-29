import "@vidstack/react/player/styles/base.css";
import {useParams} from "react-router-dom";
import useMedia from "~/hooks/useMedia.ts";
import NotFound from "~/pages/404.tsx";
import VideoPlayer from "~/components/VideoPlayer";


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
