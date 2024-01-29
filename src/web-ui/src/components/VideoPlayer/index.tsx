import {MediaPlayer, MediaProvider, Poster} from "@vidstack/react";
import {twMerge} from "tailwind-merge";
import VideoPlayerLayout from "~/components/VideoPlayer/layout.tsx";


interface Props {
    className?: string
    src: string
    poster?: string
    title?: string
}


export default function VideoPlayer(props: Props) {
    return <>
        <MediaPlayer className={twMerge("", props.className)} title={props.title} src={props.src} load="eager">
            <MediaProvider>
                {props.poster !== undefined && <Poster
                    className="absolute inset-0 block h-full w-full bg-black rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-contain"
                    src={props.poster}
                    alt={props.title ?? ""}
                />}
            </MediaProvider>
            <VideoPlayerLayout />
        </MediaPlayer>
    </>
}
