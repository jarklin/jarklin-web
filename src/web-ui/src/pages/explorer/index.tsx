import {Link, useParams} from "react-router-dom";
import useMedia from "~/hooks/useMedia.ts";
import {ArrowUpFromDotIcon} from "lucide-react";
import FlexGrid from "~/components/FlexGrid.tsx";
import {encodePath} from "~/util";
import MediaCard from "~/components/MediaCard";
import {MediaEntry} from "~/types";
import {useMemo} from "react";

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
                .filter(tag => !pageTag.length ? tag.indexOf("|") === -1 : tag.startsWith(pageTag + "|"))
                .map(tag => tag.replace("|", "/")),
        [allTags, pageTag],
    );

    const media: MediaEntry[] = useMemo(
        () => mediaList
                .filter(media => media.path.slice(0, media.path.lastIndexOf("/")) == path),
        [mediaList, pathParts],
    );

    return <>
        <div className="p-1 flex gap-x-2">
            <Link className="bg-primary-light rounded-full p-1" to={`/explorer/${pathParts.slice(0, pathParts.length-1).join("/")}/`}>
                <ArrowUpFromDotIcon />
            </Link>
            <p className="bg-primary-light px-1 rounded-md grow grid items-center">
                {rawPath}
            </p>
        </div>
        {!!directories.length && <FlexGrid>
            {directories.map(path => (
                <Link key={path} to={`/explorer/${path}/`} className="bg-accent hocus:bg-accent-light text-black p-2 rounded-lg">{path.slice(path.lastIndexOf("/")+1)}</Link>
            ))}
        </FlexGrid>}
        {!!media.length && <FlexGrid>
            {media.map(entry => (
                <Link key={entry.path} to={`/media/info/${encodePath(entry.path)}`} className="grow shrink h-mixed transition-transform hover:scale-105">
                    <MediaCard className="size-full" key={entry.path} media={entry} />
                </Link>
            ))}
        </FlexGrid>}
    </>;
}
