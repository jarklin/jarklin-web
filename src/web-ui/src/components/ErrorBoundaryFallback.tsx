import type { FallbackProps } from "react-error-boundary";
import {AxiosError, HttpStatusCode} from "axios";
import {Navigate, useLocation} from "react-router-dom";


export function ErrorBoundaryFallback({ error }: FallbackProps) {
    const location = useLocation();

    if (error instanceof AxiosError && error.response?.status === HttpStatusCode.Unauthorized) {
        return <Navigate to={{
            pathname: "/auth/login",
            search: new URLSearchParams({ redirect: `${location.pathname}${location.hash}${location.search}` }).toString(),
        }} />;
    }

    return <>
        <div className="grid place-content-center h-full">
            <div className="max-w-xs text-center p-2 bg-primary-light border border-red-500 rounded-lg">
                <h1 className="text-2xl">Something went wrong!</h1>
                <p className="opacity-50 text-xs">({error.name}: {error.message})</p>
            </div>
        </div>
    </>;
}
