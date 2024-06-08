/**
 * Returns a comparator for objects of type T that can be used by sort
 * functions, were T objects are compared by the specified T properties.
 *
 * @param attributes - the names of the properties to sort by, in precedence order.
 *                 Prefix any name with `-` to sort it in descending order.
 */
export function sortBy<T extends object> (...attributes: string[]) {
    function prepareValue<T>(value: T) {
        return typeof value === 'string' ? value.toLowerCase() : value;
    }

    function getByAttributePath<T>(obj: T, path: string) {
        const attributePath = path.split('.');
        let value: any = obj;
        for (const attribute of attributePath) {
            value = value[attribute];
        }
        return value;
    }

    function compareByProperty (key: string) {
        let attributePath: string = key;
        let sortOrder = 1;  // ascending
        if (key.startsWith('-')) {
            sortOrder = -1;  // descending
            attributePath = key.substring(1);
        }
        return function (a: T, b: T) {
            const valueA = prepareValue(getByAttributePath(a, attributePath));
            const valueB = prepareValue(getByAttributePath(b, attributePath));
            if (valueA < valueB) return -sortOrder;
            if (valueA > valueB) return +sortOrder;
            return 0;
        }
    }

    return function (obj1: T, obj2: T) {
        let i = 0;
        let result = 0;
        const numberOfProperties = attributes?.length;
        while (result === 0 && i < numberOfProperties) {
            result = compareByProperty(attributes[i])(obj1, obj2);
            i++;
        }

        return result;
    }
}
