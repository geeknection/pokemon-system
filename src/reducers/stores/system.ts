import { systemDataInterface } from "#/reducers/interfaces";

interface action {
    reducer: string,
    type: string,
    value: any
}
const initialState: systemDataInterface = {
    pokemons: []
};

const systemData = (state: any = initialState, action: action) => {
    if (action.reducer === 'userData') {
        if (state.hasOwnProperty(action.type)) {
            return { ...state, [action.type]: action.value };
        } else {
            return state;
        }
    } else {
        return state;
    }
};
export default systemData;