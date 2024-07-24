import {Link, useParams} from "react-router-dom";
import useMedia from "~/hooks/useMedia.ts";
import {ArrowUpFromDotIcon} from "lucide-react";
import FlexGrid from "~/components/FlexGrid.tsx";
import {encodePath, getBasename, getParentPath} from "~/util";
import MediaCard from "~/components/MediaCard";
import {MediaEntry} from "~/types";
import {useMemo} from "react";
import usePagination from "~/hooks/usePagination.tsx";

export default function ExplorerPage() {
    const { "*": rawPath } = useParams();
    const { mediaList }  = useMedia();

    const pathParts = rawPath!.split(/\/+/).filter(p => !!p.length);
    const path = pathParts.join("/");
    const pageTag = pathParts.join("|");
    const allTags= useMemo(
        () => Array.from(new Set(mediaList.flatMap(m => m.tags))),
        [mediaList],
    );

    const directories: string[] = useMemo(
        () => allTags
                .map(tag => tag.replace("|", "/"))
                .filter(p => getParentPath(p, false) == path),
        [allTags, pageTag],
    );

    const media: MediaEntry[] = useMemo(
        () => mediaList
                .filter(media => getParentPath(media.path, false) == path),
        [mediaList, pathParts],
    );

    const pagination = usePagination(media);

    return <>
        <div className="pl-1 pr-2 p-2 flex gap-x-2">
            <Link className="bg-primary-light rounded-full p-1" to={`/explorer/${getParentPath(path, true)}`}>
                <ArrowUpFromDotIcon />
            </Link>
            <p className="bg-primary-light px-1 rounded-md grow grid items-center">
                {rawPath}
            </p>
        </div>
        {!!directories.length && <div className="flex px-2 gap-2">
            {directories.map(path => (
                <Link key={path} to={`/explorer/${path}/`} className="bg-accent hocus:bg-accent-light text-black p-2 rounded-lg">{getBasename(path)}</Link>
            ))}
        </div>}
        {!!media.length && <FlexGrid>
            {pagination.values.map(entry => (
                <Link key={entry.path} to={`/media/info/${encodePath(entry.path)}`} className="grow shrink h-mixed transition-transform hover:scale-105">
                    <MediaCard className="size-full" key={entry.path} media={entry} />
                </Link>
            ))}
        </FlexGrid>}
        {pagination.component}
    </>;
}
