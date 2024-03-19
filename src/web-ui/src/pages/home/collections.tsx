import {MAXENTRIES} from "~/pages/home/entries.ts";
import useMedia from "~/hooks/useMedia.ts";
import {useMemo} from "react";
import SectionHeaderLink from "~/components/Section/HeaderLink.tsx";
import VerticalScrollArea from "~/components/VerticalScrollArea.tsx";
import {Link} from "react-router-dom";
import {encodePath, shuffled} from "~/util";
import CollectionCard from "~/components/CollectionCard.tsx";


export default function HomepageCollections() {
    const { collections } = useMedia();

    const visible = useMemo(
        () => shuffled(collections).slice(0, MAXENTRIES),
        [collections],
    );

    if (!visible.length) {
        return null;
    }

    return <>
        <SectionHeaderLink to={"/media/collections"}>Collections</SectionHeaderLink>
        <VerticalScrollArea>
            {visible.map(collection => (
                <Link className="hover:scale-105 transition-transform" key={collection.path} to={`/media/collection/${encodePath(collection.path)}`}>
                    <CollectionCard className="h-mixed" collection={collection}/>
                </Link>
            ))}
        </VerticalScrollArea>
    </>;
}
