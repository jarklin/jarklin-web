import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {twMerge} from "tailwind-merge";
import {MediaPlayer, MediaProvider, type ThumbnailImageInit} from "@vidstack/react";
import { defaultLayoutIcons, DefaultVideoLayout } from "@vidstack/react/player/layouts/default";
import type {VideoMediaEntry} from "~/types/media.ts";
import {getSource} from "~/util";
import {useMemo} from "react";
import {useSearchParams} from "react-router-dom";
import {extractChapterInformation} from "~/components/VideoPlayer/common.ts";
// import LoadingSpinner from "~/components/LoadingSpinner.tsx";


interface Props {
    className?: string
    media: VideoMediaEntry
}


export default function VidStackVideoPlayer(props: Props) {
    const [searchParams] = useSearchParams();
    const { media } = props;

    const thumbnails = useMemo<ThumbnailImageInit[]>(
        () => extractChapterInformation(media),
        [media],
    );

    return <>
        <MediaPlayer
            className={twMerge("", props.className)}
            autoPlay src={getSource(media.path)}
            title={media.displayName}
            viewType="video" streamType="on-demand" load="eager"
            storage="vidstack"
            duration={media.meta.duration}
            currentTime={parseFloat(searchParams.get("initialTime") ?? "0")}
            keyTarget="document"  // maybe player but document seems better for now
        >
            <MediaProvider>
                {/* {props.poster !== undefined && <Poster*/}
                {/*    className="absolute inset-0 block h-full w-full bg-black rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-contain"*/}
                {/*    src={props.poster}*/}
                {/*    alt={props.title ?? ""}*/}
                {/* />}*/}
            </MediaProvider>
            <DefaultVideoLayout
                icons={defaultLayoutIcons}
                style={{
                    "--video-brand": "#f5f5f5",
                }}
                // slots={{
                //     bufferingIndicator: <LoadingSpinner className="absolute inset-0 transition-opacity opacity-0 media-buffering:opacity-100 ease-linear"/>,
                // }}
                noScrubGesture={false}
                thumbnails={thumbnails}
            />
        </MediaPlayer>
    </>;
}
