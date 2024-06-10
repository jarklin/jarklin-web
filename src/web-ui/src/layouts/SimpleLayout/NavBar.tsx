import {useIsFetching} from "react-query";
import jarklinIconSrc from "~/assets/jarklin.svg";


export default function PageNavBar() {
    return <>
        <header className="bg-primary-light p-1 flex gap-2 items-stretch content-baseline">
            <img className="h-8 rounded-md" src={jarklinIconSrc} alt="" />
            <div className="grow" />
        </header>
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
