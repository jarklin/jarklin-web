import {Gesture} from "@vidstack/react";


export default function VideoPlayerGestures() {
    return <>
        <Gesture
            // className="absolute inset-0 z-0 block h-full w-full"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 block h-1/6 w-1/6"
            event="pointerup"
            action="toggle:paused"
        />
        <Gesture
            className="absolute inset-0 z-0 block h-full w-full"
            event="dblpointerup"
            action="toggle:fullscreen"
        />
        <Gesture
            className="absolute left-0 top-0 z-10 block h-full w-1/5"
            event="dblpointerup"
            action="seek:-10"
        />
        <Gesture
            className="absolute right-0 top-0 z-10 block h-full w-1/5"
            event="dblpointerup"
            action="seek:10"
        />
    </>
}
