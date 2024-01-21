import {ErrorBoundary} from "react-error-boundary";
import {ErrorBoundaryFallback} from "~/components/ErrorBoundaryFallback.tsx";
import {Outlet} from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import {Suspense} from "react";

export default function Index() {
    return <>
        {/* fatal error */}
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
            <div className="flex flex-col h-screen">
                <NavBar />
                <main className="grow">
                    {/* error in requests or so */}
                    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                        <Suspense fallback={<Loading />}>
                            <Outlet />
                        </Suspense>
                    </ErrorBoundary>
                </main>
                <Footer />
            </div>
        </ErrorBoundary>
    </>;
}


function Loading() {
    return <div className="h-full grid place-content-center">
        <div className="h-[min(5vh,5vw)] aspect-square border-4 border-accent-light rounded-full border-t-transparent border-b-transparent animate-spin" />
    </div>;
}
