import "@vidstack/react/player/styles/base.css";
import {lazy} from "react";
import {useParams} from "react-router-dom";
import useInfo from "~/hooks/useInfo.ts";
import NotFound from "~/pages/404.tsx";
const VideoPlayer = lazy(() => import("~/components/VideoPlayer"));


export default function WatchVideoPage() {
    const info = useInfo();
    const { "*": path } = useParams();

    const data = info.find(entry => entry.path === path);

    if (data === undefined) {
        return <NotFound />;
    }
    if (data.type !== "video") {
        throw new Error("not a video");
    }

    return <>
        <VideoPlayer
            className="h-full"
            info={data}
        />
    </>;
}
