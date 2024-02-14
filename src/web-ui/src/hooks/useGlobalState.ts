import {useEffect, useState} from "react";


// synced between all uses in the current and other tabs
export default function useGlobalState<T>(key: string, defaultValue?: T | any): [T, (v: T) => void] {
    const [value, setStateValue] = useState<T>(() => {
        const stored = localStorage.getItem(key);
        return stored === null ? defaultValue : JSON.parse(stored);
    });

    useEffect(() => {
        const controller = new AbortController();

        window.addEventListener('storage', (event) => {
            const { key: storeKey, newValue } = event;
            if (storeKey !== key) { return; }
            setStateValue(newValue === null ? defaultValue : JSON.parse(newValue));
        }, { signal: controller.signal });

        window.addEventListener('globalState', (event) => {
            const { key: storeKey, newValue } = (event as CustomEvent<{key: string, newValue: T}>).detail;
            if (storeKey === key) { return; }
            setStateValue(newValue);
        }, { signal: controller.signal });

        return () => controller.abort();
    })

    function setValue(newValue: T) {
        // setValueDirect(newValue);  // set for this hook (done via event)
        window.dispatchEvent(  // update this and other hooks
            new CustomEvent("globalState", { detail: { key, newValue } }),
        );
        localStorage.setItem(key, JSON.stringify(value));  // set for new hooks (and other tabs)
    }

    return [value, setValue]
}
