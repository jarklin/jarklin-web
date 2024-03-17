import {encodePath} from "~/util/encoding.ts";


const ROOT = "./files";


export function getSource(path: string): string {
    const optimize = JSON.parse(localStorage.getItem("optimization") ?? "false");
    const url = `${ROOT}/${encodePath(path)}`;
    return optimize ? `${url}?optimize` : url;
}

export function getPreviewImage(path: string, n?: number): string {
    return (n === undefined
        ? `${ROOT}/.jarklin/cache/${encodePath(path)}/preview.webp`
        : `${ROOT}/.jarklin/cache/${encodePath(path)}/previews/${n}.webp`
    );
}

export function getAnimatedPreview(path: string): string {
    return `${ROOT}/.jarklin/cache/${encodePath(path)}/animated.webp`;
}
