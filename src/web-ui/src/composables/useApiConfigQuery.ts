import {reactive} from "vue";
import {useQuery} from "@tanstack/vue-query";
import axios from "axios";
import type {ApiConfig} from "@/types";


export function useApiConfigQuery() {
    return reactive(useQuery<ApiConfig, Error>({
        queryKey: ['api', 'config'],
        queryFn: ({ signal }) => axios
            .get<ApiConfig>("/api/config", { signal })
            .then(r => r.data),
        refetchOnMount: false,
        throwOnError: true,
    }));
}
