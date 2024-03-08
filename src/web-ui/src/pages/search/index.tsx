import useInfo from "~/hooks/useInfo.ts";
import {useCallback, useEffect, useMemo} from "react";
import useDebounce from "~/hooks/useDebounce.ts";
import InfoCard from "~/components/InfoCard";
import {encodePath, extractTags} from "~/util";
import {Link, useSearchParams} from "react-router-dom";
import {SearchIcon} from "lucide-react";


const PAGESIZE = 24;  // "best" page size
const SCOREPERCENTMIN = 0.8;
const DEBOUNCEDELAYMS = 300;


export default function SearchPage() {
    const rawEntries = useInfo();
    const [searchParams, setSearchParams] = useSearchParams();
    const queryValue = searchParams.get("query") ?? "";
    const page = +(searchParams.get("page") ?? 1);
    const query = useDebounce(queryValue.trim().toLowerCase(), DEBOUNCEDELAYMS);

    const setQueryValue = useCallback((next: string) => {
        setSearchParams((prev) => ({ ...Object.fromEntries(prev.entries()), query: next }));
    }, [setSearchParams]);

    const setPage = useCallback((next: number) => {
        setSearchParams((prev) => ({ ...Object.fromEntries(prev.entries()), page: `${next}` }));
        document.documentElement.scrollTo({ top: 0, behavior: "instant" });
    }, [setSearchParams]);

    useEffect(() => {
        setPage(1);
    }, [query, setPage]);

    // const allTags = useMemo(() => {
    //     return Array.from(new Set(rawEntries.flatMap(e => e.tags)));
    // }, [rawEntries]);

    const possibleEntries = useMemo(() => {
        const tag = searchParams.get("tag");
        return rawEntries
            .filter(entry => tag === null || extractTags(entry.path).includes(tag));
    }, [rawEntries, searchParams]);

    const validEntries = useMemo(() => possibleEntries
        .map((entry) => {
            const name = entry.name.toLowerCase();
            let score: number = 0;
            let pos = 0;
            for (let n = 0; n < query.length; n++) {
                const character = query.charAt(n);
                const nextPos = name.indexOf(character, pos);
                if (nextPos === -1) {
                    break;
                } else {
                    score++;
                    score -= (nextPos - pos) / 100;
                    pos = nextPos;
                }
            }
            return {
                value: entry,
                score: score,
            };
        })
        .filter(element => element.score >= (query.length * SCOREPERCENTMIN))
        .sort((a, b) => b.score - a.score)
        .map(element => element.value), [possibleEntries, query]);

    const totalPages = Math.ceil(validEntries.length / PAGESIZE);

    const recommendedPages = [page-2, page-1, page, page+1, page+2].filter(p => p > 0 && p <= totalPages);

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
        {!validEntries.length ? <>
            <p className="text-center text-xl">No entries found</p>
        </> : <>
            <div className="flex flex-wrap gap-4 p-2 items-stretch">
                {validEntries.slice((page-1) * PAGESIZE, page * PAGESIZE).map(entry => (
                    <div key={entry.path} className="grow h-mixed">
                        <Link to={`/view/${encodePath(entry.path)}`} className="h-full hover:scale-105">
                            <InfoCard className="w-full h-full" key={entry.path} info={entry} />
                        </Link>
                    </div>
                ))}
            </div>
            {recommendedPages.length > 1 && <>
                <div className="flex justify-center py-1 gap-4">
                    {!recommendedPages.includes(1) && <>
                        <button className="p-2" onClick={() => setPage(1)}>1</button>
                        <p className="cursor-default py-2">...</p>
                    </>}
                    {recommendedPages.map(recommendedPage => (
                        <button key={recommendedPage} className="p-2" onClick={() => setPage(recommendedPage)}>{recommendedPage}</button>
                    ))}
                    {!recommendedPages.includes(totalPages) && <>
                        <p className="cursor-default py-2">...</p>
                        <button className="p-2" onClick={() => setPage(totalPages)}>{totalPages}</button>
                    </>}
                </div>
            </>}
        </>}
    </>;
}
