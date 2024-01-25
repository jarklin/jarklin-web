interface GeneralInfoEntry {
    path: string
    name: string
    ext: string
    ctime: number
    mtime: number
}

export interface VideoInfoEntry extends GeneralInfoEntry{
    meta: VideoMeta
}

export interface GalleryInfoEntry extends GeneralInfoEntry {
    meta: GalleryMeta
}


export type InfoEntry = VideoInfoEntry | GalleryInfoEntry


export interface VideoMeta {
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

export interface GalleryMeta {
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
