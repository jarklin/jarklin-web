import { FallbackProps } from "react-error-boundary";
import {AxiosError, HttpStatusCode} from "axios";
import {Navigate} from "react-router-dom";


export function ErrorBoundaryFallback({ error }: FallbackProps) {
    if (error instanceof AxiosError && error.status === HttpStatusCode.Unauthorized) {
        return <Navigate to="/login" />;
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
