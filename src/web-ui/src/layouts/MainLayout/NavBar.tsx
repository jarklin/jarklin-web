import {Link} from "react-router-dom";
import {createAvatar} from "~/util";
import jarklinIconSrc from "~/assets/jarklin.svg";
import {useIsFetching} from "react-query";
import {ArrowLeftIcon, ScanSearchIcon} from "lucide-react";
import {useMemo} from "react";


interface Props {
    title: string
}


export default function PageNavBar(props: Props) {
    const avatar = useMemo(() => createAvatar( "⚙", undefined, 'black'), []);

    return <>
        <div className="bg-primary-light p-1 flex gap-2 items-stretch content-baseline">
            {/* @ts-ignore useNavigate() allows -1 to go back */}
            <Link to={-1}>
                <ArrowLeftIcon className="w-8 h-8 rounded-md" />
            </Link>
            <Link to="/">
                <img className="h-8 rounded-md" src={jarklinIconSrc} alt="" />
            </Link>
            <div className="grow grid place-content-center text-2xl">{props.title}</div>
            <Link to="/search">
                <ScanSearchIcon className="w-8 h-8 rounded-md" />
            </Link>
            <Link to="/config/">
                <img className="h-8 aspect-square bg-accent rounded-full" src={avatar} alt="Avatar" />
            </Link>
        </div>
        <BackgroundQueryIndicator />
    </>;
}

function BackgroundQueryIndicator() {
    const isFetching = useIsFetching();

    if (!isFetching) {
        return null;
    }

    return <div className="overflow-hidden">
        <div className="h-px bg-accent-light w-1/3 animate-anything-is-loading" />
    </div>;
}
