import useInfo from "~/hooks/useInfo";
import {useMemo} from "react";
import VerticalScrollArea from "~/components/VerticalScrollArea.tsx";
import InfoCard from "src/components/InfoCard";
import {Link} from "react-router-dom";
import {encodePath} from "~/util";
import {InfoEntry} from "~/hooks/useInfo/types.ts";
import {homeEntries} from "~/pages/home/entries.ts";

export default function HomePage() {
    return <div className="p-2">
        {homeEntries.map(entry => <Feed title={entry.title} filter={entry.filter} />)}
        <AllTags />
    </div>;
}


function Feed({ title, filter }: { title: string, filter: ((entries: InfoEntry[]) => InfoEntry[]) }) {
    const entries = useInfo();

    const visible = useMemo(
        () => filter(entries).slice(0, 20),
        [entries],
    )

    if (!visible.length) {
        return null;
    }

    return <>
        <p className="text-2xl">{title}</p>
        <VerticalScrollArea>
            {visible.map(info => <>
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
            entries
                .map(entry => entry.tags)
                .flat()
            )).sort((a, b) => a.localeCompare(b)),
        [entries],
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
