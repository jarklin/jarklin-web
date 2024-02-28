import {Link, useParams} from "react-router-dom";
import useInfo from "~/hooks/useInfo";
import NotFound from "~/pages/404.tsx";
import {containSameElements, encodePath} from "~/util";
import VerticalScrollArea from "~/components/VerticalScrollArea.tsx";
import InfoCard from "~/components/InfoCard";
import VideoViewPage from "~/pages/view/info/video.tsx";
import GalleryViewPage from "~/pages/view/info/gallery.tsx";
import SectionSeparator from "~/components/Section/Separator.tsx";
import SectionHeader from "~/components/Section/Header.tsx";


export default function ViewPage() {
    const info = useInfo();
    const { "*": path } = useParams();

    const data = info.find(entry => entry.path === path);

    if (data === undefined) {
        return <NotFound />;
    }

    const related = info.filter(entry => data.path !== entry.path && containSameElements(data.tags, entry.tags));

    return <>
        <div className="flex flex-col gap-2">
            {data.type === "video"
                ? <VideoViewPage video={data} />
                : data.type === "gallery"
                ? <GalleryViewPage gallery={data} />
                : <div>Fuck</div>
            }
            {related.length !== 0 && <>
                <SectionSeparator />
                <SectionHeader className="px-2">Related</SectionHeader>
                <VerticalScrollArea>
                    {related.map(entry => <>
                        <Link key={entry.path} to={`/view/${encodePath(entry.path)}`}>
                            <InfoCard className="h-60" info={entry}/>
                        </Link>
                    </>)}
                </VerticalScrollArea>
            </>}
        </div>
    </>;
}
