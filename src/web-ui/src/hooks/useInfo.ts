import {useQuery, UseQueryResult} from "react-query";
import axios from "axios";
import {InfoEntry} from "~/types";


export default function useInfo(): UseQueryResult<Array<InfoEntry>> {
    return useQuery(
        [".jarklin", "info.json"],
        ({ signal }) => axios
            .get<Array<InfoEntry>>("/files/.jarklin/info.json", { signal })
            .then(r => r.data),
        { refetchOnMount: false, suspense: true },
    );
}
