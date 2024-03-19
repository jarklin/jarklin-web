import {Fragment} from "react";
import {homeEntries} from "~/pages/home/entries.ts";
import SectionSeparator from "~/components/Section/Separator.tsx";
import HomepageCollections from "~/pages/home/collections.tsx";
import HomepageTopTags from "~/pages/home/tags.tsx";
import HomepageFeed from "~/pages/home/feed.tsx";


export default function HomePage() {
    return <div className="p-2">
        {homeEntries.map((entry) => <Fragment key={entry.title}>
            <HomepageFeed key={entry.title} {...entry} />
            <SectionSeparator />
        </Fragment>)}
        <HomepageCollections />
        <SectionSeparator />
        <HomepageTopTags />
    </div>;
}
