import useInfo from "~/hooks/useInfo";
import {useMemo} from "react";
import SectionHeader from "~/components/Section/Header.tsx";
import TagLink from "~/components/TagLink.tsx";


export default function TagsPage() {

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
        <SectionHeader>Tags</SectionHeader>
        <div className="flex flex-wrap gap-2 p-2">
            {tags.map(tag => <TagLink key={tag} tag={tag} />)}
        </div>
    </>;
}
