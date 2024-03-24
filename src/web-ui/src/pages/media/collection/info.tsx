import SectionHeader from "~/components/Section/Header.tsx";
import useMedia from "~/hooks/useMedia.ts";
import {Link, useParams} from "react-router-dom";
import NotFound from "~/pages/404.tsx";
import {encodePath} from "~/util";
import MediaCard from "~/components/MediaCard";
import TagLink from "~/components/TagLink.tsx";
import FlexGrid from "~/components/FlexGrid.tsx";


export default function MediaCollectionInfoPage() {
    const { collections } = useMedia();
    const { "*": path } = useParams();

    const collection = collections.find(collection => collection.path === path);

    if (collection === undefined) {
        return <NotFound />;
    }

    return <>
        <SectionHeader className="px-2">Collection: {collection.displayName}</SectionHeader>
        <div className="grid gap-x-2 gap-y-1 px-2 grid-cols-kv odd:[&>*]:font-semibold text-sm">
            <span>Path</span>
            <span>{collection.path}/</span>
            <span>Elements</span>
            <span>{collection.mediaList.length}</span>
            <span>Tags</span>
            <div className="flex gap-2 flex-wrap">
                {collection.tags.map(tag => <TagLink key={tag} tag={tag}/>)}
            </div>
        </div>
        <FlexGrid>
            {collection.mediaList.map(media => (
                <Link key={media.path} to={`/media/info/${encodePath(media.path)}`} className="grow h-mixed transition-transform hover:scale-105">
                    <MediaCard className="size-full" media={media}/>
                </Link>
            ))}
        </FlexGrid>
    </>;
}
