import useInfo from "~/hooks/useInfo.ts";
import {useCallback, useEffect, useMemo} from "react";
import useDebounce from "~/hooks/useDebounce.ts";
import InfoCard from "~/components/InfoCard";
import {encodePath, extractTags} from "~/util";
import {Link, useSearchParams} from "react-router-dom";
import {SearchIcon} from "lucide-react";
import usePagination from "~/hooks/usePagination.tsx";


const SCOREPERCENTMIN = 0.8;
const NEXTCHARMAXDIFF = 4;
const DEBOUNCEDELAYMS = 300;


export default function SearchPage() {
    const rawEntries = useInfo();
    const [searchParams, setSearchParams] = useSearchParams();
    const queryValue = searchParams.get("query") ?? "";
    const query = useDebounce(queryValue.trim().toLowerCase(), DEBOUNCEDELAYMS);

    const setQueryValue = useCallback((nextQuery: string) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set("query", nextQuery);
            return next;
        });
    }, [setSearchParams]);

    const searchParamsTag = searchParams.get("tag");
    const preFilteredEntries = useMemo(() => (
        searchParamsTag === null
            ? rawEntries
            : rawEntries.filter(entry => extractTags(entry.path).includes(searchParamsTag))
    ), [rawEntries, searchParamsTag]);

    const matchingEntries = useMemo(() => preFilteredEntries
        .map((entry) => {
            const name = entry.name.toLowerCase();
            let score: number = 0;
            let lastPos = -1;
            for (let n = 0; n < query.length; n++) {
                const character = query.charAt(n);
                const pos = name.indexOf(character, lastPos+1);
                const posDiff = pos - lastPos;
                if (pos === -1 || posDiff >= NEXTCHARMAXDIFF) {
                    break;
                } else {
                    score++;
                    score -= posDiff / 100;
                    lastPos = pos;
                }
            }
            return {
                value: entry,
                score: score,
            };
        })
        .filter(element => element.score >= (query.length * SCOREPERCENTMIN))
        .sort((a, b) => b.score - a.score)
        .map(element => element.value)
    , [preFilteredEntries, query]);

    const pagination = usePagination(matchingEntries);
    const { setPage, values: pageEntries } = pagination;

    useEffect(() => {
        setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    return <>
        <div className="w-full p-3 flex gap-px justify-center">
            <div className="p-px bg-white text-primary-light rounded-l-lg rounded-r-sm">
                <SearchIcon className="h-full w-full" />
            </div>
            <input
                type="search"
                className="block w-full max-w-screen-lg px-1 py-px bg-white text-black rounded-l-sm rounded-r-lg placeholder:font-bold"
                autoFocus  placeholder="Query"
                value={queryValue}
                onChange={e => setQueryValue(e.target.value)}
                enterKeyHint="search"
            />
        </div>
        {!matchingEntries.length ? <>
            <p className="text-center text-xl">No entries found</p>
        </> : <>
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
        </>}
    </>;
}
