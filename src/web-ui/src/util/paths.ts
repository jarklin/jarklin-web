import {encodePath} from "~/util/encoding.ts";
import {getGlobalState} from "~/util/globalState.ts";


const ROOT = "./files";


export function getSource(path: string): string {
    const optimize = getGlobalState<boolean>("optimization", false);
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
