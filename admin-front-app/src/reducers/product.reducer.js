import { productConstants } from "../actions/constants";

const initState = {
    products: [],
    notification: null
}

const productReducer = (state = initState, action) => {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                notification:null

            }
            break;
        case productConstants.ADD_PRODUCT_SUCCESS:
            state = {
                ...state,
                notification: `Thêm Mới Thành Công  ----   ${time}`
            }
            break;
        case productConstants.ADD_PRODUCT_FAILURE:
            state = {
                ...state,
                notification: `Thêm Mới Thất Bại  ----   ${time}`
            }
            break;
            case productConstants.UPDATE_PRODUCT_SUCCESS:
            state = {
                ...state,
                notification: `Cập Nhật Sản Phẩm Thành Công  ----   ${time}`
            }
            break;
            case productConstants.UPDATE_PRODUCT_FAILURE:
            state = {
                ...state,
                notification: `Cập Nhật Sản Phẩm Thất Bại  ----   ${time}`
            }
            break;
        case productConstants.DELETE_PRODUCT_BY_ID_SUCCESS:
            state = {
                ...state,
                notification: `Xóa Sản Phẩm Thành Công  ----   ${time}`
            }
            break;
        case productConstants.DELETE_PRODUCT_BY_ID_FAILURE:
            state = {
                ...state,
                notification: `Xóa Sản Phẩm Thất Bại  ----   ${time}`
            }
            break;
            
        default:
            break;

    }
    return state;
}

export default productReducer