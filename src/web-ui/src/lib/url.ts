
interface ModifyUrlOptions {
    query?: string | Record<string, string> | URLSearchParams;
    hash?: string
}

export function modifyUrl(base: string | URL, options: ModifyUrlOptions) {
    const url = new URL(base, location.toString());

    if (options.query) {
        if (options.query instanceof URLSearchParams) {
            url.search = options.query.toString();
        } else if (typeof options.query === 'string') {
            url.search = options.query;
        } else if (typeof options.query === 'object') {
            url.search = new URLSearchParams(options.query).toString();
        } else {
            throw new Error(`Invalid Query Modifier '${options.query}'`)
        }
    }

    if (options.hash)
        url.hash = options.hash;

    return url;
}
