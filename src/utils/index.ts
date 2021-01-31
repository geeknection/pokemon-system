class Utils {
    constructor() {}
    /**
     * Cria um delay
     * @param timeout 
     */
    static sleep = (timeout: number = 1000) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, timeout);
        });
    }
    /**
     * Coloca em caixa alta o primeiro carácter da string
     * @param value 
     * @returns string
     */
    static toUpperCaseFirst = (value: string): string => {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
    /**
     * Coloca em caixa alta o primeiro carácter da string
     * @param value 
     * @returns string
     */
    toUpperCaseFirst = (value: string): string => {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
    /**
     * Fallback para imagem quebrada
     * @param e 
     * @returns void
     */
    static filterBrokenImg = (e: any): void => {
        e.target.src = require('./img/pokemon-not-found.png').default;
    }
}

export default Utils;