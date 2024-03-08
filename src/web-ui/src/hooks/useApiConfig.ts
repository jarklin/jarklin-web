import {useQuery} from "react-query";
import axios from "axios";
import { ApiConfig } from "~/types";


export default function useApiConfig(): ApiConfig {
    const query = useQuery(
        ["api", "config"],
        ({ signal }) => axios
            .get<ApiConfig>("/api/config", { signal })
            .then(r => r.data),
        { refetchOnMount: false, suspense: true },
    );

    return query.data!;
}
