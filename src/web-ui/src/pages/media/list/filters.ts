import type {MediaEntry} from "~/types";
import {seededRandom, shuffled} from "~/util";


export function filterRandomGalleries(entries: MediaEntry[]): MediaEntry[] {
    return shuffled(
        entries.filter(entry => entry.type === "gallery")
        , seededRandom(),
    );
}

export function filterRandomVideos(entries: MediaEntry[]): MediaEntry[] {
    return shuffled(
        entries.filter(entry => entry.type === "video")
        , seededRandom(),
    );
}


// eslint-disable-next-line no-magic-numbers
const ONE_DAY = 60*60*24;


export function filterRecentlyUpdatedGalleries(entries: MediaEntry[]): MediaEntry[] {
    return entries
        .filter(entry => entry.modification_time > (entry.creation_time + ONE_DAY))
        .filter(entry => entry.type === "gallery")
        .sort((a, b) => b.modification_time - a.modification_time);
}


export function filterNewestGalleries(entries: MediaEntry[]): MediaEntry[] {
    return entries
        .filter(entry => entry.type === "gallery")
        .sort((a, b) => b.creation_time - a.creation_time);
}


export function filterNewestVideos(entries: MediaEntry[]): MediaEntry[] {
    return entries
        .filter(entry => entry.type === "video")
        .sort((a, b) => b.creation_time - a.creation_time);
}
