import {Link} from "react-router-dom";
import {LogOutIcon} from "lucide-react";
import useApiConfig from "~/hooks/useApiConfig.ts";


export default function ConfigSettingsPage() {
    const apiConfig = useApiConfig();

    return <>
        <h1 className="text-2xl">Settings</h1>
        {apiConfig.allows_optimization && <>
            <div className="px-5 h-px bg-accent/20"/>
            <div className="flex gap-x-2">
                <input type="checkbox" disabled checked className="cursor-not-allowed"/>
                <label>Optimize Content</label>
            </div>
            <p className="text-white/50">
                The Server allows just-in-time optimization of supported media.
                This reduces the required amount of data that has to be downloaded.
            </p>
            <p className="text-white/25">
                (This option currently cannot be disabled)
            </p>
        </>}
        <div className="grow"/>
        {apiConfig.requires_auth && <>
            <div className="px-5 h-px bg-accent/20" />
            <div className="grid place-content-center">
                <Link
                    className="px-2 py-1 bg-white text-black rounded-lg hover:cursor-pointer disabled:cursor-not-allowed" to="/logout">
                    <LogOutIcon className="inline-block h-5" /> Logout
                </Link>
            </div>
        </>}
    </>;
}
