export interface setValueInterface {
    reducer: string,
    type: string,
    value: any
}
export interface systemDataInterface {
    count: number,
    next: string,
    previous: string,
    results: pokemonsInterface[],
    loading: boolean,
    page?: number,
    isPlaying: boolean
}
export interface storeInterface {
    systemData: systemDataInterface
}
export interface pokemonSpriteInterface {
    back_default?: any,
    back_female?: any,
    back_shiny?: any,
    back_shiny_female?: any,
    front_default?: any,
    front_female?: any,
    front_shiny?: any,
    front_shiny_female?: any
}
export interface pokemonsInterface {
    id: number,
    name: string,
    sprites: pokemonSpriteInterface,
    height: number,
    weight: number
}