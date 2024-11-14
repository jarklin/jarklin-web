import type {MediaEntry} from "./api";

export type Filter = (m: MediaEntry[]) => MediaEntry[]
