export * from "./types"
export * as filters from "./filters";
export * from "./types";
import type {Filter} from "./types";

export function mergeFilters(...filters: Filter[]): Filter {
    return (m) => filters.reduce((_, f) => f(_), m);
}
