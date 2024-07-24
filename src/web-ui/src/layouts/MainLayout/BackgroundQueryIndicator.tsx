import {useIsFetching} from "react-query";

export default function BackgroundQueryIndicator() {
    const isFetching = useIsFetching();

    if (!isFetching) {
        return <div className="h-px bg-primary-light" />;
    }

    return <div className="h-px bg-primary-light overflow-hidden">
        <div className="h-px bg-accent-light w-1/3 animate-anything-is-loading" />
    </div>;
}
