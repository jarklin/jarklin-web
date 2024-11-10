import type {Filter} from "@/lib/filters/types";
import random from "random";

const ONE_DAY = 60*60*24;


export const isGallery: Filter = (entries) => {
    return entries.filter(e => e.type === "gallery");
}

export const isVideo: Filter = (entries) => {
    return entries.filter(e => e.type === "video");
}

export const isUpdated: Filter = (entries) => {
    return entries.filter(e => e.modification_time > (e.creation_time + ONE_DAY))
}

export const sortModificationTimeDesc: Filter = (entries) => {
    return Array.from(entries)
        .sort((a, b) => b.modification_time - a.modification_time)
}

export const sortCreationTimeDesc: Filter = (entries) => {
    return Array.from(entries)
        .sort((a, b) => b.creation_time - a.creation_time)
}

export const shuffled: Filter = (entries) => {
    const now = new Date(Date.now());
    const seedDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours());
    const seed = seedDate.toISOString();
    const rand = random.clone(seed);

    const arr = Array.from(entries);
    for (let i = arr.length - 1; i > 0; i--) {
        const j = rand.int(0, i);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export const limitedTo: ((l: number) => Filter) = (l: number) => {
    return (entries) => entries.slice(0, l);
}
