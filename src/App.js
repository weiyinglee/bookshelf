import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import AuthContext from './AuthContext';
import Auth from './pages/Auth';
import Bookshelf from './pages/Bookshelf';
import Navbar from './components/Navbar';
import './styles/styles.scss';

const appPages = (
  <>
    <Navbar />
    <Switch>
      <Route path="/" component={Bookshelf} />
    </Switch>
  </>
);

const logInPage = (
  <Switch>
    <Route path="/" component={Auth} />
  </Switch>
);

const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <div>
        {!token && logInPage}
        {token && appPages}
      </div>
    </Router>
  );
};

export default App;
