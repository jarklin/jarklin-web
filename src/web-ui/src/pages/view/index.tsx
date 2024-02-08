import {Link, useParams} from "react-router-dom";
import useInfo from "~/hooks/useInfo";
import NotFound from "~/pages/404.tsx";
import {containSameElements, encodePath, getAnimatedPreview, getPreview, getPreviewImage} from "~/util";
import {BookOpenTextIcon, PlayCircleIcon} from "lucide-react";
import {GalleryInfoEntry, VideoInfoEntry} from "~/hooks/useInfo/types.ts";
import humanizeDuration from "humanize-duration";
import humanize from "humanize-plus";
import VerticalScrollArea from "~/components/VerticalScrollArea.tsx";
import InfoCard from "~/components/InfoCard";


const seeContentIcons = {
    video: PlayCircleIcon,
    gallery: BookOpenTextIcon,
} as const;

const seePathParts = {
    video: "watch",
    gallery: "read",
} as const;

const infoComponent = {
    video: VideoInfo,
    gallery: GalleryInfo,
} as const;


export default function ViewPage() {
    const info = useInfo();
    const { "*": path } = useParams();

    const data = info.find(entry => entry.path === path);

    if (data === undefined) {
        return <NotFound />;
    }

    const SeeIcon = seeContentIcons[data.type];
    const seePathPart = seePathParts[data.type];
    const InfoComponent = infoComponent[data.type];

    const related = info.filter(entry => data.path !== entry.path && containSameElements(data.tags, entry.tags));

    return <>
        <div className="flex flex-col gap-2">
            <div className="relative h-[50vh]">
                <img className="w-full h-full object-cover" src={getAnimatedPreview(data.path)} alt=""/>
                <Link to={`/${seePathPart}/${encodePath(data.path)}`}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[10vh] bg-accent/50 rounded-full p-2 transition-transform hover:scale-105">
                    <SeeIcon className="w-full h-full"/>
                </Link>
            </div>
            <div className="flex px-[2vw] gap-[5vw] h-[35vh]">
                <div className="h-full">
                    <img className="mx-auto h-full rounded-md object-contain" src={getPreview(data.path)} alt=""/>
                </div>
                <div className="grow text-xs">
                    <p className="text-xl">{data.displayName}</p>
                    <InfoComponent data={data as never}/>
                </div>
            </div>
            <p className="text-2xl">Previews</p>
            <VerticalScrollArea>
                {[...Array(data.meta.n_previews)].map((_, i) => <>
                    <img className="h-20 object-cover rounded-md" src={getPreviewImage(data.path, i + 1)} alt=""/>
                </>)}
            </VerticalScrollArea>
            {related.length !== 0 && <>
                <p className="text-2xl">Related</p>
                <VerticalScrollArea>
                    {related.map(entry => <>
                        <InfoCard className="h-60" info={entry}/>
                    </>)}
                </VerticalScrollArea>
            </>}
        </div>
    </>;
}

function VideoInfo({data}: { data: VideoInfoEntry }) {
    return <>
        <p>Duration: {humanizeDuration(data.meta.duration * 1000, { largest: 2, round: true })}</p>
        <p>Dimensions: {data.meta.width}x{data.meta.height}</p>
        <p>Filesize: {humanize.fileSize(data.meta.filesize)}</p>
    </>;
}

function GalleryInfo({ data }: { data: GalleryInfoEntry }) {
    return <>
        <p>Images: {data.meta.images.length}</p>
    </>;
}
