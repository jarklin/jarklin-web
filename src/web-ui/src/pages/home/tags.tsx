import {MAXENTRIES} from "~/pages/home/entries.ts";
import useMedia from "~/hooks/useMedia.ts";
import {useMemo} from "react";
import SectionHeader from "~/components/Section/Header.tsx";
import TagLink from "~/components/TagLink.tsx";


export default function HomepageTopTags() {
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
        <SectionHeader to={"/tags"}>Top Tags</SectionHeader>
        <div className="flex flex-wrap gap-2 p-2">
            {tags.map(tag => <TagLink key={tag} tag={tag} />)}
        </div>
    </>;
}
