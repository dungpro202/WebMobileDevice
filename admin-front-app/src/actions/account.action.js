import axiosInstance from "../helpers/axios";
import { accountConstants } from "./constants";

export const getListAccount = () => {
    return async dispatch => {
        dispatch({ type: accountConstants.GET_ALL_ACCOUNT_REQUEST });
        const res = await axiosInstance.get('/account/getListAccount');
        if (res.status === 200) {
            const { accounts } = res.data;
            dispatch({
                type: accountConstants.GET_ALL_ACCOUNT_SUCCESS,
                payload: { accounts }
            })

        }
        console.log(res)
    }
}


export const createAccountUser = (user) => {
    return async (dispatch) => {
        try {
            dispatch({ type: accountConstants.SIGNUP_REQUEST });
            const res = await axiosInstance.post(`/signup`, user);
            if (res.status === 201) {
                dispatch({
                    type: accountConstants.SIGNUP_SUCCESS,
                });
                dispatch(getListAccount());   
            } else {
                dispatch({ type: accountConstants.SIGNUP_FAILURE });
            }
        } catch (error) {
            console.log(error);
        }
    };
};