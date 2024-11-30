import type {Collection} from "@/types";
import {useMediaQuery} from "@/composables/useMediaQuery";
import {computed, type ComputedRef} from "vue";
import {extractCollections} from "@/lib";

export function useCollections(): ComputedRef<Collection[]> {
    const media = useMediaQuery();

    return computed(() => {
        return !media.isSuccess ? [] : extractCollections(media.data);
    });
}
