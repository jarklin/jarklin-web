import {ErrorBoundary} from "react-error-boundary";
import {ErrorBoundaryFallback} from "~/components/ErrorBoundaryFallback.tsx";
import {Outlet} from "react-router-dom";
import NavBar from "./NavBar.tsx";
import Footer from "../SimpleLayout/Footer.tsx";
import {Suspense} from "react";
import LoadingSpinner from "~/components/LoadingSpinner.tsx";
import {twMerge} from "tailwind-merge";

interface Props {
    title: string
    heightAware?: boolean
}

export default function Index(props: Props) {
    return <>
        {/* fatal error */}
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
            <div className={twMerge("flex flex-col", props.heightAware ? "min-h-screen" : "h-screen")}>
                <NavBar title={props.title} />
                <main className="grow">
                    {/* error in requests or so */}
                    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                        <Suspense fallback={<LoadingSpinner className="h-full" />}>
                            <Outlet />
                        </Suspense>
                    </ErrorBoundary>
                </main>
                <Footer />
            </div>
        </ErrorBoundary>
    </>;
}
