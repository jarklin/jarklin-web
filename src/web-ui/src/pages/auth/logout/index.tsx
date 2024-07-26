import {useMutation, useQueryClient} from "react-query";
import {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export default function LogoutPage() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const logout = useMutation(
        ["auth", "logout"],
        () => axios.post("/auth/logout"),
        { onSuccess: () => {
            queryClient.removeQueries();
            navigate("/");
        } },
    );

    useEffect(() => {
        if (logout.isIdle) {
            logout.mutate();
        }
    }, [logout.status]);

    return <div className="h-full grid place-content-center text-2xl gap-2 text-center">
        {logout.isError
            ? <>
                <p>Something went wrong</p>
                <p className="opacity-50 text-sm">{`${logout.error}`}</p>
                <button className="border rounded-md bg-primary-light hover:text-accent" onClick={() => logout.mutate()}>retry</button>
            </>
            : <>
            Logging out...
            </>}
    </div>;
}
