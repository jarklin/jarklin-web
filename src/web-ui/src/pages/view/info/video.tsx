import {VideoInfoEntry} from "~/hooks/useInfo/types.ts";
import {encodePath, getAnimatedPreview, getPreview, getPreviewImage} from "~/util";
import {Link} from "react-router-dom";
import VerticalScrollArea from "~/components/VerticalScrollArea.tsx";
import {PlayCircleIcon} from "lucide-react";
import humanizeDuration from "humanize-duration";
import humanize from "humanize-plus";
import TagLink from "~/components/TagLink.tsx";


export default function VideoViewPage({ video }: { video: VideoInfoEntry }) {
    const href = `/watch/${encodePath(video.path)}`;

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
            <img className="w-full h-full object-cover blur-sm" src={getAnimatedPreview(video.path)} alt=""/>
            <Link to={href} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[10vh] bg-accent/50 rounded-full p-2 transition-transform hover:scale-105">
                <PlayCircleIcon className="w-full h-full"/>
            </Link>
        </div>
        <div className="flex px-[2vw] gap-[5vw] h-[35vh]">
            <div className="h-full">
                <img className="mx-auto h-full rounded-md object-contain" src={getPreview(video.path)} alt=""/>
            </div>
            <div className="grow text-xs">
                <p className="text-xl">{video.displayName}</p>
                <div className="grid gap-x-2 grid-cols-kv">
                    <span>Path</span>
                    <span>{video.path}</span>
                    <span>Duration</span>
                    <span>{humanizeDuration(video.meta.duration * 1000, {largest: 2, round: true})}</span>
                    <span>Dimensions</span>
                    <span>{video.meta.width}x{video.meta.height}</span>
                    <span>Filesize</span>
                    <span>{humanize.fileSize(video.meta.filesize)}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {video.tags.map(tag => <TagLink key={tag} tag={tag} />)}
                </div>
            </div>
        </div>
        <p className="text-2xl">{video.meta.chapters?.length ? "Chapters" : "Scenes"}</p>
        <VerticalScrollArea>
            {scenes.map((scene, i) => <>
                <Link key={i} className="flex flex-col min-w-fit bg-primary-light rounded-md overflow-hidden" to={{
                    pathname: href,
                    search: new URLSearchParams({ initialTime: scene.startTime.toString() }).toString(),
                }}>
                    <img className="block aspect-video h-20 object-cover" src={getPreviewImage(video.path, i + 1)} alt="" />
                    <p className="text-sm px-1">{scene.title}</p>
                </Link>
            </>)}
        </VerticalScrollArea>
    </>;
}
