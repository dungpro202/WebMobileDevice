
import { supplierConstants } from "../actions/constants";

const initState = {
    suppliers: [],
    message: null,
    error:null,
};

const supplierReducer = (state = initState, action) => {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    switch (action.type) {
        case supplierConstants.GET_ALL_SUPPLIER_SUCCESS:
            state = {
                ...state,
                suppliers: action.payload.suppliers,
            };
            break;
        case supplierConstants.CREATE_SUPPLIER_SUCCESS:
            state = {
                ...state,
                message: `Tạo Mới Thành Công` ,

            };
            break;
        case supplierConstants.CREATE_SUPPLIER_FAILURE:
            state = {
                ...state,
                message: `${action.payload.error} đã tồn tại` ,
            };
            break;
        default:
            break;
    }

    return state;
};

export default supplierReducer;