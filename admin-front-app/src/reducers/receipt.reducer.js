
import { receiptConstants } from "../actions/constants";

const initState = {
    receipts: [],
    message: null,
    error:null,
};

const receiptReducer = (state = initState, action) => {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    switch (action.type) {
        case receiptConstants.GET_ALL_RECEIPT_SUCCESS:
            state = {
                ...state,
                receipts: action.payload.receipts,
            };
            break;
        case receiptConstants.CREATE_RECEIPT_SUCCESS:
            state = {
                ...state,
                message: `Tạo Mới Thành Công` ,

            };
            break;
        case receiptConstants.CREATE_RECEIPT_FAILURE:
            state = {
                ...state,
            };
            break;
        default:
            break;
    }

    return state;
};

export default receiptReducer;