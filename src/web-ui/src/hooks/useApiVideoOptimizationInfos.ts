import {useQuery} from "react-query";
import axios from "axios";
import type {VideoOptimizationInfo} from "~/types";


type ApiValue = {
    [k: string]: VideoOptimizationInfo,
}


export default function useApiVideoOptimizationInfos(): ApiValue {
    const query = useQuery(
        ["api", "video-resolutions"],
        ({ signal }) => axios
            .get<ApiValue>("/api/video-resolutions", { signal })
            .then(r => r.data),
        { refetchOnMount: false, suspense: true },
    );

    return query.data!;
}
