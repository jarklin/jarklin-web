import useMedia from "~/hooks/useMedia.ts";
import React, {useMemo} from "react";
import SectionHeader from "~/components/Section/Header.tsx";
import TagLink from "~/components/TagLink.tsx";


export default function TagsPage() {
    const { mediaList } = useMedia();

    const tags = useMemo(() => Array.from(new Set(
        mediaList.flatMap(media => media.tags),
    )), [mediaList]);

    const tagTreeList: TreeEntry[] = useMemo(() => {
        const entries: TreeEntry[] = [];

        for (const tag of tags) {
            let currentEntries: TreeEntry[] = entries;
            const parts = tag.split("|");
            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                let entry = currentEntries.find(e => e.part == part);
                if (entry === undefined) {
                    entry = {
                        part: part,
                        tag: parts.slice(0, i+1).join("|"),
                        children: [],
                    } as TreeEntry;
                    const newIndex = currentEntries.findIndex(e => e.part.localeCompare(part) >= 0);
                    currentEntries.splice(newIndex === -1 ? currentEntries.length : newIndex, 0, entry);
                }
                currentEntries = entry.children;
            }
        }

        return entries;
    }, [tags]);

    return <>
        <SectionHeader className="px-2">Tags</SectionHeader>
        <div className="p-2">
            <EntryComponent tagEntries={tagTreeList} />
        </div>
    </>;
}


function EntryComponent({tagEntries}: {tagEntries: TreeEntry[]}) {
    return <>
        {tagEntries.map(entry => <React.Fragment key={entry.tag}>
            <TagLink tag={entry.tag} />
            <div className="pl-4">
                <EntryComponent tagEntries={entry.children} />
            </div>
        </React.Fragment>)}
    </>;
}


interface TreeEntry {
    part: string
    tag: string
    children: Array<TreeEntry>
}
