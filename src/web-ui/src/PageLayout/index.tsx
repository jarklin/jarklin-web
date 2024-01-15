import {ErrorBoundary} from "react-error-boundary";
import {ErrorBoundaryFallback} from "~/components/ErrorBoundaryFallback.tsx";
import {Outlet} from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Index() {
    return <>
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
            <div className="flex flex-col h-screen">
                <NavBar />
                <main className="grow">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </ErrorBoundary>
    </>;
}
