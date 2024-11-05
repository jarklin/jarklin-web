import {reactive} from "vue";
import {useQuery} from "@tanstack/vue-query";
import axios from "axios";


export interface ApiConfig {
    requires_auth: boolean
    allows_optimization: boolean
}

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
