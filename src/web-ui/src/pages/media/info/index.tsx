import {Link, useParams} from "react-router-dom";
import useMedia from "~/hooks/useMedia.ts";
import NotFound from "~/pages/404.tsx";
import {encodePath} from "~/util";
import VerticalScrollArea from "~/components/VerticalScrollArea.tsx";
import MediaCard from "src/components/MediaCard";
import MediaVideoInfo from "~/pages/media/info/_video.tsx";
import MediaGalleryInfo from "~/pages/media/info/_gallery.tsx";
import SectionSeparator from "~/components/Section/Separator.tsx";
import SectionHeader from "~/components/Section/Header.tsx";


export default function MediaInfoPage() {
    const { mediaList, collections } = useMedia();
    const { "*": path } = useParams();

    const data = mediaList.find(entry => entry.path === path);

    if (data === undefined) {
        return <NotFound />;
    }

    const collection = collections.find(collection => collection.mediaList.includes(data));
    // const related = mediaList.filter(entry => data.path !== entry.path && containSameElements(data.tags, entry.tags));

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
            {collection && collection.mediaList.length > 0 && <>
                <SectionSeparator />
                <SectionHeader to={`/media/collection/${encodePath(collection.path)}`} className="px-2">Related</SectionHeader>
                <VerticalScrollArea>
                    {collection.mediaList
                        .filter(media => media.path !== data.path)
                        .map(media => (
                        <Link key={media.path} to={`/media/info/${encodePath(media.path)}`}>
                            <MediaCard className="h-mixed" media={media}/>
                        </Link>
                    ))}
                </VerticalScrollArea>
            </>}
        </div>
    </>;
}
