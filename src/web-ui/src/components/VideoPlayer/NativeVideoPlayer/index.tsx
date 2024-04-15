import type {VideoMediaEntry} from "~/types";
import {getCacheUrl, getSource} from "~/util";
import {twMerge} from "tailwind-merge";


interface Props {
    className?: string
    media: VideoMediaEntry
}


export default function NativeVideoPlayer(props: Props) {
    const { media } = props;

    return <video
        className={twMerge("size-full bg-black", props.className)}
        controls autoPlay autoFocus disablePictureInPicture disableRemotePlayback
    >
        <source src={getSource(media.path)} />
        <track default kind="chapters" src={getCacheUrl(media.path, "chapters.vtt")} label="Chapters" />
        {/* {media.meta.subtitles.map(subtitle => (*/}
        {/*    <track key={subtitle.language} kind="subtitles" srcLang={subtitle.language} label={subtitle.language} />*/}
        {/* ))}*/}
    </video>;
}
