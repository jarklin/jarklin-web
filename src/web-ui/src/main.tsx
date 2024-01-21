import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import App from './App.tsx';
import axios, { AxiosError, HttpStatusCode } from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import './index.css';


axios.defaults.withCredentials = true;
axios.defaults.baseURL = "./";  // todo: validate if this works with changed server baseurl

const retryStatus: Array<number> = [
    HttpStatusCode.RequestTimeout,
    HttpStatusCode.TooEarly,
    HttpStatusCode.TooManyRequests,
    HttpStatusCode.ServiceUnavailable,
];

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error) => {
                if (error instanceof AxiosError) {
                    if (retryStatus.includes(error.status ?? 0)) {
                        return failureCount < 5;
                    }
                }
                return false;
            }
        }
    }
});


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <HashRouter>
                <App />
            </HashRouter>
        </QueryClientProvider>
    </React.StrictMode>,
);
