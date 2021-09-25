import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import DataProvider from './contexts/DataContext';
import Home from './pages/Home';
import Bookshelf from './pages/Bookshelf';
import Navbar from './components/Navbar';
import './styles/styles.scss';

const App = () => {
  const { token } = useContext(AuthContext);
  return (
    <DataProvider>
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route
              path="/bookshelf"
              render={() => token ? <Bookshelf /> : <Home />}
            />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;
