import useMedia from "~/hooks/useMedia.ts";
import {useMemo} from "react";
import SectionHeader from "~/components/Section/Header.tsx";
import TagLink from "~/components/TagLink.tsx";


export default function TagsPage() {
    const { mediaList } = useMedia();

    const tags = useMemo(
        () => Array.from(new Set(
            mediaList
                .map(entry => entry.tags)
                .flat(),
        )).sort((a, b) => a.localeCompare(b)),
        [mediaList],
    );

    return <>
        <SectionHeader className="px-2">Tags</SectionHeader>
        <div className="flex flex-wrap gap-2 p-2">
            {tags.map(tag => <TagLink key={tag} tag={tag} />)}
        </div>
    </>;
}
