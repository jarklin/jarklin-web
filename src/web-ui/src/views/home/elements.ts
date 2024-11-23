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

export interface HomepageElement {
    displayName: string
    location: RouteLocationRaw
    icon?: LucideIcon
    component?: Component
    props?: object
}

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
        props: { filterDefinition: "isGallery|shuffled|limitedTo[20]" }
    },
    {
        displayName: "Random Videos",
        icon: LucideFilm,
        location: { name: 'home' },
        component: Feed,
        props: { filterDefinition: "isVideo|shuffled|limitedTo[20]" }
    },
    {
        displayName: "Recently Updated Galleries",
        icon: LucideReplaceAll,
        location: { name: 'home' },
        component: Feed,
        props: { filterDefinition: "isGallery|isUpdated|sortModificationTimeDesc|limitedTo[20]" }
    },
    {
        displayName: "Newest Galleries",
        icon: LucideSparkle,
        location: { name: 'home' },
        component: Feed,
        props: { filterDefinition: "isGallery|sortCreationTimeDesc|limitedTo[20]" }
    },
    {
        displayName: "Newest Videos",
        icon: LucideSparkles,
        location: { name: 'home' },
        component: Feed,
        props: { filterDefinition: "isVideo|sortCreationTimeDesc|limitedTo[20]" }
    },
];
