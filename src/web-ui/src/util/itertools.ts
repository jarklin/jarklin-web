export function defaultOrFirst<T extends { is_default: boolean }>(array: Array<T>): T | undefined {
    return array.find(el => el.is_default) ?? array[0];
}
