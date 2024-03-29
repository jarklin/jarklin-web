import type {VideoMediaEntry} from "~/types";
import {getSource} from "~/util";
import {twMerge} from "tailwind-merge";


interface Props {
    className?: string
    media: VideoMediaEntry
}


export default function NativeVideoPlayer(props: Props) {
    return <video
        className={twMerge("size-full bg-black", props.className)}
        controls autoPlay autoFocus disablePictureInPicture disableRemotePlayback
    >
        <source src={getSource(props.media.path)} />
    </video>
}
