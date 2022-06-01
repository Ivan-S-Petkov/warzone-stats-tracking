import { useContext } from 'react';
import { APIUserContext } from '../provider/APIUserProvider';

function useAPIUser() {
  const { user, addUser, removeUser, setNewUser } = useContext(APIUserContext);
  return { user, addUser, removeUser, setNewUser };
}

export default useAPIUser;
