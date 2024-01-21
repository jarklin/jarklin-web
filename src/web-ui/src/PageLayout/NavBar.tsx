import {Link} from "react-router-dom";
import {createAvatar} from "~/util";
import jarklinIconSrc from "~/assets/jarklin.svg";
import {useIsFetching} from "react-query";

export default function PageNavBar() {
    return <>
        <div className="bg-primary-light p-1 flex gap-1 items-stretch content-baseline">
            <Link to="/">
                <img className="h-8 rounded-md" src={jarklinIconSrc} alt="" />
            </Link>
            <div className="grow" />
            <Link to="/config">
                <img className="h-8 bg-accent rounded-full" src={createAvatar("Jarklin", undefined, 'black')} alt="Avatar" />
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
