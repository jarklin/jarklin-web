
/*
 * "/home/videos/old" => ["home", "videos", "old", "home|videos", "home|videos|old"]
 */
export function extractTags(path: string): Array<string> {
    const tags: Array<string> = [];

    // split by '/'|'\'
    const parts = path.split(/[\/\\]/g).filter(e => e);

    // every element is added once (except the filename (last part))
    tags.push(...parts.slice(0, parts.length - 1));

    // add variations/combinations
    for(let max = 2; max < parts.length; max++) {
        tags.push(parts.slice(0, max).join("|"))
    }

    return tags;
}
