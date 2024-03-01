import {Routes, Route, useLocation, Navigate} from "react-router-dom";
import HomePage from "~/pages/home";
import LoginPage from "~/pages/login";
import LogoutPage from "~/pages/logout";
import NotFound from "~/pages/404.tsx";
import SimpleLayout from "src/layouts/SimpleLayout";
import MainLayout from "src/layouts/MainLayout";
import ConfigPage from "src/pages/panel";
import SearchPage from "~/pages/search";
import ViewPage from "~/pages/view";
import ReadGalleryPage from "~/pages/view/read.tsx";
import WatchVideoPage from "~/pages/view/watch.tsx";
import {useEffect} from "react";
import ScrollProgressFix from "~/components/ScrollProgressFix.tsx";
import ConfigSettingsPage from "~/pages/panel/settings";
import ConfigProblemsPage from "~/pages/panel/problems";
import ConfigStatsPage from "~/pages/panel/stats";


export default function App() {
    const { pathname } = useLocation();
    const title = titleMap[pathname] ?? "";

    useEffect(() => {
        document.documentElement.scrollTo({ top: 0, behavior: "instant" });
    }, [pathname]);

    return <>
        <ScrollProgressFix />
        <Routes key={pathname}>
            <Route element={<SimpleLayout title={title} />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="logout" element={<LogoutPage />} />
            </Route>
            <Route element={<MainLayout title={title} />}>
                <Route index element={<HomePage />} />
                <Route path="panel" element={<ConfigPage />}>
                    <Route index element={<Navigate replace to="settings" />} />
                    <Route path="settings" element={<ConfigSettingsPage />} />
                    <Route path="problems" element={<ConfigProblemsPage />} />
                    <Route path="stats" element={<ConfigStatsPage />} />
                </Route>
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
    "/panel/settings": "Settings",
    "/panel/problems": "Problems",
    "/panel/stats": "Statistics",
}
