import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import useRoutes from '../routes/routes';
import { useAuth } from '../hooks/auth.hook';
import { AuthContext } from '../context/AuthContext';
import Navbar from './Navbar';
import Loader from './Loader';
import '../index.css';
import 'materialize-css';

function App() {
  const {login, logout, token, userId, ready, getToken} = useAuth();
  const isAuth = token ? true : false;
  const routes = useRoutes(isAuth);
  if(!ready) return <Loader />;
  return (
    <AuthContext.Provider value={{login, logout, token, userId, isAuth, getToken}}>
      <Router>
        {isAuth ? <Navbar /> : null}
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;