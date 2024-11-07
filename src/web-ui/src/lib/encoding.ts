export function encodePath(path: string): string {
    return path
        .split("/")
        .map(encodeURIComponent)
        .join("/");
}


export function decodePath(path: string): string {
    return path
        .split("/")
        .map(decodeURIComponent)
        .join("/");
}
