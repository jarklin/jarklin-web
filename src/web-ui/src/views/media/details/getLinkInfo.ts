import type { RouteLocationRaw } from "vue-router";
import type { GalleryMediaEntry, MediaEntry, VideoMediaEntry } from "@/types";

interface LinkInfo {
    consumeLink: RouteLocationRaw
    previews: Array<{
        link: RouteLocationRaw
    }>
}


export function getLinkInfo(media: MediaEntry): LinkInfo {
    switch (media.type) {
        case "gallery": return getGalleryLinkInfo(media);
        case "video": return getVideoLinkInfo(media);
        default: throw new Error("Unknown media type ");
    }
}

function getGalleryLinkInfo(media: GalleryMediaEntry): LinkInfo {
    return {
        consumeLink: {
            name: 'consume-manga',
            params: { mediaPath: media.path },
        },
        previews: media.meta.images.map(img => ({
            link: {
                name: 'consume-manga',
                params: { mediaPath: media.path },
                hash: `#${img.filename}`,
            }
        })),
    }
}

function getVideoLinkInfo(media: VideoMediaEntry): LinkInfo {
    const sceneInformation = (media.meta.chapters.length)
        ? media.meta.chapters
        : [...Array(media.meta.n_previews)].map((_, i) => ({
            id: i,
            title: `Scene ${i+1}`,
            start_time: Math.floor(media.meta.duration / media.meta.n_previews * i),
            end_time: Math.floor(media.meta.duration / media.meta.n_previews * (i+1)),
        }));

    return {
        consumeLink: {
            name: 'consume-watch',
            params: { mediaPath: media.path },
        },
        previews: sceneInformation.map((scene) => ({
            link: {
                name: 'consume-watch',
                params: { mediaPath: media.path },
                query: { initialTime: scene.start_time },
            },
        })),
    }
}
