import {Routes, Route, useLocation} from "react-router-dom";
import HomePage from "~/pages/home";
import LoginPage from "~/pages/login.tsx";
import LogoutPage from "~/pages/logout.tsx";
import NotFound from "~/pages/404.tsx";
import PageLayout from "~/PageLayout";
import ConfigPage from "~/pages/config";


export default function App() {
    const { pathname } = useLocation();

    return <>
        <Routes key={pathname}>
            <Route element={<PageLayout title={titleMap[pathname] ?? ""} />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="logout" element={<LogoutPage />} />
                <Route path="config" element={<ConfigPage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </>;
}


const titleMap: Record<string, string | undefined> = {
    "/": "Home",
    "/login": "Login",
    "/logout": "Logout",
    "/config": "Config",
}
