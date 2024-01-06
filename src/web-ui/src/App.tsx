import { Routes, Route, Outlet } from "react-router-dom";

export default function App() {
    return <>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="*" element={<p>404 Not Found</p>} />
            </Route>
        </Routes>
    </>;
}


function Layout() {
    return <>
        <Outlet />
    </>;
}


function Index() {
    return <>
        <h1 className="text-center text-2xl">Hello Jarklin!</h1>
    </>;
}
