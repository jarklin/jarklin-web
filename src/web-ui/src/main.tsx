import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import ContextsProvider from "~/contexts";


axios.defaults.withCredentials = true;
axios.defaults.baseURL = "./";  // todo: validate if this works with changed server baseurl

const retryStatus: number[] = [
    HttpStatusCode.RequestTimeout,
    HttpStatusCode.TooEarly,
    HttpStatusCode.TooManyRequests,
    HttpStatusCode.ServiceUnavailable,
];
const maxFailureCount = 5;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error) => {
                if (error instanceof AxiosError) {
                    if (retryStatus.includes(error.status ?? 0)) {
                        return failureCount < maxFailureCount;
                    }
                }
                return false;
            },
        },
    },
});


ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ContextsProvider>
                <HashRouter>
                    <App />
                </HashRouter>
            </ContextsProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);
