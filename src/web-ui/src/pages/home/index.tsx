import useInfo from "~/hooks/useInfo.ts";
import {useMemo} from "react";
import VerticalScrollArea from "~/components/VerticalScrollArea.tsx";
import InfoCard from "src/components/InfoCard";
import {Link} from "react-router-dom";
import {encodePath, extractTags, shuffled} from "~/util";
import {InfoEntry} from "~/types";

export default function HomePage() {
    return <>
        <RandomGalleryFeed />
        <RandomVideoFeed />
        <NewestGalleryFeed />
        <NewestVideoFeed />
        <AllTags />
    </>;
}

export function RandomGalleryFeed() {
    const entries = useInfo();

    const randomGalleries = useMemo(
        () => shuffled(
                entries.data!
                    .filter(entry => entry.meta.type === "gallery")
            )
            .slice(0, 20),
        [entries.data],
    );

    return <Feed title="Random Galleries" entries={randomGalleries} />;
}

export function RandomVideoFeed() {
    const entries = useInfo();

    const randomVideos = useMemo(
        () => shuffled(
            entries.data!
                .filter(entry => entry.meta.type === "video")
        )
        .slice(0, 20),
        [entries.data],
    );

    return <Feed title="Random Videos" entries={randomVideos} />;
}


export function NewestGalleryFeed() {
    const entries = useInfo();

    const newestGalleries = useMemo(
        () => entries.data!
            .filter(entry => entry.meta.type === "gallery")
            .sort((a, b) => b.mtime - a.mtime)
            .slice(0, 20),
        [entries.data],
    );

    return <Feed title="Newest Galleries" entries={newestGalleries} />;
}


export function NewestVideoFeed() {
    const entries = useInfo();

    const newestVideos = useMemo(
        () => entries.data!
            .filter(entry => entry.meta.type === "video")
            .sort((a, b) => b.mtime - a.mtime)
            .slice(0, 20),
        [entries.data],
    );

    return <Feed title="Newest Videos" entries={newestVideos} />;
}


function Feed({ title, entries }: { title: string, entries: Array<InfoEntry> }) {
    return <>
        <p className="text-2xl">{title}</p>
        <VerticalScrollArea>
            {entries.map(info => <>
                <Link key={info.path} to={`/view/${encodePath(info.path)}`}>
                    <InfoCard className="h-60" info={info}/>
                </Link>
            </>)}
        </VerticalScrollArea>
    </>;
}


function AllTags() {
    const entries = useInfo();

    const tags = useMemo(
        () => Array.from(new Set(
            entries.data!
                .map(entry => extractTags(entry.path))
                .flat()
            )).sort((a, b) => a.localeCompare(b)),
        [entries.data],
    )

    return <>
        <p className="text-2xl">Tags</p>
        <div className="flex gap-2 flex-wrap">
            {tags.map(tag => <>
                <Link key={tag} className="bg-accent hover:bg-accent-light rounded-lg px-1 py-px" to={`/search?tag=${encodeURIComponent(tag)}`}>{tag}</Link>
            </>)}
        </div>
    </>
}
