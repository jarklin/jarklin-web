import { FallbackProps } from "react-error-boundary";


export function ErrorBoundaryFallback({ error }: FallbackProps) {
    return <>
        <div className="grid place-content-center w-screen h-screen">
            <div className="max-w-xs text-center p-2 bg-primary-light border border-red-500 rounded-lg">
                <h1 className="text-2xl">Something went wrong!</h1>
                <p className="opacity-50 text-xs">({error.name}: {error.message})</p>
            </div>
        </div>
    </>;
}
