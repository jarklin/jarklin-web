import type {MediaEntry} from "./api";

export interface Collection {
    path: string
    displayName: string
    tags: string[]
    previewUrl: string
    mediaList: MediaEntry[]
}
