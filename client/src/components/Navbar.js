import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const linkLogout = (event) => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  }

  return (
    <nav>
      <div className="nav-wrapper blue" style={{padding: '0 2rem'}}>
        <span className="brand-logo">Сократить ссылки</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/create">Создать</NavLink></li>
          <li><NavLink to="/links">Ссылки</NavLink></li>
          <li>
            <a 
              href="/"
              onClick={linkLogout}>
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
};

export default Navbar;