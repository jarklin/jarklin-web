import {NavLink, Outlet} from "react-router-dom";


const links = [
    { href: "/panel/settings", label: "Settings" },
    { href: "/panel/problems", label: "Problems" },
    { href: "/panel/stats", label: "Statistics" },
];


export default function ConfigPage() {
    return <>
        <div className="flex flex-col h-full gap-2 p-4 mx-auto max-w-screen-2xl">
            <div className="flex justify-center gap-4 p-2">
                {links.map((link, i) => <>
                    {i !== 0 && <div className="bg-accent/20 w-px h-5 my-auto" />}
                    <NavLink className="group p-1 [&.active>span]:bg-accent-light [&.active>span]:max-w-full" to={link.href}>
                        {link.label}
                        <span className="block mx-auto max-w-0 group-hover:max-w-full transition-[max-width] h-px bg-accent" />
                    </NavLink>
                </>)}
            </div>
            <Outlet />
        </div>
    </>;
}
