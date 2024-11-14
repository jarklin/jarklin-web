import {useQuery} from "@tanstack/vue-query";
import axios from "axios";
import {reactive} from "vue";
import type {MediaEntry} from "@/types";


export function useMediaQuery() {
    return reactive(useQuery<MediaEntry[], Error>({
        queryKey: ['.jarklin', 'media.json'],
        queryFn: ({signal}) => axios
            .get<MediaEntry[]>('/files/.jarklin/media.json', {signal})
            .then(r => r.data.map(entry => (<MediaEntry>{
                ...entry,
                type: entry.meta.type,
            }))),
        refetchOnMount: false,
        throwOnError: true,
    }));
}
