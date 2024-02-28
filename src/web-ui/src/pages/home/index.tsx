import useInfo from "~/hooks/useInfo";
import {useMemo, Fragment} from "react";
import VerticalScrollArea from "~/components/VerticalScrollArea.tsx";
import InfoCard from "src/components/InfoCard";
import {Link} from "react-router-dom";
import {encodePath} from "~/util";
import {InfoEntry} from "~/hooks/useInfo/types.ts";
import {homeEntries} from "~/pages/home/entries.ts";
import TagLink from "~/components/TagLink.tsx";


export default function HomePage() {
    return <div className="p-2">
        {homeEntries.map((entry) => <Fragment key={entry.title}>
            <Feed key={entry.title} {...entry} />
            <div className="h-px m-1 bg-primary-light/50" />
        </Fragment>)}
        <AllTags />
    </div>;
}


function Feed({ title, larger, filter }: { title: string, larger?: boolean, filter: ((entries: InfoEntry[]) => InfoEntry[]) }) {
    const entries = useInfo();

    const visible = useMemo(
        () => filter(entries).slice(0, 20),
        [entries],
    )

    if (!visible.length) {
        return null;
    }

    return <>
        <h1 className="text-2xl font-bold">{title}</h1>
        <VerticalScrollArea>
            {visible.map(info => (
                <Link className="hover:scale-105 transition-transform" key={info.path} to={`/view/${encodePath(info.path)}`}>
                    <InfoCard className={larger ? "h-72" : "h-52"} info={info}/>
                </Link>
            ))}
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
    );

    return <>
        <h1 className="text-2xl font-bold">Tags</h1>
        <div className="flex gap-2 flex-wrap">
            {tags.map(tag => <TagLink key={tag} tag={tag} />)}
        </div>
    </>;
}
