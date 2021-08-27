
import { accountConstants } from "../actions/constants";

const initState = {
    accounts: [],
};

const accountReducer = (state = initState, action) => {
    switch (action.type) {
        case accountConstants.GET_ALL_ACCOUNT_SUCCESS:
            state = {
                ...state,
                accounts: action.payload.accounts,
            };
            break;
       
        default:
            break;
    }

    return state;
};

export default accountReducer