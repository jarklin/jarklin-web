import {Link, useParams} from "react-router-dom";
import useMedia from "~/hooks/useMedia.ts";
import NotFound from "~/pages/404.tsx";
import {containSameElements, encodePath} from "~/util";
import VerticalScrollArea from "~/components/VerticalScrollArea.tsx";
import MediaCard from "src/components/MediaCard";
import MediaVideoInfo from "~/pages/media/info/_video.tsx";
import MediaGalleryInfo from "~/pages/media/info/_gallery.tsx";
import SectionSeparator from "~/components/Section/Separator.tsx";
import SectionHeader from "~/components/Section/Header.tsx";


export default function MediaInfoPage() {
    const { mediaList } = useMedia();
    const { "*": path } = useParams();

    const data = mediaList.find(entry => entry.path === path);

    if (data === undefined) {
        return <NotFound />;
    }

    const related = mediaList.filter(entry => data.path !== entry.path && containSameElements(data.tags, entry.tags));

    let viewPage;
    if (data.type === "video") {
        viewPage = <MediaVideoInfo video={data} />;
    } else if (data.type === "gallery") {
        viewPage = <MediaGalleryInfo gallery={data} />;
    } else {
        viewPage = <div>Fuck</div>;
    }

    return <>
        <div className="flex flex-col gap-2">
            {viewPage}
            {related.length !== 0 && <>
                <SectionSeparator />
                <SectionHeader className="px-2">Related</SectionHeader>
                <VerticalScrollArea>
                    {related.map(entry => (
                        <Link key={entry.path} to={`/media/info/${encodePath(entry.path)}`}>
                            <MediaCard className="h-mixed" media={entry}/>
                        </Link>
                    ))}
                </VerticalScrollArea>
            </>}
        </div>
    </>;
}
