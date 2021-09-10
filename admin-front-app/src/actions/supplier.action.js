import axiosInstance from "../helpers/axios";
import { supplierConstants } from "./constants";

export const getAllSupplier = () => {
    return async dispatch => {
        dispatch({ type: supplierConstants.GET_ALL_SUPPLIER_REQUEST });
        const res = await axiosInstance.get('/supplier/getAllSupplier');
        if (res.status === 200) {
            const { suppliers } = res.data;
            dispatch({
                type: supplierConstants.GET_ALL_SUPPLIER_SUCCESS,
                payload: { suppliers }
            })
        }
        console.log(res)
    }
}

export const createSupplier =(supplier)=>{
    return async dispatch => {
        dispatch({ type: supplierConstants.CREATE_SUPPLIER_REQUEST });
        const res = await axiosInstance.post('/supplier/create',supplier);
        if (res.status === 201) {
            dispatch({
                type: supplierConstants.CREATE_SUPPLIER_SUCCESS,
            })
            dispatch(getAllSupplier());
        }else{
            const { error } = res.data;
            dispatch({
                type: supplierConstants.CREATE_SUPPLIER_FAILURE,
                payload: { error}
            })
            dispatch(getAllSupplier());

        }
        console.log(res)
    }
}
