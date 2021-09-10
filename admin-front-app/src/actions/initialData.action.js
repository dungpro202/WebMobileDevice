import axiosInstance from "../helpers/axios";
import { accountConstants, categoryConstants, orderConstants, productConstants, receiptConstants, supplierConstants } from "./constants"

export const getInitialData = () => {
    return async dispatch => {
        //dispatch({ type:initialDataConstants.GET_INITIAL_DATA_REQUEST})
        const res = await axiosInstance.post('/initialData');
        if (res.status === 200) {
            const { categories, products, orders, accounts,suppliers,receipts } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories }
            })
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products }
            })
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                payload: { orders },
            });
            dispatch({
                type: accountConstants.GET_ALL_ACCOUNT_SUCCESS,
                payload: { accounts },
            });
            dispatch({
                type: supplierConstants.GET_ALL_SUPPLIER_SUCCESS,
                payload: { suppliers },
            });
            dispatch({
                type: receiptConstants.GET_ALL_RECEIPT_SUCCESS,
                payload: { receipts },
            });
        }
        console.log(res)
    }
}