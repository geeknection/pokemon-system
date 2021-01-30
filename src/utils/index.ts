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
}

export default Utils;