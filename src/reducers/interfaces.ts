export interface setValueInterface {
    reducer: string,
    type: string,
    value: any
}
export interface systemDataInterface {
    count: number,
    next: string,
    previous: string,
    results: never[]
}
export interface storeInterface {
    systemData: systemDataInterface
}