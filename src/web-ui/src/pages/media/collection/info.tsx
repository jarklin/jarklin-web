import SectionHeader from "~/components/Section/Header.tsx";
import useMedia from "~/hooks/useMedia.ts";
import {Link, useParams} from "react-router-dom";
import NotFound from "~/pages/404.tsx";
import {encodePath} from "~/util";
import MediaCard from "~/components/MediaCard";


export default function MediaCollectionInfoPage() {
    const { collections } = useMedia();
    const { "*": path } = useParams();

    const collection = collections.find(collection => collection.path === path);

    if (collection === undefined) {
        return <NotFound />;
    }

    return <>
        <SectionHeader className="px-2">Collection: {collection.displayName}</SectionHeader>
        <div className="flex flex-wrap gap-4 p-2 items-stretch">
            {collection.mediaList.map(media => (
                <Link key={media.path} to={`/media/info/${encodePath(media.path)}`}>
                    <MediaCard className="h-mixed" media={media}/>
                </Link>
            ))}
        </div>
    </>;
}
