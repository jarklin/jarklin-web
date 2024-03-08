import {useEffect, useRef} from "react";

interface Props {
    if?: boolean
    behavior?: "smooth" | "instant"
}


export default function ScrollToMe(props: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const shouldScroll = props.if !== false;
    const behavior = props.behavior ?? "smooth";

    useEffect(() => {
        if (shouldScroll) {
            ref.current?.scrollIntoView({ behavior });
        }
    }, [shouldScroll, behavior]);

    return <div ref={ref} className="invisible" />;
}
