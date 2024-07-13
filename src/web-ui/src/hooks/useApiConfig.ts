import {useQuery} from "react-query";
import axios from "axios";
import type { ServerConfig } from "~/types";


export default function useApiConfig(): ServerConfig {
    const query = useQuery(
        ["api", "config"],
        ({ signal }) => axios
            .get<ServerConfig>("/api/config", { signal })
            .then(r => r.data),
        { refetchOnMount: false, suspense: true },
    );

    return query.data!;
}
