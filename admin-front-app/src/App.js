import './App.css';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialData, isUSerLoggedIn } from './actions';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
import NewPage from './containers/NewPage';
import { Account } from './containers/Account';
import { Supplier } from './containers/Supplier';
import { Receipt } from './containers/Receipt';
let i=0;
function App() {
console.log('i',i);i=i+1;

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);


  //ComponentDidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUSerLoggedIn())
    }
    //load trc danh muc va product
    if (auth.authenticate) {
      dispatch(getInitialData())
    }
    console.log('ddd')
   console.log('authsds1',auth.authenticate)

  }, [auth.authenticate]);


  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/account" exact component={Account} />
        <PrivateRoute path="/page" exact component={NewPage} />
        <PrivateRoute path="/category" exact component={Category} />
        <PrivateRoute path="/products" exact component={Products} />
        <PrivateRoute path="/orders" exact component={Orders} />
        <PrivateRoute path="/supplier" exact component={Supplier} />
        <PrivateRoute path="/receipt" exact component={Receipt} />

        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
