import type { InjectionKey } from "vue";
import { useMediaQuery } from "@/composables";


export const KEY_MEDIA_DATA: InjectionKey<ReturnType<typeof useMediaQuery>['data']> = Symbol();
