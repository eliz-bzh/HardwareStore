import { combineReducers } from 'redux';
import cartReducer from './ReducerCart';
import roleReducer from './ReducerRole';

const rootReducer = combineReducers({
    cartReducer,
    roleReducer
});

export default rootReducer;