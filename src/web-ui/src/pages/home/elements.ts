import type {RouteLocationRaw} from "vue-router";
import {
    LucideFilm,
    LucideFolderClosed,
    type LucideIcon,
    LucideImages,
    LucideLibraryBig, LucideReplaceAll, LucideSparkle, LucideSparkles,
    LucideTag
} from "lucide-vue-next";
import type {Component} from "vue";
import Feed from "./_Feed.vue";
import TopTags from "./_TopTags.vue";
import RandomCollections from "./_Collections.vue";

export interface HomepageElement {
    displayName: string
    location: RouteLocationRaw
    icon?: LucideIcon
    component?: Component
    props?: object
}

export const MAX_ENTRIES = 20;

function homepageFeed(data: Omit<HomepageElement, "location" | "component" | "props"> & { filterDefinition: string }): HomepageElement {
    return {
        ...data,
        location: { name: '/media/list/', query: { filterDefinition: data.filterDefinition } },
        component: Feed,
        props: { filterDefinition: data.filterDefinition }
    }
}

export const homepageElements: HomepageElement[] = [
    homepageFeed({
        displayName: "Random Galleries",
        icon: LucideImages,
        filterDefinition: "isGallery|shuffled",
    }),
    homepageFeed({
        displayName: "Random Videos",
        icon: LucideFilm,
        filterDefinition: "isVideo|shuffled",
    }),
    homepageFeed({
        displayName: "Recently Updated Galleries",
        icon: LucideReplaceAll,
        filterDefinition: "isGallery|isUpdated|sortModificationTimeDesc",
    }),
    homepageFeed({
        displayName: "Newest Galleries",
        icon: LucideSparkle,
        filterDefinition: "isGallery|sortCreationTimeDesc",
    }),
    homepageFeed({
        displayName: "Newest Videos",
        icon: LucideSparkles,
        filterDefinition: "isVideo|sortCreationTimeDesc",
    }),
    {
        displayName: "Tags",
        icon: LucideTag,
        location: { name: '/tags/' },
        component: TopTags,
    },
    {
        displayName: "Collections",
        icon: LucideLibraryBig,
        location: { name: '/media/collections/' },
        component: RandomCollections,
    },
    {
        displayName: "Explorer",
        icon: LucideFolderClosed,
        location: { name: '/media/explorer/[[...mediaPath]]', params: { mediaPath: '' } },
    },
];
