export function formatFilename(name: string) {
    // @v2
    return name
        .replace(/\b\d{3,4}p\b/g, "")  // eg 240p or 360p
        .replace(/[\s._\-]+/g, " ")
        .replace(/\b/g, letter => letter.toUpperCase())

    // @v1
    // return name
    //     .split(/[^a-z0-9]+/gi)
    //     .filter(part => part.search(/\d{3,4}p/) === -1)  // eg 240p or 360p
    //     .map(part => {
    //         if (part === part.toUpperCase()) {
    //             return part;
    //         } else if (part === part.toLowerCase()) {
    //             return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    //         } else {
    //             return part;
    //         }
    //     })
    //     .join(" ");

    // @v0
    // return name
    //     .replace(/[._]/g, " ")
    //     .toLowerCase()
    //     .replace(/\b\w/g, l => l.toUpperCase());
}
