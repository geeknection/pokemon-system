import Api from "#/api";
import { pokemonsInterface } from "#/reducers/interfaces";
const { REACT_APP_API } = process.env;

interface returnPromise {
    status: boolean,
    values?: any,
    message?: string
}
interface listInterface {
    name: string,
    url: string
}

class Endpoints {
    constructor() {};

    /**
     * Pega os dados de um pokémon
     * @param url 
     * @returns Object
     */
    static getData = async (url: string): Promise<pokemonsInterface> => {
        const { data } = await Api.get(`/${url.replace('https://pokeapi.co/api/v2/', '')}`, {});
        return data;
    }
    /**
     * Pega os dados do Pokémon pelo ID
     * @param id
     * @return Object
     */
    static getDataById = async (id: number): Promise<returnPromise> => {
        try {
            const { data } = await Api.get(`/pokemon/${id}`, {});
            return {
                status: true,
                values: data
            };
        }
        catch (error) {
            return {
                status: false,
                message: error.message
            }
        }
    }
    /**
     * Pega os dados de todos os pokémons carregados
     * @param list 
     * @returns Array
     */
    static getPokemonsData = async (list: listInterface[]): Promise<pokemonsInterface[]> => {
        let result: pokemonsInterface[] = [];

        await Promise.all(
            list.map( async item => {
                const pokemon = await Endpoints.getData(item.url);
                result.push(pokemon);
            })
        );

        return result;
    }
    /**
     * Lista de pokémons
     * @returns Object
     */
    static pokemons = async (params: string = ''): Promise<returnPromise> => {
        try {
            const { data } = await Api.get(`/pokemon${params}`, {});
            
            data.next = data.next?.replace(`${REACT_APP_API}/pokemon`, '') || null;
            data.previous = data.previous?.replace(`${REACT_APP_API}/pokemon`, '') || null;
            data.results = await Endpoints.getPokemonsData(data.results);

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