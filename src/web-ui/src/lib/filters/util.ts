import type { Filter } from "@/types";
import * as filters from "./filters";

export function mergeFilters(...filters: Filter[]): Filter {
    return (m) => filters.reduce((_, f) => f(_), m);
}

type FilterBuilder = (...args: unknown[]) => Filter;

function getFilter<T>(name: string) {
    return (filters as unknown as {[key: string]: T})[name];
}

export function parseFilter(string: string): Filter {
    const parsed: Filter[] = []

    for (const part of string.split("|")) {
        const argSep = part.indexOf("[");
        const [filterName, argString] = argSep === -1 ? [part, null] : [part.substring(0, argSep), part.substring(argSep)];
        if (argString === null) {
            let filter: Filter = getFilter(filterName);
            parsed.push(filter);
        } else {
            const args: unknown[] = JSON.parse(part.substring(argSep));
            const filterBuilder: FilterBuilder = getFilter(filterName);
            const filter: Filter = filterBuilder(...args);
            parsed.push(filter);
        }
    }

    return mergeFilters(...parsed);
}
