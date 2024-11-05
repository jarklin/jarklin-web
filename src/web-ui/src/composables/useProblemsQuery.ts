import {reactive} from "vue";
import {useQuery} from "@tanstack/vue-query";
import axios from "axios";

export interface ProblemEntry {
    file: string
    type: string
    description: string
    traceback: string
}

export function useProblemsQuery() {
    return reactive(useQuery<ProblemEntry[], Error>({
        queryKey: ['.jarklin', 'problems.json'],
        queryFn: ({signal}) => axios
            .get<ProblemEntry[]>('/files/.jarklin/problems.json', {signal})
            .then(r => r.data),
        refetchOnMount: false,
        throwOnError: true,
    }));
}
