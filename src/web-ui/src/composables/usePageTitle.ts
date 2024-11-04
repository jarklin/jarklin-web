import {useRoute} from "vue-router";
import {watch} from "vue";
import {toTitleCase} from "@/lib/utils";


/**
 * composable to automatically update the document-title based on the current route
 *
 * @see useRoute
 * @see Document#title
 */
export function usePageTitle(): void {
    const route = useRoute();

    watch(() => route.name as string, (newName) => {
        if (newName) {
            document.title = `Jarklin - ${toTitleCase(newName)}`;
        } else {
            document.title = `Jarklin`;
        }
    });
}
