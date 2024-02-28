import {useCallback, useEffect, useState} from "react";

interface Config {
    autoFullScreen?: boolean
    bindKey?: boolean | string
    onFullScreenEnter?: () => void
    onFullScreenLeave?: () => void
}

export default function useFullScreen(config: Config) {
    const [element, setElement] = useState<Element | null>(null);

    const enterFullScreen = useCallback(() => {
        document.documentElement.requestFullscreen().then();
    }, []);

    const exitFullScreen = useCallback(() => {
        document.exitFullscreen().then();
    }, []);

    const toggleFullScreen = useCallback(() => {
        if (document.fullscreenElement === null) {
            enterFullScreen();
        } else {
            exitFullScreen();
        }
    }, [enterFullScreen, exitFullScreen]);

    useEffect(() => {
        if (!config.autoFullScreen) { return; }
        if (!document.fullscreenEnabled) { return; }

        enterFullScreen();

        return () => {
            if (document.fullscreenElement !== null) {
                exitFullScreen();
            }
        };
    }, [config.autoFullScreen, enterFullScreen, exitFullScreen]);

    useEffect(() => {
        const controller = new AbortController();

        window.addEventListener('fullscreenchange', () => {
            setElement(document.fullscreenElement)
            if (document.fullscreenElement !== null) {
                config.onFullScreenEnter?.();
            } else {
                config.onFullScreenLeave?.();
            }
        }, { signal: controller.signal });

        if (!!config.bindKey) {
            const desiredKey = typeof config.bindKey === "string" ? config.bindKey : "f";

            window.addEventListener('keydown', (event) => {
                if (event.key === desiredKey) {
                    toggleFullScreen();
                }
            }, { signal: controller.signal });
        }

        return () => controller.abort();
    }, [config.onFullScreenEnter, config.onFullScreenLeave]);

    return { isFullscreen: !!element, fullscreenElement: element, enterFullScreen, exitFullScreen, toggleFullScreen } as const;
}
