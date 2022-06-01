import React, { useEffect } from 'react';
import useAPIUser from '../../hooks/useAPIUser';

function Profile() {
  const { user } = useAPIUser();
  console.log(user);

  return <div>Welcome {user.user.displayName}</div>;
}

export default Profile;
