import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import useAPIUser from '../../hooks/useAPIUser';
import './Profile.sass';
import { Warzone } from '../../services/codAPI';
import {
  findUser,
  getUser,
  updateUser,
  deleteUserField,
} from '../../services/userFirebase';

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

  let [error, setError] = useState();

  function addUserProfile(platform) {
    let gametag = inputRef[platform].current.value.trim();
    if (gametag) {
      Warzone.fullData(gametag, platform)
        .then((data) => {
          if (data.status === 'success') {
            findUser(user.user.email).then((result) => {
              let id = result.docs[0].id;
              updateUser(id, { [platform]: gametag, default: platform }).then(
                () => {
                  getUser(id).then((data) => {
                    addUser(data.data());
                  });
                }
              );
            });
          } else {
            setError(data.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          setError(err);
        });
    } else {
      setError('You must provide platform username');
    }
  }

  function removeUserProfile(platform) {
    let defaultPlatform = { default: false };
    findUser(user.user.email).then((result) => {
      let id = result.docs[0].id;
      deleteUserField(id, platform).then(() => {
        getUser(id).then((data) => {
          addUser(data.data());
          if (data.data().acti) {
            defaultPlatform = { default: 'acti' };
          } else if (data.data().battle) {
            defaultPlatform = { default: 'battle' };
          } else if (data.data().psn) {
            defaultPlatform = { default: 'psn' };
          } else if (data.data().steam) {
            defaultPlatform = { default: 'steam' };
          } else if (data.data().uno) {
            defaultPlatform = { default: 'uno' };
          } else if (data.data().xbl) {
            defaultPlatform = { default: 'xbl' };
          }
          updateUser(id, defaultPlatform).then(() => {
            getUser(id).then((data) => {
              addUser(data.data());
            });
          });
        });
      });
    });
  }

  function setDefault(platform) {
    if (user.user[platform]) {
      findUser(user.user.email).then((result) => {
        let id = result.docs[0].id;
        updateUser(id, { default: platform }).then(() => {
          getUser(id).then((data) => {
            addUser(data.data());
          });
        });
      });
    }
  }

  useEffect(() => {
    const timeId = setTimeout(() => {
      setError(false);
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  }, [error]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        Welcome {user.user.displayName}, In order to obtain your gaming data we
        need at least one of the following accounts. Gaming Platforms -
      </div>
      {error ? <div className="error">{error}</div> : ''}
      <div className="profiles">
        <div className="line">
          <div className="box">
            <div className="header" onClick={(e) => setDefault('acti')}>
              Activision
              {user.user.default === 'acti' ? (
                <FontAwesomeIcon icon={solid('ranking-star')} />
              ) : (
                ''
              )}
            </div>
            <div className="border"></div>
            <div className="profiles-body">
              {user.user.acti ? (
                <div className="profile">
                  {user.user.acti}
                  <FontAwesomeIcon
                    icon={solid('minus')}
                    onClick={(e) => removeUserProfile('acti')}
                  />
                </div>
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
            <div className="header" onClick={(e) => setDefault('battle')}>
              Battlenet
              {user.user.default === 'battle' ? (
                <FontAwesomeIcon icon={solid('ranking-star')} />
              ) : (
                ''
              )}
            </div>
            <div className="border"></div>
            <div className="profiles-body">
              {user.user.battle ? (
                <div className="profile">
                  {user.user.battle}
                  <FontAwesomeIcon
                    icon={solid('minus')}
                    onClick={(e) => removeUserProfile('battle')}
                  />
                </div>
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
            <div className="header" onClick={(e) => setDefault('psn')}>
              PSN
              {user.user.default === 'psn' ? (
                <FontAwesomeIcon icon={solid('ranking-star')} />
              ) : (
                ''
              )}
            </div>
            <div className="border"></div>
            <div className="profiles-body">
              {user.user.psn ? (
                <div className="profile">
                  {user.user.psn}
                  <FontAwesomeIcon
                    icon={solid('minus')}
                    onClick={(e) => removeUserProfile('psn')}
                  />
                </div>
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
            <div className="header" onClick={(e) => setDefault('steam')}>
              Steam
              {user.user.default === 'steam' ? (
                <FontAwesomeIcon icon={solid('ranking-star')} />
              ) : (
                ''
              )}
            </div>
            <div className="border"></div>
            <div className="profiles-body">
              {user.user.steam ? (
                <div className="profile">
                  {user.user.steam}
                  <FontAwesomeIcon
                    icon={solid('minus')}
                    onClick={(e) => removeUserProfile('steam')}
                  />
                </div>
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
            <div className="header" onClick={(e) => setDefault('uno')}>
              Uno
              {user.user.default === 'uno' ? (
                <FontAwesomeIcon icon={solid('ranking-star')} />
              ) : (
                ''
              )}
            </div>
            <div className="border"></div>
            <div className="profiles-body">
              {user.user.uno ? (
                <div className="profile">
                  {user.user.uno}
                  <FontAwesomeIcon
                    icon={solid('minus')}
                    onClick={(e) => removeUserProfile('uno')}
                  />
                </div>
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
            <div className="header" onClick={(e) => setDefault('xbl')}>
              XBOX
              {user.user.default === 'xbl' ? (
                <FontAwesomeIcon icon={solid('ranking-star')} />
              ) : (
                ''
              )}
            </div>
            <div className="border"></div>
            <div className="profiles-body">
              {user.user.xbl ? (
                <div className="profile">
                  {user.user.xbl}
                  <FontAwesomeIcon
                    icon={solid('minus')}
                    onClick={(e) => removeUserProfile('xbl')}
                  />
                </div>
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
