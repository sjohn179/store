import { combineReducers } from 'redux';
import { ProductReducers } from './productReducers';

const rootReducer = combineReducers(
    {
        product: ProductReducers
    }
)

export default rootReducer;