import axiosInstance from "../helpers/axios";
import { receiptConstants } from "./constants";

export const getAllReceipt = () => {
    return async dispatch => {
        dispatch({ type: receiptConstants.GET_ALL_RECEIPT_REQUEST });
        const res = await axiosInstance.get('/receipt/getAllReceipt');
        if (res.status === 200) {
            const { receipts } = res.data;
            dispatch({
                type: receiptConstants.GET_ALL_RECEIPT_SUCCESS,
                payload: { receipts }
            })
        }
        console.log(res)
    }
}

export const createReceipt =(receipt)=>{
    return async dispatch => {
        dispatch({ type: receiptConstants.CREATE_RECEIPT_REQUEST });
        const res = await axiosInstance.post('/receipt/create',receipt);
        if (res.status === 201) {
            dispatch({
                type: receiptConstants.CREATE_RECEIPT_SUCCESS,
            })
            dispatch(getAllReceipt());
        }else{
            const { error } = res.data;
            dispatch({
                type: receiptConstants.CREATE_RECEIPT_FAILURE,
                payload: { error}
            })
            dispatch(getAllReceipt());

        }
        console.log(res)
    }
}
