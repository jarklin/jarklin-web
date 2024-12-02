import humanize from "humanize-plus";
import {getPreviewImage} from "./paths";
import type {Collection, MediaEntry} from "@/types";


/**
 * split by '/'|'\'
 */
function splitPath(path: string): string[] {
    return path.split(/[/\\]+/g).filter(p => !!p.length);
}


/**
 * <pre>
 * "/home/videos/old" => ["home", "home/videos", "home/videos/old"]
 * </pre>
 */
export function extractTags(path: string): string[] {
    const tags: string[] = [];

    const parts = splitPath(path);

    // add variations/combinations
    for (let max = 1; max < parts.length; max++) {
        tags.push(parts.slice(0, max).join("/"));
    }

    return tags;
}


export function extractCollections(mediaList: MediaEntry[]): Collection[] {
    const path2collections: Record<string, Collection> = {};

    for (const media of mediaList) {
        const pathParts = splitPath(media.path);
        const path = pathParts.slice(0, pathParts.length-1).join("/");
        const collection = path2collections[path];
        if (collection === undefined) {
            const name = pathParts[Math.max(0, pathParts.length - 2)];
            path2collections[path] = <Collection>{
                path: path,
                displayName: humanize.capitalizeAll(name),
                tags: media.tags,
                previewUrl: getPreviewImage(media.path),
                mediaList: [media],
            };
        } else {
            collection.mediaList.push(media);
        }
    }

    return Object.values(path2collections).filter(c => c.mediaList.length > 1);
}
