class Utils {
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
}

export default Utils;