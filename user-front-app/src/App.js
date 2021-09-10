import './App.css';
import HomePage from './containers/HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductListPage from './containers/ProductListPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { isUSerLoggedIn, updateCart } from './actions';
import { ProductDetailsPage } from './containers/ProductListPage/ProductDetailsPage';
import CartPage from './containers/CartPage';
import CheckoutPage from './containers/CheckoutPage.js';
import OrderPage from './containers/OrderPage';
import OrderDetailsPage from './containers/OrderDetailsPage';


function App() {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)


    useEffect(() => {
        if (!auth.authenticate) {
            dispatch(isUSerLoggedIn())
        }
    }, [auth.authenticate])

    useEffect(() => {
        console.error('App.js - updateCart')
        dispatch(updateCart());
    }, [auth.authenticate]);

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/cart" component={CartPage} />
                    <Route path="/checkout" component={CheckoutPage} />
                    <Route path="/account/orders" component={OrderPage} />
                    <Route path="/order_details/:orderId" component={OrderDetailsPage} />
                    <Route path="/:productSlug/:productId/p" component={ProductDetailsPage} />
                    <Route path="/:slug" component={ProductListPage} />

                </Switch>
            </Router>
        </div>
    );
}

export default App;
