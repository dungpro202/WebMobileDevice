import { productConstants } from "../actions/constants"

const initState = {
    products: [],
    productsByPrice: {
        under5k: [],
        under10k: [],
        under15k: [],
        under20k: [],
        under30k: [],
    }
}

const productReducer = (state = initState, action) => {
    switch (action.type) {
        case productConstants.GET_PRODUCTS_BY_SLUG:
            state = {
                ...state,
                products: action.payload.products,
                productsByPrice:{
                    ...action.payload.productsByPrice
                }
            }
            break;

        default:
            break;
    }
    return state;
}

export default productReducer