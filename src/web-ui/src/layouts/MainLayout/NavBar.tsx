import {Link} from "react-router-dom";
import {ArrowLeftIcon, ScanSearchIcon, SettingsIcon} from "lucide-react";
import jarklinIconSrc from "~/assets/jarklin.svg";


export default function PageNavBar() {
    return <>
        <header className="bg-primary-light p-1 flex gap-2 items-stretch content-baseline">
            {/* @ts-expect-error useNavigate() allows -1 to go back */}
            <Link to={-1}>
                <ArrowLeftIcon className="size-8 rounded-md" />
            </Link>
            <Link to="/">
                <img className="size-8 rounded-md" src={jarklinIconSrc} alt="" />
            </Link>
            <div className="grow" />
            <Link to="/search">
                <ScanSearchIcon className="size-8 rounded-md" />
            </Link>
            <Link to="/panel/">
                <SettingsIcon className="size-8 rounded-full" />
            </Link>
        </header>
    </>;
}
