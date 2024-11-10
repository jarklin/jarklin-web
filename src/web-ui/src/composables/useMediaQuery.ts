import {useQuery} from "@tanstack/vue-query";
import axios from "axios";
import {reactive} from "vue";

type BasicMediaEntry = {
    path: string
    name: string
    ext: string
    creation_time: number
    modification_time: number
}

export type VideoMediaEntry = Pretty<BasicMediaEntry & {
    type: "video"
    meta: RawVideoMeta
}>

export type GalleryMediaEntry = Pretty<BasicMediaEntry & {
    type: "gallery"
    meta: RawGalleryMeta
}>

export type MediaEntry = VideoMediaEntry | GalleryMediaEntry

interface RawVideoMeta {
    type: "video"
    width: number
    height: number
    duration: number
    filesize: number
    n_previews: number
    video_streams: Array<{
        is_default: boolean
        width: number
        height: number
        duration: number
        avg_fps: number
    }>,
    audio_streams: Array<{
        is_default: boolean
        language: string
    }>,
    subtitles: Array<{
        is_default: boolean
        language: string
    }>,
    chapters: Array<{
        id: number
        // start: number
        start_time: number
        // end: number
        end_time: number
        title: string
    }>,
}

interface RawGalleryMeta {
    type: "gallery"
    n_previews: number
    images: Array<{
        filename: string
        ext: string
        width: number
        height: number
        filesize: number
        is_animated: boolean
    }>,
}


export function useMediaQuery() {
    return reactive(useQuery<MediaEntry[], Error>({
        queryKey: ['.jarklin', 'media.json'],
        queryFn: ({signal}) => axios
            .get<MediaEntry[]>('/files/.jarklin/media.json', {signal})
            .then(r => r.data.map(entry => (<MediaEntry>{
                ...entry,
                type: entry.meta.type,
            }))),
        refetchOnMount: false,
        throwOnError: true,
    }));
}
