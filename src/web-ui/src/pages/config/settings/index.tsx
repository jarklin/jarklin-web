import {Link} from "react-router-dom";
import useUsername from "~/hooks/useUsername.ts";

export default function ConfigSettingsPage() {
    const username = useUsername();

    return <>
        <h1 className="text-2xl">Settings</h1>
        <div className="grow" />
        {username !== null &&
            <div className="grid place-content-center">
                <Link className="px-2 py-px bg-white text-black rounded-lg hover:cursor-pointer disabled:cursor-not-allowed" to="/logout">Logout</Link>
            </div>
        }
    </>;
}
