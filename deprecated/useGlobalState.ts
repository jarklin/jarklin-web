import { useSyncExternalStore } from "react";


function subscribeTo(key: string) {
    function subscribe(onChange: () => void): (() => void) {
        const abortController = new AbortController();

        addEventListener('storage', (event) => {
            if (event.key != key) {
                return;
            }
            onChange();
        }, { signal: abortController.signal });

        return abortController.abort;
    }

    return subscribe;
}

function loadFromStorage<T>(key: string): T {
    const value = localStorage.getItem(key);
    return value === null ? value : JSON.parse(value);
}

function storeInStorage<T>(value: T, key: string): void {
    localStorage.setItem(key, JSON.stringify(value));
}


export default function useGlobalState<T>(key: string, fallback: T): [T | null, (t: T) => void] {
    const value = useSyncExternalStore<T | null>(
        subscribeTo(key),
        () => loadFromStorage(key),
        () => loadFromStorage(key) ?? fallback,
    );

    function setValue(value: T) {
        storeInStorage(value, key);
    }

    return [value, setValue];
}
