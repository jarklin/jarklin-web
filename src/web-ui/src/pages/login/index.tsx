import {useMutation, useQueryClient} from "react-query";
import axios, {AxiosError, HttpStatusCode} from "axios";
import {Navigate} from "react-router-dom";
import jarklinIconSrc from "./jarklin-special.svg";  // special-logo. shorter and not rounded


export default function LoginPage() {
    const queryClient = useQueryClient();
    const logout = useMutation(
        ["auth", "login"],
        (formData: FormData) => axios.post("/auth/login", formData),
        { onSuccess: () => {
            queryClient.removeQueries();
        } }
    );

    return <>
        <div className="h-full grid place-content-center text-xl gap-2 text-center p-2">
            {logout.isSuccess && <Navigate to="/" />}
            <form onSubmit={(event) => {
                event.preventDefault();
                const form = event.target as HTMLFormElement;
                const formData = new FormData(form);
                logout.mutate(formData);
            }} className="flex flex-col gap-1 max-w-[90vw]">
                <img className="w-full rounded-sm" src={jarklinIconSrc} alt=""/>
                {logout.isError && (
                    (logout.error instanceof AxiosError && logout.error.response?.status === HttpStatusCode.Unauthorized)
                        ? <div className="px-1 bg-white text-red-500 text-center rounded-sm">
                            Bad Credentials Provided
                        </div>
                        : <div className="bg-white text-red-500 text-centerrounded-sm">
                            <p className="text-xl">Login Failed for some Reason</p>
                            <p className="opacity-50 text-xs">({(logout.error as Error).name}: {(logout.error as Error).message})</p>
                        </div>
                )}
                <input
                    type="text" name="username"
                    className="rounded-sm px-1 py-px bg-white text-black disabled:cursor-not-allowed"
                    placeholder="Username"
                    disabled={logout.isLoading}
                />
                <input
                    type="password" name="password"
                    className="rounded-sm px-1 py-px bg-white text-black disabled:cursor-not-allowed"
                    placeholder="Password"
                    disabled={logout.isLoading}
                />
                <input type="submit"
                       className="bg-white text-black rounded-t-sm rounded-b-lg hover:cursor-pointer disabled:cursor-not-allowed"
                       disabled={logout.isLoading} value="Login"/>
            </form>
        </div>
    </>;
}
