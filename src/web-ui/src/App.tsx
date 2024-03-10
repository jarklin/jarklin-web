import {Routes, Route, useLocation, Navigate} from "react-router-dom";
import {useEffect} from "react";

import ScrollProgressFix from "~/components/ScrollProgressFix.tsx";
import NotFound from "~/pages/404.tsx";
import SimpleLayout from "src/layouts/SimpleLayout";
import MainLayout from "src/layouts/MainLayout";

import HomePage from "~/pages/home";
import LoginPage from "~/pages/login";
import LogoutPage from "~/pages/logout";
import SearchPage from "~/pages/search";
import TagsPage from "~/pages/tags";

import PanelLayout from "src/pages/panel";
import ConfigSettingsPage from "~/pages/panel/settings";
import ConfigProblemsPage from "~/pages/panel/problems";
import ConfigStatsPage from "~/pages/panel/stats";

import MediaLayout from "~/pages/media";
import MediaListPage from "~/pages/media/list";
import MediaInfoPage from "~/pages/media/info";
import MediaReadGalleryPage from "~/pages/media/read.tsx";
import MediaWatchVideoPage from "~/pages/media/watch.tsx";


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
                <Route path="search" element={<SearchPage />} />
                <Route path="tags" element={<TagsPage />} />
                <Route path="panel" element={<PanelLayout />}>
                    <Route index element={<Navigate replace to="settings" />} />
                    <Route path="settings" element={<ConfigSettingsPage />} />
                    <Route path="problems" element={<ConfigProblemsPage />} />
                    <Route path="stats" element={<ConfigStatsPage />} />
                </Route>
                <Route path="media" element={<MediaLayout />}>
                    <Route index element={<Navigate replace to="list" />} />
                    <Route path="list" element={<MediaListPage />} />
                    <Route path="info/*" element={<MediaInfoPage />} />
                    <Route path="read/*" element={<MediaReadGalleryPage />} />
                    <Route path="watch/*" element={<MediaWatchVideoPage />} />
                </Route>
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
};
