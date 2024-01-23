import {useQuery} from "react-query";
import axios from "axios";

export default function useUsername(): null | string {
    const query = useQuery(
        ["auth", "username"],
        ({ signal }) => axios.get<string>("/auth/username", { signal }),
        { refetchOnMount: false, refetchInterval: false },
    );

    if (!query.isSuccess) {
        return null;
    }

    const response = query.data;

    return response.data || null;
}
