import {
    pokemonsInterface, pokemonSpriteInterface
} from '#/reducers/interfaces';
import Utils from './index';

class Pokemon {
    data: pokemonsInterface = {
        id: 0,
        name: '',
        sprites: {
            back_default: null,
            back_female: null,
            back_shiny: null,
            back_shiny_female: null,
            front_default: null,
            front_female: null,
            front_shiny: null,
            front_shiny_female: null
        },
        height: 0,
        weight: 0
    };
    constructor(data?: pokemonsInterface) {
        if (data) this.data = data;
        this.init();
    }
    /**
     * Formta o nome do Pokémon
     * @param name 
     * @returns string
     */
    formatPokemonName = (name: string): string => {
        let splited = name.split('-');
        let result = '';

        splited.forEach(item => result += `${Utils.toUpperCaseFirst(item)} `);

        return result.trim();
    };
    /**
     * Retorna a altura do Pokémon
     * @param value 
     * @returns void
     */
    pokemonHeight = (value: number): number => (value * 10);
    /**
     * Retorna o peso do Pokémon
     * @param value 
     * @returns void
     */
    pokemonWeight = (value: number): number => ((value * 10) / 100);
    /**
     * Formta as imagens do pokémon
     * @returns void
     */
    formatSprites = (): void => {
        const items: any = Object.assign({}, this.data.sprites);
        for (let key in items) {
            if (items[key] === null) {
                items[key] = require('./img/pokemon-not-found.png').default;
            }
        }
        this.data.sprites = items;
    }
    /**
     * Inicia as configurações da classe
     * @returns void
     */
    init = (): void => {
        this.data.name = this.formatPokemonName(this.data.name);
        this.data.weight = this.pokemonWeight(this.data.weight);
        this.data.height = this.pokemonHeight(this.data.height);
        this.formatSprites();
    }
}

export default Pokemon;