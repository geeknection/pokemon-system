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
    page?: number
}
export interface storeInterface {
    systemData: systemDataInterface
}
export interface pokemonSpriteInterface {
    back_default?: string,
    back_female?: string,
    back_shiny?: string,
    back_shiny_female?: string,
    front_default?: string,
    front_female?: string
    front_shiny?: string
    front_shiny_female?: string
}
export interface pokemonsInterface {
    id: number,
    name: string,
    sprites: pokemonSpriteInterface
}