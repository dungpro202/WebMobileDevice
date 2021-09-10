import { productConstants } from "../actions/constants";

const initState = {
    products: [],
    priceRange: {},
    productsByPrice: {},
    pageRequest: false,
    page: {},
    error: null,
    productDetails: {},
    loading: false,
};

const productReducer = (state = initState, action) => {
    switch (action.type) {
        case productConstants.GET_PRODUCTS_BY_SLUG:
            state = {
                ...state,
                products: action.payload.products,
                priceRange: action.payload.priceRange,
                productsByPrice: {
                    ...action.payload.productsByPrice,
                },
            };
            break;
        case productConstants.GET_PRODUCT_PAGE_REQUEST:
            state = {
                ...state,
                pageRequest: true,
            };
            break;
        case productConstants.GET_PRODUCT_PAGE_SUCCESS:
            state = {
                ...state,
                page: action.payload.page,
                pageRequest: false,
            };
            break;
        case productConstants.GET_PRODUCT_PAGE_FAILURE:
            state = {
                ...state,
                pageRequest: false,
                error: action.payload.error,
            };
            break;
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
            state = {
                ...state,
                loading: false,
                productDetails: action.payload.productDetails,
            };
            break;
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
        case productConstants.SEARCH_PRODUCTS_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case productConstants.SEARCH_PRODUCTS_SUCCESS:
            state = {
                ...state,
                loading: false,
                products: action.payload.products,
            };
            break;
        case productConstants.SEARCH_PRODUCTS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                loading: false,
                products: action.payload.products,
            };
            break;
        default:
            break;
    }

    return state;
};

export default productReducer