import {Routes, Route, useLocation, Navigate} from "react-router-dom";
import {useEffect} from "react";

import ScrollProgressFix from "~/components/ScrollProgressFix.tsx";
import NotFound from "~/pages/404.tsx";
import SimpleLayout from "src/layouts/SimpleLayout";
import MainLayout from "src/layouts/MainLayout";

import HomePage from "~/pages/home";
import LoginPage from "src/pages/auth/login";
import LogoutPage from "src/pages/auth/logout";
import SearchPage from "~/pages/search";
import TagsPage from "~/pages/tags";

import PanelLayout from "src/pages/panel";
import ConfigSettingsPage from "~/pages/panel/settings";
import ConfigProblemsPage from "~/pages/panel/problems";
import ConfigStatsPage from "~/pages/panel/stats";

import MediaListPage from "~/pages/media/list";
import MediaInfoPage from "~/pages/media/info";
import MediaCollectionPage from "~/pages/media/collection.tsx";
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
                <Route path="auth">
                    <Route path="login" element={<LoginPage />} />
                    <Route path="logout" element={<LogoutPage />} />
                </Route>
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
                <Route path="media">
                    <Route index element={<Navigate replace to="list" />} />
                    <Route path="list" element={<MediaListPage />} />
                    <Route path="info/*" element={<MediaInfoPage />} />
                    <Route path="collection/*" element={<MediaCollectionPage />} />
                    <Route path="watch/*" element={<MediaWatchVideoPage />} />
                    {/* see below */}
                    {/* <Route path="read/*" element={<MediaReadGalleryPage />} />*/}
                </Route>
            </Route>
            <Route element={<MainLayout heightAware title={title} /> }>
                <Route path="media">
                    <Route path="read/*" element={<MediaReadGalleryPage />} />
                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    </>;
}


const titleMap: Record<string, string | undefined> = {
    "/": "Home",
    "/auth/login": "Login",
    "/auth/logout": "Logout",
    "/panel/settings": "Settings",
    "/panel/problems": "Problems",
    "/panel/stats": "Statistics",
};
