import {encodePath} from "./encoding.ts";
import {getGlobalState} from "./globalState.ts";


const ROOT = "./files";


export function getSource(path: string): string {
    const optimize = getGlobalState<boolean>("optimization", false);
    const url = `${ROOT}/${encodePath(path)}`;
    return optimize ? `${url}?optimize` : url;
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


export function getParentPath(path: string, trailingSlash: boolean): string {
    const lastSlash = path.lastIndexOf("/");
    return lastSlash === -1 ? "" : path.substring(0, trailingSlash ? lastSlash + 1 : lastSlash);
}


export function getBasename(path: string): string {
    const lastSlash = path.lastIndexOf("/");
    return lastSlash === -1 ? path : path.substring(lastSlash + 1);
}
