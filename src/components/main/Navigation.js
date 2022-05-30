import './Navigation.sass';
import React from 'react';
import { Route, Switch, NavLink, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used
import useAPIUser from '../../hooks/useAPIUser';
import { getAuth, signOut } from 'firebase/auth';

function Navigation() {
  const { user, removeUser } = useAPIUser();
  const navigate = useNavigate();
  const auth = getAuth();

  function logout() {
    signOut(auth)
      .then(() => {
        removeUser();
        localStorage.removeItem('user');
        navigate('/');
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <nav>
      {user && (
        <li>
          <NavLink to="/stats" exact>
            Stats
          </NavLink>
        </li>
      )}
      {user && (
        <li>
          <NavLink to="/matches" exact>
            Matches
          </NavLink>
        </li>
      )}
      <li>
        <NavLink to="/loadouts" exact>
          Loadouts
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/profile" exact>
            Profile
          </NavLink>
        </li>
      )}
      {!user && (
        <li>
          <NavLink to="/login" exact>
            <FontAwesomeIcon icon={solid('right-to-bracket')} /> Login
          </NavLink>
        </li>
      )}
      {user && (
        <li onClick={logout}>
          <NavLink to="/logout" exact>
            <FontAwesomeIcon icon={solid('right-to-bracket')} /> Logout
          </NavLink>
        </li>
      )}
    </nav>
  );
}

export default Navigation;
