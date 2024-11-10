import type {MediaEntry} from "@/composables";

export type Filter = (m: MediaEntry[]) => MediaEntry[]
