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
import Feed from "@/views/home/Feed.vue";
import {filters, mergeFilters} from "@/lib/filters";

interface HomepageElement {
    displayName: string
    location: RouteLocationRaw
    icon?: LucideIcon
    component?: Component
    props?: object
}

const elementLimit = filters.limitedTo(20);

export const homepageElements: HomepageElement[] = [
    {
        displayName: "Explorer",
        icon: LucideFolderClosed,
        location: { name: 'explorer', params: { mediaPath: '' } },
    },
    {
        displayName: "Tags",
        icon: LucideTag,
        location: { name: 'tags' },
    },
    {
        displayName: "Collections",
        icon: LucideLibraryBig,
        location: { name: 'collections' },
    },
    {
        displayName: "Random Galleries",
        icon: LucideImages,
        location: { name: 'home' },
        component: Feed,
        props: { filter: mergeFilters(filters.isGallery, filters.shuffled, elementLimit) }
    },
    {
        displayName: "Random Videos",
        icon: LucideFilm,
        location: { name: 'home' },
        component: Feed,
        props: { filter: mergeFilters(filters.isVideo, filters.shuffled, elementLimit) }
    },
    {
        displayName: "Recently Updated Galleries",
        icon: LucideReplaceAll,
        location: { name: 'home' },
        component: Feed,
        props: { filter: mergeFilters(filters.isGallery, filters.isUpdated, filters.sortModificationTimeDesc, elementLimit) }
    },
    {
        displayName: "Newest Galleries",
        icon: LucideSparkle,
        location: { name: 'home' },
        component: Feed,
        props: { filter: mergeFilters(filters.isGallery, filters.sortCreationTimeDesc, elementLimit) }
    },
    {
        displayName: "Newest Videos",
        icon: LucideSparkles,
        location: { name: 'home' },
        component: Feed,
        props: { filter: mergeFilters(filters.isVideo, filters.sortCreationTimeDesc, elementLimit) }
    },
];
