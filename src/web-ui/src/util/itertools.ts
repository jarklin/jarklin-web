export function defaultOrFirst<T extends { is_default: boolean }>(array: T[]): T | undefined {
    return array.find(el => el.is_default) ?? array[0];
}

export function containSameElements<T>(a: T[], b: T[]): boolean {
    return a.length === b.length && a.every(value => b.includes(value));
}
