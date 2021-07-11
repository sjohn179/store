export const ProductActionTypes = {
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_SELECTED_PRODUCT: 'SET_SELECTED_PRODUCT'
}

/**FOR BELOW:
 * REMEMBER THAT TYPE IS TYPICALLY A DESCRIPTOR AND PAYLOAD IS TYPICALLY A VALUE.
 */

export const setProducts = products => {
    return {
        type: ProductActionTypes.SET_PRODUCTS,
        payload: products
    }
}

export const setSelectedProduct = product => {
    return {
        type: ProductActionTypes.SET_SELECTED_PRODUCT,
        payload: product
    }
}