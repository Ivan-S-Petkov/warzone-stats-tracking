import './Navigation.sass';
import React from 'react';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used

function Navigation() {
  return (
    <nav>
      <NavLink to="/stats" exact>
        Stats
      </NavLink>
      <NavLink to="/matches" exact>
        Matches
      </NavLink>
      <NavLink to="/loadouts" exact>
        Loadouts
      </NavLink>
      <NavLink to="/profile" exact>
        Profile
      </NavLink>
      <NavLink to="/login" exact>
        <FontAwesomeIcon icon={solid('right-to-bracket')} /> Login
      </NavLink>
    </nav>
  );
}

export default Navigation;
