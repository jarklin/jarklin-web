import type {VideoMediaEntry} from "~/types";
import {getSource, VttCreator} from "~/util";
import {twMerge} from "tailwind-merge";
import {useMemo} from "react";
import {extractChapterInformation} from "~/components/VideoPlayer/common.ts";


interface Props {
    className?: string
    media: VideoMediaEntry
}


export default function NativeVideoPlayer(props: Props) {
    const { media } = props;

    const chapters = useMemo(() => extractChapterInformation(media), [media]);
    const chaptersVTTUrl = useMemo(() => generateVttUrl(chapters), [chapters]);

    return <video
        className={twMerge("size-full bg-black", props.className)}
        controls autoPlay autoFocus disablePictureInPicture disableRemotePlayback
    >
        <source src={getSource(media.path)} />
        <track default kind="chapters" src={chaptersVTTUrl} srcLang="en" label="Chapters" />
        {/*{media.meta.subtitles.map(subtitle => (*/}
        {/*    <track key={subtitle.language} kind="subtitles" srcLang={subtitle.language} label={subtitle.language} />*/}
        {/*))}*/}
    </video>;
}


function generateVttUrl(chapters: ReturnType<typeof extractChapterInformation>) {
    const vtt = new VttCreator();
    for (const chapter of chapters) {
        vtt.add(chapter.startTime, chapter.endTime, chapter.title);
    }
    const content = vtt.toString();
    const bytes = new TextEncoder().encode(content);
    const blob = new Blob([bytes], {
        type: "text/vtt",
    });
    return URL.createObjectURL(blob);
    // todo: somehow URL.revokeObjectURL()
}
