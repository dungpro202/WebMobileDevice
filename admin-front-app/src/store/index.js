import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import  rootReducer from '../reducers';

//extension
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// applyMiddleware(thunk  dong bo thunk
const store = createStore(rootReducer,composeEnhancer(applyMiddleware(thunk)),);
 

export default store;