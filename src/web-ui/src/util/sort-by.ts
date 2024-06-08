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

    function getByKey<T>(obj: T, key: string) {
        const attributePath = key.split('.');
        let returnValue: any = obj;
        for (const attribute of attributePath) {
            returnValue = returnValue[attribute];
        }
        return returnValue;
    }

    function compareByProperty (arg: string) {
        let attributePath: string = arg;
        let sortOrder = 1;  // ascending
        if (arg.startsWith('-')) {
            sortOrder = -1;  // descending
            attributePath = arg.substring(1);
        }
        return function (a: T, b: T) {
            let va = prepareValue(getByKey(a, attributePath));
            const vb = prepareValue(getByKey(b, attributePath));
            if (va < vb)
                return -sortOrder;
            if (va > vb)
                return +sortOrder;
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
