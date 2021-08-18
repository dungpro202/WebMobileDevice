import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import pageReducer from "./page.reducer";
import orderReducer from "./order.reducer";
import { combineReducers } from "redux";

const rootReducer =  combineReducers({
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    page: pageReducer,
    order: orderReducer,
})

export default rootReducer;