import type {MediaEntry} from "@/composables";

export function getMediaSize(entry: MediaEntry): { width: number; height: number } {
    switch (entry.type) {
        case "video": return { width: entry.meta.width, height: entry.meta.height };
        case "gallery": return { width: entry.meta.images[0].width, height: entry.meta.images[0].height };
        default: return { width: 1, height: 1 };
    }
}
