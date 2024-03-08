import {Link, useSearchParams} from "react-router-dom";
import {encodePath, seededRandom, shuffled} from "~/util";
import InfoCard from "~/components/InfoCard";
import usePagination from "~/hooks/usePagination.tsx";
import useInfo from "~/hooks/useInfo.ts";
import {useMemo} from "react";
import sortBy from "sort-by";


export default function MediaListPage() {
    let entries = useInfo();
    const [searchParams] = useSearchParams();

    // const filterValue = searchParams.get("filter");
    // entries = useMemo(() => {
    //     return entries;
    // }, [entries, filterValue]);

    const sortValues = searchParams.getAll("sort");
    entries = useMemo(() => {
        if (sortValues.includes("__random__")) {
            return shuffled(entries, seededRandom());
        } else {
            return [...entries].sort(sortBy(...sortValues, (_, v) => typeof v === "string" ? v.toLowerCase() : v));
        }
    }, [entries, sortValues]);

    const pagination = usePagination(entries);
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
