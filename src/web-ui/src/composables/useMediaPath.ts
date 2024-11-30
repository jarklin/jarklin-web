import {useRoute} from "vue-router";
import {computed, type Ref} from "vue";

export function useMediaPath(): Ref<string> {
    const route = useRoute();


    return computed(() => {
        const mediaPath = route.params.mediaPath;
        if (mediaPath === undefined) {
            return '';
        } else if (typeof mediaPath === 'string') {
            return mediaPath;
        } else {
            return mediaPath[0];
        }
    })
}
