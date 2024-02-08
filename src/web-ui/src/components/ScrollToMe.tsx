import {useEffect, useRef} from "react";

interface Props {
    if?: boolean
    behavior?: "smooth" | "instant"
}


export default function ScrollToMe(props: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const shouldScroll = props.if !== false;

    useEffect(() => {
        if (shouldScroll) {
            ref.current?.scrollIntoView({ behavior: props.behavior ?? "smooth" })
        }
    }, [shouldScroll]);

    return <div ref={ref} className="invisible" />
}
