import {useCallback, useEffect, useState} from "react";


interface globalStateEventDetails<T> {
    key: string
    newValue: T
}


// synced between all uses in the current and other tabs
export default function useGlobalState<T>(key: string, defaultValue?: T): [T, (v: T) => void] {
    const [stateValue, setStateValue] = useState<T>(() => {
        const stored = localStorage.getItem(key);
        if (stored === null) {
            localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue;
        } else {
            return JSON.parse(stored);
        }
    });

    useEffect(() => {
        const controller = new AbortController();

        window.addEventListener("storage", (event) => {
            const { key: storeKey, newValue } = event;
            if (storeKey !== key) { return; }
            setStateValue(newValue === null ? defaultValue : JSON.parse(newValue));
        }, { signal: controller.signal });

        window.addEventListener("globalState", (event) => {
            const { key: storeKey, newValue } = (event as CustomEvent<globalStateEventDetails<T>>).detail;
            if (storeKey !== key) { return; }
            setStateValue(newValue);
        }, { signal: controller.signal });

        return () => controller.abort();
    }, [key, setStateValue]);

    const setValue = useCallback((newValue: T) => {
        // setValueDirect(newValue);  // set for this hook (done via event)
        window.dispatchEvent(  // update this and other hooks
            new CustomEvent<globalStateEventDetails<T>>("globalState", { detail: { key, newValue } })
        );
        localStorage.setItem(key, JSON.stringify(newValue));  // set for new hooks (and other tabs)
    }, [key]);

    return [stateValue, setValue];
}
