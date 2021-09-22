import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Auth from './pages/Auth';
import Bookshelf from './pages/Bookshelf';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
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
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <Loading />

  return (
    <Router>
      <div>
        {!isAuthenticated && logInPage}
        {isAuthenticated && appPages}
      </div>
    </Router>
  );
};

export default App;
