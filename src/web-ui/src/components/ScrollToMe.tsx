import {useCallback, useEffect, useRef} from "react";

interface Props {
    if?: boolean
    behavior?: "smooth" | "instant"
}


export default function ScrollToMe(props: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const shouldScroll = props.if !== false;

    const attemptScroll = useCallback((attempt: number = 0) => {
        if (attempt >= 3) { return; }
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: props.behavior ?? "smooth", block: "start" });
        } else {
            setTimeout(() => attemptScroll(attempt + 1), 100);
        }
    }, [ref]);

    useEffect(() => {
        if (shouldScroll) {
            attemptScroll();
        }
    }, [shouldScroll, attemptScroll]);

    return <div ref={ref} className="invisible" />;
}

// this version below somehow does not always work on mobile
/*
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

    return <div ref={ref} className="invisible" />;
}
*/
