import type {VideoMediaEntry} from "~/types/media.ts";
import {encodePath, getAnimatedPreview, getPreview, getPreviewImage, height2resolution} from "~/util";
import {Link} from "react-router-dom";
import VerticalScrollArea from "~/components/VerticalScrollArea.tsx";
import {PlayCircleIcon} from "lucide-react";
import humanizeDuration from "humanize-duration";
import humanize from "humanize-plus";
import TagLink from "~/components/TagLink.tsx";
import SectionSeparator from "~/components/Section/Separator.tsx";
import SectionHeader from "~/components/Section/Header.tsx";
import Image from "~/components/Image.tsx";
import LabelBox from "~/components/LabelBox.tsx";


export default function MediaVideoInfo({ video }: { video: VideoMediaEntry }) {
    const watchHref = `/media/watch/${encodePath(video.path)}`;

    const scenes = video.meta.chapters?.length
        ? video.meta.chapters.map(chapter => ({
            startTime: Math.floor(chapter.start_time),
            title: chapter.title,
        }))
        : [...Array(video.meta.n_previews)].map((_, i) => ({
            startTime: Math.floor(video.meta.duration / video.meta.n_previews * i),
            title: `Scene ${i+1}`,
        }));

    return <>
        <div className="relative h-[50vh]">
            <Image className="w-full h-full object-cover" src={getAnimatedPreview(video.path)} />
            <Link to={watchHref} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[10vh] bg-accent/50 rounded-full p-2 transition-transform hover:scale-105">
                <PlayCircleIcon className="w-full h-full"/>
            </Link>
        </div>
        <div className="flex px-[2vw] gap-[5vw] min-h-[35vh]">
            <div className="h-[25vw]">
                <Image className="mx-auto h-full rounded-md object-contain" src={getPreview(video.path)} />
            </div>
            <div className="grow text-xs">
                <p className="text-xl font-bold">{video.displayName}</p>
                <div className="grid gap-x-2 gap-y-1 grid-cols-kv odd:[&>*]:font-semibold">
                    <span>Path</span>
                    <span>{video.path}</span>
                    <span>Duration</span>
                    <span>{humanizeDuration(video.meta.duration * 1000, {largest: 2, round: true})}</span>
                    <span>Dimensions</span>
                    <span>{video.meta.width}x{video.meta.height}</span>
                    <span>Resolution</span>
                    <span>{height2resolution(Math.min(video.meta.width, video.meta.height))}</span>
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
            {scenes.map((scene, i) => <>
                <Link key={i} className="flex flex-col min-w-fit bg-primary-light rounded-md overflow-hidden" to={{
                    pathname: watchHref,
                    search: new URLSearchParams({ initialTime: scene.startTime.toString() }).toString(),
                }}>
                    <Image className="block aspect-video h-video-sm object-cover" src={getPreviewImage(video.path, i + 1)} />
                    <p className="text-sm px-1">{scene.title}</p>
                </Link>
            </>)}
        </VerticalScrollArea>
    </>;
}
