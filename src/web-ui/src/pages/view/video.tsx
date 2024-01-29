import {VideoInfoEntry} from "~/types";
// import {formatFilename, getAnimatedPreview, getPreview, getPreviewImage} from "~/util";
// import humanize from "humanize-plus";
// import humanizeDuration from "humanize-duration";
// import VerticalScrollArea from "~/components/VerticalScrollArea.tsx";
import {Navigate} from "react-router-dom";
import {encodePath} from "~/util";


interface Props {
    info: VideoInfoEntry
}


export default function VideoView({ info }: Props) {
    return <Navigate to={`/watch/${encodePath(info.path)}`} />;
    // return <div>
    //     <img className="h-max max-h-[50vh] w-full object-cover" src={getAnimatedPreview(info.path)} alt="" />
    //     <div className="flex -mt-[10vh] bg-black">
    //         <img className="w-[20vw] aspect-video object-cover" src={getPreview(info.path)} alt="" />
    //         <div>
    //             <h1>{formatFilename(info.name)}</h1>
    //             <div>
    //                 <p>{humanizeDuration(info.meta.duration * 1000, { largest: 2, round: true })}</p>
    //                 <p>{humanize.fileSize(info.meta.filesize, 0)}</p>
    //                 <p>{info.meta.width}x{info.meta.height}</p>
    //             </div>
    //         </div>
    //     </div>
    //     <VerticalScrollArea>
    //         {Array(info.meta.n_previews).fill(0).map((_, i) => <>
    //             <img className="aspect-video h-40" src={getPreviewImage(info.path, i + 1)} alt="" />
    //         </>)}
    //     </VerticalScrollArea>
    // </div>;
}
