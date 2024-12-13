import type {MediaEntry} from "@/types";

export interface Size {
    width: number
    height: number
}

export function getMediaSize(entry?: MediaEntry | null, previewIndex: number = 0): Size {
    if (entry === null || entry === undefined) return { width: 1, height: 1 };
    switch (entry.type) {
        case "video": return {
            width: entry.meta.width,
            height: entry.meta.height,
        };
        case "gallery": return {
            width: entry.meta.images[previewIndex].width,
            height: entry.meta.images[previewIndex].height,
        };
        default: return { width: 1, height: 1 };
    }
}

export function aspectRatioFromSize(size: Size): string {
    return `${size.width} / ${size.height}`;
}
