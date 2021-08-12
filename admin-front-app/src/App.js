import './App.css';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUSerLoggedIn } from './actions';

function App() {

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);


  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUSerLoggedIn())
    }
  }, []);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
