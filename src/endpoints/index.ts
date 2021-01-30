import Api from "#/api";
const { REACT_APP_API } = process.env;

interface returnPromise {
    status: boolean,
    values?: any,
    message?: string
}

class Endpoints {
    constructor() {};

    /**
     * Lista de pokémons
     * @returns object
     */
    static pokemons = async (params: string = ''): Promise<returnPromise> => {
        try {
            const { data } = await Api.get(`/pokemon${params}`, {});
            
            data.next = data.next?.replace(`${REACT_APP_API}/pokemon`, '') || null;
            data.previous = data.previous?.replace(`${REACT_APP_API}/pokemon`, '') || null;

            return {
                status: true,
                values: data
            }
        }
        catch (error) {
            return {
                status: false,
                message: error.message
            }
        }
    }
}

export default Endpoints;