import {useParams} from "react-router-dom";
import useInfo from "~/hooks/useInfo.ts";
import NotFound from "~/pages/404.tsx";
import VideoView from "~/pages/view/video.tsx";
import GalleryView from "~/pages/view/gallery.tsx";
import {GalleryInfoEntry, VideoInfoEntry} from "~/types";

export default function ViewPage() {
    const info = useInfo();
    const { "*": path } = useParams();

    const data = info.data?.find(entry => entry.path === path);

    switch (data?.meta.type) {
        case "gallery":
            return <GalleryView info={data as GalleryInfoEntry} />
        case "video":
            return <VideoView info={data as VideoInfoEntry} />
        default:
            return <NotFound />;
    }

    // const cachePath = `files/.jarklin/cache/${encodeURI(data.path)}` as const;
    //
    // return <div>
    //     <div className="h-[50vh]">
    //         <img className="w-full h-full object-cover" src={`${cachePath}/preview.webp`} alt="" />
    //     </div>
    //     <div className="flex px-5 bg-primary bg-opacity-50 -mt-[15vh]">
    //         <div className="p-1 -mt-[10vh] w-[40vw] bg-inherit rounded-lg">
    //             <img className="object-cover w-full rounded-md" src={`${cachePath}/preview.jpg`} alt="" />
    //         </div>
    //         <div className="bg-inherit w-full">
    //             <p className="text-2xl text-accent">{formatFilename(data.name.slice(0, data.name.length - data.ext.length))}</p>
    //             <p>{data.path}</p>
    //             {data.meta.type === "video"
    //                 ? <>
    //                     <p>{data.meta.width}x{data.meta.height}</p>
    //                     <p>{humanizeDuration(data.meta.duration * 1000, { largest: 2 })}</p>
    //                     <p>{humanize.fileSize(data.meta.filesize)}</p>
    //                     <p className="flex"><SpeechIcon /> {data.meta.audio_streams.map(s => s.language).join(', ')}</p>
    //                     <p className="flex"><SubtitlesIcon /> {data.meta.subtitles.map(s => s.language).join(', ')}</p>
    //                 </> : <>
    //                     <p className="flex"><GalleryVerticalEndIcon /> {data.meta.images.length}</p>
    //                 </>
    //             }
    //         </div>
    //     </div>
    //     <div>
    //         <div className="flex flex-wrap gap-1">
    //             {Array(data.meta.n_previews).fill(0).map((_, i) => (
    //                 <img className="h-20 rounded-sm" src={`${cachePath}/previews/${i+1}.jpg`} alt="" />
    //             ))}
    //         </div>
    //     </div>
    // </div>;
}
