import type {VideoMediaEntry} from "~/types/media.ts";
import {encodePath, getAnimatedPreview, getPreviewImage, height2resolution} from "~/util";
import {Link} from "react-router-dom";
import VerticalScrollArea from "~/components/VerticalScrollArea.tsx";
import {
    BookmarkIcon, BookmarkXIcon,
    CaptionsIcon,
    CaptionsOffIcon,
    PlayCircleIcon,
    VideoIcon, VideoOffIcon,
    Volume2Icon,
    VolumeXIcon,
} from "lucide-react";
import humanizeDuration from "humanize-duration";
import humanize from "humanize-plus";
import TagLink from "~/components/TagLink.tsx";
import SectionSeparator from "~/components/Section/Separator.tsx";
import SectionHeader from "~/components/Section/Header.tsx";
import Image from "~/components/Image.tsx";
import LabelBox from "~/components/LabelBox.tsx";
import {useMemo} from "react";
import {extractChapterInformation} from "~/components/VideoPlayer/common.ts";


export default function MediaVideoInfo({ video }: { video: VideoMediaEntry }) {
    const watchHref = `/media/watch/${encodePath(video.path)}`;

    const scenes = useMemo(() => extractChapterInformation(video), [video]);

    const videoFeatures = useMemo(() => [
        video.meta.video_streams.length
            ? <span title="Has Video"><VideoIcon className="size-5" /></span>
            : <span title="No Video"><VideoOffIcon className="size-5" /></span>,
        video.meta.audio_streams.length
            ? <span title="Has Audio"><Volume2Icon className="size-5" /></span>
            : <span title="No Audio"><VolumeXIcon className="size-5" /></span>,
        video.meta.subtitles.length
            ? <span title="Has Captions"><CaptionsIcon className="size-5" /></span>
            : <span title="No Captions"><CaptionsOffIcon className="size-5" /></span>,
        video.meta.chapters.length
            ? <span title="Has Chapters"><BookmarkIcon className="size-5" /></span>
            : <span title="No Chapters"><BookmarkXIcon className="size-5" /></span>,
    ], [video]);

    return <>
        <div className="relative h-[50vh]">
            <Image className="w-full h-full object-cover" src={getAnimatedPreview(video.path)} />
            <Link to={watchHref} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[10vh] bg-accent/50 rounded-full p-2 transition-transform hover:scale-105">
                <PlayCircleIcon className="w-full h-full"/>
            </Link>
        </div>
        <div className="flex px-[2vw] gap-[5vw] min-h-[35vh]">
            <div className="h-[35vh]">
                <Image className="mx-auto h-full rounded-md object-contain" src={getPreviewImage(video.path)} />
            </div>
            <div className="grow text-xs">
                <p className="text-xl font-bold">{video.displayName}</p>
                <div className="grid gap-x-2 gap-y-1 grid-cols-kv odd:[&>*]:font-semibold">
                    <span>Path</span>
                    <span>{video.path}</span>
                    <span>Features</span>
                    <span className="flex gap-x-2">{videoFeatures}</span>
                    <span>Duration</span>
                    <span>{humanizeDuration(video.meta.duration * 1000, { largest: 2, round: true })}</span>
                    <span>Dimensions</span>
                    <span>{video.meta.width}x{video.meta.height}</span>
                    <span>Resolution</span>
                    <span><LabelBox>{height2resolution(Math.min(video.meta.width, video.meta.height))}</LabelBox></span>
                    <span>Filesize</span>
                    <span>{humanize.fileSize(video.meta.filesize)}</span>
                    <span>Filetype</span>
                    <span><LabelBox>{video.ext}</LabelBox></span>
                    <span>Tags</span>
                    <div className="flex gap-2 flex-wrap">
                        {video.tags.map(tag => <TagLink key={tag} tag={tag}/>)}
                    </div>
                </div>
            </div>
        </div>
        <SectionSeparator/>
        <SectionHeader className="px-2">{video.meta.chapters?.length ? "Chapters" : "Scenes"}</SectionHeader>
        <VerticalScrollArea>
            {scenes.map((scene, i) => (
                <Link key={i} className="flex flex-col min-w-fit bg-primary-light rounded-md overflow-hidden" to={{
                    pathname: watchHref,
                    search: new URLSearchParams({ initialTime: scene.startTime.toString() }).toString(),
                }}>
                    <Image className="block aspect-video h-video-sm object-cover" src={getPreviewImage(video.path, i + 1)} />
                    <p className="text-sm px-1">{scene.title}</p>
                </Link>
            ))}
        </VerticalScrollArea>
    </>;
}
