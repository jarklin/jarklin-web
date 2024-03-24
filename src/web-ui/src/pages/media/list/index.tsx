import {Link, useSearchParams} from "react-router-dom";
import {encodePath, seededRandom, shuffled} from "~/util";
import MediaCard from "src/components/MediaCard";
import usePagination from "~/hooks/usePagination.tsx";
import useMedia from "~/hooks/useMedia.ts";
import {useMemo} from "react";
import sortBy from "sort-by";
import * as filtersFunctions from "./filters.ts";
import FlexGrid from "~/components/FlexGrid.tsx";


const filters = {
    "random-galleries": filtersFunctions.filterRandomGalleries,
    "random-videos": filtersFunctions.filterRandomVideos,
    "recently-updated-galleries": filtersFunctions.filterRecentlyUpdatedGalleries,
    "newest-galleries": filtersFunctions.filterNewestGalleries,
    "newest-videos": filtersFunctions.filterNewestVideos,
};


export default function MediaListPage() {
    let { mediaList } = useMedia();
    const [searchParams] = useSearchParams();

    const filterValue = searchParams.get("filter");
    mediaList = useMemo(() => {
        const filterFunction = filters[filterValue as keyof typeof filters];
        return filterFunction ? filterFunction(mediaList) : mediaList;
    }, [mediaList, filterValue]);

    const tagValue = searchParams.get("tag");
    mediaList = useMemo(
        () => tagValue === null ? mediaList : mediaList.filter(media => media.tags.includes(tagValue)),
        [mediaList, tagValue],
    );

    const sortValues = searchParams.getAll("sort");
    mediaList = useMemo(() => {
        if (!sortValues.length) {
            return mediaList;
        } else if (sortValues.includes("__random__")) {
            return shuffled(mediaList, seededRandom());
        } else {
            return [...mediaList].sort(sortBy(...sortValues, (_, v) => typeof v === "string" ? v.toLowerCase() : v));
        }
    }, [mediaList, sortValues]);

    const pagination = usePagination(mediaList);
    const { values: pageEntries } = pagination;

    return <>
        <FlexGrid>
            {pageEntries.map(entry => (
                <Link key={entry.path} to={`/media/info/${encodePath(entry.path)}`} className="grow h-mixed transition-transform hover:scale-105">
                    <MediaCard className="size-full" key={entry.path} media={entry} />
                </Link>
            ))}
        </FlexGrid>
        {pagination.component}
    </>;
}
