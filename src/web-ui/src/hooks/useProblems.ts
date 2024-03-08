import {useQuery} from "react-query";
import axios from "axios";
import {Problems} from "~/types";


export default function useProblems(): Array<Problems> {
    const query = useQuery(
        [".jarklin", "problems.json"],
        ({ signal }) => axios
            .get<Array<Problems>>("/files/.jarklin/problems.json", { signal })
            .then(r => r.data),
        { refetchOnMount: false, suspense: true },
    );

    return query.data!;
}
