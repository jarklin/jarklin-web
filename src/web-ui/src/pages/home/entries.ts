import {InfoEntry} from "~/hooks/useInfo/types.ts";
import {seededRandom, shuffled} from "~/util";


interface Entry {
    title: string
    filter: (entries: InfoEntry[]) => InfoEntry[]
}


export const homeEntries: Entry[] = [
    {
        title: "Random Galleries",
        filter: (entries) => shuffled(
            entries
                .filter(entry => entry.type === "gallery")
            , seededRandom()
        ),
    },
    {
        title: "Random Videos",
        filter: (entries) =>  shuffled(
            entries
                .filter(entry => entry.type === "video")
            , seededRandom()
        ),
    },
    {
        title: "Recently Updated Galleries",
        filter: (entries) => (
            entries
                .filter(entry => entry.modification_time != entry.creation_time)  // attempt to avoid adding newest
                .filter(entry => entry.type === "gallery")
                .sort((a, b) => b.modification_time - a.modification_time)
        ),
    },
    // {
    //     title: "Random Collection",
    //     filter: (e) => e,
    // },
    {
        title: "Newest Galleries",
        filter: (entries) => (
            entries
                .filter(entry => entry.type === "gallery")
                .sort((a, b) => b.creation_time - a.creation_time)
        ),
    },
    {
        title: "Newest Videos",
        filter: (entries) => (
            entries
                .filter(entry => entry.type === "video")
                .sort((a, b) => b.creation_time - a.creation_time)
        ),
    },
]
