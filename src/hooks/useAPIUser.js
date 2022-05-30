import { useContext } from 'react';
import { APIUserContext } from '../provider/APIUserProvider';

function useAPIUser() {
  const { user, addUser, removeUser } = useContext(APIUserContext);
  return { user, addUser, removeUser };
}

export default useAPIUser;
