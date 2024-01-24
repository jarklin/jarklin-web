import {useQuery, UseQueryResult} from "react-query";
import axios from "axios";
import {JarklinInfo} from "~/types";


export default function useJarklinInfo(): UseQueryResult<JarklinInfo> {
    return useQuery(
        [".jarklin", "info.json"],
        ({ signal }) => axios.get<JarklinInfo>("/files/.jarklin/info.json", { signal }).then(r => r.data),
        { refetchOnMount: false, suspense: true },
    );
}
