import {lazy} from "react";
import type {VideoMediaEntry} from "~/types";
import useGlobalState from "~/hooks/useGlobalState.ts";
import NativeVideoPlayer from "~/components/VideoPlayer/NativeVideoPlayer.tsx";
const VidStackVideoPlayer = lazy(() => import("~/components/VideoPlayer/VidStackVideoPlayer"));


interface Props {
    className?: string
    media: VideoMediaEntry
}


export default function VideoPlayer(props: Props) {
    const [useNativeVideoPlayer] = useGlobalState("use-native-video-player", false);

    return useNativeVideoPlayer
        ? <NativeVideoPlayer media={props.media} />
        : <VidStackVideoPlayer media={props.media} />;
}
