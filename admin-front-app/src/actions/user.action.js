import axiosInstance from "../helpers/axios";
import { userConstants } from "./constants";

export const signup = (user) => {
    console.log('action signup', user)
    return async (dispatch) => {

        dispatch({ type: userConstants.USER_REGISTER_REQUEST })
        const res = await axiosInstance.post('/admin/signup', {
            ...user
        });

        if (res.status === 201) {
            const { message } = res.data;
            dispatch({
                type: userConstants.USER_REGISTER_SUCCESS,
                payload: {
                    message
                }
            });
        } else {
            if (res.status === 203) {
                dispatch({
                    type: userConstants.USER_REGISTER_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
    }
}