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
        navigate('/');
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <nav>
      <ul>
        <div className="left">
          {user && (
            <li>
              <NavLink to="/stats" exact="/stats">
                Stats
              </NavLink>
            </li>
          )}
          {user && (
            <li>
              <NavLink to="/matches" exact="/matches">
                Matches
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/loadouts" exact="/loadouts">
              Loadouts
            </NavLink>
          </li>
        </div>
        <div className="right">
          {user && (
            <li>
              <NavLink to="/profile" exact="/profile">
                Profile
              </NavLink>
            </li>
          )}

          {!user && (
            <li>
              <NavLink to="/login" exact="/login">
                <FontAwesomeIcon icon={solid('right-to-bracket')} /> Login
              </NavLink>
            </li>
          )}
          {user && (
            <li onClick={logout}>
              <NavLink to="/" exact="/">
                <FontAwesomeIcon icon={solid('right-to-bracket')} />
              </NavLink>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navigation;
