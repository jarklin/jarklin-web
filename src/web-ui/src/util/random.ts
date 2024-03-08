import random, {type Random} from "random";


export function seededRandom() {
    const now = new Date(Date.now());
    const seedDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours());
    const seed = seedDate.toISOString();
    return random.clone(seed);
}


export function shuffled<T>(array: T[], rand?: Random): T[] {
    rand = rand ?? random;
    const arr = Array.from(array);
    for (let i = arr.length - 1; i > 0; i--) {
        const j = rand.int(0, i);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
