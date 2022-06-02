import React from 'react';
import { NavLink } from 'react-router-dom';
import './NewUser.sass';

function NewUser() {
  return (
    <div className="new-user">
      Welcome to @Website Name. Here you can find tons of statistics and
      insigtes for your gaming performance. In order to gain access you have to
      do the final step and set up your profile{' '}
      <NavLink to="/profile" exact="/profile">
        here
      </NavLink>
      .
    </div>
  );
}

export default NewUser;
