export type RawInfoEntry = {
    path: string
    name: string
    ext: string
    creation_time: number
    modification_time: number
    meta: RawVideoMeta | RawGalleryMeta
}


type ExtendedInfoEntry = RawInfoEntry & {
    type: "video" | "gallery"
    displayName: string
    tags: string[]
    meta: RawVideoMeta | RawGalleryMeta
}


export type VideoInfoEntry = ExtendedInfoEntry & {
    type: "video"
    meta: RawVideoMeta
}


export type GalleryInfoEntry = ExtendedInfoEntry & {
    type: "gallery"
    meta: RawGalleryMeta
}


export type InfoEntry = VideoInfoEntry | GalleryInfoEntry


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
        start: number
        start_time: number
        end: number
        end_time: number
        title: string
    }>,
}

interface RawGalleryMeta {
    type: "gallery"
    n_previews: number
    images: Array<{
        filename: string
        width: number
        height: number
        filesize: number
        is_animated: boolean
    }>,
}
