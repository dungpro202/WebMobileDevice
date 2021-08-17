import './App.css';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, getInitialData, isUSerLoggedIn } from './actions';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
import NewPage from './containers/NewPage';

function App() {

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);


  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUSerLoggedIn())
    }
    //load trc danh muc va product
    dispatch(getInitialData())
  }, []);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/page" exact component={NewPage} />
        <PrivateRoute path="/category" exact component={Category} />
        <PrivateRoute path="/products" exact component={Products} />
        <PrivateRoute path="/orders" exact component={Orders} />

        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
