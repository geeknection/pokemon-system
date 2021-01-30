import { setValueInterface } from "./interfaces";

/**
 * Altera os stores
 * @param {*} data
 */
const setValue = ({ reducer, type, value }: setValueInterface) => ({ reducer, type, value });

export default setValue;