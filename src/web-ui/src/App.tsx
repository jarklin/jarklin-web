import { Routes, Route } from "react-router-dom";
import HomePage from "~/pages/home";
import NotFound from "~/pages/404.tsx";
import PageLayout from "~/PageLayout";


export default function App() {
    return <>
        <Routes>
            <Route element={<PageLayout />}>
                <Route index element={<HomePage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </>;
}

