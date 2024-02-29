import {encodePath} from "~/util/encoding.ts";


const ROOT = `./files`


export function getSource(path: string): string {
    return `${ROOT}/${encodePath(path)}?optimize`;
}

export function getPreview(path: string): string {
    return `${ROOT}/.jarklin/cache/${encodePath(path)}/preview.webp`;
}

export function getAnimatedPreview(path: string): string {
    return `${ROOT}/.jarklin/cache/${encodePath(path)}/animated.webp`;
}

export function getPreviewImage(path: string, n: number): string {
    return `${ROOT}/.jarklin/cache/${encodePath(path)}/previews/${n}.webp`;
}
