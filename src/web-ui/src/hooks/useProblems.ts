import {useQuery} from "react-query";
import axios from "axios";


interface Problems {
    file: string
    type: string
    description: string
    traceback: string
}


export default function useProblems(): Array<Problems> {
    const query = useQuery(
        [".jarklin", "info.json"],
        ({ signal }) => axios
            .get<Array<Problems>>("/files/.jarklin/problems.json", { signal })
            .then(r => r.data),
        { refetchOnMount: false, suspense: true },
    );

    return query.data!;
}
