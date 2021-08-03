import authReducer from "./auth.reducer";
import { combineReducers } from "redux";

const rootReducer =  combineReducers({
    auth: authReducer,
})

export default rootReducer;