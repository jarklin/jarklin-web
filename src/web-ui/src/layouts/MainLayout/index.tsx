import {Suspense} from "react";
import {Outlet} from "react-router-dom";
import {ErrorBoundary} from "react-error-boundary";
import {ErrorBoundaryFallback} from "~/components/ErrorBoundaryFallback.tsx";
import LoadingSpinner from "~/components/LoadingSpinner.tsx";
import NavBar from "./NavBar.tsx";
import Footer from "../common/Footer.tsx";


export default function MainLayout() {
    return <>
        {/* fatal error */}
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
            <div className="min-h-screen grid grid-rows-[auto,auto,1fr,auto]">
                <NavBar />
                <main className="w-screen">
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
