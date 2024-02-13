import {useMutation, useQueryClient} from "react-query";
import axios, {AxiosError, HttpStatusCode} from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
import jarklinIconSrc from "./jarklin-special.svg";  // special-logo. shorter and not rounded


export default function LoginPage() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const login = useMutation(
        ["auth", "login"],
        (formData: FormData) => axios.post("/auth/login", formData),
        { onSuccess: () => {
            queryClient.removeQueries();
            navigate(searchParams.get("redirect") ?? "/", { replace: true });
        } }
    );

    return <>
        <div className="h-full grid place-content-center text-xl gap-2 text-center p-2">
            <form onSubmit={(event) => {
                event.preventDefault();
                const form = event.target as HTMLFormElement;
                const formData = new FormData(form);
                login.mutate(formData);
            }} className="flex flex-col gap-1 max-w-[90vw]">
                <img className="w-full rounded-sm" src={jarklinIconSrc} alt=""/>
                {login.isError && (
                    (login.error instanceof AxiosError && login.error.response?.status === HttpStatusCode.Unauthorized)
                        ? <div className="px-1 bg-white text-red-500 text-center rounded-sm">
                            Bad Credentials Provided
                        </div>
                        : <div className="bg-white text-red-500 text-centerrounded-sm">
                            <p className="text-xl">Login Failed for some Reason</p>
                            <p className="opacity-50 text-xs">({(login.error as Error).name}: {(login.error as Error).message})</p>
                        </div>
                )}
                <input
                    required type="text" name="username"
                    className="rounded-sm px-1 py-px bg-white text-black disabled:cursor-not-allowed"
                    placeholder="Username"
                    disabled={login.isLoading}
                    enterKeyHint="next"
                />
                <input
                    required type="password" name="password"
                    className="rounded-sm px-1 py-px bg-white text-black disabled:cursor-not-allowed"
                    placeholder="Password"
                    disabled={login.isLoading}
                    enterKeyHint="done"
                />
                <input
                    type="submit"
                    className="bg-white text-black rounded-t-sm rounded-b-lg hover:cursor-pointer disabled:cursor-not-allowed"
                    disabled={login.isLoading}
                    value="Login"
                />
            </form>
        </div>
    </>;
}
