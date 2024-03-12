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
    const info = useMedia();
    const problems = useProblems();

    const categories = useMemo<Index>(() => {
        const galleries = info.filter(e => e.type === "gallery") as GalleryMediaEntry[];
        const videos = info.filter(e => e.type === "video") as VideoMediaEntry[];

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
                            { largest: 2 },
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
                        value: humanize.intComma(Array.from(new Set(info.flatMap(e => e.tags))).length),
                    },
                ],
            },
        ];
    }, [info, problems]);

    return <>
        <div className="grid grid-cols-[auto,1fr] gap-4">
            {categories.map(category => <>
                <div className="col-span-2 text-xl">{category.category}</div>
                {category.stats.map(stat => <>
                    <div className="ml-2">{stat.label}:</div>
                    <div>{stat.value}</div>
                </>)}
            </>)}
        </div>
    </>;
}
