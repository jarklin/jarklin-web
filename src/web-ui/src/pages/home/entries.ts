import type {InfoEntry} from "~/types/info.ts";
import * as filters from "~/pages/media/list/filters.ts";


export interface HomeEntry {
    title: string
    largerHeight: boolean
    filterId: string
    filter: (entries: InfoEntry[]) => InfoEntry[]
}


export const homeEntries: HomeEntry[] = [
    {
        title: "Random Galleries",
        largerHeight: true,
        filterId: "random-galleries",
        filter: filters.filterRandomGalleries,
    },
    {
        title: "Random Videos",
        largerHeight: false,
        filterId: "random-videos",
        filter: filters.filterRandomVideos,
    },
    {
        title: "Recently Updated Galleries",
        largerHeight: true,
        filterId: "recently-updated-galleries",
        filter: filters.filterRecentlyUpdatedGalleries,
    },
    // {
    //     title: "Random Collection",
    //     filter: (e) => e,
    // },
    {
        title: "Newest Galleries",
        largerHeight: true,
        filterId: "newest-galleries",
        filter: filters.filterNewestGalleries,
    },
    {
        title: "Newest Videos",
        largerHeight: false,
        filterId: "newest-videos",
        filter: filters.filterNewestVideos,
    },
];
