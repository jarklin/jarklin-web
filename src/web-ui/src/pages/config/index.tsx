import {Link} from "react-router-dom";
import useUsername from "~/hooks/useUsername.ts";

export default function ConfigPage() {
    const username = useUsername();

    return <div className="flex flex-col h-full p-2">
        <div className="grow" />
        {username !== null &&
            <div className="grid place-content-center">
                <Link className="text-center text-accent hover:text-accent-light hover:underline" to="/logout">Logout</Link>
            </div>
        }
    </div>;
}
