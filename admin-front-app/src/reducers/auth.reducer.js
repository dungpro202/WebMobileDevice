import { authConstants } from "../actions/constants";

const initState = {
    name: 'Anh DUnnng',
}

const authReducer = (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = { ...state };
            break;
        default:
            break;
    }
    return state;
}
export default authReducer;