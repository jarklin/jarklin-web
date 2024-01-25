import {encodePath} from "~/util/encoding.ts";

export function getSource(path: string): string {
    return `/files/${encodePath(path)}`;
}

export function getPreview(path: string): string {
    return `/files/.jarklin/cache/${encodePath(path)}/preview.jpg`;
}

export function getAnimatedPreview(path: string): string {
    return `/files/.jarklin/cache/${encodePath(path)}/preview.webp`;
}

export function getPreviewImage(path: string, n: number): string {
    return `/files/.jarklin/cache/${encodePath(path)}/previews/${n}.jpg`;
}
