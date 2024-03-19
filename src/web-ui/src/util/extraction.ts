import type { MediaEntry } from "~/types";
import {containSameElements} from "~/util/itertools.ts";
import humanize from "humanize-plus";
import {getPreviewImage} from "~/util/paths.ts";


/*
 * "/home/videos/old" => ["home", "videos", "old", "home|videos", "home|videos|old"]
 */
export function extractTags(path: string): string[] {
    const tags: string[] = [];

    // split by '/'|'\'
    const parts = path.split(/[/\\]/g).filter(p => !!p.length);

    // // every element is added once (except the filename and folder name (last part))
    // tags.push(...parts.slice(0, parts.length - 2));

    // add variations/combinations
    for (let max = 1; max < parts.length; max++) {
        tags.push(parts.slice(0, max).join("|"));
    }

    return tags;
}


interface Collection {
    name: string
    tags: string[]
    previewUrl: string
    mediaList: MediaEntry[]
}


export function extractCollections(mediaList: MediaEntry[]): Collection[] {
    const collections: Collection[] = [];

    for (const media of mediaList) {
        const collection = collections.find(collection => containSameElements(collection.tags, media.tags));
        if (collection === undefined) {
            const pathParts = media.path.split(/[/\\]/g).filter(p => !!p.length);
            const name = pathParts[Math.max(0, pathParts.length - 2)];
            collections.push(<Collection>{
                name: humanize.capitalizeAll(name),
                tags: media.tags,
                previewUrl: getPreviewImage(media.path),
                mediaList: [media],
            });
        } else {
            collection.mediaList.push(media);
        }
    }

    return collections.filter(collection => collection.mediaList.length > 1);
}
