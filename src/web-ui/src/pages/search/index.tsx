import useMedia from "~/hooks/useMedia.ts";
import {useCallback, useEffect, useMemo} from "react";
import useDebounce from "~/hooks/useDebounce.ts";
import MediaCard from "src/components/MediaCard";
import {encodePath} from "~/util";
import {Link, useSearchParams} from "react-router-dom";
import {SearchIcon} from "lucide-react";
import usePagination from "~/hooks/usePagination.tsx";
import * as JsSearch from "js-search";


const DEBOUNCEDELAYMS = 300;


export default function SearchPage() {
    const { mediaList: rawMediaList } = useMedia();
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

    const search = useMemo(() => {
        const s = new JsSearch.Search("path");
        s.addIndex("name");
        s.addIndex("tags");
        s.addDocuments(rawMediaList);
        return s;
    }, [rawMediaList]);

    const matchingMedia = search.search(query) as typeof rawMediaList;

    const pagination = usePagination(matchingMedia);
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
        {!matchingMedia.length ? <>
            <p className="text-center text-xl">
                No media found
            </p>
        </> : <>
            <p className="text-center text-xl">
                {matchingMedia.length} results found
            </p>
            <div className="flex flex-wrap gap-4 p-2 items-stretch">
                {pageEntries.map(entry => (
                    <div key={entry.path} className="grow h-mixed">
                        <Link to={`/media/info/${encodePath(entry.path)}`} className="h-full hover:scale-105">
                            <MediaCard className="w-full h-full" key={entry.path} media={entry} />
                        </Link>
                    </div>
                ))}
            </div>
            {pagination.component}
        </>}
    </>;
}
