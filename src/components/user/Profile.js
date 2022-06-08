import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef } from 'react';
import useAPIUser from '../../hooks/useAPIUser';
import './Profile.sass';
import Login from '../../services/codAPI';

function Profile() {
  const { user } = useAPIUser();
  const activisionRef = useRef(null);
  const battlenetRef = useRef(null);
  const psnRef = useRef(null);
  const steamRef = useRef(null);
  const unoRef = useRef(null);
  const xboxRef = useRef(null);

  const inputRef = {
    activision: activisionRef,
    battlenet: battlenetRef,
    psn: psnRef,
    steam: steamRef,
    uno: unoRef,
    xbox: xboxRef,
  };

  function addUserProfile(profile) {
    console.log(inputRef[profile].current.value);
    // login()
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

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
            <div className="border"></div>
            <div className="body">
              {user.activision ? (
                user.activision
              ) : (
                <div className="input">
                  <input
                    type="text"
                    className="css-input"
                    ref={activisionRef}
                  />
                  <FontAwesomeIcon
                    icon={solid('plus')}
                    onClick={(e) => addUserProfile('activision')}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="box">
            <div className="header">Battlenet</div>
            <div className="border"></div>
            <div className="body">
              {user.battlenet ? (
                user.battlenet
              ) : (
                <div className="input">
                  <input type="text" className="css-input" ref={battlenetRef} />
                  <FontAwesomeIcon
                    icon={solid('plus')}
                    onClick={(e) => addUserProfile('battlenet')}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="box">
            <div className="header">PSN</div>
            <div className="border"></div>
            <div className="body">
              {user.psn ? (
                user.psn
              ) : (
                <div className="input">
                  <input type="text" className="css-input" ref={psnRef} />
                  <FontAwesomeIcon
                    icon={solid('plus')}
                    onClick={(e) => addUserProfile('psn')}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="line">
          <div className="box">
            <div className="header">Steam</div>
            <div className="border"></div>
            <div className="body">
              {user.steam ? (
                user.steam
              ) : (
                <div className="input">
                  <input type="text" className="css-input" ref={steamRef} />
                  <FontAwesomeIcon
                    icon={solid('plus')}
                    onClick={(e) => addUserProfile('steam')}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="box">
            <div className="header">Uno</div>
            <div className="border"></div>
            <div className="body">
              {user.uno ? (
                user.uno
              ) : (
                <div className="input">
                  <input type="text" className="css-input" ref={unoRef} />
                  <FontAwesomeIcon
                    icon={solid('plus')}
                    onClick={(e) => addUserProfile('uno')}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="box">
            <div className="header">XBOX</div>
            <div className="border"></div>
            <div className="body">
              {user.xbox ? (
                user.xbox
              ) : (
                <div className="input">
                  <input type="text" className="css-input" ref={xboxRef} />
                  <FontAwesomeIcon
                    icon={solid('plus')}
                    onClick={(e) => addUserProfile('xbox')}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
