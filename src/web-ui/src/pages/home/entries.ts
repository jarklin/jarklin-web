import {InfoEntry} from "~/hooks/useInfo/types.ts";
import {dailyRandom, shuffled} from "~/util";


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
            , dailyRandom()
        ),
    },
    {
        title: "Random Videos",
        filter: (entries) =>  shuffled(
            entries
                .filter(entry => entry.type === "video")
            , dailyRandom()
        ),
    },
    {
        title: "Recently Updated Galleries",
        filter: (entries) => (
            entries
                .filter(entry => entry.mtime != entry.ctime)  // avoid adding newest
                .filter(entry => entry.type === "gallery")
                .sort((a, b) => b.mtime - a.mtime)
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
                .sort((a, b) => b.ctime - a.ctime)
        ),
    },
    {
        title: "Newest Videos",
        filter: (entries) => (
            entries
                .filter(entry => entry.type === "video")
                .sort((a, b) => b.ctime - a.ctime)
        ),
    },
]
