import useMedia from "~/hooks/useMedia.ts";
import {useMemo, Fragment} from "react";
import VerticalScrollArea from "~/components/VerticalScrollArea.tsx";
import MediaCard from "src/components/MediaCard";
import {Link} from "react-router-dom";
import {encodePath} from "~/util";
import {homeEntries, type HomeEntry} from "~/pages/home/entries.ts";
import TagLink from "~/components/TagLink.tsx";
import SectionSeparator from "~/components/Section/Separator.tsx";
import SectionHeaderLink from "~/components/Section/HeaderLink.tsx";


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


function Feed({ title, largerHeight, filterId, filter }: HomeEntry) {
    const { mediaList } = useMedia();

    const visible = useMemo(
        () => filter(mediaList).slice(0, MAXENTRIES),
        [mediaList, filter],
    );

    if (!visible.length) {
        return null;
    }

    return <>
        <SectionHeaderLink to={{
            pathname: "/media/list",
            search: new URLSearchParams({
                filter: filterId,
            }).toString(),
        }}>{title}</SectionHeaderLink>
        <VerticalScrollArea>
            {visible.map(info => (
                <Link className="hover:scale-105 transition-transform" key={info.path} to={`/media/info/${encodePath(info.path)}`}>
                    <MediaCard className={largerHeight ? "h-gallery" : "h-video"} media={info}/>
                </Link>
            ))}
        </VerticalScrollArea>
    </>;
}


function TopTags() {
    const { mediaList } = useMedia();

    const tags = useMemo(
        () => Array
            .from(new Set(
                mediaList.flatMap(media => media.tags),
            ))
            .map(tag => (
                { tag, count: mediaList.filter(e => e.tags.includes(tag)).length }
            ))
            .sort((a, b) => b.count - a.count)
            .map(i => i.tag)
            .slice(0, MAXENTRIES),
        [mediaList],
    );

    return <>
        <SectionHeaderLink to={"/tags"}>Top Tags</SectionHeaderLink>
        <div className="flex flex-wrap gap-2 p-2">
            {tags.map(tag => <TagLink key={tag} tag={tag} />)}
        </div>
    </>;
}
