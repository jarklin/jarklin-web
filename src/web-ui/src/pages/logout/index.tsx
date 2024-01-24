import {useMutation} from "react-query";
import {useEffect} from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";


export default function LogoutPage() {
    const logout = useMutation(
        ["auth", "logout"],
        () => axios.post("/auth/logout"),
    );

    useEffect(() => {
        logout.mutate();
    }, []);

    return <div className="h-full grid place-content-center text-2xl gap-2 text-center">
        {logout.isSuccess
            ? <Navigate replace to="/" />
        : logout.isError
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
