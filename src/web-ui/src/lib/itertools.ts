export function defaultOrFirst<T extends { is_default: boolean }>(array: T[]): T | undefined {
    return array.find(el => el.is_default) ?? array[0];
}

export function containSameElements<T>(a: T[], b: T[]): boolean {
    const setA = new Set(a);
    const setB = new Set(b);
    return a.length === b.length && [...setA].every(value => setB.has(value));
}

export function findClosestEntry<T extends Record<number, V>, V>(map: T, value: number): T[number] {
    const closest = Object
        .keys(map)
        .map(res => +res)  // converts string-keys to integers
        .reduce((prev, curr) => (
            (Math.abs(curr - value) < Math.abs(prev - value)) ? curr : prev
        ));
    return map[closest];
}
