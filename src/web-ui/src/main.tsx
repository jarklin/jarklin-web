import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import App from './App.tsx';
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import './index.css';


axios.defaults.withCredentials = true;

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <HashRouter>
                <App />
            </HashRouter>
        </QueryClientProvider>
    </React.StrictMode>,
);
