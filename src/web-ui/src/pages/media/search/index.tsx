import useMedia from "~/hooks/useMedia.ts";
import {useCallback, useEffect, useMemo, useState} from "react";
import useDebounce from "~/hooks/useDebounce.ts";
import MediaCard from "~/components/MediaCard";
import {encodePath} from "~/util";
import {Link, useSearchParams} from "react-router-dom";
import {SearchIcon} from "lucide-react";
import usePagination from "~/hooks/usePagination.tsx";
import * as JsSearch from "js-search";
import FlexGrid from "~/components/FlexGrid.tsx";


const DEBOUNCEDELAYMS = 300;


export default function SearchPage() {
    const { mediaList: rawMediaList } = useMedia();
    const [searchParams, setSearchParams] = useSearchParams();
    const [queryValue, setQueryValue] = useState<string>(() => (searchParams.get("query") ?? ""));
    const query = useDebounce(queryValue.trim().toLowerCase(), DEBOUNCEDELAYMS);

    const setUrlQuery = useCallback((nextQuery: string) => {
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

    const matchingMedia = useMemo(
        () => search.search(query) as typeof rawMediaList,
        [search, query],
    );

    const pagination = usePagination(matchingMedia);
    const { setPage, values: pageEntries } = pagination;

    useEffect(() => {
        if (pagination.currentPage !== 1) {
            setPage(1);
        }
        setUrlQuery(query);
    }, [query]);  // eslint-disable-line react-hooks/exhaustive-deps

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
            <FlexGrid>
                {pageEntries.map(entry => (
                    <Link key={entry.path} to={`/media/info/${encodePath(entry.path)}`} className="grow h-mixed transition-transform hover:scale-105">
                        <MediaCard className="size-full" key={entry.path} media={entry}/>
                    </Link>
                ))}
            </FlexGrid>
            {pagination.component}
        </>}
    </>;
}
