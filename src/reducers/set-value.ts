interface setValue {
    reducer: string,
    type: string,
    value: any
}

/**
 * Altera os stores
 * @param {*} data
 */
const setValue = ({ reducer, type, value }: setValue) => ({ reducer, type, value });

export default setValue;