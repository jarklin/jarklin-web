import random, {Random} from "random"


export function dailyRandom() {
    const now = new Date(Date.now());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const seed = today.toISOString();
    return random.clone(seed)
}


export function shuffled<T>(array: Array<T>, rand?: Random): Array<T> {
    rand = rand ?? random;
    const arr = Array.from(array);
    for (let i = arr.length - 1; i > 0; i--) {
        const j = rand.int(0, i);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
