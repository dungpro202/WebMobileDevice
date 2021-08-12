import { authConstants } from "../actions/constants";

const initState = {
    token: null,
    user: {
        firstName: '',
        lastName: '',
        email: '',
        picture: '',
    },
    authenticate: false,
    authenticating: false
}

const authReducer = (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            };
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false
            };
            break;
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...initState
            };
            break;
        default:
            break;
    }
    return state;
}
export default authReducer;