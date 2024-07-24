import {Fragment} from "react";
import {homeEntries} from "./entries.ts";
import SectionSeparator from "~/components/Section/Separator.tsx";
import HomepageCollections from "./collections.tsx";
import HomepageTopTags from "./tags.tsx";
import HomepageFeed from "./feed.tsx";
import HomepageExplorerLink from "./explorer.tsx";


export default function HomePage() {
    return <div className="p-2">
        {homeEntries.map((entry) => <Fragment key={entry.title}>
            <HomepageFeed key={entry.title} {...entry} />
        </Fragment>)}
        <HomepageCollections />
        <SectionSeparator />
        <HomepageTopTags />
        <SectionSeparator />
        <HomepageExplorerLink />
    </div>;
}
