
/*
 * "/home/videos/old" => ["home", "videos", "old", "home|videos", "home|videos|old"]
 */
export function extractTags(path: string): string[] {
    const tags: string[] = [];

    // split by '/'|'\'
    const parts = path.split(/[/\\]/g).filter(e => e);

    // // every element is added once (except the filename and folder name (last part))
    // tags.push(...parts.slice(0, parts.length - 2));

    // add variations/combinations
    for (let max = 1; max < parts.length; max++) {
        tags.push(parts.slice(0, max).join("|"));
    }

    return tags;
}
