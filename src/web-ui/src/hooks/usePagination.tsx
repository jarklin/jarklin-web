import {useSearchParams} from "react-router-dom";
import {useCallback} from "react";


interface Configuration {
    pageSize: number
    pageDiff: number
    scrollReset: boolean
}
const defaultOptions: Configuration = {
    pageSize: 48,  // "best" page size for different numbers of rows
    pageDiff: 2,
    scrollReset: true,
};
type Config = Partial<Configuration>


export default function usePagination<T>(values: T[], config?: Config) {
    const { pageSize, pageDiff, scrollReset } = (defaultOptions || config);

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = +(searchParams.get("page") ?? 1);
    const totalPages = Math.ceil(values.length / pageSize);

    const possiblePages = (
        Array(pageDiff*2 + 1)
            .fill(null)
            .map((_, i) => i-pageDiff)
            .map(offset => pageNumber + offset)
    );
    const recommendedPages = possiblePages.filter(p => p > 0 && p <= totalPages);

    const setPage = useCallback((nextPage: number) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set("page", `${nextPage}`);
            return next;
        });
        if (scrollReset) {
            document.documentElement.scrollTo({ top: 0, behavior: "instant" });
        }
    }, [setSearchParams, scrollReset]);

    return {
        currentPage: pageNumber,
        totalPages: totalPages,
        setPage: setPage,
        values: values.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
        component: <>
            {recommendedPages.length > 1 && <>
                <div className="flex justify-center py-1 gap-4">
                    {!recommendedPages.includes(1) && <>
                        <button className="p-2" onClick={() => setPage(1)}>1</button>
                        {!recommendedPages.includes(2) && <>
                            <p className="cursor-default py-2">...</p>
                        </>}
                    </>}
                    {recommendedPages.map(recommendedPage => (
                        <button key={recommendedPage} className="p-2 disabled:underline" disabled={pageNumber === recommendedPage} onClick={() => setPage(recommendedPage)}>{recommendedPage}</button>
                    ))}
                    {!recommendedPages.includes(totalPages) && <>
                        {!recommendedPages.includes(totalPages - 1) && <>
                            <p className="cursor-default py-2">...</p>
                        </>}
                        <button className="p-2" onClick={() => setPage(totalPages)}>{totalPages}</button>
                    </>}
                </div>
            </>}
        </>,
    } as const;
}
