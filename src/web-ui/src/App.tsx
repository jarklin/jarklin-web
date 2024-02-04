import {Routes, Route, useLocation} from "react-router-dom";
import HomePage from "~/pages/home";
import LoginPage from "~/pages/login";
import LogoutPage from "~/pages/logout";
import NotFound from "~/pages/404.tsx";
import SimpleLayout from "src/layouts/SimpleLayout";
import MainLayout from "src/layouts/MainLayout";
import ConfigPage from "~/pages/config";
import SearchPage from "~/pages/search";
import ViewPage from "~/pages/view";
import ReadGalleryPage from "~/pages/view/read.tsx";
import WatchVideoPage from "~/pages/view/watch.tsx";


export default function App() {
    const { pathname } = useLocation();
    const title = titleMap[pathname] ?? "";

    return <>
        <Routes key={pathname}>
            <Route element={<SimpleLayout title={title} />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="logout" element={<LogoutPage />} />
            </Route>
            <Route element={<MainLayout title={title} />}>
                <Route index element={<HomePage />} />
                <Route path="config" element={<ConfigPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="view/*" element={<ViewPage />} />
                <Route path="read/*" element={<ReadGalleryPage />} />
                <Route path="watch/*" element={<WatchVideoPage />} />
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
