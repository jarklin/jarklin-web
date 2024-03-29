import {Link} from "react-router-dom";
import {LogOutIcon} from "lucide-react";
import useApiConfig from "~/hooks/useApiConfig.ts";
import useGlobalState from "~/hooks/useGlobalState.ts";


export default function ConfigSettingsPage() {
    const apiConfig = useApiConfig();

    return <>
        <h1 className="text-2xl">Settings</h1>
        {!(apiConfig.allows_optimization || apiConfig.requires_auth) && <p>Nothing to Configure here</p>}
        {apiConfig.allows_optimization && <SettingOptimization />}
        <div className="grow"/>
        {apiConfig.requires_auth && <>
            <SettingsSeparator />
            <div className="grid place-content-center">
                <Link className="px-2 py-1 bg-white text-black rounded-lg hover:cursor-pointer" to="/auth/logout">
                    <LogOutIcon className="inline-block h-5" /> Logout
                </Link>
            </div>
        </>}
    </>;
}


function SettingsSeparator() {
    return <div className="px-5 h-px bg-accent/20" />;
}


function SettingOptimization() {
    const [value, setValue] = useGlobalState("optimization", false);

    return <>
        <SettingsSeparator />
        <div className="flex gap-x-2">
            <input type="checkbox" checked={value} onChange={(event) => {
                setValue(event.target.checked);
            }} />
            <span>Optimize Content</span>
        </div>
        <p className="text-white/50">
            The Server allows just-in-time optimization of supported media.
            This reduces the required amount of data that has to be downloaded.
        </p>
    </>;
}
