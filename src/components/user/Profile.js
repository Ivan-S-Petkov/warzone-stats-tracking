import React, { useEffect } from 'react';
import useAPIUser from '../../hooks/useAPIUser';
import './Profile.sass';

function Profile() {
  const { user } = useAPIUser();

  return (
    <div>
      <div className="profile-header">
        Welcome {user.user.displayName}, In order to obtain your gaming data we
        need at least one of the following accounts. Gaming Platforms -
      </div>
      <div className="profiles">
        <div className="line">
          <div className="box">
            <div className="header">Activision</div>
            <div className="body"></div>
          </div>
          <div className="box">
            <div className="header">Battlenet</div>
            <div className="body"></div>
          </div>
          <div className="box">
            <div className="header">PSN</div>
            <div className="body"></div>
          </div>
        </div>
        <div className="line">
          <div className="box">
            <div className="header">Steam</div>
            <div className="body"></div>
          </div>
          <div className="box">
            <div className="header">Uno</div>
            <div className="body"></div>
          </div>
          <div className="box">
            <div className="header">XBOX</div>
            <div className="body"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
