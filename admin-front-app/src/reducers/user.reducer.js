import { userConstants } from "../actions/constants";


const initState = {
    error: '',
    message: '',
    loading: false,
}
const userReducer = (state = initState, action) => {
    switch (action.type) {
        case userConstants.USER_REGISTER_REQUEST:
            state = {
                ...state,
                error:null,
                loading: true,
            }
            break;
        case userConstants.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                error: action.payload.message,
                loading: false,
                //message: action.payload.message
            }
            break;
        case userConstants.USER_REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        default:
            break;
    }
    return state;

}
export default userReducer;