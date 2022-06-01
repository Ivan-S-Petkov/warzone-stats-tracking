import React, { useState, useCallback, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const APIUserContext = React.createContext({
  user: null,
  newUser: false,
  addUser: () => {},
  removeUser: () => {},
  setNewUser: () => {},
});

export default function APIUserProvider({ children }) {
  const [user, setUser] = useState(null);
  const removeUser = () => setUser(null);
  const addUser = (user) => setUser({ user });
  const [newUser, setNewUser] = useState(false);
  const setNew = (boolean) => setNewUser({ boolean });

  const contextValue = {
    user,
    newUser,
    addUser: useCallback((user) => addUser(user), []),
    removeUser: useCallback(() => removeUser(), []),
    setNewUser: useCallback((boolean) => setNew(boolean), []),
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        addUser(user);
      } else {
        removeUser();
      }
    });
  }, []);

  return (
    <APIUserContext.Provider value={contextValue}>
      {children}
    </APIUserContext.Provider>
  );
}
