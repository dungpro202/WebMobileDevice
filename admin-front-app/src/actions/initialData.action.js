import axiosInstance from "../helpers/axios";
import { categoryConstants, initialDataConstants, productConstants } from "./constants"

export const getInitialData = () => {
    return async dispatch => {
        //dispatch({ type:initialDataConstants.GET_INITIAL_DATA_REQUEST})
        const res = await axiosInstance.post('/initialData');
        if (res.status === 200) {
            const { categories, products } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories}
            })
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products }
            })
        }
        console.log(res)
    }
}