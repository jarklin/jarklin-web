
const STORAGE_KEY = "seed";


export function getRandomSeed(): number {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === null) {
        const newSeed = generateSeed();
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newSeed));
        return newSeed;
    } else {
        return JSON.parse(stored);
    }
}

export function regenerateRandomSeed(): number {
    sessionStorage.removeItem(STORAGE_KEY);
    return getRandomSeed();
}

function generateSeed(): number {
    return Date.now();
}
