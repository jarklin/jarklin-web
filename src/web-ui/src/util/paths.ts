import {encodePath} from "./encoding.ts";


const ROOT = "./files";


export function getSource(path: string): string {
    return `${ROOT}/${encodePath(path)}`;
}


export function getCacheUrl(path: string, resource: string): string {
    return `${ROOT}/.jarklin/cache/${encodePath(path)}/${encodePath(resource)}`;
}


export function getPreviewImage(path: string, n?: number): string {
    return (n === undefined
        ? getCacheUrl(path, "preview.webp")
        : getCacheUrl(path, `previews/${n}.webp`)
    );
}

export function getAnimatedPreview(path: string): string {
    return getCacheUrl(path, "animated.webp");
}
