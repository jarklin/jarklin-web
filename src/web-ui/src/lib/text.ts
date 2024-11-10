export function formatRouteName(route: string): string {
    return toTitleCase(route.replace(/\b-\b/, " "));
}

export function toTitleCase(str: string): string {
    return str.replace(/\b\w/g, char => char.toUpperCase())
}
