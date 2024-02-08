export function defaultOrFirst<T extends { is_default: boolean }>(array: Array<T>): T | undefined {
    return array.find(el => el.is_default) ?? array[0];
}

export function containSameElements<T>(a: Array<T>, b: Array<T>): boolean {
    return a.length === b.length && a.every(value => b.includes(value));
}
