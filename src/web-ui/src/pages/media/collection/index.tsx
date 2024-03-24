import useMedia from "~/hooks/useMedia.ts";
import usePagination from "~/hooks/usePagination.tsx";
import {Link} from "react-router-dom";
import {encodePath} from "~/util";
import SectionHeader from "~/components/Section/Header.tsx";
import CollectionCard from "~/components/CollectionCard.tsx";
import FlexGrid from "~/components/FlexGrid.tsx";


export default function MediaCollectionsListPage() {
    const { collections: allCollections } = useMedia();

    const pagination = usePagination(allCollections);
    const { values: pageCollections } = pagination;

    return <>
        <SectionHeader className="px-2">Collections</SectionHeader>
        <FlexGrid>
            {pageCollections.map(collection => (
                <Link key={collection.path} to={`/media/collection/${encodePath(collection.path)}`} className="grow h-mixed transition-transform hover:scale-105">
                    <CollectionCard className="size-full" collection={collection}/>
                </Link>
            ))}
        </FlexGrid>
        {pagination.component}
    </>;
}
