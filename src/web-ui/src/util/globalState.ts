export function getGlobalState<T>(key: string, fallback: never): T | undefined;
export function getGlobalState<T>(key: string, fallback: T): T;

export function getGlobalState<T>(key: string, fallback?: T) {
    const stored = localStorage.getItem(key);
    if (stored === null) {
        return fallback;
    } else {
        return JSON.parse(stored);
    }
}
