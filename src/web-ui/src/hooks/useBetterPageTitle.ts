import {useLocation} from "react-router-dom";
import {useEffect} from "react";


export function useBetterPageTitle() {
    const { pathname } = useLocation();

    useEffect(() => {
        const fixedName = titleMap[pathname];
        if (fixedName !== undefined) {
            document.title = `Jarklin - ${fixedName}`;
            return
        }
        if (dynamicTitleOn.findIndex(head => pathname.startsWith(head)) === -1) {
            document.title = `Jarklin`;
            return;
        }
        const lastPathPart = pathname.replace(/\/$/, "").split("/").pop();
        if (lastPathPart === undefined) {
            document.title = `Jarklin`;
            return;
        }
        const rawTitle = decodeURIComponent(lastPathPart);
        document.title = `Jarklin - ${rawTitle}`;
    }, [pathname]);
}

const dynamicTitleOn: string[] = [
    "/media/",
]

const titleMap: Record<string, string | undefined> = {
    "/": "Home",
    "/auth/login": "Login",
    "/auth/logout": "Logout",
    "/panel/settings": "Settings",
    "/panel/problems": "Problems",
    "/panel/stats": "Statistics",
    "/media/list": "Media",
    "/media/collections": "Collections",
    "/tags": "Tags",
};
