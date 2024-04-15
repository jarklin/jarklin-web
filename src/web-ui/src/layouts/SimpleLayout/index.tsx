import {Suspense} from "react";
import {Outlet} from "react-router-dom";
import {ErrorBoundary} from "react-error-boundary";
import {ErrorBoundaryFallback} from "~/components/ErrorBoundaryFallback.tsx";
import LoadingSpinner from "~/components/LoadingSpinner.tsx";
import NavBar from "./NavBar.tsx";
import Footer from "../MainLayout/Footer.tsx";


interface Props {
    title: string
}


export default function SimpleLayout(props: Props) {
    return <>
        {/* fatal error */}
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
            <div className="flex flex-col h-screen">
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
