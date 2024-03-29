import {Link} from "react-router-dom";
import {AppWindowIcon, ClapperboardIcon, FileIcon, FileMinusIcon, LogOutIcon} from "lucide-react";
import useApiConfig from "~/hooks/useApiConfig.ts";
import useGlobalState from "~/hooks/useGlobalState.ts";
import OptionSwitch from "~/components/OptionsSwitch.tsx";


export default function ConfigSettingsPage() {
    const apiConfig = useApiConfig();

    return <>
        <h1 className="text-2xl">Settings</h1>
        <SettingVideoPlayer />
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


function SettingVideoPlayer() {
    const [value, setValue] = useGlobalState("use-native-video-player", false);

    return <>
        <SettingsSeparator />
        <OptionSwitch current={value} options={[
            { key: false, text: "Custom Video Player", icon: ClapperboardIcon },
            { key: true, text: "Native Video Player", icon: AppWindowIcon },
        ]} onSwitch={setValue} />
        <p className="text-gray-400">
            Jarkli&apos;s WEB-UI has a custom video player.
            Maybe you don&apos;t like it or it doesn&apos;t work on your device.
            That&apos;s why you can toggle here to the native browser-video-player.
        </p>
    </>;
}


function SettingOptimization() {
    const [value, setValue] = useGlobalState("optimization", false);

    return <>
        <SettingsSeparator />
        <OptionSwitch current={value} options={[
            { key: false, text: "Raw media", icon: FileIcon },
            { key: true, text: "Optimized media", icon: FileMinusIcon },
        ]} onSwitch={setValue} />
        <p className="text-gray-400">
            The Server allows just-in-time optimization of supported media.
            This reduces the required amount of data that has to be downloaded.
        </p>
    </>;
}
