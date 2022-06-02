import { useContext } from 'react';
import { APIUserContext } from '../provider/APIUserProvider';

function useAPIUser() {
  const { user, newUser, addUser, removeUser, setNewUser } =
    useContext(APIUserContext);
  return { user, newUser, addUser, removeUser, setNewUser };
}

export default useAPIUser;
