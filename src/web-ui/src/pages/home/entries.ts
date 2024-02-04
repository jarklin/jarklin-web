import {InfoEntry} from "~/types";
import {shuffled} from "~/util";

interface Entry {
    title: string
    filter: (entries: InfoEntry[]) => InfoEntry[]
}


export const homeEntries: Entry[] = [
    {
        title: "Random Galleries",
        filter: (entries) => shuffled(
            entries
                .filter(entry => entry.meta.type === "gallery")
        ),
    },
    {
        title: "Random Videos",
        filter: (entries) =>  shuffled(
            entries
                .filter(entry => entry.meta.type === "video")
        ),
    },
    {
        title: "Recently Updated Galleries",
        filter: (entries) => (
            entries
                .filter(entry => entry.meta.type === "gallery")
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
                .filter(entry => entry.meta.type === "gallery")
                .sort((a, b) => b.ctime - a.ctime)
        ),
    },
    {
        title: "Newest Videos",
        filter: (entries) => (
            entries
                .filter(entry => entry.meta.type === "video")
                .sort((a, b) => b.ctime - a.ctime)
        ),
    },
]
