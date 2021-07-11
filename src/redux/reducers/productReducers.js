import { ProductActionTypes } from "../actions/productActions"

const initialState = {
    productList: [],
    selectedProduct: {}
}

export const ProductReducers = (state = initialState, action) => {
    switch(action.type) {
        case ProductActionTypes.SET_PRODUCTS:
            return {
                ...state,
                productList: action.payload
            }
        case ProductActionTypes.SET_SELECTED_PRODUCT:
            return {
                ...state,
                selectedProduct: action.payload
            };
        default:
            return state;
    }
}