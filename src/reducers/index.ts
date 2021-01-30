import { createStore, combineReducers } from 'redux';
import systemData from './stores/system';

const reducers = combineReducers({
    systemData
});

const rootReducer = createStore(reducers);

export default rootReducer;