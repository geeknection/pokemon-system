interface setValueInterface {
    reducer: string,
    type: string,
    value: any
}

/**
 * Altera os stores
 * @param {*} data
 */
const setValue = ({ reducer, type, value }: setValueInterface) => ({ reducer, type, value });

export default setValue;