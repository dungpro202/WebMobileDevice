
import { accountConstants } from "../actions/constants";

const initState = {
    accounts: [],
    notification: null,
};

const accountReducer = (state = initState, action) => {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    switch (action.type) {
        case accountConstants.GET_ALL_ACCOUNT_SUCCESS:
            state = {
                ...state,
                accounts: action.payload.accounts,
                notification: null,
            };
            break;
        case accountConstants.SIGNUP_SUCCESS:
            state = {
                ...state,
                notification: `Tạo Mới Account Thành Công  ---   ${time}`,

            };
            break;
        case accountConstants.SIGNUP_FAILURE:
            state = {
                ...state,
                notification: `-------Tạo Mới Account Thất Bại  -------  ------Lỗi: ${action.payload.error}------  ${time}`,
            };
            break;

        default:
            break;
    }

    return state;
};

export default accountReducer