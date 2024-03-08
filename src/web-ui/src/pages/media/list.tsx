import {Link, useSearchParams} from "react-router-dom";
import {encodePath, seededRandom, shuffled} from "~/util";
import InfoCard from "~/components/InfoCard";
import usePagination from "~/hooks/usePagination.tsx";
import useInfo from "~/hooks/useInfo.ts";
import {useMemo} from "react";
import sortBy from "sort-by";


export default function MediaListPage() {
    const entries = useInfo();
    const [searchParams] = useSearchParams();

    const filterValue = searchParams.get("filter");
    const filteredEntries = useMemo(() => {
        return entries;
    }, [entries, filterValue]);

    const sortValues = searchParams.getAll("sort");
    const sortedEntries = useMemo(() => {
        if (sortValues.includes("__random__")) {
            return shuffled(filteredEntries, seededRandom());
        } else {
            return [...filteredEntries].sort(sortBy(...sortValues, (_, v) => typeof v === "string" ? v.toLowerCase() : v));
        }
    }, [filteredEntries, sortValues]);

    const pagination = usePagination(sortedEntries);
    const { values: pageEntries } = pagination;

    return <>
        <div className="flex flex-wrap gap-4 p-2 items-stretch">
            {pageEntries.map(entry => (
                <div key={entry.path} className="grow h-mixed">
                    <Link to={`/media/info/${encodePath(entry.path)}`} className="h-full hover:scale-105">
                        <InfoCard className="w-full h-full" key={entry.path} info={entry} />
                    </Link>
                </div>
            ))}
        </div>
        {pagination.component}
    </>;
}
