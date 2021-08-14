import { productConstants } from "../actions/constants";

const initState = {
    products: []
}

const productReducer = (state = initState, action) => {
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
            }
            break;
        default:
            break;

    }
    return state;
}

export default productReducer