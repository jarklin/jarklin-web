import {type HomeEntry, MAXENTRIES} from "~/pages/home/entries.ts";
import useMedia from "~/hooks/useMedia.ts";
import {useMemo} from "react";
import SectionHeaderLink from "~/components/Section/HeaderLink.tsx";
import VerticalScrollArea from "~/components/VerticalScrollArea.tsx";
import {Link} from "react-router-dom";
import {encodePath} from "~/util";
import MediaCard from "~/components/MediaCard";


export default function HomepageFeed({ title, largerHeight, filterId, filter }: HomeEntry) {
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
