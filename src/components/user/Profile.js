import React, { useEffect } from 'react';
import useAPIUser from '../../hooks/useAPIUser';

function Profile() {
  const { user } = useAPIUser();
  console.log(user);

  return (
    <div>
      Welcome {user.user.displayName}
      Gaming Platforms - PlayStation Battle.net Activision
    </div>
  );
}

export default Profile;
