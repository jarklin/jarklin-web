import type {MediaEntry} from "~/types/media.ts";


export interface Collection {
    path: string
    displayName: string
    tags: string[]
    previewUrl: string
    mediaList: MediaEntry[]
}
