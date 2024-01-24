import {useMutation, useQueryClient} from "react-query";
import axios, {AxiosError, HttpStatusCode} from "axios";
import {Navigate} from "react-router-dom";
import jarklinIconSrc from "~/assets/jarklin.svg";


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

            }} className="flex flex-col gap-2 max-w-[90vw]">
                <img className="" src={jarklinIconSrc} alt="" />
                {logout.isError && (
                    (logout.error instanceof AxiosError && logout.error.response?.status === HttpStatusCode.Unauthorized)
                    ? <div className="text-center p-2 bg-primary-light border border-red-500 rounded-lg">
                        Bad Credentials Provided
                    </div>
                    : <div className="text-center p-2 bg-primary-light border border-red-500 rounded-lg">
                        <p className="text-xl">Login Failed for some Reason</p>
                        <p className="opacity-50 text-xs">({(logout.error as Error).name}: {(logout.error as Error).message})</p>
                    </div>
                )}
                <input
                    type="text" name="username"
                    className="rounded-md px-1 py-px text-black disabled:cursor-not-allowed"
                    placeholder="Username"
                    disabled={logout.isLoading}
                />
                <input
                    type="password" name="password"
                    className="rounded-md px-1 py-px text-black disabled:cursor-not-allowed"
                    placeholder="Password"
                    disabled={logout.isLoading}
                />
                <input type="submit" className="hover:cursor-pointer disabled:cursor-not-allowed" disabled={logout.isLoading} value="Login" />
            </form>
        </div>
    </>;
}
