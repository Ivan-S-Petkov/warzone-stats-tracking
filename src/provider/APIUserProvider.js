import React, { useState, useCallback, useEffect } from 'react';
import { getAuth } from '../utils/firebase';

export const APIUserContext = React.createContext({
  user: null,
  addUser: () => {},
  removeUser: () => {},
});

export default function APIUserProvider({ children }) {
  const [user, setUser] = useState(null);
  const removeUser = () => setUser(null);
  const addUser = (user) => setUser({ user });

  const contextValue = {
    user,
    addUser: useCallback((user) => addUser(user), []),
    removeUser: useCallback(() => removeUser(), []),
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      addUser(localStorage.getItem('user'));
    }
  }, []);
  return (
    <APIUserContext.Provider value={contextValue}>
      {children}
    </APIUserContext.Provider>
  );
}
