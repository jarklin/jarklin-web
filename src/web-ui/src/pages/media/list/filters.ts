import type {InfoEntry} from "~/types";
import {seededRandom, shuffled} from "~/util";


export function filterRandomGalleries(entries: InfoEntry[]): InfoEntry[] {
    return shuffled(
        entries.filter(entry => entry.type === "gallery")
        , seededRandom(),
    );
}

export function filterRandomVideos(entries: InfoEntry[]): InfoEntry[] {
    return shuffled(
        entries.filter(entry => entry.type === "video")
        , seededRandom(),
    );
}


export function filterRecentlyUpdatedGalleries(entries: InfoEntry[]): InfoEntry[] {
    return entries
        .filter(entry => entry.modification_time !== entry.creation_time)  // attempt to avoid adding newest
        .filter(entry => entry.type === "gallery")
        .sort((a, b) => b.modification_time - a.modification_time);
}


export function filterNewestGalleries(entries: InfoEntry[]): InfoEntry[] {
    return entries
        .filter(entry => entry.type === "gallery")
        .sort((a, b) => b.creation_time - a.creation_time);
}


export function filterNewestVideos(entries: InfoEntry[]): InfoEntry[] {
    return entries
        .filter(entry => entry.type === "video")
        .sort((a, b) => b.creation_time - a.creation_time);
}
