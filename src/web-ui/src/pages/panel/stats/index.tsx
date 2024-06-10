import useMedia from "~/hooks/useMedia.ts";
import useProblems from "~/hooks/useProblems.ts";
import {useMemo} from "react";
import type {GalleryMediaEntry, VideoMediaEntry} from "~/types/media.ts";
import humanizeDuration from "humanize-duration";
import humanize from "humanize-plus";


type Index = Array<{
    category: string
    stats: Array<{
        label: string
        value: string | number
    }>
}>


export default function ConfigStatsPage() {
    const { mediaList } = useMedia();
    const problems = useProblems();

    const categories = useMemo<Index>(() => {
        const galleries = mediaList.filter(media => media.type === "gallery") as GalleryMediaEntry[];
        const videos = mediaList.filter(media => media.type === "video") as VideoMediaEntry[];

        return [
            {
                category: "Galleries",
                stats: [
                    {
                        label: "Total Galleries",
                        value: humanize.intComma(galleries.length),
                    },
                    {
                        label: "Total Images",
                        value: humanize.intComma(
                            galleries.reduce((n, e) => n + e.meta.images.length, 0),
                        ),
                    },
                ],
            },
            {
                category: "Videos",
                stats: [
                    {
                        label: "Total Videos",
                        value: humanize.intComma(videos.length),
                    },
                    {
                        label: "Total Duration",
                        value: humanizeDuration(
                            videos.reduce((n, e) => n + e.meta.duration, 0)*1000,
                            { largest: 2, round: true },
                        ),
                    },
                ],
            },
            {
                category: "Problems",
                stats: [
                    {
                        label: "Total Problems",
                        value: humanize.intComma(problems.length),
                    },
                ],
            },
            {
                category: "Other",
                stats: [
                    {
                        label: "Total Tags",
                        value: humanize.intComma(Array.from(new Set(mediaList.flatMap(e => e.tags))).length),
                    },
                ],
            },
        ];
    }, [mediaList, problems]);

    return <>
        <div className="grid grid-cols-[auto,1fr] gap-4">
            {categories.map(category => <>
                <div className="col-span-2 text-xl font-bold text-accent-light">{category.category}</div>
                {category.stats.map(stat => <>
                    <div className="ml-2 font-bold">{stat.label}:</div>
                    <div>{stat.value}</div>
                </>)}
            </>)}
        </div>
    </>;
}
