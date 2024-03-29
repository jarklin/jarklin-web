import type {VideoMediaEntry} from "~/types";
import {getPreviewImage} from "~/util";


interface ChapterInfo {
    title: string
    startTime: number
    endTime: number
    url: string
}


export function extractChapterInformation(media: VideoMediaEntry): ChapterInfo[] {
    if (media.meta.chapters.length) {
        return media.meta.chapters.map<ChapterInfo>((chapter, i) => ({
            id: chapter.id,
            title: chapter.title,
            startTime: chapter.start_time,
            endTime: chapter.end_time,
            url: getPreviewImage(media.path, i+1),
        }));
    } else {
        return [...Array(media.meta.n_previews)].map((_, i) => ({
            id: i,
            title: `Scene ${i+1}`,
            startTime: Math.floor(media.meta.duration / media.meta.n_previews * i),
            endTime: Math.floor(media.meta.duration / media.meta.n_previews * (i+1)),
            url: getPreviewImage(media.path, i+1),
        }));
    }
}
