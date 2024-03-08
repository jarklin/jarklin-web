import useInfo from "~/hooks/useInfo";
import {useMemo, Fragment} from "react";
import VerticalScrollArea from "~/components/VerticalScrollArea.tsx";
import InfoCard from "src/components/InfoCard";
import {Link} from "react-router-dom";
import {encodePath} from "~/util";
import type {InfoEntry} from "~/types";
import {homeEntries} from "~/pages/home/entries.ts";
import TagLink from "~/components/TagLink.tsx";
import SectionHeader from "~/components/Section/Header.tsx";
import SectionSeparator from "~/components/Section/Separator.tsx";


const MAXENTRIES = 20;


export default function HomePage() {
    return <div className="p-2">
        {homeEntries.map((entry) => <Fragment key={entry.title}>
            <Feed key={entry.title} {...entry} />
            <SectionSeparator />
        </Fragment>)}
        <TopTags />
    </div>;
}


function Feed({ title, larger, filter }: { title: string, larger?: boolean, filter: ((entries: InfoEntry[]) => InfoEntry[]) }) {
    const entries = useInfo();

    const visible = useMemo(
        () => filter(entries).slice(0, MAXENTRIES),
        [entries, filter],
    );

    if (!visible.length) {
        return null;
    }

    return <>
        <SectionHeader>{title}</SectionHeader>
        <VerticalScrollArea>
            {visible.map(info => (
                <Link className="hover:scale-105 transition-transform" key={info.path} to={`/view/${encodePath(info.path)}`}>
                    <InfoCard className={larger ? "h-gallery" : "h-video"} info={info}/>
                </Link>
            ))}
        </VerticalScrollArea>
    </>;
}


function TopTags() {
    const entries = useInfo();

    const tags = useMemo(
        () => Array
            .from(new Set(
                entries.flatMap(entry => entry.tags),
            ))
            .map(tag => (
                { tag, count: entries.filter(e => e.tags.includes(tag)).length }
            ))
            .sort((a, b) => b.count - a.count)
            .map(i => i.tag)
            .slice(0, MAXENTRIES),
        [entries],
    );

    return <>
        <SectionHeader>Top Tags</SectionHeader>
        <div className="flex flex-wrap gap-2 p-2">
            {tags.map(tag => <TagLink key={tag} tag={tag} />)}
        </div>
    </>;
}
