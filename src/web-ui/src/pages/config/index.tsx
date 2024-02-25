import {NavLink, Outlet} from "react-router-dom";


const links = [
    { href: "/config/", label: "Config" },
    { href: "/config/problems/", label: "Problems" },
]


export default function ConfigPage() {
    return <>
        <div className="flex flex-col h-full gap-2 p-4">
            <div className="flex justify-center gap-4 p-2">
                {links.map(link => <>
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
