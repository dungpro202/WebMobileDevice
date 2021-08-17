import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import thunk from "redux-thunk";

// applyMiddleware(thunk  dong bo thunk
const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

export default store;