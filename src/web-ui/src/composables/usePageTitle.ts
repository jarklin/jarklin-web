import {useRoute} from "vue-router";
import {watch} from "vue";
import {formatRouteName} from "@/lib";


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
            document.title = `Jarklin - ${formatRouteName(newName)}`;
        } else {
            document.title = `Jarklin`;
        }
    });
}
