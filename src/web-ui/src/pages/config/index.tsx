import {NavLink, Outlet} from "react-router-dom";


const links = [
    { href: "/config/", label: "Settings" },
    { href: "/config/problems/", label: "Problems" },
    { href: "/config/stats/", label: "Stats" },
]


export default function ConfigPage() {
    return <>
        <div className="flex flex-col h-full gap-2 p-4">
            <div className="flex justify-center gap-4 p-2">
                {links.map((link, i) => <>
                    {i !== 0 && <div className="bg-accent/20 w-px h-1/2 my-auto" />}
                    <NavLink end className="group p-1 [&.active>span]:bg-accent-light [&.active>span]:max-w-full" to={link.href}>
                        {link.label}
                        <span className="block mx-auto max-w-0 group-hover:max-w-full transition-[max-width] h-px bg-accent" />
                    </NavLink>
                </>)}
            </div>
            <Outlet />
        </div>
    </>;
}
