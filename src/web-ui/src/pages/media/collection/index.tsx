import useMedia from "~/hooks/useMedia.ts";
import usePagination from "~/hooks/usePagination.tsx";
import {Link} from "react-router-dom";
import {encodePath} from "~/util";
import SectionHeader from "~/components/Section/Header.tsx";
import CollectionCard from "~/components/CollectionCard.tsx";


export default function MediaCollectionsListPage() {
    const { collections: allCollections } = useMedia();

    const pagination = usePagination(allCollections);
    const { values: pageCollections } = pagination;

    return <>
        <SectionHeader className="px-2">Collections</SectionHeader>
        <div className="flex flex-wrap gap-4 p-2 items-stretch">
            {pageCollections.map(collection => (
                <Link className="hover:scale-105 transition-transform" key={collection.path} to={`/media/collection/${encodePath(collection.path)}`}>
                    <CollectionCard className="h-mixed" collection={collection}/>
                </Link>
            ))}
        </div>
        {pagination.component}
    </>;
}
