import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import useAPIUser from '../../hooks/useAPIUser';
import './Profile.sass';
import { Warzone } from '../../services/codAPI';
import { findUser, getUser, updateUser } from '../../services/userFirebase';

function Profile() {
  const { user, addUser } = useAPIUser();
  const activisionRef = useRef(null);
  const battlenetRef = useRef(null);
  const psnRef = useRef(null);
  const steamRef = useRef(null);
  const unoRef = useRef(null);
  const xboxRef = useRef(null);

  const inputRef = {
    acti: activisionRef,
    battle: battlenetRef,
    psn: psnRef,
    steam: steamRef,
    uno: unoRef,
    xbl: xboxRef,
  };

  function addUserProfile(platform) {
    let gametag = inputRef[platform].current.value;

    Warzone.fullData(gametag, platform).then((data) => {
      if (data.status === 'success') {
        findUser(user.user.email).then((result) => {
          let id = result.docs[0].id;
          updateUser(id, { [platform]: gametag }).then(() => {
            getUser(id).then((data) => {
              addUser(data.data());
              console.log(user);
            });
          });
        });
      }
    });
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
              {user.user.acti ? (
                user.user.acti
              ) : (
                <div className="input">
                  <input
                    type="text"
                    className="css-input"
                    ref={activisionRef}
                  />
                  <FontAwesomeIcon
                    icon={solid('plus')}
                    onClick={(e) => addUserProfile('acti')}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="box">
            <div className="header">Battlenet</div>
            <div className="border"></div>
            <div className="body">
              {user.user.battle ? (
                user.user.battle
              ) : (
                <div className="input">
                  <input type="text" className="css-input" ref={battlenetRef} />
                  <FontAwesomeIcon
                    icon={solid('plus')}
                    onClick={(e) => addUserProfile('battle')}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="box">
            <div className="header">PSN</div>
            <div className="border"></div>
            <div className="body">
              {user.user.psn ? (
                user.user.psn
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
              {user.user.steam ? (
                user.user.steam
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
              {user.user.uno ? (
                user.user.uno
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
              {user.user.xbl ? (
                user.user.xbl
              ) : (
                <div className="input">
                  <input type="text" className="css-input" ref={xboxRef} />
                  <FontAwesomeIcon
                    icon={solid('plus')}
                    onClick={(e) => addUserProfile('xbl')}
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
