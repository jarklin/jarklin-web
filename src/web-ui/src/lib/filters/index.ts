export * from "../../types/filter"
export * as filters from "./filters";
export * from "../../types/filter";
import type {Filter} from "../../types/filter";

export function mergeFilters(...filters: Filter[]): Filter {
    return (m) => filters.reduce((_, f) => f(_), m);
}
