import { systemDataInterface } from "#/reducers/interfaces";

interface action {
    reducer: string,
    type: string,
    value: any
}
const initialState: systemDataInterface = {
    count: 0,
    next: '',
    previous: '',
    results: [],
    loading: true,
    page: 1,
    isPlaying: false
};

/**
 * Define um novo valor para todos os campos do state
 * @returns object
 */
const setAll = (state: any, data: any): systemDataInterface => {
    const result = Object.assign({}, state);
    Object.keys(data).forEach(item => (state.hasOwnProperty(item)) && (result[item] = data[item]));
    return result

}
const systemData = (state: systemDataInterface = initialState, action: action): systemDataInterface => {
    if (action.reducer === 'systemData') {
        if (action.type === 'all') return setAll(state, action.value);
        if (state.hasOwnProperty(action.type)) return { ...state, [action.type]: action.value };
    }

    return state;
};
export default systemData;