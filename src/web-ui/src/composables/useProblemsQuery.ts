import {reactive} from "vue";
import {useQuery} from "@tanstack/vue-query";
import axios from "axios";
import type {ProblemEntry} from "@/types";

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
