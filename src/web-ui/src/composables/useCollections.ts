import type {Collection} from "@/types";
import { computed, type ComputedRef, inject } from "vue";
import {extractCollections} from "@/lib";
import { KEY_MEDIA_DATA } from "@/keys.ts";

export function useCollections(): ComputedRef<Collection[]> {
    const mediaData = inject(KEY_MEDIA_DATA)!;
    return computed(() => extractCollections(mediaData));
}
