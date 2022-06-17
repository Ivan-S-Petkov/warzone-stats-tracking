import React, { useState, useCallback, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { findUser, getUser } from '../services/userFirebase';
import { login } from '../services/codAPI';

export const APIUserContext = React.createContext({
  user: null,
  addUser: () => {},
  removeUser: () => {},
  setNewUser: () => {},
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
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        login(
          'MTA4Mjc0MjU0Nzg5NDcyNDUwNDg6MTY1NTM4NTE3OTk1NToyN2ZlZTljZWUzMjllNTkxOTAzMTE5MDc5Njk1ZTYzYw'
        );
        findUser(user.email).then((result) => {
          let id = result.docs[0].id;
          getUser(id).then((data) => {
            addUser(data.data());
          });
        });
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
